import { Link } from "react-router-dom";
import imgHero from "../../assets/imgAuth.png"
import type React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Settings, Brain, BarChart3, Flag, GraduationCap, Clock, Award, MessageCircle, ThumbsUp } from "lucide-react"
import imgBenefits from "../../assets/landingBenefits.png"

const features = [
  {
    icon: <Settings className="h-8 w-8 text-rose-500" />,
    title: "Automatización ágil",
    description: "Optimiza cada paso del desarrollo con la integración de metodologías ágiles como Kanban y Scrum.",
  },
  {
    icon: <Brain className="h-8 w-8 text-rose-500" />,
    title: "Análisis inteligente",
    description:
      "Nuestra inteligencia artificial analiza patrones de datos en tiempo real, identificando cuellos de botella y áreas de mejora.",
  },
  {
    icon: <BarChart3 className="h-8 w-8 text-rose-500" />,
    title: "Monitoreo predictivo",
    description:
      "Mantén un control total sobre tu proyecto con métricas claras y visualizaciones dinámicas, como gráficos Gantt y paneles KPI.",
  },
  {
    icon: <Flag className="h-8 w-8 text-rose-500" />,
    title: "Interfaz intuitiva",
    description:
      "Navega entre proyectos, métricas y recomendaciones sin complicaciones ni curvas de aprendizaje pronunciadas.",
  },
  {
    icon: <GraduationCap className="h-8 w-8 text-rose-500" />,
    title: "Capacitación integrada",
    description:
      "Accede a un completo centro de recursos con tutoriales interactivos, guías paso a paso y videos que explican las mejores prácticas en metodologías ágiles.",
  },
]


const benefits = [
  {
    icon: <Clock className="h-6 w-6 text-rose-500" />,
    title: "Optimización del tiempo",
    description:
      "Al integrar herramientas ágiles y procesos automatizados, la plataforma elimina tareas repetitivas, reduce tiempos de espera y garantiza que los equipos cumplan con los plazos establecidos.",
  },
  {
    icon: <Award className="h-6 w-6 text-rose-500" />,
    title: "Maximiza la eficiencia",
    description:
      "Organiza y gestiona cada sprint con precisión, asegurándote de que todos los recursos estén alineados para el éxito y se mantengan enfocados y productivos en cada etapa del desarrollo.",
  },
  {
    icon: <MessageCircle className="h-6 w-6 text-rose-500" />,
    title: "Mejora la colaboración",
    description:
      "Fomenta un entorno de trabajo donde todos los miembros del equipo puedan comunicarse y coordinarse sin barreras, brindando total transparencia para que todos estén alineados y trabajen hacia objetivos comunes.",
  },
  {
    icon: <ThumbsUp className="h-6 w-6 text-rose-500" />,
    title: "Aumenta tu competitividad",
    description:
      "Innova continuamente y adapta tus productos a las necesidades cambiantes de los clientes, asegurándote una posición destacada en tu industria.",
  },
]


const steps = [
  {
    title: "Configura tus proyectos",
    description:
      "Personaliza tableros Kanban o Scrum según las necesidades de tu equipo. Define tareas, asigna prioridades y establece plazos claros para cada sprint, asegurándote de que todos los miembros comprendan sus responsabilidades desde el inicio.",
  },
  {
    title: "Monitorea y optimiza",
    description:
      "Rastrea el progreso del proyecto con dashboards visuales que incluyen métricas clave como eficiencia, tiempos de entrega y desempeño del equipo. La visualización en tiempo real te permite identificar problemas y ajustar el rumbo con facilidad.",
  },
  {
    title: "Recibe recomendaciones",
    description:
      "La inteligencia artificial analiza datos del proyecto y sugiere estrategias de mejora. Estas recomendaciones proactivas te ayudan a priorizar tareas, optimizar recursos y garantizar que los objetivos se cumplan de manera efectiva.",
  },
]


export default function LandingPage() {
  return (
    <section className="w-full bg-[#FFF5F5] mt-2 py-12 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-12">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl text-[#2D4356]">
                Lleva tus ideas al mercado con rapidez, agilidad y confianza
              </h1>
              <p className="max-w-[600px] text-[#2D4356] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Una plataforma impulsada por inteligencia artificial que transforma el ciclo de vida de tu producto con
                metodologías ágiles como Kanban y Scrum. Planifica, gestiona y optimiza cada etapa del desarrollo en un
                solo lugar.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link
                to="/user/createProject"
                className="inline-flex h-10 items-center justify-center rounded-md bg-[#F45B49] px-8 text-sm font-medium text-white shadow transition-colors hover:bg-[#F45B49]/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              >
                Comenzar ahora
              </Link>
            </div>
          </div>
          <div className="flex justify-center">
            <img
              src={imgHero}
              alt="Personas trabajando con un tablero Kanban"
              width={500}
              height={400}
              className="rounded-lg object-contain"
            />
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-700 mb-4">
          Leadty, la solución inteligente para transformar tus proyectos
        </h1>
        <p className="text-slate-600 max-w-3xl mx-auto">
          Nuestra solución combina tecnologías avanzadas de inteligencia artificial y machine learning para analizar y
          optimizar el desarrollo de productos. Diseñada para startups, empresas de tecnología y equipos innovadores,
          esta herramienta asegura eficiencia, adaptabilidad y resultados predecibles.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {features.slice(0, 3).map((feature, index) => (
          <div key={index} className="w-full">
            <FeatureCard 
              icon={feature.icon} 
              title={feature.title} 
              description={feature.description} 
            />
          </div>
        ))}
      </div>

      <div className="grid md:w-full md:grid-cols-1 lg:grid-cols-2 lg:w-2/3 gap-6  mx-auto">
        {features.slice(3, 5).map((feature, index) => (
          <FeatureCard key={index + 3} icon={feature.icon} title={feature.title} description={feature.description} />
        ))}
      </div>
    </div>
    <div className="container mx-auto px-4 py-16 max-w-7xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="flex flex-col items-center lg:items-start">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-700 mb-8 text-center lg:text-left">
            Beneficios para tu equipo
          </h2>
          <div className="relative w-full max-w-md h-64 md:h-80">
            <img
              src={imgBenefits}
              alt="Team collaboration illustration"
              className="object-contain"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {benefits.map((benefit, index) => (
            <BenefitItem key={index} icon={benefit.icon} title={benefit.title} description={benefit.description} />
          ))}
        </div>
      </div>
    </div>
    <div className="container mx-auto px-4 py-16 max-w-7xl">
      <h2 className="text-3xl md:text-4xl font-bold text-slate-700 mb-10">¿Cómo funciona?</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-20">
        {steps.map((step, index) => (
          <Card key={index} className="bg-gray-50 border-none shadow-lg w-full">
            <CardContent className="p-6">
              <h3 className="text-lg font-medium text-slate-700 mb-3">{step.title}</h3>
              <p className="text-sm text-slate-600">{step.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="relative shadow-lg rounded-3xl bg-rose-100 p-8 md:p-12 overflow-hidden">
        <div className="text-center max-w-3xl mx-auto relative z-10">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-700 mb-4">
            La clave para llevar tus proyectos al siguiente nivel
          </h2>
          <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
            Impulsa a tu equipo con las herramientas más avanzadas en gestión ágil e inteligencia artificial. Desde la
            planificación hasta el lanzamiento, todo en un solo lugar.
          </p>
          <Link
            to="/user/createProject"
            className="bg-rose-500 hover:bg-rose-600 text-white rounded-full px-8 py-4 h-auto font-medium"
          >
            Comenzar ahora
          </Link>
        </div>
      </div>
    </div>
    </section>
  )
}

interface BenefitItemProps {
  icon: React.ReactNode
  title: string
  description: string
}

function BenefitItem({ icon, title, description }: BenefitItemProps) {
  return (
    <div className="flex gap-4">
      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-rose-100 flex items-center justify-center">{icon}</div>
      <div>
        <h3 className="text-xl font-semibold text-slate-700 mb-2">{title}</h3>
        <p className="text-slate-600 text-sm">{description}</p>
      </div>
    </div>
  )
}

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <Card className="bg-gray-50 border-none shadow-lg h-full">
      <CardContent className="p-6">
        <div className="mb-4 mt-2">{icon}</div>
        <h3 className="text-lg font-medium text-slate-700 mb-2">{title}</h3>
        <p className="text-sm text-slate-600">{description}</p>
      </CardContent>
    </Card>
  )
}