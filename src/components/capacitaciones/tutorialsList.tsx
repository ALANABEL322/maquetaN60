import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

const tutorials = [
  {
    id: 1,
    title: "Título del tutorial",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    href: "/tutorials/1",
  },
  {
    id: 2,
    title: "Título del tutorial",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    href: "/tutorials/2",
  },
  {
    id: 3,
    title: "Título del tutorial",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    href: "/tutorials/3",
  },
  {
    id: 4,
    title: "Título del tutorial",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    href: "/tutorials/4",
  },
];

export function TutorialsList() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {tutorials.map((tutorial) => (
        <div
          key={tutorial.id}
          className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden flex flex-col"
        >
          <div className="p-4 flex flex-col flex-grow">
            <div className="flex justify-center items-center mb-4">
              <div className="bg-slate-700 rounded-full p-3">
                <Play className="h-6 w-6 text-white" />
              </div>
            </div>
            <h3 className="font-medium text-gray-800 mb-2">{tutorial.title}</h3>
            <p className="text-gray-500 text-sm flex-grow mb-4">
              {tutorial.description}
            </p>
            <Button
              variant="secondary"
              className="w-full bg-slate-700 text-white hover:bg-slate-800"
              asChild
            >
              <a href={tutorial.href}>Leer más</a>
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
