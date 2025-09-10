import { Layout } from "@/components/Layout";
import { StatCard } from "@/components/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  MessageSquare, 
  Users, 
  TrendingUp, 
  Bot,
  Clock,
  CheckCircle,
  AlertTriangle,
  Activity,
  BarChart3,
  MessageCircle
} from "lucide-react";

const recentMessages = [
  {
    id: "1",
    contact: "João Silva",
    message: "Obrigado pela ajuda com o pedido!",
    timestamp: "14:30",
    status: "resolved"
  },
  {
    id: "2", 
    contact: "Maria Santos",
    message: "Como posso cancelar meu pedido?",
    timestamp: "13:45",
    status: "active"
  },
  {
    id: "3",
    contact: "Pedro Costa", 
    message: "Qual o horário de funcionamento?",
    timestamp: "12:15",
    status: "pending"
  }
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case "resolved": return <CheckCircle className="h-4 w-4 text-success" />;
    case "active": return <Activity className="h-4 w-4 text-primary" />;
    case "pending": return <Clock className="h-4 w-4 text-warning" />;
    default: return <MessageCircle className="h-4 w-4" />;
  }
};

const Index = () => {
  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">
            Visão geral do desempenho do seu chatbot WhatsApp
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Conversas Hoje"
            value="156"
            icon={MessageSquare}
            trend={{ value: 12, isPositive: true }}
          />
          <StatCard
            title="Usuários Ativos"
            value="89"
            icon={Users}
            trend={{ value: 8, isPositive: true }}
          />
          <StatCard
            title="Taxa de Resolução"
            value="94%"
            icon={CheckCircle}
            trend={{ value: 3, isPositive: true }}
          />
          <StatCard
            title="Tempo Médio"
            value="2.3min"
            icon={Clock}
            trend={{ value: -15, isPositive: false }}
            description="resposta"
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <Card className="gradient-card shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-primary" />
                  Atividade Recente
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentMessages.map((message) => (
                    <div
                      key={message.id}
                      className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-accent/50 transition-smooth"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold text-sm">
                          {message.contact.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium text-foreground">
                            {message.contact}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {message.message}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(message.status)}
                        <span className="text-sm text-muted-foreground">
                          {message.timestamp}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Stats */}
          <div className="space-y-6">
            {/* System Status */}
            <Card className="gradient-card shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bot className="h-5 w-5 text-primary" />
                  Status do Sistema
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">WhatsApp</span>
                  <Badge className="bg-success text-success-foreground">
                    Conectado
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">OpenAI API</span>
                  <Badge className="bg-success text-success-foreground">
                    Ativo
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Base de Dados</span>
                  <Badge className="bg-success text-success-foreground">
                    Online
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Processamento</span>
                  <Badge className="bg-warning text-warning-foreground">
                    Ocupado
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Performance */}
            <Card className="gradient-card shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Performance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Taxa de Sucesso</span>
                    <span className="font-medium">94%</span>
                  </div>
                  <Progress value={94} />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Satisfação</span>
                    <span className="font-medium">87%</span>
                  </div>
                  <Progress value={87} />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Resposta Automática</span>
                    <span className="font-medium">76%</span>
                  </div>
                  <Progress value={76} />
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="gradient-card shadow-soft">
              <CardHeader>
                <CardTitle>Ações Rápidas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start gap-2">
                  <BarChart3 className="h-4 w-4" />
                  Ver Relatórios
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Conversas Pendentes
                </Button>
                <Button className="w-full justify-start gap-2 gradient-primary">
                  <Bot className="h-4 w-4" />
                  Testar Chatbot
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
