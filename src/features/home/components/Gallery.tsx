"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import useSWR from "swr";
import Image from "next/image";
import { CheckCircle, Target, Camera, Sparkles } from 'lucide-react';
import { endpoints, getImageUrl } from "../../control-images/services/ClinicalImagesService";
import type { ClinicalImage } from "../../control-images/types/ClinicalImage";

const fetcher = (url: string) =>
  fetch(url, { credentials: "include" })
    .then((res) => res.json())
    .then((json) => json.data || []);

function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Gradients alineados a la marca PodoCare
const gradients = [
  "from-[#BF2496] to-[#F285C1]", // Magenta a Rosa
  "from-[#05F2DB] to-[#BF2496]", // Cian a Magenta
  "from-[#D929AA] to-[#05F2DB]", // Rosa fuerte a Cian
];

export default function Gallery() {
  const { data: images, error, isLoading } = useSWR<ClinicalImage[]>(
    endpoints.list,
    fetcher
  );

  const [visible, setVisible] = useState<boolean[]>([]);

  useEffect(() => {
    if (images && Array.isArray(images)) {
      setVisible(images.map(() => false));
    }
  }, [images]);

  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const floatStyles = useMemo<CSSProperties[]>(() => {
    const rand = mulberry32(456789);
    return Array.from({ length: 8 }, () => {
      const size = rand() * 80 + 20;
      const left = rand() * 100;
      const top = rand() * 100;
      return {
        width: `${size}px`,
        height: `${size}px`,
        left: `${left}%`,
        top: `${top}%`,
      };
    });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number((entry.target as HTMLElement).dataset.index);
            setVisible((prev) => prev.map((v, i) => (i === idx ? true : v)));
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );

    cardsRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-white">
      {/* Fondo con gradientes sutiles de marca */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#F285C1]/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#05F2DB]/5 blur-[120px] rounded-full" />
      </div>

      {/* Floating elements decorativos */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
        {floatStyles.map((style, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-[#BF2496]/5 border border-[#BF2496]/10"
            style={style}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        {/* Header Section */}
        <div className="max-w-3xl mb-16 md:mb-24">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white shadow-sm border border-gray-100 mb-8">
            <Sparkles size={16} className="text-[#BF2496]" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">
              Casos de Éxito Clínico
            </span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-serif italic text-gray-900 leading-tight mb-8">
            Resultados <span className="not-italic font-bold font-sans text-[#BF2496]">Reales</span>
          </h2>
          
          <p className="text-lg md:text-xl text-gray-500 font-light leading-relaxed max-w-2xl">
            La evidencia de nuestro compromiso. Transformaciones logradas con tecnología de vanguardia y cuidado profesional.
          </p>
        </div>

        {/* Loading / Error / Empty States */}
        {isLoading && (
          <div className="flex justify-center py-20">
            <div className="w-12 h-12 border-4 border-[#05F2DB]/20 border-t-[#BF2496] rounded-full animate-spin" />
          </div>
        )}

        {error && (
          <div className="text-center py-12 px-8 bg-red-50 rounded-3xl border border-red-100">
            <p className="text-red-600 font-bold uppercase tracking-widest text-xs">Error al sincronizar galería</p>
          </div>
        )}

        {images && images.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 italic">No hay registros visuales en este momento.</p>
          </div>
        )}

        {/* Gallery Grid */}
        {images && images.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
            {images.map((item, index) => {
              const gradient = gradients[index % gradients.length];
              return (
                <div
                  key={item.id}
                  data-index={index}
                  ref={(el) => { cardsRef.current[index] = el; }}
                  className={`group relative transition-all duration-1000 ease-out ${
                    visible[index] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  {/* Card Container */}
                  <div className="relative h-full bg-white rounded-[2.5rem] border border-gray-100 p-6 md:p-8 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden">
                    
                    {/* Background Glow on Hover */}
                    <div className={`absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 rounded-full transition-opacity duration-700`} />

                    {/* Card Header */}
                    <div className="flex items-start gap-5 mb-8">
                      <div className={`shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br ${gradient} shadow-lg shadow-gray-200`}>
                        <Target className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 leading-tight group-hover:text-[#BF2496] transition-colors">
                          {item.title}
                        </h3>
                        {item.description && (
                          <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mt-2">
                            {item.description}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Before/After Comparison */}
                    <div className="grid grid-cols-2 gap-4 mb-8">
                      {/* Before */}
                      <div className="space-y-3">
                        <div className="relative aspect-[3/4] rounded-3xl overflow-hidden bg-gray-100 border border-gray-50">
                          <Image
                            src={getImageUrl(item.before_image)}
                            alt={`Antes - ${item.title}`}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          <div className="absolute top-3 left-3">
                            <span className="px-3 py-1 text-[9px] font-black tracking-widest bg-gray-900/80 backdrop-blur-sm text-white rounded-full">
                              ANTES
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* After */}
                      <div className="space-y-3">
                        <div className="relative aspect-[3/4] rounded-3xl overflow-hidden bg-gray-100 border border-gray-50 shadow-inner">
                          <Image
                            src={getImageUrl(item.after_image)}
                            alt={`Después - ${item.title}`}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          <div className="absolute top-3 right-3">
                            <span className={`px-3 py-1 text-[9px] font-black tracking-widest bg-gradient-to-r ${gradient} text-white rounded-full`}>
                              DESPUÉS
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Verification Badges */}
                    <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-[#05F2DB]" />
                        <span className="text-[9px] font-black uppercase tracking-tighter text-gray-500">Resultado Clínico</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Camera className="w-4 h-4 text-[#F285C1]" />
                        <span className="text-[9px] font-black uppercase tracking-tighter text-gray-500">Sin Edición</span>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}