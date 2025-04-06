import { useState } from "react";
import { Search, Play } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { PaginationComp } from "@/components/capacitaciones/pagination";

interface Tutorial {
  id: number;
  title: string;
  description: string;
}

const mockTutorials: Tutorial[] = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  title: "Título del tutorial",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
}));

export default function Tutoriales() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, _setCurrentPage] = useState(1);
  const tutorialsPerPage = 12;

  const filteredTutorials = mockTutorials.filter((tutorial) =>
    tutorial.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastTutorial = currentPage * tutorialsPerPage;
  const indexOfFirstTutorial = indexOfLastTutorial - tutorialsPerPage;
  const currentTutorials = filteredTutorials.slice(
    indexOfFirstTutorial,
    indexOfLastTutorial
  );

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <h1 className="text-2xl font-bold mb-1">Tutoriales</h1>
      <p className="text-muted-foreground mb-6">
        Aquí te proporcionamos material de aprendizaje
      </p>

      <div className="relative mb-8">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Busca miembros del equipo"
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <h2 className="text-lg font-semibold mb-4">
        Últimos tutoriales añadidos
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
        {currentTutorials.map((tutorial) => (
          <Card key={tutorial.id} className="flex flex-col h-full">
            <CardContent className="pt-6 flex-grow">
              <div className="flex justify-center mb-4">
                <div className="bg-slate-600 rounded-full p-4 w-16 h-16 flex items-center justify-center">
                  <Play className="h-8 w-8 text-white" />
                </div>
              </div>
              <h3 className="font-semibold mb-2">{tutorial.title}</h3>
              <p className="text-sm text-muted-foreground">
                {tutorial.description}
              </p>
            </CardContent>
            <CardFooter>
              <Button
                variant="default"
                className="w-full bg-slate-600 hover:bg-slate-700"
              >
                Leer más
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Mostrando {indexOfFirstTutorial + 1}-
          {Math.min(indexOfLastTutorial, filteredTutorials.length)} de{" "}
          {filteredTutorials.length}
        </p>
        <div className="mt-10 flex justify-around">
          <PaginationComp totalPages={40} itemsPerPage={10} totalItems={100} />
        </div>
      </div>
    </div>
  );
}
