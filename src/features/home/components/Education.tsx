"use client";

import { useEffect, useRef, useState } from "react";
import { BookOpen, ShieldCheck, Microscope, Footprints, Sparkles, Heart, Smartphone, ArrowRight, Layers, Droplet, Ruler } from 'lucide-react';
import { generateWhatsAppURL } from "@/utils/whatsapp";

const topics = [
  {
    title: "¿Qué es la Onicocriptosis?",
    body: "Es lo que comúnmente llamamos uña encarnada. En clínica, realizamos una oniectomía parcial, un procedimiento mínimamente invasivo que corrige la raíz de la uña para evitar que vuelva a enterrarse, garantizando una recuperación rápida y sin dolor.",
    icon: <Footprints className="w-6 h-6" />,
    gradient: "from-[#F285C1] to-[#BF2496]",
    tag: "Patología Clínica"
  },
  {
    title: "La importancia del Pedicure Medicinal",
    body: "A diferencia del estético, el pedicure medicinal es realizado por personal de enfermería capacitado. Utilizamos instrumental estéril para tratar hiperqueratosis (callos) y afecciones fúngicas. Priorizando la salud, previniendo y tratando infecciones de los pies.",
    icon: <Microscope className="w-6 h-6" />,
    gradient: "from-[#05F2DB] to-[#F285C1]",
    tag: "Prevención"
  },
  /* {
    title: "Sueroterapia Post-Operatoria",
    body: "Nuestros protocolos de sueroterapia ayudan a la regeneración de tejidos y fortalecimiento del sistema inmune. La administración endovenosa de vitamina C y oligoelementos optimiza los tiempos de cicatrización y desinflamación tras cualquier intervención.",
    icon: <Activity className="w-6 h-6" />,
    gradient: "from-[#BF2496] to-[#05F2DB]",
    tag: "Recuperación"
  }, */
  {
    title: "¿Qué es la Verruga Plantar?",
    body: "Contamos con tratamientos personalizados, seguimiento clínico hasta la resolución de la patología.",
    icon: <ShieldCheck className="w-6 h-6" />,
    gradient: "from-[#05F2DB] to-[#BF2496]",
    tag: "Patología Viral"
  },
  {
    title: "¿Qué es el Heloma Plantar?",
    body: "El heloma (callo plantar) es una acumulación de piel muerta provocada por presión repetida. El desbridamiento clínico lo realiza personal especializado con bisturí estéril, eliminando el núcleo sin causar sangrado ni riesgo de infección.",
    icon: <Layers className="w-6 h-6" />,
    gradient: "from-[#F285C1] to-[#05F2DB]",
    tag: "Hiperqueratosis"
  },
  {
    title: "¿Qué es la Fenolización?",
    body: "La fenolización es el tratamiento definitivo para la uña encarnada recurrente. Aplicamos ácido fénico en la raíz de la uña para destruir de forma permanente la franja problemática, evitando recaídas sin necesidad de cirugía mayor.",
    icon: <Droplet className="w-6 h-6" />,
    gradient: "from-[#BF2496] to-[#F285C1]",
    tag: "Procedimiento"
  },
  {
    title: "¿Qué es la Ortonixia?",
    body: "La ortonixia corrige la curvatura patológica de las uñas mediante sistemas de tracción especializados. Es un procedimiento no invasivo, sin dolor ni cortes, con resultados visibles desde la primera sesión y sin tiempo de recuperación.",
    icon: <Ruler className="w-6 h-6" />,
    gradient: "from-[#05F2DB] to-[#D929AA]",
    tag: "Corrección"
  },
];

export default function Education() {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [visibleCards, setVisibleCards] = useState<boolean[]>(() => topics.map(() => false));
  const [floatingElements, setFloatingElements] = useState<Array<any>>([]);

  useEffect(() => {
    setFloatingElements(
      [...Array(6)].map((_, i) => ({
        width: Math.random() * 60 + 20,
        height: Math.random() * 60 + 20,
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: i * 0.5,
        duration: Math.random() * 10 + 10,
      }))
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number((entry.target as HTMLElement).dataset.index);
            setVisibleCards(prev => {
              const newState = [...prev];
              newState[index] = true;
              return newState;
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative py-24 overflow-hidden bg-white">
      {/* Background decorativo - Soft Pink */}
      <div className="absolute inset-0 bg-[#F285C1]/5 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-[#F285C1]/10 to-transparent"></div>
      </div>
      
      {/* Elementos flotantes animados */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingElements.map((element, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-[#F285C1]/10 blur-xl animate-float"
            style={{
              width: `${element.width}px`,
              height: `${element.height}px`,
              left: `${element.left}%`,
              top: `${element.top}%`,
              animationDelay: `${element.delay}s`,
              animationDuration: `${element.duration}s`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 bg-[#F285C1]/10 rounded-full px-5 py-2 mb-8 border border-[#F285C1]/20">
            <BookOpen className="w-4 h-4 text-[#BF2496]" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#BF2496]">
              Aula de Salud PodoCare
            </span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-serif italic text-gray-900 mb-6">
            Ciencia al servicio de <span className="text-[#BF2496] not-italic font-bold font-sans">tus pies</span>
          </h2>
          
          <p className="text-gray-500 text-lg font-light leading-relaxed">
            Creemos que un paciente informado toma mejores decisiones. Conoce los fundamentos médicos de nuestros tratamientos más solicitados.
          </p>
        </div>

        {/* Education Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {topics.map((topic, index) => (
            <div
              key={index}
              data-index={index}
              ref={(el) => { cardsRef.current[index] = el; }}
              className={`relative h-[480px] perspective-1000 transition-all duration-1000 ${
                visibleCards[index] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div className="flip-card-inner group relative w-full h-full cursor-pointer">
                
                {/* FRONT SIDE */}
                <div className="flip-card-front absolute w-full h-full backface-hidden">
                  <div className="relative w-full h-full bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden p-10 flex flex-col items-center text-center">
                    <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${topic.gradient}`}></div>
                    
                    <div className="mt-4 mb-8 inline-flex items-center gap-2 px-4 py-1.5 bg-gray-50 rounded-full border border-gray-100">
                      <ShieldCheck className="w-3 h-3 text-[#BF2496]" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                        {topic.tag}
                      </span>
                    </div>

                    <div className={`w-24 h-24 rounded-3xl bg-gradient-to-br ${topic.gradient} flex items-center justify-center text-white shadow-lg mb-8 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500`}>
                      <div className="scale-[1.5]">{topic.icon}</div>
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 leading-tight mb-auto">
                      {topic.title}
                    </h3>

                    <div className="mt-8 flex items-center gap-2 text-[#BF2496] font-bold text-xs uppercase tracking-widest">
                      Descubrir explicación <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </div>

                {/* BACK SIDE */}
                <div className="flip-card-back absolute w-full h-full backface-hidden rotate-y-180">
                  <div className="relative w-full h-full bg-gray-900 rounded-[3rem] p-10 flex flex-col overflow-hidden text-white">
                    {/* Pattern sutil de fondo */}
                    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '30px 30px' }}></div>
                    
                    <div className="relative z-10 flex flex-col h-full">
                      <div className="flex items-center gap-3 mb-8">
                        <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-[#05F2DB]">
                          <Microscope size={16} />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#05F2DB]">Consulta Clínica</span>
                      </div>

                      <p className="text-gray-300 leading-relaxed font-light text-lg italic">
                        &ldquo;{topic.body}&rdquo;
                      </p>

                      <div className="mt-auto pt-8 border-t border-white/10 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                           <Heart size={14} className="text-[#F285C1]" />
                           <span className="text-[10px] font-bold uppercase tracking-tighter text-gray-400">PodoCare Mosquera</span>
                        </div>
                        <Sparkles size={20} className="text-[#F285C1] opacity-50" />
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* CTA FINAL */}
        <div className="relative max-w-4xl mx-auto">
          <div className="bg-gray-50 rounded-[4rem] p-8 md:p-12 border border-gray-100 flex flex-col md:flex-row items-center gap-10 overflow-hidden relative">
            {/* Decoración lateral */}
            <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-[#F285C1]/10 to-transparent"></div>
            
            <div className="flex-1 relative z-10 text-center md:text-left">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                ¿Aún tienes dudas sobre tu tratamiento?
              </h3>
              <p className="text-gray-500 font-light max-w-md">
                Agenda una valoración personalizada. Nuestro equipo médico evaluará tu caso específico con la tecnología adecuada.
              </p>
            </div>

            <div className="relative z-10 w-full md:w-auto">
              <a
                href={generateWhatsAppURL("contact")}
                target="_blank"
                className="group flex items-center justify-center gap-4 bg-gray-900 text-white px-10 py-5 rounded-3xl hover:bg-[#BF2496] transition-all duration-500 shadow-xl"
              >
                <Smartphone className="w-5 h-5 group-hover:animate-bounce" />
                <span className="font-black uppercase text-[10px] tracking-widest">Hablar con Especialista</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(5deg); }
        }
        .animate-float { animation: float 10s ease-in-out infinite; }
        .perspective-1000 { perspective: 1000px; }
        .backface-hidden { backface-visibility: hidden; -webkit-backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
        .flip-card-inner {
          transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
          transform-style: preserve-3d;
        }
        .flip-card-inner:hover { transform: rotateY(180deg); }
      `}</style>
    </section>
  );
}