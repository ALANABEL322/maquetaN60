import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

interface PaginationProps {
  totalPages: number;
  itemsPerPage: number;
  totalItems: number;
}

export function PaginationComp({
  totalPages,
  itemsPerPage,
  totalItems,
}: PaginationProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const getPageNumbers = () => {
    const pages = [];
    pages.push(1);

    if (currentPage > 3) {
      pages.push("ellipsis1");
    }

    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      if (i !== 1 && i !== totalPages) {
        pages.push(i);
      }
    }

    if (currentPage < totalPages - 2) {
      pages.push("ellipsis2");
    }

    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="flex justify-between items-center w-full">
      <div className="text-gray-500 text-sm">
        Mostrando {startItem}-{endItem} de {totalItems}
      </div>

      <div className="flex items-center space-x-1 border p-1 border-gray-300 rounded-lg">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Página anterior</span>
        </Button>

        {getPageNumbers().map((page, index) => {
          if (page === "ellipsis1" || page === "ellipsis2") {
            return (
              <span key={`ellipsis-${index}`} className="px-2">
                ...
              </span>
            );
          }

          return (
            <Button
              key={`page-${page}`}
              variant={currentPage === page ? "default" : "outline"}
              className={`h-8 w-8 ${
                currentPage === page ? "bg-red-500 hover:bg-red-600" : ""
              }`}
              onClick={() => goToPage(Number(page))}
            >
              {page}
            </Button>
          );
        })}

        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Página siguiente</span>
        </Button>
      </div>
    </div>
  );
}
