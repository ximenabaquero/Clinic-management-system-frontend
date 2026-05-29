"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import useSWR from "swr";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { endpoints, getImageUrl } from "../../control-images/services/ClinicalImagesService";
import type { ClinicalImage } from "../../control-images/types/ClinicalImage";

const fetcher = (url: string) =>
  fetch(url)
    .then((res) => res.json())
    .then((json) => json.data || []);

export default function GalleryCarousel() {
  const { data: images, error, isLoading } = useSWR<ClinicalImage[]>(
    endpoints.list,
    fetcher
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const total = images?.length ?? 0;

  const goNext = useCallback(() => {
    setCurrentIndex((i) => (i + 1) % total);
  }, [total]);

  const goPrev = useCallback(() => {
    setCurrentIndex((i) => (i - 1 + total) % total);
  }, [total]);

  useEffect(() => {
    if (total < 2 || isPaused) return;
    intervalRef.current = setInterval(goNext, 5000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [goNext, isPaused, total]);

  if (isLoading) {
    return (
      <section className="py-24 flex justify-center">
        <div className="w-10 h-10 border-4 border-[#05F2DB]/20 border-t-[#BF2496] rounded-full animate-spin" />
      </section>
    );
  }

  if (error || !images || images.length === 0) return null;

  const item = images[currentIndex];

  return (
    <section
      id="galeria"
      className="relative py-24 md:py-32 bg-white overflow-hidden"
    >
      {/* Fondo decorativo */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#F285C1]/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#05F2DB]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-16 relative z-10">

        {/* Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white shadow-sm border border-gray-100 mb-8">
            <Sparkles size={16} className="text-[#BF2496]" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">
              Casos de Éxito Clínico
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl font-serif italic text-gray-900 leading-tight mb-4">
            Resultados{" "}
            <span className="not-italic font-bold font-sans text-[#BF2496]">
              Reales
            </span>
          </h2>
          <p className="text-lg text-gray-500 font-light leading-relaxed max-w-xl">
            Evidencia de nuestro compromiso. Transformaciones logradas con cuidado profesional.
          </p>
        </div>

        {/* Carousel */}
        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="overflow-hidden rounded-[2.5rem]">
            {/* Slide track */}
            <div
              className="flex"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
                transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              {images.map((img) => (
                <div key={img.id} className="min-w-full">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 bg-white shadow-xl rounded-[2.5rem] overflow-hidden border border-gray-100">

                    {/* Info panel */}
                    <div className="flex flex-col justify-center p-10 md:p-14 bg-gradient-to-br from-[#BF2496]/5 to-white">
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#BF2496]/10 mb-6 w-fit">
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#BF2496]">
                          Caso clínico
                        </span>
                      </div>
                      <h3 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-4">
                        {img.title}
                      </h3>
                      {img.description && (
                        <p className="text-gray-500 text-base font-light leading-relaxed">
                          {img.description}
                        </p>
                      )}
                      {/* Indicadores */}
                      {total > 1 && (
                        <div className="flex items-center gap-2 mt-10">
                          {images.map((_, i) => (
                            <button
                              key={i}
                              onClick={() => setCurrentIndex(i)}
                              className={`rounded-full transition-all duration-300 ${
                                i === currentIndex
                                  ? "w-6 h-2.5 bg-[#BF2496]"
                                  : "w-2.5 h-2.5 bg-gray-200 hover:bg-[#BF2496]/40"
                              }`}
                              aria-label={`Ir al caso ${i + 1}`}
                            />
                          ))}
                          <span className="ml-2 text-xs text-gray-400">
                            {currentIndex + 1} / {total}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Imágenes antes/después */}
                    <div className="grid grid-cols-2 gap-0">
                      <div className="relative aspect-[3/4] overflow-hidden">
                        <Image
                          src={getImageUrl(img.before_image)}
                          alt={`Antes — ${img.title}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 50vw, 25vw"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 text-[9px] font-black tracking-widest bg-gray-900/80 backdrop-blur-sm text-white rounded-full">
                            ANTES
                          </span>
                        </div>
                      </div>
                      <div className="relative aspect-[3/4] overflow-hidden">
                        <Image
                          src={getImageUrl(img.after_image)}
                          alt={`Después — ${img.title}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 50vw, 25vw"
                        />
                        <div className="absolute top-4 right-4">
                          <span className="px-3 py-1 text-[9px] font-black tracking-widest bg-gradient-to-r from-[#BF2496] to-[#F285C1] text-white rounded-full">
                            DESPUÉS
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Botones prev/next */}
          {total > 1 && (
            <>
              <button
                onClick={goPrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center text-gray-700 hover:bg-[#BF2496] hover:text-white hover:border-[#BF2496] transition-all duration-300"
                aria-label="Anterior"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={goNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center text-gray-700 hover:bg-[#BF2496] hover:text-white hover:border-[#BF2496] transition-all duration-300"
                aria-label="Siguiente"
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
