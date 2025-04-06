import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export function SearchBar() {
  const [query, setQuery] = useState("");

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
      <Input
        type="text"
        placeholder="Busca miembros del equipo"
        className="pl-10 py-2 w-full"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
}
