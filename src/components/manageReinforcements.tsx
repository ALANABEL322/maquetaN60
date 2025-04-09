import { useCreateProjectStore } from "@/store/createProject/createProjectStore";
import { Member } from "@/types/typesTask";
import { useState } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Plus, Users } from "lucide-react";

export default function ManageReinforcements() {
  const { reinforcements, addReinforcement, removeReinforcement } =
    useCreateProjectStore();
  const [isAdding, setIsAdding] = useState(false);
  const [newMember, setNewMember] = useState<Omit<Member, "id">>({
    firstName: "",
    lastName: "",
    email: "",
    photo: "https://i.pravatar.cc/300?img=69", // Imagen por defecto
  });

  const handleAdd = () => {
    if (!newMember.firstName || !newMember.lastName || !newMember.email) {
      toast.error("Todos los campos son requeridos");
      return;
    }

    addReinforcement(newMember);
    setNewMember({
      firstName: "",
      lastName: "",
      email: "",
      photo: "https://i.pravatar.cc/300?img=69",
    });
    setIsAdding(false);
    toast.success("Miembro de refuerzo añadido");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Users className="h-4 w-4" />
          <span>Miembros ({reinforcements.length}/10)</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Gestión de Miembros de Refuerzo</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-medium">Miembros de Refuerzo</h3>
            <Button
              size="sm"
              onClick={() => setIsAdding(!isAdding)}
              disabled={reinforcements.length >= 10}
            >
              <Plus className="h-4 w-4 mr-2" />
              Añadir Refuerzo
            </Button>
          </div>

          {isAdding && (
            <div className="space-y-3 p-4 border rounded-lg">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Nombre
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    value={newMember.firstName}
                    onChange={(e) =>
                      setNewMember({ ...newMember, firstName: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Apellido
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    value={newMember.lastName}
                    onChange={(e) =>
                      setNewMember({ ...newMember, lastName: e.target.value })
                    }
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  className="w-full p-2 border rounded"
                  value={newMember.email}
                  onChange={(e) =>
                    setNewMember({ ...newMember, email: e.target.value })
                  }
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <Button variant="outline" onClick={() => setIsAdding(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleAdd}>Añadir</Button>
              </div>
            </div>
          )}

          <div className="space-y-2">
            {reinforcements.length === 0 ? (
              <p className="text-muted-foreground text-center py-4">
                No hay miembros de refuerzo añadidos
              </p>
            ) : (
              reinforcements.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={member.photo}
                      alt={`${member.firstName} ${member.lastName}`}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium">
                        {member.firstName} {member.lastName}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {member.email}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => removeReinforcement(member.id)}
                  >
                    Eliminar
                  </Button>
                </div>
              ))
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
