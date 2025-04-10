// components/user/UserSupportPage.tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSupportStore } from "@/store/support/supportStore";
import { useAuthStore } from "@/store/authStore";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

export default function UserSupportPage() {
  const { user } = useAuthStore();
  const [newTicket, setNewTicket] = useState({
    subject: "",
    description: "",
    priority: "medio" as "baja" | "medio" | "alto",
  });

  const { tickets, addTicket, deleteTicket } = useSupportStore();

  // Filtrar tickets del usuario actual
  const userTickets = tickets.filter((ticket) => ticket.userId === user?.id);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    addTicket({
      userId: String(user.id),
      userEmail: user.email,
      userName: user.username,
      subject: newTicket.subject,
      description: newTicket.description,
      priority: newTicket.priority,
    });

    setNewTicket({
      subject: "",
      description: "",
      priority: "medio",
    });
  };

  const handleDeleteTicket = (ticketId: string) => {
    toast.custom((t) => (
      <div className="bg-[#FCEAE8]  p-4 rounded-lg shadow-lg border">
        <div className="flex flex-col gap-2">
          <p>¿Estás seguro de eliminar este ticket?</p>
          <div className="flex justify-end gap-2 mt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => toast.dismiss(t)}
            >
              Cancelar
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => {
                deleteTicket(ticketId);
                toast.dismiss(t);
                toast.success("Ticket eliminado");
              }}
            >
              Confirmar
            </Button>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div className="container mx-auto py-10">
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Crear Nuevo Ticket de Soporte</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="subject">Asunto</Label>
                <Input
                  id="subject"
                  value={newTicket.subject}
                  onChange={(e) =>
                    setNewTicket((prev) => ({
                      ...prev,
                      subject: e.target.value,
                    }))
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="priority">Prioridad</Label>
                <Select
                  value={newTicket.priority}
                  onValueChange={(value: "baja" | "medio" | "alto") =>
                    setNewTicket((prev) => ({ ...prev, priority: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona la prioridad" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="baja">Baja</SelectItem>
                    <SelectItem value="media">Media</SelectItem>
                    <SelectItem value="alta">Alta</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descripción</Label>
                <Textarea
                  id="description"
                  value={newTicket.description}
                  onChange={(e) =>
                    setNewTicket((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  className="min-h-[100px]"
                  required
                />
              </div>

              <Button type="submit" className="w-full">
                Enviar Ticket
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Mis Tickets</h2>
          {userTickets.length === 0 ? (
            <p className="text-sm text-gray-500">No hay tickets creados</p>
          ) : (
            userTickets.map((ticket) => (
              <Card key={ticket.id}>
                <CardHeader className="flex flex-row justify-between items-start">
                  <CardTitle className="text-lg">{ticket.subject}</CardTitle>
                  <button
                    onClick={() => handleDeleteTicket(ticket.id)}
                    className="text-gray-500 hover:text-red-500 transition-colors"
                    aria-label="Eliminar ticket"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <div>
                        <p className="text-sm text-gray-500">
                          Estado:{" "}
                          <span
                            className={`inline-block px-2 py-1 text-xs rounded-full ${
                              ticket.status === "open"
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {ticket.status}
                          </span>
                        </p>
                        <p className="text-sm text-gray-500 mt-4">
                          Prioridad:{" "}
                          <span
                            className={`inline-block px-2 py-1 text-xs rounded-full ${
                              ticket.priority === "alto"
                                ? "bg-red-100 text-red-800"
                                : ticket.priority === "medio"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {ticket.priority}
                          </span>
                        </p>
                      </div>
                      <p className="text-sm text-gray-500">
                        Creado:{" "}
                        {new Date(ticket.createdAt).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <p className="text-sm font-medium">Tu mensaje:</p>
                      <p className="text-sm text-gray-600">
                        {ticket.description}
                      </p>
                    </div>

                    {ticket.response && (
                      <div className="bg-gray-50 p-4 rounded-md">
                        <p className="text-sm font-medium">
                          Respuesta de {ticket.adminName} ({ticket.adminEmail}):
                        </p>
                        <p className="text-sm text-gray-600">
                          {ticket.response}
                        </p>
                        <p className="text-xs text-gray-500 mt-2">
                          Actualizado:{" "}
                          {new Date(ticket.updatedAt).toLocaleDateString()}
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
