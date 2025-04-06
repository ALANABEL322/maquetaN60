import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export function SearchForm() {
  return (
    <div className="relative">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
      <Input type="search" placeholder="Search..." className="pl-8" />
    </div>
  )
}

