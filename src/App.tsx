import { BrowserRouter } from 'react-router-dom'
import { Toaster } from '@/components/ui/sonner'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background">
        <Toaster richColors position="top-center" />
      </div>
    </BrowserRouter>
  )
}

export default App
