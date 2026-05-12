"use client";

import { Target, Eye, Quote, ShieldCheck, Award } from 'lucide-react';

export default function CorporateIdentity() {
  return (
    <section id="vision-mision" className="py-20 lg:py-32 bg-[#E0F7F5] relative overflow-hidden">
      
      {/* CÍRCULOS DECORATIVOS - Mantengo tu estética */}
      <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-[#9FDDD7] opacity-60" />
      <div className="absolute top-1/4 -left-32 w-64 h-64 rounded-full bg-[#9FDDD7] opacity-40 blur-2xl" />
      
      <div className="container mx-auto px-6 lg:px-16 relative z-10 ">

        {/* CABECERA EDITORIAL (Alineada con el resto del sitio) */}
        <div className="max-w-4xl mb-20">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-[2px] w-12 bg-[#BF2496]" />
            <span className="text-xs font-black uppercase tracking-[0.5em] text-[#BF2496]">
              Identidad Corporativa
            </span>
          </div>
          <h2 className="text-5xl md:text-7xl font-serif italic text-[#0D4A47] leading-[1.1]">
            Transformando la <br />
            <span className="text-[#009688] not-italic font-sans uppercase tracking-tighter">
              salud podológica.
            </span>
          </h2>
        </div>

        {/* CONTENIDO DE CITA (Ahora puede ser centrado o mantener la izquierda) */}
        <div className="max-w-4xl mx-auto text-center mb-20 lg:mb-28">
          <div className="relative px-4">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md h-32 bg-[#9FDDD7]/30 rounded-full blur-3xl -z-10" />
            <Quote className="absolute -top-8 -left-2 md:-left-8 text-[#0D4A47]/10 w-12 h-12 lg:w-20 lg:h-20" />
            <p className="text-[#0D4A47]/90 text-lg md:text-xl lg:text-2xl font-light leading-relaxed italic relative z-10">
              PodoCare nace con el propósito de transformar la salud podológica mediante una atención especializada, humana y profesional...
            </p>
          </div>
        </div>

        {/* MISIÓN Y VISIÓN */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">

          {/* Tarjeta Misión */}
          <div className="group relative bg-white/50 backdrop-blur-sm border border-[#0D4A47]/10 p-8 md:p-12 rounded-[3rem] hover:bg-white/70 transition-all duration-500 overflow-hidden">
            {/* Círculo decorativo interno */}
            <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-[#9FDDD7]/40 group-hover:scale-150 transition-transform duration-700" />

            <div className="flex flex-col md:flex-row gap-6 items-start relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-[#05F2DB] flex items-center justify-center shrink-0 shadow-lg shadow-black/10 group-hover:scale-110 transition-transform">
                <Target className="text-[#0D4A47]" size={28} />
              </div>
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-[#0D4A47] mb-4 tracking-tight">Misión</h3>
                <p className="text-[#0D4A47]/80 text-base md:text-lg font-light leading-relaxed">
                  Brindar servicios especializados en podología con <span className="text-[#009688] font-medium">altos estándares de calidad, seguridad y calidez humana</span>, ofreciendo soluciones efectivas, preventivas y personalizadas que contribuyan a la salud, movilidad y bienestar integral de nuestros pacientes.
                </p>
              </div>
            </div>
          </div>

          {/* Tarjeta Visión */}
          <div className="group relative bg-white/50 backdrop-blur-sm border border-[#0D4A47]/10 p-8 md:p-12 rounded-[3rem] hover:bg-white/70 transition-all duration-500 overflow-hidden">
            {/* Círculo decorativo interno */}
            <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-[#9FDDD7]/40 group-hover:scale-150 transition-transform duration-700" />

            <div className="flex flex-col md:flex-row gap-6 items-start relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-[#F285C1] flex items-center justify-center shrink-0 shadow-lg shadow-black/10 group-hover:scale-110 transition-transform">
                <Eye className="text-white" size={28} />
              </div>
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-[#0D4A47] mb-4 tracking-tight">Visión</h3>
                <p className="text-[#0D4A47]/80 text-base md:text-lg font-light leading-relaxed">
                  Ser la <span className="text-[#0D4A47] font-medium underline decoration-[#F285C1]/50 underline-offset-4">empresa referente en podología</span> a nivel regional y nacional para el año 2030, reconocida por su excelencia clínica, innovación en tratamientos, servicio humanizado y liderazgo en prevención y educación para la salud del pie.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Sello de confianza inferior */}
        <div className="mt-20 flex flex-wrap justify-center gap-8 opacity-40">
           <div className="flex items-center gap-2 text-[#0D4A47] font-bold text-[10px] uppercase tracking-widest">
              <ShieldCheck size={18} />
              Seguridad Clínica
           </div>
           <div className="flex items-center gap-2 text-[#0D4A47] font-bold text-[10px] uppercase tracking-widest">
              <ShieldCheck size={18} />
              Excelencia Profesional
           </div>
        </div>
      </div>
    </section>
  );
}
