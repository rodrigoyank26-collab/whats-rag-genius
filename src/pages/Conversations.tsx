import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, Download } from "lucide-react";

const conversations = [
  {
    id: "1",
    contact: "+55 11 99999-9999",
    name: "João Silva",
    lastMessage: "Obrigado pela ajuda!",
    timestamp: "2024-01-15 14:30",
    status: "resolved",
    messages: 8
  },
  {
    id: "2", 
    contact: "+55 11 88888-8888",
    name: "Maria Santos",
    lastMessage: "Como posso cancelar meu pedido?",
    timestamp: "2024-01-15 13:45",
    status: "active",
    messages: 3
  },
  {
    id: "3",
    contact: "+55 11 77777-7777", 
    name: "Pedro Costa",
    lastMessage: "Qual o horário de funcionamento?",
    timestamp: "2024-01-15 12:15",
    status: "pending",
    messages: 1
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "resolved": return "bg-success text-success-foreground";
    case "active": return "bg-primary text-primary-foreground";
    case "pending": return "bg-warning text-warning-foreground";
    default: return "bg-muted text-muted-foreground";
  }
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case "resolved": return "Resolvida";
    case "active": return "Ativa"; 
    case "pending": return "Pendente";
    default: return status;
  }
};

const Conversations = () => {
  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Conversas</h1>
          <p className="text-muted-foreground">
            Gerencie e analise todas as conversas do WhatsApp
          </p>
        </div>

        {/* Filters */}
        <Card className="gradient-card shadow-soft">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar conversas..."
                  className="pl-10"
                />
              </div>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Filtros
              </Button>
              <Button variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                Exportar
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Conversations List */}
        <Card className="gradient-card shadow-soft">
          <CardHeader>
            <CardTitle>Histórico de Conversas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-accent/50 transition-smooth cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold">
                      {conversation.name.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-foreground">
                          {conversation.name}
                        </h3>
                        <Badge 
                          className={getStatusColor(conversation.status)}
                        >
                          {getStatusLabel(conversation.status)}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {conversation.contact}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {conversation.lastMessage}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">
                      {conversation.timestamp}
                    </p>
                    <p className="text-sm font-medium text-primary">
                      {conversation.messages} mensagens
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Conversations;