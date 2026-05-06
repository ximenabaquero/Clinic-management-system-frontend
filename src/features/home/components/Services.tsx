"use client";

import { Check, Footprints, Activity, Smartphone, ChevronDown, Zap, ShieldCheck } from 'lucide-react';
import { generateWhatsAppURL } from "@/utils/whatsapp";

const serviceGroups = [
  {
    title: "Podología",
    subtitle: "Cuidado del Pie",
    image: "/equipo2.webp",
    icon: <Footprints className="text-[#05F2DB]" size={28} />,
    color: "#05F2DB",
    services: [
      "Quiropedia", "Uña Encarnada", "Verruga Plantar", "Fenolización", "Plantillas Ortopédicas",
    ]
  },
  {
    title: "Enfermería",
    subtitle: "Atención Técnica",
    image: "/consultorio2.webp",
    icon: <Activity className="text-[#D929AA]" size={28} />,
    color: "#D929AA",
    services: [
      "Signos Vitales", "Lavado de Oído", "Inyectología", "Retiro de Puntos", "Cambio de Sondas",
    ]
  },
  {
    title: "Tecnología Clínica",
    subtitle: "Diagnóstico",
    image: "/equipo1.webp",
    icon: <Zap className="text-[#BF2496]" size={28} />,
    color: "#BF2496",
    services: [
      "Ozonoterapia", "Láser Terapéutico", "KOH - Hongos", "Silonails", "Urea 40%",
    ]
  }
];

export default function Services() {
  return (
    <main className="bg-white">
      {/* HERO SECTION */}
      <section className="w-full min-h-[90vh] lg:min-h-screen flex items-center overflow-hidden ">

        {/* 1. Imagen de Fondo Completa */}
        <div className="absolute inset-0 z-0">
          <img
            src="/doctorapodocarehero.webp"
            alt="Fondo Doctora PodoCare"
            className="w-full h-full object-cover object-[75%] lg:object-right-top filter brightness-[0.5] lg:brightness-[0.65]"
          />
          {/* 2. Overlays Responsivos */}
          {/* Móvil: overlay más oscuro */}
          <div className="absolute inset-0 bg-black/60 lg:hidden z-10" />
          {/* Escritorio: degradado lateral oscuro */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-transparent to-slate-950 md:hidden" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 lg:via-slate-950/40 to-transparent" />
        </div>

        {/* 3. Contenido Principal */}
        <div className="container mx-auto px-6 lg:px-16 relative z-20">
          <div className="flex flex-col lg:flex-row items-center">
            
            {/* Columna de Texto */}
            <div className="w-full lg:w-2/3 xl:w-1/2 flex flex-col justify-center text-center lg:text-left items-center lg:items-start pt-20 pb-12 lg:py-0">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#05F2DB]/20 border border-[#05F2DB]/30 mb-6 backdrop-blur-md">
                <ShieldCheck size={14} className="text-[#05F2DB]" />
                <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-white lg:text-[#05F2DB]">
                  Servicios Especializados
                </span>
              </div>

              {/* Título Responsivo */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif italic text-white mb-6 leading-[1.1] drop-shadow-md">
                Cuidado integral <br className="hidden sm:block" /> para tu{" "}
                <span className="text-[#F285C1] not-italic font-sans font-bold block sm:inline">salud y bienestar.</span>
              </h1>

              {/* Párrafo Responsivo */}
              <p className="text-white lg:text-white text-sm md:text-lg font-light leading-relaxed max-w-lg mb-10 drop-shadow-sm lg:drop-shadow-none">
                Combinamos tecnología médica avanzada con un enfoque humano para ofrecerte los mejores tratamientos en podología y enfermería.
              </p>

              {/* Botones Responsivos */}
              <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                <a
                  href="#especialidades"
                  className="w-full sm:w-auto text-center px-8 py-4 bg-[#BF2496] text-white rounded-full font-bold text-[11px] uppercase tracking-widest hover:bg-[#D929AA] transition-all shadow-xl shadow-pink-500/20 active:scale-95"
                >
                  Explorar Servicios
                </a>
                <a
                  href={generateWhatsAppURL("services")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto text-center px-8 py-4 rounded-full border border-white/30 bg-white/10 text-white font-bold text-[11px] uppercase tracking-widest hover:bg-white hover:text-[#BF2496] transition-all backdrop-blur-sm active:scale-95"
                >
                  Agendar Cita
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* Indicador de Scroll (Oculto en móviles pequeños) */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce hidden md:block opacity-70 z-20">
          <ChevronDown className="text-white lg:text-[#BF2496]" size={32} />
        </div>
      </section>

      {/* SECCIÓN DE TARJETAS */}
      <section id="especialidades" className="py-16 lg:py-24 bg-white relative">
        <div className="container mx-auto px-6 lg:px-16">
          
          <div className="max-w-3xl mb-12 lg:mb-20">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif italic text-gray-900 mb-6 leading-tight">
              Nuestras <span className="text-[#BF2496] not-italic font-bold font-sans">Especialidades</span>
            </h2>
            <p className="text-gray-500 text-sm md:text-lg font-light leading-relaxed">
              Atención médica profesional diseñada para tu recuperación y vitalidad.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10">
            {serviceGroups.map((group, index) => (
              <div 
                key={index}
                className="bg-white rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col group overflow-hidden"
              >
                <div className="relative h-48 sm:h-64 overflow-hidden">
                  <img src={group.image} alt={group.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute bottom-4 left-6 p-3 bg-white rounded-2xl shadow-lg group-hover:rotate-6 transition-transform">
                    {group.icon}
                  </div>
                </div>

                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">{group.title}</h3>
                  <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-6">{group.subtitle}</p>
                  
                  <ul className="space-y-3 mb-8 flex-grow">
                    {group.services.map((service, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm text-gray-600">
                        <Check size={14} style={{ color: group.color }} strokeWidth={3} />
                        {service}
                      </li>
                    ))}
                  </ul>

                  <a
                    href={generateWhatsAppURL("services")}
                    className="w-full py-4 rounded-xl bg-gray-50 text-gray-800 text-[10px] font-black uppercase tracking-widest text-center hover:bg-gray-900 hover:text-white transition-all flex items-center justify-center gap-2"
                  >
                    <Smartphone size={14} /> Consultar
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}