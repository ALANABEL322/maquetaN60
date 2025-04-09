// components/AiRecommendationLoader.tsx
import { useEffect, useState } from "react";

const analysisPhrases = [
  "Analizando progreso del proyecto...",
  "Evaluando distribución de tareas...",
  "Revisando asignación de recursos...",
  "Optimizando línea de tiempo...",
  "Identificando posibles cuellos de botella...",
  "Generando recomendaciones personalizadas...",
  "Analizando progreso del proyecto...",
  "Evaluando distribución de tareas...",
  "Revisando asignación de recursos...",
];

export const AiRecommendationLoader = ({
  onComplete,
}: {
  onComplete: () => void;
}) => {
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const totalPhrases = analysisPhrases.length;
    const intervalTime = 15000 / totalPhrases;

    const phraseInterval = setInterval(() => {
      setCurrentPhrase((prev) => (prev + 1) % totalPhrases);
    }, intervalTime);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          onComplete();
          return 100;
        }
        return prev + 100 / (15000 / 100);
      });
    }, 150);

    return () => {
      clearInterval(phraseInterval);
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[999] ">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-[#38536E]">
            Generando recomendaciones de IA
          </h3>

          <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-300 ease-out"
              style={{
                width: `${progress}%`,
                background: `linear-gradient(90deg, #E8523B 0%, #38536E 100%)`,
              }}
            />
          </div>

          <p className="text-center text-[#38536E] min-h-6">
            {analysisPhrases[currentPhrase]}
          </p>

          <div className="flex justify-center">
            <div className="inline-block relative w-10 h-10">
              <div className="absolute inset-0 border-4 border-t-[#E8523B] border-r-[#38536E] border-b-[#E8523B] border-l-[#38536E] rounded-full animate-spin"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
