"use client";

import { Check, Footprints, Activity, Zap, Smartphone } from 'lucide-react';
import { generateWhatsAppURL } from "@/utils/whatsapp";

const serviceGroups = [
  {
    title: "Podología",
    subtitle: "Cuidado del Pie",
    image: "/equipo2.webp",
    icon: <Footprints className="text-white" size={32} />,
    color: "#05F2DB",
    services: ["Quiropedia", "Uña Encarnada", "Verruga Plantar", "Fenolización", "Plantillas Ortopédicas"]
  },
  {
    title: "Enfermería",
    subtitle: "Atención Técnica",
    image: "/consultorio2.webp",
    icon: <Activity className="text-white" size={32} />,
    color: "#D929AA",
    services: ["Signos Vitales", "Lavado de Oído", "Inyectología", "Retiro de Puntos", "Cambio de Sondas"]
  },
  {
    title: "Tecnología Clínica",
    subtitle: "Diagnóstico",
    image: "/equipo1.webp",
    icon: <Zap className="text-white" size={32} />,
    color: "#BF2496",
    services: ["Ozonoterapia", "Láser Terapéutico", "KOH - Hongos", "Silonails", "Urea 40%"]
  }
];

export default function Services() {
  return (
    <main className="bg-white min-h-screen">
      <section id="servicios" className="flex flex-col">
        
        {/* Cabecera de Título: Espacio blanco antes de los servicios */}
        <div className="bg-white py-16 lg:py-24 px-6 lg:px-0 border-b border-gray-100">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif italic text-gray-900 leading-tight">
              Nuestras <span className="text-[#BF2496] not-italic font-bold font-sans">Especialidades</span>
            </h2>
            <div className="h-1 w-20 bg-[#05F2DB] mx-auto mt-6" />
            <p className="text-gray-500 text-sm md:text-lg font-light mt-6 max-w-2xl mx-auto leading-relaxed">
              Atención médica profesional diseñada para tu recuperación y vitalidad. 
              Tecnología de vanguardia y especialistas a tu servicio.
            </p>
          </div>
        </div>

        {/* Contenedor de Columnas: h-[700px] en desktop para que sea impactante */}
        <div className="flex flex-col lg:flex-row w-full lg:h-[750px] items-stretch overflow-hidden">
          {serviceGroups.map((group, index) => (
            <div
              key={index}
              className={`
                relative w-full lg:flex-1 group 
                transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] 
                lg:hover:flex-[3.5] 
                overflow-hidden border-b lg:border-b-0 lg:border-r border-white/10
                min-h-[550px] lg:min-h-0
              `}
              style={{ backgroundColor: group.color }}
            >
              {/* Imagen de Fondo */}
              <div className="absolute inset-0 pointer-events-none">
                <img
                  src={group.image}
                  alt={group.title}
                  className="w-full h-full object-cover opacity-60 lg:opacity-40 lg:group-hover:opacity-20 lg:scale-100 lg:group-hover:scale-110 transition-all duration-[1200ms]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent lg:from-black/80 lg:via-transparent" />
              </div>

              {/* Contenido */}
              <div className="relative h-full flex flex-col justify-end p-8 lg:p-16 pb-14 lg:pb-24 z-20 text-white">
                
                {/* Icono (Solo en móvil para no saturar desktop) */}
                <div className="mb-4 lg:hidden">
                  <div className="inline-block p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
                    {group.icon}
                  </div>
                </div>

                <div className="w-full lg:transform lg:translate-y-28 lg:group-hover:translate-y-0 transition-transform duration-700 ease-out">
                  <p className="text-[10px] lg:text-xs uppercase tracking-[0.4em] font-black text-[#05F2DB] mb-3">
                    {group.subtitle}
                  </p>
                  
                  <h3 className="text-3xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight uppercase drop-shadow-sm">
                    {group.title}
                  </h3>

                  {/* Servicios: Estáticos en móvil, expansivos en Desktop */}
                  <div className="lg:grid lg:grid-rows-[0fr] lg:group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-700 ease-out">
                    <div className="overflow-hidden">
                      <ul className="space-y-4 mb-10 border-l-2 border-[#05F2DB]/30 pl-5 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-500 delay-300">
                        {group.services.map((service, i) => (
                          <li key={i} className="flex items-center gap-3 text-sm lg:text-base font-medium">
                            <Check size={18} className="text-[#05F2DB] shrink-0" strokeWidth={3} />
                            {service}
                          </li>
                        ))}
                      </ul>

                      <a
                        href={generateWhatsAppURL("services")}
                        className="inline-flex items-center gap-3 px-10 py-5 bg-white text-gray-900 rounded-full text-xs font-black uppercase tracking-widest hover:bg-[#05F2DB] hover:text-white transition-all shadow-2xl active:scale-95 w-full lg:w-auto justify-center lg:justify-start"
                      >
                        <Smartphone size={18} /> Agendar Consulta
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}