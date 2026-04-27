"use client";

import { useEffect, useRef, useState } from "react";
import { 
  ShieldCheck, 
  Stethoscope, 
  ArrowUpRight, 
  Microscope,
  Award
} from 'lucide-react';

const benefits = [
  {
    title: "Esterilización Profesional",
    description: "Protocolos rigurosos de desinfección química y autoclave para cada herramienta. Tu seguridad es nuestra prioridad.",
    tag: "Seguridad 100%",
    icon: <ShieldCheck className="w-6 h-6" />,
    bgColor: "bg-[#05F2DB]", // Cyan
    textColor: "text-gray-900",
    gridArea: "lg:col-span-2 lg:row-span-1",
    image: "http://googleusercontent.com/image_collection/image_retrieval/629634509902707308_0"
  },
  {
    title: "Tecnología",
    description: "Equipos de vanguardia para diagnósticos precisos.",
    tag: "Innovación",
    icon: <Microscope className="w-6 h-6" />,
    bgColor: "bg-[#BF2496]", // Magenta
    textColor: "text-white",
    gridArea: "lg:col-span-1 lg:row-span-1",
    image: "http://googleusercontent.com/image_collection/image_retrieval/14901434410520198277_1"
  },
  {
    title: "Enfoque Clínico",
    description: "Personal de enfermería especializado en la salud de tus pies.",
    tag: "Especialistas",
    icon: <Stethoscope className="w-6 h-6" />,
    bgColor: "bg-[#F285C1]", // Rosa
    textColor: "text-white",
    gridArea: "lg:col-span-1 lg:row-span-2",
    image: "http://googleusercontent.com/image_collection/image_retrieval/5810956768333585590_0"
  },
  {
    title: "Resultados Garantizados",
    description: "Alivio inmediato y planes de tratamiento con seguimiento continuo para tu bienestar.",
    tag: "Confianza",
    icon: <Award className="w-6 h-6" />,
    bgColor: "bg-gray-900", // Negro
    textColor: "text-white",
    gridArea: "lg:col-span-2 lg:row-span-1",
    image: "http://googleusercontent.com/image_collection/image_retrieval/8840330271708078692_0"
  },
    {
    title: "Resultados Garantizados",
    description: "Alivio inmediato y planes de tratamiento con seguimiento continuo para tu bienestar.",
    tag: "Confianza",
    icon: <Award className="w-6 h-6" />,
    bgColor: "bg-gray-900", // Negro
    textColor: "text-white",
    gridArea: "lg:col-span-2 lg:row-span-1",
    image: "http://googleusercontent.com/image_collection/image_retrieval/8840330271708078692_0"
  }
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
    <section ref={sectionRef} className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        
        {/* Header minimalista */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#BF2496] mb-4">
              ¿Por qué PodoCare?
            </h2>
            <h3 className="text-4xl md:text-6xl font-serif italic text-gray-900 leading-tight">
              Excelencia médica en <br />
              <span className="text-[#05F2DB] not-italic font-sans font-bold">cada detalle.</span>
            </h3>
          </div>
          <p className="text-gray-500 font-light max-w-sm border-l-2 border-[#F285C1] pl-6 italic">
            "Transformamos el cuidado de los pies en una experiencia clínica de alto nivel en Mosquera."
          </p>
        </div>

        {/* Bento Grid con Imágenes de Internet */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[280px]">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className={`relative rounded-[2.5rem] p-8 flex flex-col justify-between overflow-hidden group transition-all duration-700 ${benefit.gridArea} ${benefit.bgColor} ${benefit.textColor} ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Imagen de fondo con efecto de mezcla */}
              <div className="absolute inset-0 z-0">
                <img 
                  src={benefit.image} 
                  alt={benefit.title}
                  className="w-full h-full object-cover opacity-20 mix-blend-multiply grayscale group-hover:grayscale-0 group-hover:opacity-40 group-hover:scale-110 transition-all duration-700"
                />
              </div>

              {/* Contenido Superior */}
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-white/20 backdrop-blur-md rounded-2xl border border-white/10 text-current">
                    {benefit.icon}
                  </div>
                  <span className="text-[9px] font-black uppercase tracking-widest bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
                    {benefit.tag}
                  </span>
                </div>
                <h4 className="text-2xl font-bold mb-3 tracking-tight leading-none">
                  {benefit.title}
                </h4>
              </div>

              {/* Contenido Inferior */}
              <div className="relative z-10 flex items-end justify-between">
                <p className="text-sm font-medium leading-tight max-w-[75%] opacity-90">
                  {benefit.description}
                </p>
                <div className="w-10 h-10 rounded-full border border-current flex items-center justify-center group-hover:bg-white group-hover:text-gray-900 transition-all duration-300 flex-shrink-0">
                  <ArrowUpRight size={20} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Footer */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 py-8 border-y border-gray-100">
          {[
            { label: "Instrumental", value: "100% Estéril" },
            { label: "Atención", value: "Personalizada" },
            { label: "Ubicación", value: "Mosquera" },
            { label: "Especialidad", value: "Podología" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#BF2496] mb-1">{stat.label}</p>
              <p className="text-lg font-bold text-gray-900">{stat.value}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}