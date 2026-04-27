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
    { icon: <ShieldCheck size={22} />, text: "Podólogos Titulados" },
    { icon: <Clock3 size={22} />, text: "Citas Puntuales" },
    { icon: <Award size={22} />, text: "Tecnología Médica" },
  ];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      
      {/* 1. FONDO CON IMAGEN Y OVERLAY SOFISTICADO */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/podocare/hero.jpg" 
          alt="Clínica PodoCare - Especialistas en Podología"
          fill
          className="object-cover object-center transition-transform duration-[10s] ease-out"
          style={{ transform: isVisible ? 'scale(1)' : 'scale(1.1)' }}
          priority
        />
        
        {/* Gradiente Elegante: Del blanco sólido al transparente para suavizar la imagen */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/30 to-transparent" />
        
        {/* Destello sutil de color de marca */}
        <div className="absolute -left-20 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#F285C1]/20 blur-[120px] rounded-full" />
      </div>

      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        <div className="max-w-3xl">
          
          <div className={`space-y-10 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            
            {/* Tag Superior */}
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white shadow-sm border border-gray-100">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D929AA] opacity-40"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D929AA]"></span>
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-500">
                Experiencia Podológica Superior
              </span>
            </div>

            {/* Título Elegante */}
            <div className="space-y-6">
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-serif leading-[1.1] tracking-tight text-gray-900">
                Tu salud comienza <br />
                <span className="italic text-[#BF2496] font-medium">en cada paso.</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 max-w-lg leading-relaxed font-light">
                Somos especialistas en el cuidado de tus pies, contamos con diferentes terapias alternativas 
              </p>
            </div>

            {/* Botones de Acción */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a
                href={generateWhatsAppURL("hero")}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#D929AA] to-[#F285C1] text-white font-bold uppercase tracking-widest text-[11px] py-5 px-10 rounded-full shadow-xl shadow-[#D929AA]/20 hover:shadow-2xl hover:shadow-[#D929AA]/30 transition-all duration-300 hover:-translate-y-1"
              >
                <Smartphone size={18} />
                Agendar Consulta Online
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
              
              <Link href="/servicios" className="inline-flex items-center justify-center py-5 px-10 rounded-full bg-white border border-gray-200 text-gray-700 font-bold uppercase tracking-widest text-[11px] hover:bg-gray-50 transition-all shadow-sm">
                Explorar Servicios
              </Link>
            </div>

            {/* Indicadores de Confianza */}
            <div className="flex flex-wrap gap-x-12 gap-y-6 pt-8 border-t border-gray-100">
              {trustIndicators.map((item, i) => (
                <div key={i} className="flex items-center gap-4 group">
                  <div className="text-[#05F2DB]">
                    {item.icon}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-800">
                      {item.text}
                    </span>
                    <span className="text-[9px] text-gray-400 font-medium uppercase mt-0.5">Certificación Médica</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Acento lateral sutil (menos invasivo) */}
      <div className="absolute bottom-0 right-0 w-1/3 h-1 bg-gradient-to-l from-[#05F2DB] to-transparent" />
    </section>
  );
}