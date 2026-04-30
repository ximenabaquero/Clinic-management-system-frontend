"use client";

import Image from "next/image";
import { generateWhatsAppURL } from "@/utils/whatsapp";
import { ArrowRight, ShieldCheck, Clock3, Award, Smartphone } from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from "next/link";

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const trustIndicators = [
    { icon: <ShieldCheck size={20} />, text: "Podólogos Titulados" },
    { icon: <Clock3 size={20} />, text: "Citas Puntuales" },
    { icon: <Award size={20} />, text: "Tecnología Médica" },
  ];

  return (
    <section className="relative min-h-[90vh] md:min-h-screen flex items-center overflow-hidden pt-24 pb-12 md:pt-20 bg-slate-50">
      
      {/* 1. CONTENEDOR DE IMAGEN OPTIMIZADO */}
      <div className="absolute inset-0 z-0 flex justify-end">
        <div className="relative w-full lg:w-[85%] h-full">
          <Image
            src="/podocare/hero.jpg" 
            alt="Clínica PodoCare"
            fill
            quality={100}
            sizes="(max-width: 1024px) 100vw, 80vw"
            // Ajuste responsive: object-center en móviles para capturar mejor la escena
            className="object-cover object-center md:object-right opacity-40 md:opacity-60 lg:opacity-100 transition-opacity duration-1000"
            priority
          />
          
          {/* Degradados adaptativos */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-transparent to-slate-50 md:hidden" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-50 via-slate-50/90 md:via-slate-50/10 to-transparent" />
          
          {/* Overlay sutil para mejorar legibilidad en móviles */}
          <div className="absolute inset-0 bg-white/20 lg:hidden backdrop-blur-[1px]" />
        </div>
      </div>

      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        <div className="max-w-4xl">
          <div className={`space-y-8 md:space-y-12 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            
            {/* Tag Superior */}
            <div className="inline-flex items-center gap-3 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-white shadow-sm border border-pink-50">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D929AA] opacity-40"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D929AA]"></span>
              </span>
              <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">
                Experiencia Podológica Superior
              </span>
            </div>

            {/* Título - Ajuste de escala de texto para móviles */}
            <div className="space-y-4 md:space-y-6">
              <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-serif leading-[1.1] text-gray-900">
                Tu salud  <br className="hidden sm:block" />
                <span className="italic text-[#BF2496] font-medium">a cada paso</span>
              </h1>
              <p className="text-base md:text-xl text-gray-700 max-w-lg leading-relaxed font-normal">
                Especialistas en el cuidado integral de tus pies con tecnología avanzada y atención personalizada.
              </p>
            </div>

            {/* Botones - Stack vertical en móviles muy pequeños */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={generateWhatsAppURL("hero")}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-3 bg-[#BF2496] hover:bg-[#D929AA] text-white font-bold uppercase tracking-widest text-[10px] md:text-[11px] py-4 md:py-5 px-8 md:px-10 rounded-full shadow-lg transition-all duration-300 hover:-translate-y-1 active:scale-95"
              >
                <Smartphone size={18} />
                Agendar Consulta
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
              
              <Link href="/servicios" className="inline-flex items-center justify-center py-4 md:py-5 px-8 md:px-10 rounded-full bg-white/90 backdrop-blur-md border border-gray-200 text-gray-700 font-bold uppercase tracking-widest text-[10px] md:text-[11px] hover:bg-white transition-all shadow-sm active:scale-95">
                Ver Servicios
              </Link>
            </div>

            {/* Indicadores - Grid de 2 columnas en móvil para ahorrar espacio vertical */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-6 pt-8 md:pt-10 border-t border-gray-200/60 max-w-2xl">
              {trustIndicators.map((item, i) => (
                <div key={i} className="flex items-center gap-2 md:gap-3">
                  <div className="text-[#BF2496] bg-pink-50 p-1.5 md:p-2 rounded-lg shrink-0">
                    {item.icon}
                  </div>
                  <span className="text-[9px] md:text-[11px] font-bold uppercase tracking-tight text-gray-800 leading-tight">
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Decoración inferior */}
      <div className="absolute bottom-0 right-0 w-full h-16 md:h-24 bg-gradient-to-t from-slate-50 to-transparent z-10" />
    </section>
  );
}