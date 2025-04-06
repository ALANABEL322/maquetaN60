import { FileText, Play } from "lucide-react";
import { Link } from "react-router-dom";

const categories = [
  {
    id: "guides",
    title: "Guías interactivas",
    icon: <FileText className="h-10 w-10 text-slate-600" />,
    href: "/guides",
  },
  {
    id: "tutorials",
    title: "Tutoriales",
    icon: <Play className="h-10 w-10 text-slate-600" />,
    href: "/tutorials",
  },
];

export function ResourceCategories() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {categories.map((category) => (
        <Link
          key={category.id}
          to={category.href}
          className="flex flex-col items-center p-8 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="mb-4">{category.icon}</div>
          <h3 className="text-sm font-medium text-gray-800">
            {category.title}
          </h3>
        </Link>
      ))}
    </div>
  );
}
