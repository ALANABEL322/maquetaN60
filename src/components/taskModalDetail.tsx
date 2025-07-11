import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CalendarIcon, Trash2 } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useTaskStore } from "@/store/taskStore/taskStore";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useAuthStore } from "@/store/authStore";
import { Task, Member, Comment } from "@/types/typesTask";

interface TaskDetailsModalProps {
  task: Task;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedTask: {
    name: string;
    startDate: string;
    endDate: string;
    description: string;
    comments: Comment[];
  }) => void;
  currentMemberId?: string;
  teamMembers: Member[];
}

export function TaskDetailsModal({
  task,
  isOpen,
  onClose,
  onSave,
  teamMembers,
}: TaskDetailsModalProps) {
  const currentUser = useAuthStore((state) => state.currentUser);
  console.log({ currentUser });

  const { removeComment, addComment } = useTaskStore();

  const toDateOnlyString = (date: Date | undefined): string => {
    if (!date) return "";
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const formatDateDisplay = (date: Date | undefined): string => {
    if (!date || isNaN(date.getTime())) return "Selecciona una fecha";
    return new Intl.DateTimeFormat("es-ES", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  };

  const [name, setName] = useState(task.name);
  const [startDate, setStartDate] = useState<Date | undefined>(() => {
    if (!task.registrationDate) return undefined;
    const [year, month, day] = task.registrationDate.split("-");
    const date = new Date(Number(year), Number(month) - 1, Number(day));
    return isNaN(date.getTime()) ? undefined : date;
  });

  const [endDate, setEndDate] = useState<Date | undefined>(() => {
    if (!task.deadline) return undefined;
    const [year, month, day] = task.deadline.split("-");
    const date = new Date(Number(year), Number(month) - 1, Number(day));
    return isNaN(date.getTime()) ? undefined : date;
  });

  const [description, setDescription] = useState(task.description || "");
  const [memberComments, setMemberComments] = useState<Record<string, string>>(
    () => {
      const initialComments: Record<string, string> = {};
      task.assignedMembers.forEach((memberId: string | number) => {
        initialComments[memberId] = "";
      });
      return initialComments;
    }
  );
  const [comments, _setComments] = useState<Comment[]>(task.comments || []);

  const assignedMembers = teamMembers
    .filter((member) => task.assignedMembers.includes(member.id))
    .slice(0, 5);

  const handleMemberCommentChange = (memberId: string, value: string) => {
    setMemberComments((prev) => ({
      ...prev,
      [memberId]: value,
    }));
  };

  const handleDeleteComment = (commentId: string) => {
    const updatedComments = comments.filter(
      (comment) => comment.id !== commentId
    );
    _setComments(updatedComments);
    removeComment(task.id, commentId);
  };

  const handleSubmit = () => {
    Object.entries(memberComments)
      .filter(([_, content]) => content.trim() !== "")
      .forEach(([memberId, content]) => {
        const existingCount = comments.filter(
          (c) => c.memberId === memberId
        ).length;
        if (existingCount < 3) {
          const newComment = {
            id: Date.now().toString() + memberId,
            memberId,
            content,
            createdAt: new Date().toISOString(),
          };
          addComment(task.id, newComment);
          _setComments((prev) => [...prev, newComment]);
        }
      });

    onSave({
      name,
      startDate: toDateOnlyString(startDate),
      endDate: toDateOnlyString(endDate),
      description,
      comments: [
        ...comments,
        ...Object.entries(memberComments)
          .filter(([_, content]) => content.trim() !== "")
          .map(([memberId, content]) => ({
            id: Date.now().toString() + memberId,
            memberId,
            content,
            createdAt: new Date().toISOString(),
          }))
          .filter((_, index, arr) => {
            const memberId = arr[index].memberId;
            return arr.filter((c) => c.memberId === memberId).length <= 3;
          }),
      ],
    });

    setMemberComments((prev) => {
      const newState = { ...prev };
      Object.keys(newState).forEach((key) => {
        newState[key] = "";
      });
      return newState;
    });

    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[550px] max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Editar detalles de la tarea</DialogTitle>
        </DialogHeader>

        <div className="grid gap-3 py-2">
          {/* Título */}
          <div className="grid grid-cols-4 items-center gap-3">
            <label htmlFor="name" className="text-right text-sm">
              Título
            </label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="col-span-3 h-8"
            />
          </div>

          {/* Fechas en una fila */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs text-muted-foreground">
                Fecha inicio
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal h-8 text-xs",
                      !startDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-3 w-3" />
                    {startDate ? formatDateDisplay(startDate) : "Seleccionar"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-1">
              <label className="text-xs text-muted-foreground">Fecha fin</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal h-8 text-xs",
                      !endDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-3 w-3" />
                    {endDate ? formatDateDisplay(endDate) : "Seleccionar"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Descripción */}
          <div className="space-y-1">
            <label
              htmlFor="description"
              className="text-xs text-muted-foreground"
            >
              Descripción
            </label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="text-sm"
              rows={2}
            />
          </div>

          {/* Miembros asignados */}
          {assignedMembers.length > 0 && (
            <div className="space-y-2">
              <label className="text-xs text-muted-foreground">
                Miembros asignados
              </label>
              <div className="flex flex-wrap gap-2">
                {assignedMembers.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center gap-2 bg-gray-50 rounded-full px-2 py-1"
                  >
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={member.photo} />
                      <AvatarFallback className="text-xs">
                        {member.firstName.charAt(0)}
                        {member.lastName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-xs">{member.firstName}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Comentarios existentes */}
          {comments.length > 0 && (
            <div className="space-y-2">
              <label className="text-xs text-muted-foreground">
                Comentarios existentes
              </label>
              <div className="border rounded-md p-2 max-h-24 overflow-y-auto bg-gray-50">
                <div className="space-y-2">
                  {comments.map((comment) => {
                    const commentAuthor = teamMembers.find(
                      (m) => m.id === comment.memberId
                    );
                    return (
                      <div
                        key={comment.id}
                        className="p-2 border rounded bg-white relative group text-xs"
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <Avatar className="h-4 w-4">
                            <AvatarImage src={commentAuthor?.photo} />
                            <AvatarFallback className="text-xs">
                              {commentAuthor?.firstName.charAt(0)}
                              {commentAuthor?.lastName.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-medium text-xs">
                            {commentAuthor?.firstName || "Usuario"}:
                          </span>
                        </div>
                        <p className="text-xs text-gray-700">
                          {comment.content}
                        </p>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity h-4 w-4 p-0"
                          onClick={() => handleDeleteComment(comment.id)}
                        >
                          <Trash2 className="h-3 w-3 text-red-500" />
                        </Button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Nuevos comentarios */}
          {assignedMembers.length > 0 && (
            <div className="space-y-2">
              <label className="text-xs text-muted-foreground">
                Agregar comentarios
              </label>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {assignedMembers.map((member) => {
                  const memberCommentCount = comments.filter(
                    (c) => c.memberId === member.id
                  ).length;
                  const isLimitReached = memberCommentCount >= 3;

                  return (
                    <div key={member.id} className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-4 w-4">
                          <AvatarImage src={member.photo} />
                          <AvatarFallback className="text-xs">
                            {member.firstName.charAt(0)}
                            {member.lastName.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <label className="text-xs font-medium">
                          {member.firstName}:
                        </label>
                      </div>
                      <Textarea
                        value={memberComments[member.id] || ""}
                        onChange={(e) =>
                          handleMemberCommentChange(member.id, e.target.value)
                        }
                        placeholder={
                          isLimitReached
                            ? `Límite alcanzado (${memberCommentCount}/3)`
                            : `Comentario para ${member.firstName}...`
                        }
                        rows={1}
                        disabled={isLimitReached}
                        className={cn(
                          "text-xs",
                          isLimitReached ? "opacity-50 cursor-not-allowed" : ""
                        )}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-2 mt-3">
          <Button variant="outline" onClick={onClose} size="sm">
            Cancelar
          </Button>
          <Button onClick={handleSubmit} size="sm">
            Guardar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
