"use client";

import { Check, Droplet, Footprints, Activity, Smartphone } from 'lucide-react';
import { generateWhatsAppURL } from "@/utils/whatsapp";
import ServicesHero from "@/app/servicios/components/hero";
const serviceGroups = [
  {
    title: "Sueroterapia",
    subtitle: "Bienestar Endovenoso",
    icon: <Droplet className="text-[#F285C1]" size={32} />,
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
  },
  {
    title: "Podología",
    subtitle: "Cuidado del Pie",
    icon: <Footprints className="text-[#05F2DB]" size={32} />,
    color: "#05F2DB",
    services: [
      "Pedicure Medicinal",
      "Tratamiento de Callos y Clavos",
      "Ojos de Pescado (Verrugas)",
      "Uñas Encarnadas (Onicocriptosis)",
      "Pie de Atleta y Micosis",
      "Plantillas Ortopédicas"
    ]
  },
  {
    title: "Enfermería",
    subtitle: "Atención Técnica",
    icon: <Activity className="text-[#D929AA]" size={32} />,
    color: "#D929AA",
    services: [
      "Toma de Signos Vitales",
      "Lavado de Oído Profesional",
      "Inyectología Certificada",
      "Retiro de Puntos",
      "Cambio de Sondas",
    ]
  }
];

export default function Services() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      
      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        
        {/* Encabezado de Sección */}
        <div className="max-w-3xl mb-16">
          <h2 className="text-5xl md:text-6xl font-serif italic text-gray-900 mb-6">
            Nuestros <span className="text-[#BF2496] not-italic font-bold font-sans">Especialidades</span>
          </h2>
          <p className="text-gray-500 text-lg font-light leading-relaxed">
            Ofrecemos atención médica integral dividida en tres áreas clave para garantizar tu salud y comodidad.
          </p>
        </div>

        {/* Grid de 3 Columnas */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {serviceGroups.map((group, index) => (
            <div 
              key={index}
              className="relative bg-white rounded-[3rem] border border-gray-100 p-10 shadow-sm hover:shadow-xl transition-all duration-500 group flex flex-col h-full"
            >
              {/* Icono y Título */}
              <div className="mb-8 flex items-center gap-5">
                <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                  {group.icon}
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-gray-900 leading-none">{group.title}</h3>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 font-bold mt-2">{group.subtitle}</p>
                </div>
              </div>

              {/* Lista de Servicios */}
              <ul className="space-y-4 mb-10 flex-grow">
                {group.services.map((service, sIndex) => (
                  <li key={sIndex} className="flex items-start gap-3 group/item">
                    <div className="mt-1">
                      <Check size={16} style={{ color: group.color }} strokeWidth={3} />
                    </div>
                    <span className="text-gray-600 font-medium text-sm group-hover/item:text-gray-900 transition-colors">
                      {service}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Botón de Acción por Área */}
              <a
                href={generateWhatsAppURL("services")}
                target="_blank"
                className="w-full py-4 rounded-2xl bg-gray-50 text-gray-800 text-[10px] font-black uppercase tracking-widest text-center hover:bg-gray-900 hover:text-white transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Smartphone size={14} />
                Consultar Área
              </a>
              
              {/* Decoración sutil en el fondo de la tarjeta */}
              <div 
                className="absolute -bottom-4 -right-4 w-32 h-32 rounded-full opacity-0 group-hover:opacity-5 transition-opacity duration-700 pointer-events-none"
                style={{ backgroundColor: group.color }}
              ></div>
            </div>
          ))}
        </div>

        {/* Nota al pie */}
        <div className="mt-16 p-8 rounded-[2rem] bg-[#F2F2F2] border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm">
               <Check className="text-[#05F2DB]" />
            </div>
            <p className="text-sm font-bold text-gray-700 uppercase tracking-tight">
              Todos nuestros servicios incluyen valoración previa profesional.
            </p>
          </div>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest text-center md:text-right">
            PodoCare Mosquera <br /> Salud a cada paso
          </p>
        </div>
      </div>
    </section>
  );
}