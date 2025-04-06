import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"

export default function CreateProject() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "",
    startDate: "",
    endDate: "",
    objectives: "",
    productOwner: "",
    scrumMaster: "",
    members: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // Here you would typically send the data to your backend
  }

  return (
    <Card className="max-w-3xl mx-auto">
      <CardContent className="pt-6">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">Crear Proyecto</h1>
          <p className="text-gray-600">Crea un nuevo proyecto</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium mb-1">
                Título
              </label>
              <Input
                id="title"
                placeholder="Lorem ipsum"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium mb-1">
                Descripción
              </label>
              <Textarea
                id="description"
                placeholder="Lorem ipsum"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            <div>
              <label htmlFor="priority" className="block text-sm font-medium mb-1">
                Prioridad
              </label>
              <Select
                value={formData.priority}
                onValueChange={(value) => setFormData({ ...formData, priority: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="alta">Alta</SelectItem>
                  <SelectItem value="media">Media</SelectItem>
                  <SelectItem value="baja">Baja</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Planificación de Sprint</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="startDate" className="block text-sm font-medium mb-1">
                  Inicio
                </label>
                <Select
                  value={formData.startDate}
                  onValueChange={(value) => setFormData({ ...formData, startDate: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2025-04-01">1 Abril 2025</SelectItem>
                    <SelectItem value="2025-04-15">15 Abril 2025</SelectItem>
                    <SelectItem value="2025-05-01">1 Mayo 2025</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label htmlFor="endDate" className="block text-sm font-medium mb-1">
                  Final
                </label>
                <Select
                  value={formData.endDate}
                  onValueChange={(value) => setFormData({ ...formData, endDate: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2025-04-15">15 Abril 2025</SelectItem>
                    <SelectItem value="2025-04-30">30 Abril 2025</SelectItem>
                    <SelectItem value="2025-05-15">15 Mayo 2025</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <label htmlFor="objectives" className="block text-sm font-medium mb-1">
                Objetivos
              </label>
              <Textarea
                id="objectives"
                placeholder="Lorem ipsum"
                value={formData.objectives}
                onChange={(e) => setFormData({ ...formData, objectives: e.target.value })}
              />
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Papeles</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="productOwner" className="block text-sm font-medium mb-1">
                  Propietario del producto
                </label>
                <Input
                  id="productOwner"
                  placeholder="Lorem ipsum"
                  value={formData.productOwner}
                  onChange={(e) => setFormData({ ...formData, productOwner: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="scrumMaster" className="block text-sm font-medium mb-1">
                  Master Scrum
                </label>
                <Input
                  id="scrumMaster"
                  placeholder="Lorem ipsum"
                  value={formData.scrumMaster}
                  onChange={(e) => setFormData({ ...formData, scrumMaster: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="members" className="block text-sm font-medium mb-1">
                  miembros
                </label>
                <Select
                  value={formData.members}
                  onValueChange={(value) => setFormData({ ...formData, members: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="team1">Equipo 1</SelectItem>
                    <SelectItem value="team2">Equipo 2</SelectItem>
                    <SelectItem value="team3">Equipo 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
            <Button variant="outline" type="button" className="w-full">
              Cancelar
            </Button>
            <Button type="submit" className="w-full bg-[#38536E] hover:bg-[#294052] text-white">
              Crear
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}