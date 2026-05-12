"use client";

import { Footprints, Activity, Zap, Smartphone } from 'lucide-react';
import { generateWhatsAppURL } from "@/utils/whatsapp";

const serviceGroups = [
  {
    title: "Podología",
    subtitle: "Cuidado del Pie",
    image: "/equipo2.webp",
    icon: <Footprints className="text-white" size={24} />,
    color: "#05F2DB",
    services: ["Quiropedia", "Uña Encarnada", "Verruga Plantar", "Fenolización", "Plantillas Ortopédicas"]
  },
  {
    title: "Enfermería",
    subtitle: "Atención Técnica",
    image: "/consultorio2.webp",
    icon: <Activity className="text-white" size={24} />,
    color: "#D929AA",
    services: ["Signos Vitales", "Lavado de Oído", "Inyectología", "Retiro de Puntos", "Cambio de Sondas"]
  },
  {
    title: "Tecnología Clínica",
    subtitle: "Diagnóstico",
    image: "/equipo1.webp",
    icon: <Zap className="text-white" size={24} />,
    color: "#BF2496",
    services: ["Ozonoterapia", "Láser Terapéutico", "KOH - Hongos", "Silonails", "Urea 40%"]
  }
];

export default function Services() {
  return (
    <main className="bg-white min-h-screen">
      <section id="servicios" className="flex flex-col">

        {/* Cabecera Corregida para alineación perfecta */}
        <div className="bg-white py-16 lg:py-24 border-b border-gray-100">
          {/* Añadimos el container y px-6 lg:px-16 para que coincida con Benefits */}
          <div className="container mx-auto px-6 lg:px-16"> 
            <div className="max-w-4xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-[2px] w-12 bg-[#BF2496]" />
                <span className="text-xs font-black uppercase tracking-[0.5em] text-[#BF2496]">
                  Lo que ofrecemos
                </span>
              </div>
              <h2 className="text-5xl md:text-7xl font-serif italic text-gray-900 leading-[1.1]">
                Nuestras <br />
                <span className="text-[#05F2DB] not-italic font-sans uppercase tracking-tighter">
                  Especialidades.
                </span>
              </h2>
              <p className="text-gray-400 text-sm md:text-base font-light mt-8 max-w-xl leading-relaxed">
                Atención médica profesional diseñada para tu recuperación y vitalidad.
                Tecnología de vanguardia y especialistas a tu servicio.
              </p>
            </div>
          </div>
        </div>

        {/* Columnas de servicios */}
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
              {/* Imagen de fondo */}
              <div className="absolute inset-0 pointer-events-none">
                <img
                  src={group.image}
                  alt={group.title}
                  className="w-full h-full object-cover opacity-60 lg:opacity-40 lg:group-hover:opacity-20 lg:scale-100 lg:group-hover:scale-110 transition-all duration-[1200ms]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent lg:from-black/75 lg:via-transparent" />
              </div>

              {/* Contenido */}
              <div className="relative h-full flex flex-col justify-end p-8 lg:p-20 pb-14 lg:pb-28 z-20 text-white">

                <div className="w-full lg:transform lg:translate-y-32 lg:group-hover:translate-y-0 transition-transform duration-700 ease-out">

                  {/* Etiqueta */}
                  <p className="text-[10px] lg:text-xs uppercase tracking-[0.6em] font-light text-white/60 mb-5">
                    {group.subtitle}
                  </p>

                  {/* Título */}
                  <h3 className="text-5xl md:text-6xl lg:text-7xl font-extralight uppercase tracking-[0.06em] leading-none mb-10">
                    {group.title}
                  </h3>

                  {/* Lista de servicios */}
                  <div className="lg:grid lg:grid-rows-[0fr] lg:group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-700 ease-out">
                    <div className="overflow-hidden">
                      <ul className="space-y-4 mb-12 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-500 delay-300">
                        {group.services.map((service, i) => (
                          <li key={i} className="flex items-center gap-4 text-base lg:text-lg font-light text-white/80 tracking-wide">
                            <span className="w-1.5 h-1.5 rounded-full bg-white/50 shrink-0" />
                            {service}
                          </li>
                        ))}
                      </ul>

                      <a
                        href={generateWhatsAppURL("services")}
                        className="inline-flex items-center gap-3 px-10 py-4 border border-white/40 text-white rounded-full text-xs font-light uppercase tracking-[0.35em] hover:bg-white hover:text-gray-900 transition-all duration-300 w-full lg:w-auto justify-center lg:justify-start"
                      >
                        <Smartphone size={16} />
                        Agendar Consulta
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
