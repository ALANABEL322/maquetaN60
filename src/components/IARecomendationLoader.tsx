import { useEffect, useState, useRef } from "react";
import gsap from "gsap";

const analysisPhrases = [
  "🧠 Analizando patrones de datos...",
  "⚡ Procesando información del proyecto...",
  "🔍 Identificando oportunidades de mejora...",
  "📊 Evaluando distribución de recursos...",
  "🎯 Optimizando flujo de trabajo...",
  "🚀 Generando insights personalizados...",
  "✨ Aplicando inteligencia artificial...",
  "🔮 Prediciendo posibles escenarios...",
  "💡 Creando recomendaciones estratégicas...",
];

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
}

export const AiRecommendationLoader = ({
  onComplete,
}: {
  onComplete: () => void;
}) => {
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const brainRef = useRef<HTMLDivElement>(null);
  const circleRefs = useRef<HTMLDivElement[]>([]);
  const particlesRef = useRef<HTMLCanvasElement>(null);
  const [_particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const initialParticles: Particle[] = [];
    for (let i = 0; i < 50; i++) {
      initialParticles.push({
        id: i,
        x: Math.random() * 800,
        y: Math.random() * 600,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        life: Math.random() * 100,
        maxLife: 100,
      });
    }
    setParticles(initialParticles);
  }, []);

  useEffect(() => {
    const canvas = particlesRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 800;
    canvas.height = 600;

    const animateParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      setParticles((prevParticles) => {
        return prevParticles.map((particle) => {
          let newX = particle.x + particle.vx;
          let newY = particle.y + particle.vy;

          if (newX < 0 || newX > canvas.width) particle.vx *= -1;
          if (newY < 0 || newY > canvas.height) particle.vy *= -1;

          newX = Math.max(0, Math.min(canvas.width, newX));
          newY = Math.max(0, Math.min(canvas.height, newY));

          const alpha = particle.life / particle.maxLife;
          ctx.beginPath();
          ctx.arc(newX, newY, 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(56, 83, 110, ${alpha * 0.6})`;
          ctx.fill();

          prevParticles.forEach((otherParticle) => {
            const dx = newX - otherParticle.x;
            const dy = newY - otherParticle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
              ctx.beginPath();
              ctx.moveTo(newX, newY);
              ctx.lineTo(otherParticle.x, otherParticle.y);
              ctx.strokeStyle = `rgba(232, 82, 59, ${
                (1 - distance / 100) * 0.3
              })`;
              ctx.lineWidth = 1;
              ctx.stroke();
            }
          });

          return {
            ...particle,
            x: newX,
            y: newY,
            life: particle.life > 0 ? particle.life - 0.5 : particle.maxLife,
          };
        });
      });

      requestAnimationFrame(animateParticles);
    };

    animateParticles();
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const brain = brainRef.current;

    if (!container || !brain) return;

    gsap.fromTo(
      container,
      {
        scale: 0,
        rotationY: -180,
        opacity: 0,
        transformPerspective: 1000,
      },
      {
        scale: 1,
        rotationY: 0,
        opacity: 1,
        duration: 1.2,
        ease: "back.out(1.7)",
      }
    );

    gsap.to(brain, {
      rotationY: 360,
      duration: 4,
      repeat: -1,
      ease: "none",
    });

    gsap.to(brain, {
      y: -10,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
    });

    circleRefs.current.forEach((circle, index) => {
      if (circle) {
        gsap.to(circle, {
          rotation: 360,
          duration: 3 + index * 0.5,
          repeat: -1,
          ease: "none",
          transformOrigin: "center center",
        });

        gsap.to(circle, {
          scale: 1.1,
          duration: 1 + index * 0.2,
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut",
        });
      }
    });
  }, []);

  useEffect(() => {
    const totalPhrases = analysisPhrases.length;
    const totalDuration = 8000;
    const intervalTime = totalDuration / totalPhrases;

    const phraseInterval = setInterval(() => {
      setCurrentPhrase((prev) => (prev + 1) % totalPhrases);
    }, intervalTime);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const increment = 100 / (totalDuration / 100);

        if (prev >= 99.5) {
          clearInterval(progressInterval);
          clearInterval(phraseInterval);

          setTimeout(() => {
            setProgress(100);

            setTimeout(() => {
              if (containerRef.current) {
                gsap.to(containerRef.current, {
                  scale: 0,
                  rotationY: 180,
                  opacity: 0,
                  duration: 0.8,
                  ease: "back.in(2)",
                  onComplete: onComplete,
                });
              }
            }, 1000);
          }, 100);

          return 100;
        }

        return Math.min(prev + increment, 99.5);
      });
    }, 100);

    return () => {
      clearInterval(phraseInterval);
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[999] backdrop-blur-sm">
      <canvas
        ref={particlesRef}
        className="absolute inset-0 opacity-30"
        style={{ mixBlendMode: "screen" }}
      />

      <div
        ref={containerRef}
        className="relative bg-white p-8 rounded-2xl w-full max-w-lg shadow-2xl border border-gray-200"
        style={{
          background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
          boxShadow:
            "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)",
        }}
      >
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-[#38536E] to-[#E8523B] bg-clip-text text-transparent">
              IA Analizando Proyecto
            </h3>
            <p className="text-sm text-gray-500 mt-2">
              Inteligencia Artificial Avanzada
            </p>
          </div>

          <div className="relative flex justify-center items-center h-32">
            {[1, 2, 3].map((_, index) => (
              <div
                key={index}
                ref={(el) => {
                  if (el) circleRefs.current[index] = el;
                }}
                className="absolute border-2 rounded-full"
                style={{
                  width: `${80 + index * 30}px`,
                  height: `${80 + index * 30}px`,
                  borderColor:
                    index === 0
                      ? "#E8523B"
                      : index === 1
                      ? "#38536E"
                      : "#60A5FA",
                  borderStyle: "dashed",
                  opacity: 0.3 + index * 0.2,
                }}
              />
            ))}

            <div
              ref={brainRef}
              className="relative z-10 w-16 h-16 rounded-full flex items-center justify-center text-3xl"
              style={{
                background: "linear-gradient(45deg, #38536E, #E8523B)",
                boxShadow: "0 8px 32px rgba(56, 83, 110, 0.3)",
              }}
            >
              🧠
            </div>

            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-400"
                style={{
                  left: `${50 + Math.cos((i * Math.PI) / 4) * 60}%`,
                  top: `${50 + Math.sin((i * Math.PI) / 4) * 60}%`,
                  animation: `float ${
                    2 + i * 0.1
                  }s ease-in-out infinite alternate`,
                  animationDelay: `${i * 0.1}s`,
                }}
              />
            ))}
          </div>

          <div className="space-y-3">
            <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden shadow-inner">
              <div
                className="h-full rounded-full transition-all duration-300 ease-out relative"
                style={{
                  width: `${progress}%`,
                  background: `linear-gradient(45deg, #E8523B 0%, #38536E 50%, #60A5FA 100%)`,
                  boxShadow: "0 2px 10px rgba(232, 82, 59, 0.3)",
                }}
              >
                <div className="absolute inset-0 bg-white opacity-20 animate-pulse" />
              </div>

              <div
                className="absolute top-1/2 transform -translate-y-1/2 w-6 h-6 rounded-full bg-white shadow-lg border-2 border-[#E8523B] transition-all duration-300"
                style={{ left: `calc(${progress}% - 12px)` }}
              >
                <div className="w-full h-full rounded-full bg-gradient-to-r from-[#E8523B] to-[#38536E] animate-spin" />
              </div>
            </div>

            <div className="text-center">
              <span className="text-2xl font-bold text-[#38536E]">
                {Math.round(progress)}%
              </span>
            </div>
          </div>

          <div className="text-center min-h-12 flex items-center justify-center">
            <p
              key={currentPhrase}
              className="text-[#38536E] font-medium text-lg animate-fadeIn"
            >
              {analysisPhrases[currentPhrase]}
            </p>
          </div>

          <div className="flex justify-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span>Procesando</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              <span>Analizando</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
              <span>Optimizando</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          from {
            transform: translateY(0px);
          }
          to {
            transform: translateY(-10px);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};
