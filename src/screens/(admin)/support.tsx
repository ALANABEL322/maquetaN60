import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface Ticket {
  id: number
  userName: string
  userRole: string
  query: string
  response: string
  responseNumber: number
}

export default function Support() {
  const [activeTab, setActiveTab] = useState<"todas" | "solucionado">("todas")
  const [currentPage, setCurrentPage] = useState(1)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentTicketId, setCurrentTicketId] = useState<number | null>(null)
  const [supportName, setSupportName] = useState("Diseñador gráfico")
  const [solution, setSolution] = useState("")

  const tickets: Ticket[] = [
    {
      id: 1,
      userName: "Nombre del Usuario",
      userRole: "Rol del usuario",
      query:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
      response:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
      responseNumber: 1,
    },
    {
      id: 2,
      userName: "Nombre del Usuario",
      userRole: "Rol del usuario",
      query:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
      response:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
      responseNumber: 1,
    },
  ]

  const handleTabChange = (tab: "todas" | "solucionado") => {
    setActiveTab(tab)
    setCurrentPage(1)
  }

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= 40) {
      setCurrentPage(page)
    }
  }

  const handleOpenModal = (ticketId: number) => {
    setCurrentTicketId(ticketId)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setCurrentTicketId(null)
    setSolution("")
  }

  const handleSubmitResponse = () => {
    // Here you would typically send the response to your backend
    console.log("Submitting response for ticket:", currentTicketId)
    console.log("Support name:", supportName)
    console.log("Solution:", solution)

    // Close the modal after submission
    handleCloseModal()
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-gray-900">Soporte</h1>
        <p className="text-sm text-gray-600">Aquí se pueden visualizar tus datos</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <div className="flex space-x-8">
          <button
            className={`py-2 px-1 text-sm font-medium ${
              activeTab === "todas" ? "text-red-500 border-b-2 border-red-500" : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => handleTabChange("todas")}
          >
            Todas
          </button>
          <button
            className={`py-2 px-1 text-sm font-medium ${
              activeTab === "solucionado"
                ? "text-red-500 border-b-2 border-red-500"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => handleTabChange("solucionado")}
          >
            Solucionado
          </button>
        </div>
      </div>

      {/* Tickets List */}
      <div className="space-y-4">
        {tickets.map((ticket) => (
          <div key={ticket.id} className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
            <div className="flex items-center space-x-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src="/placeholder.svg?height=40&width=40" alt={ticket.userName} />
                <AvatarFallback>NU</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium text-gray-900">{ticket.userName}</h3>
                <p className="text-xs text-gray-500">{ticket.userRole}</p>
              </div>
            </div>

            <div className="space-y-1">
              <h4 className="font-medium text-sm">Consulta del usuario</h4>
              <p className="text-sm text-gray-600">{ticket.query}</p>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium text-sm">Respuesta proporcionada</h4>
              <div className="flex space-x-3">
                <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-md flex items-center justify-center text-sm font-medium text-gray-500">
                  {ticket.responseNumber}
                </div>
                <p className="text-sm text-gray-600">{ticket.response}</p>
              </div>
            </div>

            {activeTab !== "todas" && (
              <div className="flex justify-end">
                <Button className="bg-[#2c4c6b] hover:bg-[#243e59]" onClick={() => handleOpenModal(ticket.id)}>
                  Responder
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between text-sm">
        <div className="text-gray-500">Mostrando 10 de 100</div>
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

          <Button
            variant="default"
            size="icon"
            className="w-8 h-8 bg-red-500 hover:bg-red-600"
            aria-label="Page 1"
            aria-current={currentPage === 1 ? "page" : undefined}
          >
            1
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="w-8 h-8"
            onClick={() => handlePageChange(2)}
            aria-label="Page 2"
          >
            2
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="w-8 h-8"
            onClick={() => handlePageChange(3)}
            aria-label="Page 3"
          >
            3
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="w-8 h-8"
            onClick={() => handlePageChange(4)}
            aria-label="Page 4"
          >
            4
          </Button>

          <span className="px-2">...</span>

          <Button
            variant="ghost"
            size="icon"
            className="w-8 h-8"
            onClick={() => handlePageChange(40)}
            aria-label="Page 40"
          >
            40
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === 40}
            aria-label="Next page"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Response Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Responder incidencia</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="supportName" className="text-sm font-medium">
                Nombre soporte
              </label>
              <Input id="supportName" value={supportName} onChange={(e) => setSupportName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <label htmlFor="solution" className="text-sm font-medium">
                Solución
              </label>
              <Textarea
                id="solution"
                placeholder="Escribe algo"
                value={solution}
                onChange={(e) => setSolution(e.target.value)}
                rows={4}
              />
            </div>
          </div>
          <DialogFooter className="sm:justify-between">
            <Button type="button" variant="outline" onClick={handleCloseModal}>
              Cancelar
            </Button>
            <Button type="button" className="bg-[#2c4c6b] hover:bg-[#243e59]" onClick={handleSubmitResponse}>
              Responder
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}