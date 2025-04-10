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
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  // Validaciones
  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validateName = (name: string) => {
    return (
      name.trim().length >= 2 &&
      /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s'-]+$/.test(name) &&
      name.trim().length <= 50
    );
  };

  const validateForm = () => {
    const newErrors = {
      firstName: "",
      lastName: "",
      email: "",
    };
    let isValid = true;

    // Validar nombre
    if (!newMember.firstName.trim()) {
      newErrors.firstName = "El nombre es requerido";
      isValid = false;
    } else if (!validateName(newMember.firstName)) {
      newErrors.firstName =
        "Nombre inválido (solo letras, espacios y apóstrofes, 2-50 caracteres)";
      isValid = false;
    }

    // Validar apellido
    if (!newMember.lastName.trim()) {
      newErrors.lastName = "El apellido es requerido";
      isValid = false;
    } else if (!validateName(newMember.lastName)) {
      newErrors.lastName =
        "Apellido inválido (solo letras, espacios y apóstrofes, 2-50 caracteres)";
      isValid = false;
    }

    // Validar email
    if (!newMember.email.trim()) {
      newErrors.email = "El email es requerido";
      isValid = false;
    } else if (!validateEmail(newMember.email)) {
      newErrors.email = "Email inválido (formato: usuario@dominio.com)";
      isValid = false;
    } else if (newMember.email.length > 100) {
      newErrors.email = "El email no puede exceder los 100 caracteres";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleAdd = () => {
    if (!validateForm()) {
      return;
    }

    // Verificar si el email ya existe
    const emailExists = reinforcements.some(
      (member) => member.email.toLowerCase() === newMember.email.toLowerCase()
    );

    if (emailExists) {
      toast.error("Este email ya está registrado");
      setErrors({
        ...errors,
        email: "Este email ya está registrado",
      });
      return;
    }

    addReinforcement(newMember);
    setNewMember({
      firstName: "",
      lastName: "",
      email: "",
      photo: "https://i.pravatar.cc/300?img=69",
    });
    setErrors({ firstName: "", lastName: "", email: "" });
    setIsAdding(false);
    toast.success("Miembro de refuerzo añadido correctamente");
  };

  const handleInputChange = (field: keyof typeof newMember, value: string) => {
    setNewMember({
      ...newMember,
      [field]: value,
    });
    // Limpiar error cuando el usuario escribe
    if (errors[field as keyof typeof errors]) {
      setErrors({
        ...errors,
        [field]: "",
      });
    }
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
              onClick={() => {
                setIsAdding(!isAdding);
                setErrors({ firstName: "", lastName: "", email: "" });
              }}
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
                    Nombre *
                  </label>
                  <input
                    type="text"
                    className={`w-full p-2 border rounded ${
                      errors.firstName ? "border-red-500" : "border-gray-300"
                    } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    value={newMember.firstName}
                    onChange={(e) =>
                      handleInputChange("firstName", e.target.value)
                    }
                    placeholder="Ej: Juan"
                    maxLength={50}
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.firstName}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Apellido *
                  </label>
                  <input
                    type="text"
                    className={`w-full p-2 border rounded ${
                      errors.lastName ? "border-red-500" : "border-gray-300"
                    } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    value={newMember.lastName}
                    onChange={(e) =>
                      handleInputChange("lastName", e.target.value)
                    }
                    placeholder="Ej: Pérez"
                    maxLength={50}
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.lastName}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  className={`w-full p-2 border rounded ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  value={newMember.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="Ej: ejemplo@correo.com"
                  maxLength={100}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsAdding(false);
                    setErrors({ firstName: "", lastName: "", email: "" });
                  }}
                >
                  Cancelar
                </Button>
                <Button onClick={handleAdd}>Añadir Miembro</Button>
              </div>
            </div>
          )}

          <div className="space-y-2 max-h-[400px] overflow-y-auto">
            {reinforcements.length === 0 ? (
              <p className="text-muted-foreground text-center py-4">
                No hay miembros de refuerzo añadidos
              </p>
            ) : (
              reinforcements.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={member.photo}
                      alt={`${member.firstName} ${member.lastName}`}
                      className="w-10 h-10 rounded-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.src = "https://i.pravatar.cc/300?img=0";
                      }}
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
