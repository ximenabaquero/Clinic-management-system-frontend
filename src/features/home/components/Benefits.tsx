"use client";

import { useEffect, useRef, useState } from "react";
import {
  ShieldCheck,
  Stethoscope,
  ArrowUpRight,
  Microscope,
  Award,
  Ruler
} from 'lucide-react';

const benefits = [
  {
    title: "Esterilización Profesional",
    description: "Protocolos rigurosos de autoclave. Tu seguridad es lo primero.",
    tag: "Bioseguridad",
    icon: <ShieldCheck className="w-6 h-6" />,
    color: "#05F2DB", // Cian
    gridArea: "lg:col-span-2 lg:row-span-1",
    image: "/equipo2.webp"
  },
  {
    title: "Alta Tecnología",
    description: "Diagnósticos con precisión milimétrica.",
    tag: "Equipos",
    icon: <Microscope className="w-6 h-6" />,
    color: "#BF2496", // Magenta
    gridArea: "lg:col-span-1 lg:row-span-1",
    image: "/equipo1.webp"
  },
  {
    title: "Enfoque Clínico Especializado",
    description: "Enfermería experta en la salud podológica integral.",
    tag: "Especialistas",
    icon: <Stethoscope className="w-6 h-6" />,
    color: "#F285C1", // Rosa suave
    gridArea: "lg:col-span-1 lg:row-span-2",
    image: "/piebb.webp"
  },
  {
    title: "Resultados Garantizados",
    description: "Planes de tratamiento con seguimiento continuo.",
    tag: "Confianza",
    icon: <Award className="w-6 h-6" />,
    color: "#111827", // Gray 900
    gridArea: "lg:col-span-1 lg:row-span-1",
    image: "/resultadogarantizado.webp"
  },
  {
    title: "Atención Premium",
    description: "Espacios diseñados para tu máximo confort.",
    tag: "Exclusivo",
    icon: <ArrowUpRight className="w-6 h-6" />,
    color: "#F3F4F6", // Gray 100
    gridArea: "lg:col-span-1 lg:row-span-1",
    image: "/saladeespera.webp"
  },
  {
    title: "Ortesis a Medida",
    description: "Biomecánica personalizada para corregir tu marcha.",
    tag: "Innovación",
    icon: <Ruler className="w-6 h-6" />,
    color: "#D929AA", // Rosa fuerte
    gridArea: "lg:col-span-2 lg:row-span-1",
    image: "/pies_corriendo.webp"
  },
];

export default function BenefitsGrid() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="benefits" ref={sectionRef} className="py-24 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-6 lg:px-16">
        
        {/* Header con Estilo Editorial */}
        <div className="max-w-4xl mb-20">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-[2px] w-12 bg-[#BF2496]" />
            <span className="text-xs font-black uppercase tracking-[0.5em] text-[#BF2496]">
              ¿Por qué elegir PodoCare?
            </span>
          </div>
          <h3 className="text-5xl md:text-7xl font-serif italic text-gray-900 leading-[1.1]">
            Excelencia clínica en <br />
            <span className="text-[#05F2DB] not-italic font-sans   uppercase tracking-tighter">
              cada detalle.
            </span>
          </h3>
        </div>

        {/* Bento Grid Innovador */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[320px]">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className={`
                relative rounded-[3rem] group overflow-hidden border border-white/20 shadow-sm
                transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)]
                ${benefit.gridArea}
                ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}
              `}
              style={{ 
                transitionDelay: `${index * 150}ms`,
                backgroundColor: benefit.color 
              }}
            >
              {/* Capa de Imagen con Máscara de Degradado */}
              <div className="absolute inset-0 z-0">
                <img 
                  src={benefit.image} 
                  alt={benefit.title}
                  className="w-full h-full object-cover opacity-30 group-hover:opacity-10 group-hover:scale-110 transition-all duration-1000 grayscale group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-black/20" />
              </div>

              {/* Vidrio Superior (Icono y Tag) */}
              <div className="absolute top-6 left-6 right-6 flex justify-between items-start z-20">
                <div className="p-4 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 text-white shadow-xl group-hover:bg-[#05F2DB] group-hover:text-gray-900 transition-colors duration-500">
                  {benefit.icon}
                </div>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] py-2 px-4 rounded-full bg-black/10 backdrop-blur-md text-white border border-white/10">
                  {benefit.tag}
                </span>
              </div>

              {/* Bloque de Texto Inferior */}
              <div className="absolute inset-x-0 bottom-0 p-8 lg:p-10 z-20 text-white">
                <div className="overflow-hidden">
                  <h4 className="text-2xl lg:text-3xl font-extralight tracking-wide leading-snug mb-4 transform group-hover:-translate-y-1 transition-transform duration-500">
                    {benefit.title}
                  </h4>
                </div>

                <div className="opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                  <p className="text-sm font-light leading-relaxed text-white/75 tracking-wide">
                    {benefit.description}
                  </p>
                </div>
              </div>

              {/* Decoración de fondo (Brillo radial) */}
              <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-[80px] group-hover:bg-white/20 transition-colors duration-700" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}