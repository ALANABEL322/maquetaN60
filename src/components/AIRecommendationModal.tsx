import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"; // 🚫 No usado
import { RecommendationCard } from "@/components/recomendationCard";
import { Sparkles, Brain, X } from "lucide-react";

interface AIRecommendation {
  id: string;
  title: string;
  description: string;
  type: "improvement" | "new-task" | "reallocation";
  action?:
    | "assign-members"
    | "complete-fields"
    | "review-overdue"
    | "general-tip";
  priority?: "alta" | "medio" | "baja";
  relatedTasks?: string[];
  applied?: boolean;
  appliedAt?: string | number | Date;
  isFramework?: boolean;
}

interface AIRecommendationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  recommendations: AIRecommendation[];
  projectId: string;
}

export function AIRecommendationModal({
  open,
  onOpenChange,
  recommendations,
  projectId,
}: AIRecommendationModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const particleCanvasRef = useRef<HTMLCanvasElement>(null);
  const [_particles, setParticles] = useState<
    Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      size: number;
      color: string;
    }>
  >([]);

  useEffect(() => {
    if (!open) return;

    const canvas = particleCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ["#3B82F6", "#8B5CF6", "#06B6D4", "#10B981"];

    const generateParticles = () => {
      const newParticles = [];

      for (let i = 0; i < 100; i++) {
        newParticles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          life: 100,
          size: 3,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
      setParticles(newParticles);
    };

    generateParticles();

    const animateParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      setParticles((prevParticles) => {
        return prevParticles.map((particle) => {
          const newX = (particle.x + particle.vx + canvas.width) % canvas.width;
          const newY =
            (particle.y + particle.vy + canvas.height) % canvas.height;

          const alpha = (particle.life / 100) * 0.6;

          ctx.shadowBlur = 10;
          ctx.shadowColor = particle.color;

          ctx.beginPath();
          ctx.arc(newX, newY, particle.size, 0, Math.PI * 2);
          ctx.fillStyle =
            particle.color +
            Math.floor(alpha * 255)
              .toString(16)
              .padStart(2, "0");
          ctx.fill();

          ctx.shadowBlur = 0;

          prevParticles.forEach((otherParticle) => {
            const dx = newX - otherParticle.x;
            const dy = newY - otherParticle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 150) {
              ctx.beginPath();
              ctx.moveTo(newX, newY);
              ctx.lineTo(otherParticle.x, otherParticle.y);
              ctx.strokeStyle = `rgba(${particle.color.slice(0, 7)}, ${
                (1 - distance / 150) * 0.2
              })`;
              ctx.lineWidth = 1;
              ctx.stroke();
            }
          });

          return {
            ...particle,
            x: newX,
            y: newY,
            life: particle.life > 0 ? particle.life - 0.3 : 100,
          };
        });
      });

      if (open) {
        requestAnimationFrame(animateParticles);
      }
    };

    animateParticles();
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const modal = modalRef.current;
    const header = headerRef.current;
    const background = backgroundRef.current;

    if (!modal || !header || !background) return;

    gsap.fromTo(
      background,
      {
        opacity: 0,
        backdropFilter: "blur(0px)",
      },
      {
        opacity: 1,
        backdropFilter: "blur(8px)",
        duration: 0.5,
        ease: "power2.out",
      }
    );

    gsap.fromTo(
      modal,
      {
        scale: 0.3,
        rotationY: -180,
        opacity: 0,
        transformPerspective: 1000,
      },
      {
        scale: 1,
        rotationY: 0,
        opacity: 1,
        duration: 1,
        ease: "back.out(1.7)",
      }
    );

    gsap.fromTo(
      header,
      {
        y: -50,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        delay: 0.3,
        ease: "power2.out",
      }
    );

    const cards = modal.querySelectorAll("[data-recommendation-card]");
    gsap.fromTo(
      cards,
      {
        y: 100,
        opacity: 0,
        rotationX: -90,
      },
      {
        y: 0,
        opacity: 1,
        rotationX: 0,
        duration: 0.6,
        stagger: 0.1,
        delay: 0.5,
        ease: "back.out(1.7)",
      }
    );
  }, [open]);

  const handleClose = () => {
    const modal = modalRef.current;
    const background = backgroundRef.current;

    if (modal && background) {
      gsap.to(background, {
        opacity: 0,
        backdropFilter: "blur(0px)",
        duration: 0.3,
      });

      gsap.to(modal, {
        scale: 0.3,
        rotationY: 180,
        opacity: 0,
        duration: 0.5,
        ease: "back.in(2)",
        onComplete: () => onOpenChange(false),
      });
    } else {
      onOpenChange(false);
    }
  };

  if (!open) return null;

  return (
    <div
      ref={backgroundRef}
      className="fixed inset-0 z-[999] flex items-center justify-center"
      style={{
        background:
          "radial-gradient(ellipse at center, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.9) 100%)",
      }}
    >
      <canvas
        ref={particleCanvasRef}
        className="absolute inset-0 opacity-40"
        style={{ mixBlendMode: "screen" }}
      />

      <div
        ref={modalRef}
        className="relative bg-white rounded-3xl shadow-2xl border border-gray-200 max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.95) 100%)",
          boxShadow:
            "0 25px 50px -12px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1)",
        }}
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-50 group p-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all duration-300 cursor-pointer"
          style={{
            background: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(10px)",
          }}
        >
          <X className="w-5 h-5 text-white/80 group-hover:text-white group-hover:rotate-90 transition-all duration-300" />

          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-400/0 to-red-400/0 group-hover:from-red-400/20 group-hover:to-pink-400/20 transition-all duration-300" />

          <div className="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-white/30 group-hover:scale-110 transition-all duration-300" />
        </button>

        <div
          ref={headerRef}
          className="relative p-8 border-b border-gray-200/50"
          style={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          }}
        >
          <div className="absolute top-4 left-8 w-8 h-8 rounded-full bg-white/20 animate-pulse" />
          <div className="absolute top-8 right-16 w-4 h-4 rounded-full bg-white/30 animate-bounce" />
          <div
            className="absolute bottom-4 right-8 w-6 h-6 rounded-full bg-white/20"
            style={{
              animation: "float 3s ease-in-out infinite",
            }}
          />

          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 opacity-30 animate-pulse" />
              </div>

              <div>
                <h2 className="text-3xl font-bold text-white mb-2">
                  🤖 Recomendaciones de IA
                </h2>
                <p className="text-white/80 text-lg">
                  Análisis inteligente completado - {recommendations.length}{" "}
                  insights encontrados
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-8 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300">
          {recommendations.length > 0 ? (
            <div className="space-y-6">
              {recommendations.map((recommendation, _index) => (
                <div
                  key={recommendation.id}
                  data-recommendation-card
                  className="transform transition-all duration-300 hover:scale-[1.02]"
                >
                  <RecommendationCard
                    recommendation={recommendation}
                    projectId={projectId}
                    onClose={handleClose}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                <Sparkles className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                ¡Todo perfecto! 🎉
              </h3>
              <p className="text-gray-600">
                No se encontraron áreas de mejora en este momento.
              </p>
            </div>
          )}
        </div>

        <div className="mt-6 h-2 bg-white/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
            style={{
              width: "100%",
              animation: "slideIn 2s ease-out",
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes slideIn {
          from { width: 0%; }
          to { width: 100%; }
        }
        
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }
        
        .scrollbar-thin::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 3px;
        }
        
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: #c1c1c1;
          border-radius: 3px;
        }
        
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: #a8a8a8;
        }
      `}</style>
    </div>
  );
}
