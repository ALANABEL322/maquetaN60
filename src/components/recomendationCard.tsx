import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTaskStore } from "@/store/taskStore/taskStore";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

interface RecommendationCardProps {
  recommendation: {
    appliedAt?: string | number | Date;
    id: string;
    title: string;
    description: string;
    type: "improvement" | "new-task" | "reallocation";
    action?:
      | "assign-members"
      | "complete-fields"
      | "review-overdue"
      | "general-tip";
    priority?: "alta" | "medio" | "baja";
    relatedTasks?: string[];
    applied?: boolean;
  };
  projectId: string;
  onClose: () => void;
}

export function RecommendationCard({
  recommendation,
  projectId,
  onClose,
}: RecommendationCardProps) {
  const navigate = useNavigate();
  const { markRecommendationAsApplied } = useTaskStore();

  const handleApplyRecommendation = () => {
    markRecommendationAsApplied(projectId, recommendation.id);

    navigate(`/user/tareas/${projectId}`, {
      state: {
        focus: recommendation.action,
        taskIds: recommendation.relatedTasks,
      },
    });

    onClose();
  };

  const getButtonText = () => {
    if (recommendation.applied) return "✓ Aplicada";

    switch (recommendation.action) {
      case "assign-members":
        return "Asignar miembros";
      case "complete-fields":
        return "Completar información";
      case "review-overdue":
        return "Revisar tareas";
      default:
        return "Aplicar recomendación";
    }
  };

  const getPriorityBadge = () => {
    switch (recommendation.priority) {
      case "alta":
        return <Badge variant="destructive">Alta prioridad</Badge>;
      case "medio":
        return <Badge variant="secondary">Media prioridad</Badge>;
      default:
        return <Badge variant="outline">Baja prioridad</Badge>;
    }
  };

  return (
    <Card className={recommendation.applied ? "opacity-80 bg-gray-50" : ""}>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{recommendation.title}</CardTitle>
          {getPriorityBadge()}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          {recommendation.description}
        </p>

        <div className="flex justify-between items-center">
          {recommendation.applied && (
            <span className="text-xs text-green-600">
              Aplicada el{" "}
              {new Date(
                recommendation.appliedAt || new Date()
              ).toLocaleDateString()}{" "}
            </span>
          )}

          <Button
            size="sm"
            onClick={handleApplyRecommendation}
            disabled={recommendation.applied}
            variant={recommendation.applied ? "ghost" : "default"}
          >
            {getButtonText()}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
