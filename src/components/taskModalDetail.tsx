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
import { CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Task } from "@/store/taskStore/taskStore";

interface TaskDetailsModalProps {
  task: Task;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedTask: {
    name: string;
    startDate: string;
    endDate: string;
    description: string;
    comments: string;
  }) => void;
}

export function TaskDetailsModal({
  task,
  isOpen,
  onClose,
  onSave,
}: TaskDetailsModalProps) {
  // Función para convertir Date a string YYYY-MM-DD
  const toDateOnlyString = (date: Date | undefined): string => {
    if (!date) return "";
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Función para formatear la visualización
  const formatDateDisplay = (date: Date | undefined): string => {
    if (!date || isNaN(date.getTime())) return "Selecciona una fecha";
    return new Intl.DateTimeFormat("es-ES", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  };
  const [name, setName] = useState(task.name);

  //   const [startDate, setStartDate] = useState<Date | undefined>(
  //     task.registrationDate ? new Date(task.registrationDate) : undefined
  //   );

  //   const [endDate, setEndDate] = useState<Date | undefined>(
  //     task.deadline ? new Date(task.deadline) : undefined
  //   );
  // Cambia la inicialización de los estados para manejar solo fechas
  const [startDate, setStartDate] = useState<Date | undefined>(() => {
    if (!task.registrationDate) return undefined;

    // Asume que task.registrationDate está en formato YYYY-MM-DD
    const [year, month, day] = task.registrationDate.split("-");
    const date = new Date(Number(year), Number(month) - 1, Number(day));
    return isNaN(date.getTime()) ? undefined : date;
  });

  const [endDate, setEndDate] = useState<Date | undefined>(() => {
    if (!task.deadline) return undefined;

    // Asume que task.deadline está en formato YYYY-MM-DD
    const [year, month, day] = task.deadline.split("-");
    const date = new Date(Number(year), Number(month) - 1, Number(day));
    return isNaN(date.getTime()) ? undefined : date;
  });

  const [description, setDescription] = useState(task.description || "");
  const [comments, setComments] = useState("");

  const handleSubmit = () => {
    onSave({
      name,
      startDate: toDateOnlyString(startDate),
      endDate: toDateOnlyString(endDate),
      description,
      comments,
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
            <label htmlFor="comments" className="text-right mt-2">
              Comentarios
            </label>
            <Textarea
              id="comments"
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              className="col-span-3"
              rows={3}
            />
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit}>Guardar</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
