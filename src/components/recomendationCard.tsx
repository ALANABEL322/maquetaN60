import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTaskStore } from "@/store/taskStore/taskStore";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface RecommendationCardProps {
  recommendation: {
    appliedAt?: string | number | Date;
    id: string;
    title: string;
    description: string;
    type: "improvement" | "new-task" | "reallocation";
    action?:
      | "assign-members"
      | "complete-fields"
      | "review-overdue"
      | "general-tip";
    priority?: "alta" | "media" | "medio" | "baja";
    relatedTasks?: string[];
    applied?: boolean;
    isFramework?: boolean;
  };
  projectId: string;
  onClose: () => void;
}

export function RecommendationCard({
  recommendation,
  projectId,
  onClose,
}: RecommendationCardProps) {
  const navigate = useNavigate();
  const { markRecommendationAsApplied } = useTaskStore();
  const cardRef = useRef<HTMLDivElement>(null);
  const hologramRef = useRef<HTMLDivElement>(null);
  const particleCanvasRef = useRef<HTMLCanvasElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [particles, setParticles] = useState<
    Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      color: string;
    }>
  >([]);

  useEffect(() => {
    const canvas = particleCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 400;
    canvas.height = 250;

    const generateParticles = () => {
      const newParticles = [];
      for (let i = 0; i < 20; i++) {
        let color;

        if (recommendation.isFramework) {
          color = "#8B5CF6";
        } else {
          color =
            recommendation.priority === "alta"
              ? "#EF4444"
              : recommendation.priority === "media" ||
                recommendation.priority === "medio"
              ? "#F59E0B"
              : "#10B981";
        }

        newParticles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          life: Math.random() * 100,
          color: color,
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

          const alpha = particle.life / 100;
          ctx.beginPath();
          ctx.arc(newX, newY, 1, 0, Math.PI * 2);
          ctx.fillStyle =
            particle.color +
            Math.floor(alpha * 255)
              .toString(16)
              .padStart(2, "0");
          ctx.fill();

          return {
            ...particle,
            x: newX,
            y: newY,
            life: particle.life > 0 ? particle.life - 0.5 : 100,
          };
        });
      });

      requestAnimationFrame(animateParticles);
    };

    if (isHovered || !recommendation.applied) {
      animateParticles();
    }
  }, [isHovered, recommendation.applied, recommendation.priority]);

  useEffect(() => {
    const card = cardRef.current;
    const hologram = hologramRef.current;

    if (!card) return;

    gsap.fromTo(
      card,
      {
        scale: 0.8,
        rotationX: -90,
        opacity: 0,
        transformPerspective: 1000,
        transformOrigin: "center bottom",
      },
      {
        scale: 1,
        rotationX: 0,
        opacity: 1,
        duration: 0.8,
        ease: "back.out(1.7)",
        delay: Math.random() * 0.3,
      }
    );

    if (hologram && !recommendation.applied) {
      gsap.to(hologram, {
        rotationY: 360,
        duration: 8,
        repeat: -1,
        ease: "none",
      });

      gsap.to(hologram, {
        y: -5,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
      });
    }

    const handleMouseEnter = () => {
      setIsHovered(true);
      if (!recommendation.applied) {
        gsap.to(card, {
          scale: 1.05,
          rotationY: 5,
          rotationX: 5,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      gsap.to(card, {
        scale: 1,
        rotationY: 0,
        rotationX: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    card.addEventListener("mouseenter", handleMouseEnter);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card.removeEventListener("mouseenter", handleMouseEnter);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [recommendation.applied]);

  const handleApplyRecommendation = () => {
    if (recommendation.applied) return;

    const card = cardRef.current;
    if (card) {
      gsap.to(card, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        onComplete: () => {
          markRecommendationAsApplied(projectId, recommendation.id);

          navigate(`/user/tareas/${projectId}`, {
            state: {
              focus: recommendation.action,
              taskIds: recommendation.relatedTasks,
            },
          });

          onClose();
        },
      });
    }
  };

  const getButtonText = () => {
    if (recommendation.applied) return "✓ Aplicada";

    switch (recommendation.action) {
      case "assign-members":
        return "🎯 Asignar miembros";
      case "complete-fields":
        return "📝 Completar información";
      case "review-overdue":
        return "⏰ Revisar tareas";
      default:
        return "🚀 Aplicar recomendación";
    }
  };

  const getPriorityBadge = () => {
    const badges = {
      alta: {
        variant: "destructive" as const,
        icon: "🔥",
        text: "Alta prioridad",
        glow: "shadow-red-500/50",
      },
      media: {
        variant: "secondary" as const,
        icon: "⚡",
        text: "Media prioridad",
        glow: "shadow-yellow-500/50",
      },
      medio: {
        variant: "secondary" as const,
        icon: "⚡",
        text: "Media prioridad",
        glow: "shadow-yellow-500/50",
      },
      baja: {
        variant: "outline" as const,
        icon: "💡",
        text: "Baja prioridad",
        glow: "shadow-green-500/50",
      },
    };

    const priority = recommendation.priority || "baja";
    const badge = badges[priority];

    if (!badge) {
      return (
        <Badge variant="outline" className="shadow-gray-500/50 shadow-lg">
          💡 Baja prioridad
        </Badge>
      );
    }

    return (
      <Badge variant={badge.variant} className={`${badge.glow} shadow-lg`}>
        {badge.icon} {badge.text}
      </Badge>
    );
  };

  const getTypeIcon = () => {
    switch (recommendation.type) {
      case "improvement":
        return "🔧";
      case "new-task":
        return "➕";
      case "reallocation":
        return "🔄";
      default:
        return "💡";
    }
  };

  const getGradientByPriority = () => {
    if (recommendation.isFramework) {
      return "from-purple-500/20 via-indigo-500/20 to-blue-500/20";
    }

    switch (recommendation.priority) {
      case "alta":
        return "from-red-500/20 via-pink-500/20 to-orange-500/20";
      case "media":
      case "medio":
        return "from-yellow-500/20 via-amber-500/20 to-orange-500/20";
      default:
        return "from-green-500/20 via-emerald-500/20 to-teal-500/20";
    }
  };

  const getFrameworkBadge = () => {
    if (!recommendation.isFramework) return null;

    return (
      <Badge
        variant="secondary"
        className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg border-none"
      >
        🛠️ Framework/Herramienta
      </Badge>
    );
  };

  return (
    <div className="relative">
      <canvas
        ref={particleCanvasRef}
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{ mixBlendMode: "screen" }}
      />

      <Card
        ref={cardRef}
        className={`
          relative overflow-hidden border-2 transition-all duration-300
          ${
            recommendation.applied
              ? "opacity-80 bg-gray-50 border-gray-300"
              : recommendation.isFramework
              ? "border-purple-400/50 bg-gradient-to-br from-purple-500/10 via-indigo-500/10 to-blue-500/10 backdrop-blur-sm"
              : `border-transparent bg-gradient-to-br ${getGradientByPriority()} backdrop-blur-sm`
          }
          shadow-2xl hover:shadow-3xl
          ${recommendation.isFramework ? "ring-2 ring-purple-400/20" : ""}
        `}
        style={{
          background: recommendation.applied
            ? undefined
            : recommendation.isFramework
            ? `linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(99, 102, 241, 0.1) 50%, rgba(59, 130, 246, 0.1) 100%)`
            : `linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,250,252,0.9) 100%)`,
          transformStyle: "preserve-3d",
        }}
      >
        {!recommendation.applied && (
          <div
            ref={hologramRef}
            className="absolute top-2 right-2 w-8 h-8 rounded-full opacity-60"
            style={{
              background: recommendation.isFramework
                ? `conic-gradient(from 0deg, transparent, #8B5CF6, transparent)`
                : `conic-gradient(from 0deg, transparent, ${
                    recommendation.priority === "alta"
                      ? "#EF4444"
                      : recommendation.priority === "media" ||
                        recommendation.priority === "medio"
                      ? "#F59E0B"
                      : "#10B981"
                  }, transparent)`,
              filter: "blur(1px)",
            }}
          />
        )}

        <CardHeader className="pb-3 relative">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
              <div className="text-2xl">{getTypeIcon()}</div>
              <CardTitle
                className={`text-lg ${
                  recommendation.isFramework
                    ? "bg-gradient-to-r from-purple-800 to-indigo-800 bg-clip-text text-transparent"
                    : "bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent"
                }`}
              >
                {recommendation.title}
              </CardTitle>
            </div>
            <div className="flex flex-col gap-2">
              {getFrameworkBadge()}
              {!recommendation.isFramework && getPriorityBadge()}
            </div>
          </div>

          <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-300 to-transparent mt-3 overflow-hidden">
            <div
              className={`h-full w-1/3 ${
                recommendation.isFramework
                  ? "bg-gradient-to-r from-purple-500 to-indigo-500"
                  : "bg-gradient-to-r from-blue-500 to-purple-500"
              }`}
              style={{
                animation: "slide 2s ease-in-out infinite",
              }}
            />
          </div>
        </CardHeader>

        <CardContent className="space-y-4 relative">
          <p className="text-sm text-muted-foreground leading-relaxed">
            {recommendation.description}
          </p>

          {recommendation.relatedTasks &&
            recommendation.relatedTasks.length > 0 && (
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span>📋</span>
                <span>
                  {recommendation.relatedTasks.length} tareas relacionadas
                </span>
              </div>
            )}

          <div className="flex justify-between items-center pt-2">
            {recommendation.applied && (
              <div className="flex items-center gap-2">
                <span className="text-green-600">✅</span>
                <span className="text-xs text-green-600 font-medium">
                  Aplicada el{" "}
                  {new Date(
                    recommendation.appliedAt || new Date()
                  ).toLocaleDateString()}
                </span>
              </div>
            )}

            <Button
              size="sm"
              onClick={handleApplyRecommendation}
              disabled={recommendation.applied}
              variant={recommendation.applied ? "ghost" : "default"}
              className={`
                ${
                  !recommendation.applied &&
                  "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                }
                ${
                  !recommendation.applied &&
                  "shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                }
                transition-all duration-200
              `}
            >
              {getButtonText()}
            </Button>
          </div>
        </CardContent>

        {!recommendation.applied && (
          <div
            className="absolute inset-0 opacity-0 hover:opacity-20 transition-opacity duration-300 pointer-events-none"
            style={{
              background:
                "linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.8) 50%, transparent 70%)",
              transform: "translateX(-100%)",
              animation: isHovered
                ? "shine 1.5s ease-in-out infinite"
                : undefined,
            }}
          />
        )}
      </Card>

      <style>{`
        @keyframes slide {
          0% {
            transform: translateX(-100%);
          }
          50% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(300%);
          }
        }

        @keyframes shine {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
}
