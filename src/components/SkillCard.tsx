import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface SkillCardProps {
  icon: LucideIcon;
  title: string;
  description?: string;
}

export const SkillCard = ({ icon: Icon, title, description }: SkillCardProps) => {
  return (
    <Card className="group hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 cursor-pointer border-border">
      <CardContent className="p-6 flex flex-col items-center text-center space-y-3">
        <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
          <Icon className="h-8 w-8 text-primary" />
        </div>
        <h3 className="font-semibold text-foreground">{title}</h3>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </CardContent>
    </Card>
  );
};
