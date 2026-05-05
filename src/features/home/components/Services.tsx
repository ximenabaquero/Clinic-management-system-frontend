"use client";

import { Check, Droplet, Footprints, Activity, Smartphone, ChevronDown, Zap, Star, ShieldCheck } from 'lucide-react';
import { generateWhatsAppURL } from "@/utils/whatsapp";

const serviceGroups = [
  /* {
    title: "Sueroterapia",
    subtitle: "Bienestar Endovenoso",
    image: "/equipo2.png",
    icon: <Droplet className="text-[#F285C1]" size={28} />,
    color: "#F285C1",
    services: [
      "Sueroterapia Détox",
      "Fortalecimiento Inmunitario",
      "Aumento de Energía",
      "Rejuvenecimiento Celular",
      "Apoyo en Pérdida de Peso",
      "Mejora de Desempeño Deportivo",
      "Mejora de Memoria y Enfoque"
    ]
  }, */
  {
    title: "Podología",
    subtitle: "Cuidado del Pie",
    image: "/equipo2.png",
    icon: <Footprints className="text-[#05F2DB]" size={28} />,
    color: "#05F2DB",
    services: [
      "Quiropedia",
      "Uña Encarnada (Onicocriptosis)",
      "Verruga Plantar",
      "Fenolización",
      "Exostosis",
      "Heloma Plantar",
      "Bloqueo Anestésico",
      "Ortonixia",
      "Ortesis de Silicona",
      "Plantillas Ortopédicas",
    ]
  },
  {
    title: "Enfermería",
    subtitle: "Atención Técnica",
    image: "/consultorio2.png",
    icon: <Activity className="text-[#D929AA]" size={28} />,
    color: "#D929AA",
    services: [
      "Toma de Signos Vitales",
      "Lavado de Oído Profesional",
      "Inyectología Certificada",
      "Retiro de Puntos",
      "Cambio de Sondas",
    ]
  },
  {
    title: "Tecnología Clínica",
    subtitle: "Diagnóstico y Tratamiento",
    image: "/equipo1.png",
    icon: <Zap className="text-[#BF2496]" size={28} />,
    color: "#BF2496",
    services: [
      "Ozonoterapia",
      "Láser Terapéutico",
      "Alta Frecuencia",
      "KOH — Diagnóstico de Hongos",
      "Cultivo Micológico",
      "Silonails — Reconstrucción de Uñas",
      "Aceite de Ozono Medicinal",
      "Urea 40% — Hiperqueratosis",
    ]
  }
];

export default function Services() {
  return (
    <main className="bg-white">
      {/* HERO SECTION */}
      <section className="w-full bg-white flex items-stretch overflow-hidden relative min-h-[600px]">

        {/* Fondo decorativo lado derecho */}
        <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-bl from-[#F285C1]/10 via-[#05F2DB]/5 to-transparent pointer-events-none" />
        {/* Círculo decorativo */}
        <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-[#BF2496]/5 blur-3xl pointer-events-none" />
        <div className="absolute top-16 right-[40%] w-48 h-48 rounded-full bg-[#05F2DB]/8 blur-2xl pointer-events-none" />

        <div className="container mx-auto px-6 lg:px-16 relative z-10">
          <div className="flex flex-col lg:flex-row items-end gap-10 lg:gap-0">

            {/* Columna izquierda: texto */}
            <div className="flex-1 py-20 lg:py-28 flex flex-col justify-center">

              {/* Badge mejorado */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#05F2DB]/10 border border-[#05F2DB]/20 mb-8 w-fit">
                <ShieldCheck size={14} className="text-[#05F2DB]" />
                <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#05F2DB]">
                  Servicios Especializados
                </span>
              </div>

              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif italic text-gray-900 mb-6 md:mb-8 leading-[1.1]">
                Cuidado integral <br className="hidden sm:block" /> para tu{" "}
                <span className="text-[#F285C1] not-italic font-sans font-bold">salud y bienestar.</span>
              </h2>

              <p className="text-gray-500 text-base md:text-lg font-light leading-relaxed max-w-lg mb-10">
                Combinamos tecnología médica avanzada con un enfoque humano para ofrecerte los mejores tratamientos en podología y enfermería.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-10">
                <a
                  href="#especialidades"
                  className="w-full sm:w-auto text-center px-8 py-4 bg-[#BF2496] text-white rounded-full font-bold text-xs uppercase tracking-widest hover:bg-[#D929AA] transition-all shadow-lg shadow-pink-500/20 active:scale-95"
                >
                  Explorar Servicios
                </a>
                <a
                  href={generateWhatsAppURL("services_hero")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto text-center px-8 py-4 rounded-full border border-gray-200 bg-white text-gray-700 font-bold text-xs uppercase tracking-widest hover:border-[#BF2496] hover:text-[#BF2496] transition-all active:scale-95"
                >
                  Agendar Cita
                </a>
              </div>

              {/* Prueba social */}
              <div className="flex items-center gap-4">
                <div className="flex -space-x-3">
                  {[11, 12, 13].map((i) => (
                    <div key={i} className="w-9 h-9 rounded-full border-2 border-white bg-gray-100 overflow-hidden">
                      <img src={`https://i.pravatar.cc/80?img=${i}`} alt="Paciente" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex text-yellow-400 mb-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={11} fill="currentColor" />
                    ))}
                  </div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">+500 Pacientes Satisfechos</p>
                </div>
              </div>

            </div>

            {/* Columna derecha: imagen doctora */}
            <div className="flex-1 flex justify-center lg:justify-end items-end self-end">
              <img
                src="/doctorapodocare.PNG"
                alt="Doctora PodoCare"
                className="w-full max-w-[280px] lg:max-w-[340px] xl:max-w-[400px] object-contain object-bottom drop-shadow-xl"
              />
            </div>

          </div>
        </div>

        {/* Indicador de Scroll */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce hidden md:block">
          <ChevronDown className="text-gray-300" size={28} />
        </div>
      </section>

      {/* SECCIÓN DE TARJETAS (Especialidades) */}
      <section id="especialidades" className="py-16 md:py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-6 lg:px-16 relative z-10">
          
          {/* Encabezado */}
          <div className="max-w-3xl mb-12 md:mb-16 text-left">
            <h2 className="text-4xl md:text-6xl font-serif italic text-gray-900 mb-4 md:mb-6 leading-tight">
              Nuestras <br className="md:hidden" /> <span className="text-[#BF2496] not-italic font-bold font-sans">Especialidades</span>
            </h2>
            <p className="text-gray-500 text-base md:text-lg font-light leading-relaxed">
              Atención médica profesional en podología, enfermería y tecnología clínica, diseñadas para tu recuperación y vitalidad.
            </p>
          </div>

          {/* Grid: 1 columna en móvil, 2 en tablet, 3 en desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {serviceGroups.map((group, index) => (
              <div 
                key={index}
                className="relative bg-white rounded-[2.5rem] md:rounded-[3.5rem] border border-gray-100 shadow-sm hover:shadow-2xl lg:hover:-translate-y-2 transition-all duration-500 group flex flex-col h-full"
              >
                {/* Imagen de Cabecera */}
                <div className="relative h-56 md:h-72 w-full rounded-t-[2.5rem] md:rounded-t-[3.5rem] overflow-hidden transform-gpu">
                  <img 
                    src={group.image} 
                    alt={group.title}
                    className="w-full h-full object-cover transition-transform duration-700 lg:group-hover:scale-110 transform-gpu"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Contenedor de Texto */}
                <div className="px-6 md:px-10 pb-8 md:pb-10 flex flex-col flex-grow relative">
                  
                  {/* Icono Flotante */}
                  <div className="relative -mt-10 md:-mt-12 mb-4 md:mb-6 z-30">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl md:rounded-3xl bg-white shadow-xl flex items-center justify-center border border-gray-50 group-hover:rotate-6 transition-transform duration-500">
                      <div className="scale-90 md:scale-110">
                        {group.icon}
                      </div>
                    </div>
                  </div>

                  <div className="mb-6 md:mb-8">
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 leading-none">{group.title}</h3>
                    <p className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-[0.3em] text-gray-400 font-bold mt-2 md:mt-3">
                      {group.subtitle}
                    </p>
                  </div>

                  {/* Lista de Servicios */}
                  <ul className="space-y-3 md:space-y-4 mb-8 md:mb-10 flex-grow">
                    {group.services.map((service, sIndex) => (
                      <li key={sIndex} className="flex items-start gap-3 group/item">
                        <Check size={16} className="mt-1 flex-shrink-0" style={{ color: group.color }} strokeWidth={3} />
                        <span className="text-gray-600 font-medium text-sm md:text-base lg:text-sm group-hover/item:text-gray-900 transition-colors">
                          {service}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href={generateWhatsAppURL("services")}
                    target="_blank"
                    className="w-full py-4 rounded-2xl bg-gray-50 text-gray-800 text-[10px] font-black uppercase tracking-widest text-center hover:bg-gray-900 hover:text-white transition-all duration-300 flex items-center justify-center gap-2 active:scale-95"
                  >
                    <Smartphone size={14} />
                    Consultar Área
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Info Extra */}
          <div className="mt-12 md:mt-16 text-center px-4">
              <p className="text-[9px] md:text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] md:tracking-[0.4em] leading-relaxed">
                Atención bajo protocolos de seguridad clínica <br className="md:hidden" /> • PodoCare Mosquera
              </p>
          </div>
        </div>
      </section>
    </main>
  );
}