"use client";

import { Target, Eye, Quote, ShieldCheck, Award } from 'lucide-react';

export default function CorporateIdentity() {
  return (
    <section className="py-20 lg:py-32 bg-[#67776a] relative overflow-hidden">
      
      {/* CÍRCULOS DECORATIVOS (#59645b) */}
      <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-[#59645b] opacity-60" />
      <div className="absolute top-1/4 -left-32 w-64 h-64 rounded-full bg-[#59645b] opacity-40 blur-2xl" />
      <div className="absolute bottom-10 right-1/4 w-40 h-40 rounded-full bg-[#59645b] opacity-50" />
      <div className="absolute -bottom-16 -left-16 w-96 h-96 rounded-full bg-[#59645b] opacity-30" />

      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        
        {/* PRESENTACIÓN CORPORATIVA */}
        <div className="max-w-4xl mx-auto text-center mb-20 lg:mb-28">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-8 backdrop-blur-md">
            <Award size={16} className="text-[#05F2DB]" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white">
              Identidad Corporativa
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif italic text-white mb-8 leading-tight">
            Transformando la <span className="text-[#05F2DB] not-italic font-sans font-bold">salud podológica</span>
          </h2>
          
          <div className="relative px-4">
            {/* Círculo decorativo pequeño detrás de la cita */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md h-32 bg-[#59645b]/30 rounded-full blur-3xl -z-10" />
            
            <Quote className="absolute -top-8 -left-2 md:-left-8 text-white/10 w-12 h-12 lg:w-20 lg:h-20" />
            <p className="text-white/90 text-lg md:text-xl lg:text-2xl font-light leading-relaxed italic relative z-10">
              PodoCare nace con el propósito de transformar la salud podológica mediante una atención especializada, humana y profesional. Somos una empresa enfocada en mejorar la calidad de vida de nuestros pacientes, previniendo, tratando y educando sobre el cuidado integral de los pies.
            </p>
          </div>
        </div>

        {/* MISIÓN Y VISIÓN */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          
          {/* Tarjeta Misión */}
          <div className="group relative bg-white/5 backdrop-blur-sm border border-white/10 p-8 md:p-12 rounded-[3rem] hover:bg-white/10 transition-all duration-500 overflow-hidden">
            {/* Círculo decorativo interno */}
            <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-[#59645b]/40 group-hover:scale-150 transition-transform duration-700" />
            
            <div className="flex flex-col md:flex-row gap-6 items-start relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-[#05F2DB] flex items-center justify-center shrink-0 shadow-lg shadow-black/10 group-hover:scale-110 transition-transform">
                <Target className="text-[#67776a]" size={28} />
              </div>
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-tight">Misión</h3>
                <p className="text-white/80 text-base md:text-lg font-light leading-relaxed">
                  Brindar servicios especializados en podología con <span className="text-[#05F2DB] font-medium">altos estándares de calidad, seguridad y calidez humana</span>, ofreciendo soluciones efectivas, preventivas y personalizadas que contribuyan a la salud, movilidad y bienestar integral de nuestros pacientes.
                </p>
              </div>
            </div>
          </div>

          {/* Tarjeta Visión */}
          <div className="group relative bg-white/5 backdrop-blur-sm border border-white/10 p-8 md:p-12 rounded-[3rem] hover:bg-white/10 transition-all duration-500 overflow-hidden">
            {/* Círculo decorativo interno */}
            <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-[#59645b]/40 group-hover:scale-150 transition-transform duration-700" />
            
            <div className="flex flex-col md:flex-row gap-6 items-start relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-[#F285C1] flex items-center justify-center shrink-0 shadow-lg shadow-black/10 group-hover:scale-110 transition-transform">
                <Eye className="text-white" size={28} />
              </div>
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-tight">Visión</h3>
                <p className="text-white/80 text-base md:text-lg font-light leading-relaxed">
                  Ser la <span className="text-white font-medium underline decoration-[#F285C1]/50 underline-offset-4">empresa referente en podología</span> a nivel regional y nacional para el año 2030, reconocida por su excelencia clínica, innovación en tratamientos, servicio humanizado y liderazgo en prevención y educación para la salud del pie.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Sello de confianza inferior */}
        <div className="mt-20 flex flex-wrap justify-center gap-8 opacity-40">
           <div className="flex items-center gap-2 text-white font-bold text-[10px] uppercase tracking-widest">
              <ShieldCheck size={18} />
              Seguridad Clínica
           </div>
           <div className="flex items-center gap-2 text-white font-bold text-[10px] uppercase tracking-widest">
              <ShieldCheck size={18} />
              Excelencia Profesional
           </div>
        </div>
      </div>
    </section>
  );
}