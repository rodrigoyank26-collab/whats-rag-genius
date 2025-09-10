import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Save, 
  Key, 
  Bot, 
  MessageSquare, 
  Shield,
  TestTube,
  AlertTriangle
} from "lucide-react";
import { useState } from "react";

const Settings = () => {
  const [temperature, setTemperature] = useState([0.7]);
  const [apiKeyVisible, setApiKeyVisible] = useState(false);

  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Configurações</h1>
          <p className="text-muted-foreground">
            Configure o comportamento e parâmetros do chatbot
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* OpenAI Configuration */}
          <Card className="gradient-card shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5 text-primary" />
                Configuração OpenAI
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="api-key">API Key</Label>
                <div className="relative">
                  <Input
                    id="api-key"
                    type={apiKeyVisible ? "text" : "password"}
                    placeholder="sk-..."
                    className="pr-20"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                    onClick={() => setApiKeyVisible(!apiKeyVisible)}
                  >
                    {apiKeyVisible ? "Ocultar" : "Mostrar"}
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Sua chave da API OpenAI será armazenada de forma segura
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="model">Modelo</Label>
                <Select defaultValue="gpt-3.5-turbo">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                    <SelectItem value="gpt-4">GPT-4</SelectItem>
                    <SelectItem value="gpt-4-turbo">GPT-4 Turbo</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Temperature: {temperature[0]}</Label>
                  <Slider
                    value={temperature}
                    onValueChange={setTemperature}
                    max={1}
                    min={0}
                    step={0.1}
                    className="w-full"
                  />
                  <p className="text-sm text-muted-foreground">
                    Controla a criatividade das respostas (0 = mais conservador, 1 = mais criativo)
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Bot Configuration */}
          <Card className="gradient-card shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-primary" />
                Comportamento do Bot
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="bot-name">Nome do Bot</Label>
                <Input
                  id="bot-name"
                  placeholder="Assistente Virtual"
                  defaultValue="Assistente da Empresa"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="welcome-message">Mensagem de Boas-vindas</Label>
                <Textarea
                  id="welcome-message"
                  placeholder="Olá! Como posso ajudá-lo hoje?"
                  defaultValue="Olá! Sou o assistente virtual da empresa. Como posso ajudá-lo hoje?"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fallback-message">Mensagem Padrão</Label>
                <Textarea
                  id="fallback-message"
                  placeholder="Desculpe, não entendi. Pode reformular?"
                  defaultValue="Desculpe, não consegui encontrar informações sobre isso. Pode reformular sua pergunta ou entrar em contato com nosso atendimento humano?"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* WhatsApp Configuration */}
          <Card className="gradient-card shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-primary" />
                WhatsApp
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Status da Conexão</Label>
                  <p className="text-sm text-muted-foreground">
                    Conexão com WhatsApp Web
                  </p>
                </div>
                <Badge className="bg-success text-success-foreground">
                  Conectado
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Auto-resposta</Label>
                  <p className="text-sm text-muted-foreground">
                    Responder automaticamente às mensagens
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Modo Silencioso</Label>
                  <p className="text-sm text-muted-foreground">
                    Não exibir indicadores de digitação
                  </p>
                </div>
                <Switch />
              </div>

              <Button className="w-full gradient-primary">
                Reconectar WhatsApp
              </Button>
            </CardContent>
          </Card>

          {/* Advanced Settings */}
          <Card className="gradient-card shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Configurações Avançadas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="max-tokens">Máximo de Tokens</Label>
                <Input
                  id="max-tokens"
                  type="number"
                  defaultValue="150"
                  min="50"
                  max="1000"
                />
                <p className="text-sm text-muted-foreground">
                  Limita o tamanho das respostas geradas
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="context-length">Contexto de Conversa</Label>
                <Select defaultValue="10">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5 mensagens</SelectItem>
                    <SelectItem value="10">10 mensagens</SelectItem>
                    <SelectItem value="20">20 mensagens</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">
                  Quantas mensagens anteriores considerar no contexto
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Logs Detalhados</Label>
                  <p className="text-sm text-muted-foreground">
                    Registrar todas as interações
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Test Section */}
        <Card className="gradient-card shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TestTube className="h-5 w-5 text-primary" />
              Teste do Sistema
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3 p-4 rounded-lg bg-warning/10 border border-warning/20">
              <AlertTriangle className="h-5 w-5 text-warning mt-0.5" />
              <div>
                <p className="font-medium text-warning-foreground">
                  Área de Testes
                </p>
                <p className="text-sm text-muted-foreground">
                  Use esta seção para testar as configurações antes de aplicá-las no WhatsApp
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="test-message">Mensagem de Teste</Label>
              <Textarea
                id="test-message"
                placeholder="Digite uma mensagem para testar o bot..."
                rows={3}
              />
            </div>

            <div className="flex gap-2">
              <Button variant="outline" className="flex-1">
                Testar RAG
              </Button>
              <Button className="flex-1 gradient-primary">
                Testar Completo
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button size="lg" className="gradient-primary gap-2">
            <Save className="h-4 w-4" />
            Salvar Configurações
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;