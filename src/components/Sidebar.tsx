import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  BarChart3, 
  MessageSquare, 
  Upload, 
  Settings, 
  Bot,
  Activity
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/", icon: BarChart3 },
  { name: "Conversas", href: "/conversations", icon: MessageSquare },
  { name: "Base de Conhecimento", href: "/knowledge", icon: Upload },
  { name: "Configurações", href: "/settings", icon: Settings },
];

export const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border shadow-medium">
      {/* Logo */}
      <div className="flex h-16 items-center px-6 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-primary">
            <Bot className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-foreground">
              ChatBot RAG
            </h1>
            <p className="text-sm text-muted-foreground">WhatsApp Admin</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-2 p-4">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-medium",
                "hover:bg-accent/50 group",
                isActive 
                  ? "bg-primary text-primary-foreground shadow-soft" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <item.icon className={cn(
                "h-5 w-5 transition-medium",
                isActive ? "text-primary-foreground" : "group-hover:text-primary"
              )} />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Status indicator */}
      <div className="absolute bottom-4 left-4 right-4">
        <div className="flex items-center gap-3 p-3 rounded-lg bg-success/10 border border-success/20">
          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4 text-success animate-pulse" />
            <span className="text-sm font-medium text-success">Online</span>
          </div>
        </div>
      </div>
    </div>
  );
};