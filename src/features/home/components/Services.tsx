"use client";

import { Check, Footprints, Activity, Smartphone, Zap, ShieldCheck } from 'lucide-react';
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
      <section className="w-full py-20 lg:py-28 bg-white overflow-hidden">
        <div className="container mx-auto px-6 lg:px-16">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

            {/* Columna de Texto */}
            <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#BF2496]/10 border border-[#BF2496]/20 mb-6">
                <ShieldCheck size={14} className="text-[#BF2496]" />
                <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-[#BF2496]">
                  Servicios Especializados
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif italic text-gray-900 mb-6 leading-[1.1]">
                Cuidado integral <br className="hidden sm:block" /> para tu{" "}
                <span className="text-[#BF2496] not-italic font-sans font-bold">salud y bienestar.</span>
              </h1>

              <p className="text-gray-500 text-sm md:text-lg font-light leading-relaxed max-w-lg mb-10">
                Combinamos tecnología médica avanzada con un enfoque humano para ofrecerte los mejores tratamientos en podología y enfermería.
              </p>

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
                  className="w-full sm:w-auto text-center px-8 py-4 rounded-full border border-gray-200 bg-white text-gray-700 font-bold text-[11px] uppercase tracking-widest hover:bg-[#BF2496] hover:text-white hover:border-[#BF2496] transition-all active:scale-95"
                >
                  Agendar Cita
                </a>
              </div>
            </div>

            {/* Columna de Imagen */}
            <div className="w-full lg:w-1/2 flex justify-center">
              <div className="relative w-full max-w-sm lg:max-w-md">
                <div className="aspect-[3/4] rounded-[2.5rem] overflow-hidden shadow-2xl shadow-gray-200/60">
                  <img
                    src="/doctorapodocarehero.webp"
                    alt="Especialista PodoCare"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-3xl bg-[#BF2496]/10 -z-10" />
                <div className="absolute -top-4 -left-4 w-16 h-16 rounded-2xl bg-[#05F2DB]/10 -z-10" />
              </div>
            </div>

          </div>
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