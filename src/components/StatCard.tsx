import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export const StatCard = ({ 
  title, 
  value, 
  description, 
  icon: Icon, 
  trend,
  className 
}: StatCardProps) => {
  return (
    <Card className={cn("gradient-card border-border shadow-soft transition-smooth hover:shadow-medium", className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              {title}
            </p>
            <div className="space-y-1">
              <p className="text-3xl font-bold text-foreground">
                {value}
              </p>
              {description && (
                <p className="text-sm text-muted-foreground">
                  {description}
                </p>
              )}
              {trend && (
                <div className="flex items-center gap-1">
                  <span className={cn(
                    "text-sm font-medium",
                    trend.isPositive ? "text-success" : "text-destructive"
                  )}>
                    {trend.isPositive ? "+" : ""}{trend.value}%
                  </span>
                  <span className="text-sm text-muted-foreground">
                    vs. mês anterior
                  </span>
                </div>
              )}
            </div>
          </div>
          <div className={cn(
            "flex h-12 w-12 items-center justify-center rounded-lg",
            "bg-primary/10 text-primary"
          )}>
            <Icon className="h-6 w-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};