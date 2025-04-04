import { BrowserRouter } from 'react-router-dom'
import { Toaster } from '@/components/ui/sonner'
import Router from '@/routes'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background">
        <Toaster richColors position="top-center" />
        <Router />
      </div>
    </BrowserRouter>
  )
}

export default App
