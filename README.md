# WhatsApp RAG Chatbot - Admin Dashboard

Sistema completo de chatbot RAG (Retrieval-Augmented Generation) para WhatsApp com dashboard administrativo profissional.

## 🚀 Recursos Principais

### Dashboard Administrativo
- **Métricas em Tempo Real**: Visualização de conversas ativas, mensagens processadas e status do sistema
- **Gestão de Conversas**: Interface completa para monitorar, filtrar e analisar conversas do WhatsApp
- **Base de Conhecimento**: Upload e gerenciamento de arquivos (PDF, DOCX, TXT, CSV) para alimentar o RAG
- **Configurações Avançadas**: Configuração da API OpenAI, parâmetros do modelo e integração WhatsApp

### Tecnologias Utilizadas
- **Frontend**: React 18 + TypeScript + Tailwind CSS
- **UI Components**: shadcn/ui para componentes profissionais
- **Roteamento**: React Router DOM
- **Ícones**: Lucide React
- **Gráficos**: Recharts para visualizações
- **Estado**: TanStack Query para gerenciamento de estado servidor

## 🎨 Design System

O projeto utiliza um design system robusto com:
- **Tokens Semânticos**: Cores e estilos definidos via CSS custom properties
- **Tema Responsivo**: Suporte completo para dark/light mode
- **Gradientes Personalizados**: Efeitos visuais elegantes
- **Animações Suaves**: Transições e micro-interações polidas

## 📱 Interface

### Dashboard Principal
- Cartões de estatísticas com métricas em tempo real
- Feed de atividades recentes
- Status do sistema e alertas

### Gestão de Conversas
- Lista completa de conversas com filtros
- Status de conversa (Ativa, Pendente, Resolvida)
- Busca avançada e exportação de dados

### Base de Conhecimento
- Upload drag-and-drop de arquivos
- Status de processamento em tempo real
- Gerenciamento de documentos indexados

### Configurações
- Configuração da API OpenAI (modelo, temperatura)
- Parâmetros do chatbot
- Integração WhatsApp
- Configurações de sistema

## 🛠️ Desenvolvimento

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn

### Instalação
```bash
# Clone o repositório
git clone <YOUR_GIT_URL>

# Navegue para o diretório
cd whatsapp-rag-chatbot

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

### Scripts Disponíveis
```bash
npm run dev          # Servidor de desenvolvimento
npm run build        # Build para produção
npm run preview      # Preview do build
npm run lint         # Linting do código
```

## 🌐 Deploy no Google Cloud Platform

### Preparação para Deploy
1. **Build da Aplicação**:
   ```bash
   npm run build
   ```

2. **Configuração GCP**:
   - Configure o Google Cloud CLI
   - Crie um projeto no GCP
   - Habilite as APIs necessárias

3. **Deploy via App Engine**:
   ```bash
   gcloud app deploy
   ```

4. **Deploy via Cloud Run**:
   ```bash
   # Build da imagem Docker
   docker build -t gcr.io/[PROJECT-ID]/whatsapp-rag-dashboard .
   
   # Push para Container Registry
   docker push gcr.io/[PROJECT-ID]/whatsapp-rag-dashboard
   
   # Deploy no Cloud Run
   gcloud run deploy --image gcr.io/[PROJECT-ID]/whatsapp-rag-dashboard
   ```

### Configurações de Produção
- Configure variáveis de ambiente no GCP
- Configure SSL/HTTPS
- Configure CDN para assets estáticos
- Monitore performance e logs

## 🔧 Configuração

### Variáveis de Ambiente (Backend)
```env
OPENAI_API_KEY=sua_chave_openai
WHATSAPP_API_TOKEN=seu_token_whatsapp
DATABASE_URL=sua_url_database
```

### Estrutura do Projeto
```
src/
├── components/         # Componentes reutilizáveis
│   ├── ui/            # Componentes shadcn/ui
│   ├── Layout.tsx     # Layout principal
│   ├── Sidebar.tsx    # Navegação lateral
│   └── StatCard.tsx   # Cartões de estatísticas
├── pages/             # Páginas da aplicação
│   ├── Index.tsx      # Dashboard principal
│   ├── Conversations.tsx  # Gestão de conversas
│   ├── Knowledge.tsx  # Base de conhecimento
│   ├── Settings.tsx   # Configurações
│   └── NotFound.tsx   # Página 404
├── hooks/             # Hooks customizados
├── lib/               # Utilitários
└── index.css          # Estilos globais e tokens
```

## 🎯 Funcionalidades Planejadas

### Backend (Node.js + TypeScript)
- [ ] API REST para gestão de dados
- [ ] Integração WhatsApp Web/Business API
- [ ] Sistema RAG com embeddings
- [ ] Processamento de documentos
- [ ] Autenticação e autorização
- [ ] WebSockets para atualizações em tempo real

### Melhorias UI/UX
- [ ] Modo escuro/claro automático
- [ ] Internacionalização (i18n)
- [ ] Notificações push
- [ ] Exportação avançada de relatórios
- [ ] Backup e restauração de dados

## 📞 Suporte

Para suporte técnico ou dúvidas sobre implementação:
- Documentação completa: Em desenvolvimento
- Issues: Use o sistema de issues do GitHub
- Contribuições: PRs são bem-vindos!

## 📄 Licença

Este projeto está sob licença MIT. Veja o arquivo LICENSE para mais detalhes.

---

**Desenvolvido com ❤️ para automação inteligente de atendimento via WhatsApp**