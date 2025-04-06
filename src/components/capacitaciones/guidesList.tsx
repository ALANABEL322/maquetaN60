import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";

const guides = [
  {
    id: 1,
    title: "Nombre de la guía",
    href: "/guides/1",
  },
  {
    id: 2,
    title: "Nombre de la guía",
    href: "/guides/2",
  },
  {
    id: 3,
    title: "Nombre de la guía",
    href: "/guides/3",
  },
  {
    id: 4,
    title: "Nombre de la guía",
    href: "/guides/4",
  },
];

export function GuidesList() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {guides.map((guide) => (
        <div
          key={guide.id}
          className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden flex flex-col"
        >
          <div className="p-4 flex flex-col items-center">
            <div className="flex justify-center items-center mb-4">
              <FileText className="h-10 w-10 text-slate-600" />
            </div>
            <h3 className="font-medium text-gray-800 mb-4 text-center">
              {guide.title}
            </h3>
            <Button
              variant="secondary"
              className="w-full bg-slate-700 text-white hover:bg-slate-800"
              asChild
            >
              <a href={guide.href}>Descargar</a>
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
