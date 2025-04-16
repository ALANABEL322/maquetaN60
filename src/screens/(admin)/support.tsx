import { useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSupportStore } from "@/store/support/supportStore";
import { useAuthStore } from "@/store/authStore";
import { toast } from "sonner";

export default function AdminSupportPage() {
  const { user: admin } = useAuthStore();
  const [activeTab, setActiveTab] = useState<"open" | "closed">("open");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTicketId, setCurrentTicketId] = useState<string | null>(null);
  const [response, setResponse] = useState("");

  const { tickets, respondToTicket, clearClosedTickets } = useSupportStore();

  const filteredTickets = tickets.filter((ticket) =>
    activeTab === "open" ? ticket.status === "open" : ticket.status === "closed"
  );

  const ticketsPerPage = 10;
  const totalPages = Math.ceil(filteredTickets.length / ticketsPerPage);
  const paginatedTickets = filteredTickets.slice(
    (currentPage - 1) * ticketsPerPage,
    currentPage * ticketsPerPage
  );

  const handleTabChange = (tab: "open" | "closed") => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleOpenModal = (ticketId: string) => {
    setCurrentTicketId(ticketId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentTicketId(null);
    setResponse("");
  };

  const handleSubmitResponse = () => {
    if (currentTicketId && admin) {
      console.log("Enviando respuesta...", {
        ticketId: currentTicketId,
        response,
        adminId: String(admin.id),
        adminName: admin.username,
        adminEmail: admin.email
      });
      
      respondToTicket(
        currentTicketId,
        response,
        String(admin.id),
        admin.username,
        admin.email
      );
      handleCloseModal();
    }
  };

  const handleClearClosedTickets = () => {
    toast(
      <div className="flex flex-col gap-2">
        <h3 className="font-semibold">¿Eliminar todos los tickets cerrados?</h3>
        <p className="text-sm">
          Se eliminarán {tickets.filter((t) => t.status === "closed").length}{" "}
          tickets
        </p>
        <div className="flex gap-2 justify-end mt-2">
          <Button variant="outline" size="sm" onClick={() => toast.dismiss()}>
            Cancelar
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => {
              clearClosedTickets();
              toast.success("Tickets cerrados eliminados");
              toast.dismiss();
            }}
          >
            Eliminar todos
          </Button>
        </div>
      </div>,
      {
        duration: Infinity,
      }
    );
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-gray-900">Soporte</h1>
        <p className="text-sm text-gray-600">Gestión de tickets de soporte</p>
      </div>
      <div className="flex justify-end">
        <Button
          variant="outline"
          onClick={handleClearClosedTickets}
          disabled={!tickets.some((t) => t.status === "closed")}
        >
          Limpiar tickets cerrados
        </Button>
      </div>
      <div className="border-b border-gray-200">
        <div className="flex space-x-8">
          <button
            className={`py-2 px-1 text-sm font-medium ${
              activeTab === "open"
                ? "text-red-500 border-b-2 border-red-500"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => handleTabChange("open")}
          >
            Tickets Abiertos
          </button>
          <button
            className={`py-2 px-1 text-sm font-medium ${
              activeTab === "closed"
                ? "text-red-500 border-b-2 border-red-500"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => handleTabChange("closed")}
          >
            Tickets Cerrados
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {paginatedTickets.length === 0 ? (
          <p className="text-sm text-gray-500">
            No hay tickets {activeTab === "open" ? "abiertos" : "cerrados"}
          </p>
        ) : (
          paginatedTickets.map((ticket) => (
            <div
              key={ticket.id}
              className="bg-white rounded-lg border border-gray-200 p-6 space-y-4"
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback>
                      {ticket.userName.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {ticket.userName}
                    </h3>
                    <p className="text-xs text-gray-500">{ticket.userEmail}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
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
                  <span
                    className={`inline-block px-2 py-1 text-xs rounded-full ${
                      ticket.status === "open"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {ticket.status}
                  </span>
                </div>
              </div>

              <div className="space-y-1">
                <h4 className="font-medium text-sm">
                  Asunto: {ticket.subject}
                </h4>
                <p className="text-sm text-gray-600">{ticket.description}</p>
              </div>

              {ticket.response && (
                <div className="space-y-3">
                  <h4 className="font-medium text-sm">
                    Respuesta proporcionada por {ticket.adminName} (
                    {ticket.adminEmail})
                  </h4>
                  <div className="flex space-x-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-md flex items-center justify-center text-sm font-medium text-gray-500">
                      1
                    </div>
                    <p className="text-sm text-gray-600">{ticket.response}</p>
                  </div>
                </div>
              )}

              {activeTab === "open" && (
                <div className="flex justify-end">
                  <Button
                    className="bg-[#2c4c6b] hover:bg-[#243e59]"
                    onClick={() => handleOpenModal(ticket.id)}
                  >
                    Responder
                  </Button>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {filteredTickets.length > 0 && (
        <div className="flex items-center justify-between text-sm">
          <div className="text-gray-500">
            Mostrando {paginatedTickets.length} de {filteredTickets.length}
          </div>
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              aria-label="Previous page"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const pageNumber = i + 1;
              return (
                <Button
                  key={pageNumber}
                  variant={currentPage === pageNumber ? "default" : "ghost"}
                  size="icon"
                  className={`w-8 h-8 ${
                    currentPage === pageNumber
                      ? "bg-red-500 hover:bg-red-600"
                      : ""
                  }`}
                  onClick={() => handlePageChange(pageNumber)}
                  aria-label={`Page ${pageNumber}`}
                >
                  {pageNumber}
                </Button>
              );
            })}

            {totalPages > 5 && (
              <>
                <span className="px-2">...</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-8 h-8"
                  onClick={() => handlePageChange(totalPages)}
                  aria-label={`Page ${totalPages}`}
                >
                  {totalPages}
                </Button>
              </>
            )}

            <Button
              variant="ghost"
              size="icon"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              aria-label="Next page"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Responder ticket</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="response" className="text-sm font-medium">
                Respuesta
              </label>
              <Textarea
                id="response"
                placeholder="Escribe tu respuesta aquí"
                value={response}
                onChange={(e) => setResponse(e.target.value)}
                rows={4}
                required
              />
            </div>
          </div>
          <DialogFooter className="sm:justify-between">
            <Button type="button" variant="outline" onClick={handleCloseModal}>
              Cancelar
            </Button>
            <Button
              type="button"
              className="bg-[#2c4c6b] hover:bg-[#243e59]"
              onClick={handleSubmitResponse}
              disabled={!response.trim()}
            >
              Responder
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
