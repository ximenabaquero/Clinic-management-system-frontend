"use client";

import { ArrowRight, ShieldCheck, Star, Activity } from 'lucide-react';
import { generateWhatsAppURL } from "@/utils/whatsapp";

export default function ServicesHero() {
  return (
    <section className="relative pt-32 pb-16 lg:pt-48 lg:pb-24 bg-white overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#05F2DB]/5 to-transparent -z-0" />
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#F285C1]/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Lado Izquierdo: Texto */}
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-50 border border-gray-100 mb-8">
              <Activity size={16} className="text-[#BF2496]" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">
                Portafolio Clínico 2026
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-serif italic text-gray-900 leading-[1.1] mb-8">
              Cuidado integral <br />
              <span className="not-italic font-sans font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#BF2496] via-[#D929AA] to-[#05F2DB]">
                para tu bienestar.
              </span>
            </h1>

            {/* <p className="text-lg md:text-xl text-gray-500 font-light leading-relaxed max-w-xl mb-10 mx-auto lg:mx-0">
              Desde podología especializada hasta sueroterapia avanzada. Unimos la técnica de enfermería con la calidez humana en Mosquera.
            </p> */}
            <p className="text-lg md:text-xl text-gray-500 font-light leading-relaxed max-w-xl mb-10 mx-auto lg:mx-0">
              Especialistas en podología y enfermería. Unimos la técnica clínica con la calidez humana en Mosquera.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <a
                href={generateWhatsAppURL("servicios_hero")}
                className="group flex items-center gap-3 bg-gray-900 text-white px-8 py-5 rounded-2xl font-bold transition-all hover:bg-[#BF2496] hover:scale-105 shadow-xl shadow-gray-200"
              >
                Agendar Valoración
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </a>
              
              <div className="flex items-center gap-4 px-6 py-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center overflow-hidden">
                       <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User" />
                    </div>
                  ))}
                </div>
                <div className="text-left">
                  <div className="flex text-yellow-400">
                    <Star size={12} fill="currentColor" />
                    <Star size={12} fill="currentColor" />
                    <Star size={12} fill="currentColor" />
                    <Star size={12} fill="currentColor" />
                    <Star size={12} fill="currentColor" />
                  </div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
                    +500 Pacientes Satisfechos
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Lado Derecho: Visual */}
          <div className="flex-1 relative w-full max-w-2xl">
            <div className="relative aspect-square rounded-[4rem] bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden border border-gray-100">
              {/* Imagen principal (Placeholder de alta calidad) */}
              <img 
                src="http://googleusercontent.com/image_collection/image_retrieval/5810956768333585590_2" 
                alt="PodoCare Services" 
                className="w-full h-full object-cover mix-blend-multiply opacity-80"
              />
              
              {/* Floating Badge 1 */}
              <div className="absolute top-12 -left-8 bg-white p-6 rounded-[2rem] shadow-2xl border border-gray-50 flex items-center gap-4 animate-bounce-slow">
                <div className="w-12 h-12 rounded-xl bg-[#05F2DB]/10 flex items-center justify-center text-[#05F2DB]">
                  <ShieldCheck size={28} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase text-gray-400">Garantía</p>
                  <p className="text-sm font-bold text-gray-900">100% Clínico</p>
                </div>
              </div>

              {/* Floating Badge 2 */}
              <div className="absolute bottom-12 -right-8 bg-white p-6 rounded-[2rem] shadow-2xl border border-gray-50 flex items-center gap-4 animate-float">
                <div className="w-12 h-12 rounded-xl bg-[#BF2496]/10 flex items-center justify-center text-[#BF2496]">
                  <Activity size={28} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase text-gray-400">Atención</p>
                  <p className="text-sm font-bold text-gray-900">Inmediata</p>
                </div>
              </div>
            </div>
            
            {/* Círculo decorativo rotando detrás */}
            <div className="absolute inset-0 border-[40px] border-[#F285C1]/5 rounded-full -m-20 animate-spin-slow pointer-events-none" />
          </div>

        </div>
      </div>

      <style jsx>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes float {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(10px); }
        }
        .animate-bounce-slow { animation: bounce-slow 4s ease-in-out infinite; }
        .animate-float { animation: float 5s ease-in-out infinite; }
        .animate-spin-slow { animation: spin 20s linear infinite; }
      `}</style>
    </section>
  );
}