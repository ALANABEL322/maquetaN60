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
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Editar detalles de la tarea</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="name" className="text-right">
              Título
            </label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <label className="text-right">Fecha de inicio</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "col-span-3 justify-start text-left font-normal",
                    !startDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formatDateDisplay(startDate)}
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

          <div className="grid grid-cols-4 items-center gap-4">
            <label className="text-right">Fecha de fin</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "col-span-3 justify-start text-left font-normal",
                    !endDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formatDateDisplay(endDate)}
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

          <div className="grid grid-cols-4 items-start gap-4">
            <label htmlFor="description" className="text-right mt-2">
              Descripción
            </label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="col-span-3"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-4 items-start gap-4">
            <div className="text-right mt-2 space-y-4">
              <label htmlFor="comments">Miembros</label>
              <div className="flex flex-col items-center space-y-2">
                {assignedMembers.map((member) => (
                  <div key={member.id} className="flex flex-col items-center">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={member.photo} />
                      <AvatarFallback>
                        {member.firstName.charAt(0)}
                        {member.lastName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-xs text-center mt-1">
                      {member.firstName}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="col-span-3 space-y-4">
              {/* Sección de comentarios existentes con scroll */}
              <div className="border rounded p-2 max-h-40 overflow-y-auto">
                <h4 className="text-sm font-medium mb-2">
                  Comentarios existentes
                </h4>
                {comments.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    No hay comentarios aún
                  </p>
                ) : (
                  <div className="space-y-3">
                    {comments.map((comment) => {
                      const commentAuthor = teamMembers.find(
                        (m) => m.id === comment.memberId
                      );
                      return (
                        <div
                          key={comment.id}
                          className="p-2 border rounded bg-gray-50 relative group"
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={commentAuthor?.photo} />
                              <AvatarFallback>
                                {commentAuthor?.firstName.charAt(0)}
                                {commentAuthor?.lastName.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <p className="text-sm font-medium">
                              {commentAuthor?.firstName ||
                                "Usuario desconocido"}
                              :
                            </p>
                          </div>
                          <p className="text-sm">{comment.content}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {new Date(comment.createdAt).toLocaleString()}
                          </p>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => handleDeleteComment(comment.id)}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <h4 className="text-sm font-medium">Nuevos comentarios</h4>
                {assignedMembers.map((member) => {
                  const memberCommentCount = comments.filter(
                    (c) => c.memberId === member.id
                  ).length;
                  const isLimitReached = memberCommentCount >= 3;

                  return (
                    <div key={member.id} className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={member.photo} />
                          <AvatarFallback>
                            {member.firstName.charAt(0)}
                            {member.lastName.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <label className="text-sm font-medium">
                          Comentario para {member.firstName}:
                        </label>
                      </div>
                      <Textarea
                        value={memberComments[member.id] || ""}
                        onChange={(e) =>
                          handleMemberCommentChange(member.id, e.target.value)
                        }
                        placeholder={
                          isLimitReached
                            ? `Límite de 3 comentarios alcanzado`
                            : `Escribe un comentario para ${member.firstName}...`
                        }
                        rows={2}
                        disabled={isLimitReached}
                        className={
                          isLimitReached ? "opacity-50 cursor-not-allowed" : ""
                        }
                      />
                      {isLimitReached && (
                        <p className="text-xs text-muted-foreground">
                          Este miembro ya ha alcanzado el límite de 3
                          comentarios
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit}>Guardar cambios</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
