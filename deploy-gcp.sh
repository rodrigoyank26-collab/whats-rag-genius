#!/bin/bash

# Script de deploy para Google Cloud Platform
# Uso: ./deploy-gcp.sh [PROJECT_ID] [REGION]

set -e

# Configurações padrão
PROJECT_ID=${1:-"seu-projeto-gcp"}
REGION=${2:-"us-central1"}
SERVICE_NAME="whatsapp-rag-dashboard"

echo "🚀 Iniciando deploy do WhatsApp RAG Chatbot Dashboard..."
echo "Projeto: $PROJECT_ID"
echo "Região: $REGION"
echo "Serviço: $SERVICE_NAME"
echo ""

# Verificar se gcloud está instalado
if ! command -v gcloud &> /dev/null; then
    echo "❌ Google Cloud CLI não está instalado."
    echo "Instale em: https://cloud.google.com/sdk/docs/install"
    exit 1
fi

# Verificar se está logado no gcloud
if ! gcloud auth list --filter=status:ACTIVE --format="value(account)" | grep -q .; then
    echo "❌ Você não está logado no Google Cloud."
    echo "Execute: gcloud auth login"
    exit 1
fi

# Configurar projeto
echo "🔧 Configurando projeto..."
gcloud config set project $PROJECT_ID

# Habilitar APIs necessárias
echo "🔧 Habilitando APIs necessárias..."
gcloud services enable cloudbuild.googleapis.com
gcloud services enable run.googleapis.com
gcloud services enable containerregistry.googleapis.com

# Build da aplicação
echo "📦 Fazendo build da aplicação..."
npm ci
npm run build

# Verificar se a pasta dist foi criada
if [ ! -d "dist" ]; then
    echo "❌ Pasta dist não encontrada. Build falhou."
    exit 1
fi

# Escolher método de deploy
echo ""
echo "Escolha o método de deploy:"
echo "1) App Engine (mais simples, ideal para aplicações estáticas)"
echo "2) Cloud Run (mais flexível, suporte a containers)"
echo -n "Digite sua escolha (1 ou 2): "
read -r DEPLOY_METHOD

case $DEPLOY_METHOD in
    1)
        echo "🚀 Fazendo deploy via App Engine..."
        
        # Verificar se app.yaml existe
        if [ ! -f "app.yaml" ]; then
            echo "❌ Arquivo app.yaml não encontrado."
            exit 1
        fi
        
        # Deploy no App Engine
        gcloud app deploy app.yaml --quiet
        
        # Obter URL do serviço
        URL=$(gcloud app browse --no-launch-browser 2>&1 | grep -o 'https://[^[:space:]]*')
        echo ""
        echo "✅ Deploy concluído com sucesso!"
        echo "🌐 Sua aplicação está disponível em: $URL"
        ;;
        
    2)
        echo "🚀 Fazendo deploy via Cloud Run..."
        
        # Build da imagem Docker
        IMAGE_NAME="gcr.io/$PROJECT_ID/$SERVICE_NAME"
        
        echo "🐳 Fazendo build da imagem Docker..."
        docker build -t $IMAGE_NAME .
        
        # Push da imagem
        echo "📤 Enviando imagem para Container Registry..."
        docker push $IMAGE_NAME
        
        # Deploy no Cloud Run
        echo "🚀 Fazendo deploy no Cloud Run..."
        gcloud run deploy $SERVICE_NAME \
            --image $IMAGE_NAME \
            --region $REGION \
            --platform managed \
            --allow-unauthenticated \
            --port 8080 \
            --memory 512Mi \
            --cpu 1 \
            --max-instances 10 \
            --min-instances 1 \
            --quiet
        
        # Obter URL do serviço
        URL=$(gcloud run services describe $SERVICE_NAME --region=$REGION --format="value(status.url)")
        echo ""
        echo "✅ Deploy concluído com sucesso!"
        echo "🌐 Sua aplicação está disponível em: $URL"
        ;;
        
    *)
        echo "❌ Opção inválida. Execute o script novamente."
        exit 1
        ;;
esac

echo ""
echo "📊 Próximos passos:"
echo "1. Configure as variáveis de ambiente no GCP Console"
echo "2. Configure um domínio customizado se necessário"
echo "3. Configure monitoramento e alertas"
echo "4. Implemente o backend para funcionalidade completa"
echo ""
echo "📚 Documentação: https://cloud.google.com/docs"