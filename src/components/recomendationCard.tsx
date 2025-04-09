// Crea un nuevo archivo RecommendationCard.tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTaskStore } from "@/store/taskStore/taskStore";

interface RecommendationCardProps {
  recommendation: {
    id: string;
    title: string;
    description: string;
    type: "improvement" | "new-task" | "reallocation";
  };
  projectId: string;
  onClose: () => void;
}

export function RecommendationCard({
  recommendation,
  projectId,
  onClose,
}: RecommendationCardProps) {
  const { addTask } = useTaskStore();

  const handleApplyRecommendation = () => {
    addTask({
      projectId,
      name: recommendation.title,
      description: recommendation.description,
      registrationDate: new Date().toLocaleDateString("es-ES"),
      deadline: new Date(
        Date.now() + 7 * 24 * 60 * 60 * 1000
      ).toLocaleDateString("es-ES"),
      priority: "Media",
      status: "por-hacer",
      assignedMembers: [],
    });

    onClose();
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">{recommendation.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          {recommendation.description}
        </p>
        <div className="flex justify-end">
          <Button size="sm" onClick={handleApplyRecommendation}>
            Aplicar recomendación
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
