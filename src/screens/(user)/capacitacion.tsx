import { GuidesList } from "@/components/capacitaciones/guidesList";
import { PaginationComp } from "@/components/capacitaciones/pagination";
import { ResourceCategories } from "@/components/capacitaciones/resourceCategories";
import { SearchBar } from "@/components/capacitaciones/searchBar";
import { TutorialsList } from "@/components/capacitaciones/tutorialsList";

export default function Capacitacion() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <h1 className="text-2xl font-semibold text-gray-800">Capacitación</h1>
      <p className="text-gray-600 mt-1 mb-6">
        Aquí te proporcionamos material de aprendizaje
      </p>

      <SearchBar />

      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Capacitación
        </h2>
        <ResourceCategories />
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Últimos tutoriales añadidos
        </h2>
        <TutorialsList />
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Últimos tutoriales añadidos
        </h2>
        <GuidesList />
      </div>

      <div className="mt-10 flex justify-around">
        <PaginationComp totalPages={40} itemsPerPage={10} totalItems={100} />
      </div>
    </div>
  );
}
