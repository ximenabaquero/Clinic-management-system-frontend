"use client";

import { useMemo } from "react";
import { Star, ExternalLink, MessageCircle, ArrowRight } from 'lucide-react';
import { generateWhatsAppURL } from "@/utils/whatsapp";

const mulberry32 = (seed: number) => {
  return () => {
    let t = (seed += 0x6D2B79F5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

const reviews = [
  {
    name: "Marcela Jiménez R.",
    time: "Hace 9 meses",
    rating: 5,
    text: "Me sentí muy muy bien atendida, excelente lugar muy acogedor muy limpio, mi experiencia excelente y me siento mucho mejor después de mi procedimiento. Los recomiendo ampliamente. 💯🙏❤️",
  },
  {
    name: "Stephanie Ruiz",
    time: "Hace 10 meses",
    rating: 5,
    text: "Un lugar impecable, con espacios cómodos y muy limpios. La atención es cálida y profesional, y los procedimientos son detallados y efectivos. Excelente relación calidad-precio. ¡Totalmente recomendado!",
  },
  {
    name: "Laura Alarcón",
    time: "Hace 10 meses",
    rating: 5,
    text: "Excelente lugar, instalaciones acogedoras e higienizadas; atención amable por parte de los profesionales; procedimientos muy completos y acordes con su costo. Recomendado 100%.",
  },
  {
    name: "Laura Medina",
    time: "Hace 11 meses",
    rating: 5,
    text: "Excelente atención, rápida respuesta, todo esterilizado y muy higiénico. La mejor opción para el cuidado de tus pies. Fui por una uña encarnada y la respuesta fue muy rápida, clara y precisa. Toda la información para cuidar y el seguimiento del procedimiento.",
  },
  {
    name: "Gerardo Marcel Betancourt",
    time: "Hace 10 meses",
    rating: 5,
    text: "Súper recomendado; excelente servicio; son muy profesionales en la atención.",
  },
  {
    name: "Lesly Alfonso Lopez",
    time: "Hace un año",
    rating: 5,
    text: "Un servicio excelente, muy buena atención al paciente, los especialistas están muy preparados para brindar la información. Volvería sin duda alguna.",
  },
];

const avatarColors = [
  "bg-[#BF2496]",
  "bg-[#D929AA]",
  "bg-gray-700",
  "bg-[#05F2DB]",
  "bg-[#F285C1]",
  "bg-[#BF2496]",
];

function GoogleIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className={`w-3.5 h-3.5 ${i < rating ? 'fill-[#F4B400] text-[#F4B400]' : 'fill-gray-200 text-gray-200'}`} />
      ))}
    </div>
  );
}

export default function Testimonials() {
  const bubbleStyles = useMemo(() => {
    const rand = mulberry32(123456);
    return Array.from({ length: 6 }, () => ({
      width: `${rand() * 60 + 30}px`,
      height: `${rand() * 60 + 30}px`,
      left: `${rand() * 100}%`,
      top: `${rand() * 100}%`,
    }));
  }, []);

  return (
    <section id="testimonials" className="relative py-24 overflow-hidden bg-white">
      {/* Fondo suave */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-[#F285C1]/5 to-white pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {bubbleStyles.map((style, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-[#BF2496]/5 border border-[#BF2496]/10"
            style={style}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">

        {/* Header con Estilo Elegante Unificado */}
        <div className="text-center max-w-4xl mx-auto mb-20 px-4">
          <div className="inline-flex items-center gap-3 bg-white rounded-full px-5 py-2.5 mb-10 shadow-sm border border-gray-100">
            <GoogleIcon size={18} />
            <span className="text-xs font-black uppercase tracking-widest text-gray-400">Google Reviews</span>
            <div className="w-[1px] h-4 bg-gray-200 mx-1" />
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-[#F4B400] text-[#F4B400]" />
              ))}
            </div>
            <span className="text-sm font-black text-gray-900">5.0</span>
          </div>

          <h2 className="text-5xl md:text-7xl font-serif italic text-gray-900 leading-[0.9] mb-8">
            Lo que dicen <br />
            <span className="not-italic font-sans font-black uppercase tracking-tighter text-[#BF2496]">
              nuestros pacientes
            </span>
          </h2>
          
          <p className="text-lg md:text-xl text-gray-500 font-light max-w-2xl mx-auto leading-relaxed italic">
            "Reseñas verificadas de personas reales que han transformado la salud de sus pies con nosotros."
          </p>
        </div>

        {/* Grid de reseñas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {reviews.map((review, idx) => (
            <div
              key={idx}
              className="bg-white rounded-[2.5rem] p-8 shadow-2xl shadow-gray-200/40 border border-gray-50 flex flex-col hover:shadow-[#BF2496]/10 hover:-translate-y-2 transition-all duration-500"
            >
              {/* Encabezado del revisor */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl ${avatarColors[idx % avatarColors.length]} flex items-center justify-center text-white font-black text-lg shadow-inner shadow-black/10`}>
                    {review.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-black text-gray-900 text-sm leading-tight uppercase tracking-tight">{review.name}</p>
                    <p className="text-[#05F2DB] font-bold text-[10px] uppercase tracking-widest mt-1">{review.time}</p>
                  </div>
                </div>
                <GoogleIcon size={20} />
              </div>

              {/* Estrellas */}
              <div className="mb-4">
                <Stars rating={review.rating} />
              </div>

              {/* Texto */}
              <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-1 italic">
                "{review.text}"
              </p>

              <div className="h-[1px] w-full bg-gray-50 mt-auto" />
            </div>
          ))}
        </div>

        {/* CTAs Finales */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <a
            href="https://maps.app.goo.gl/xy414V4CuuKsaC356"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-4 bg-white border border-gray-100 text-gray-900 font-black py-5 px-10 rounded-[2rem] hover:shadow-xl transition-all duration-500 text-[11px] uppercase tracking-[0.2em]"
          >
            <GoogleIcon size={18} />
            <span>Ver perfil en Google</span>
            <ExternalLink size={14} className="text-[#05F2DB]" />
          </a>
          
          <a
            href={generateWhatsAppURL("contact")}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-4 bg-[#BF2496] text-white font-black py-5 px-10 rounded-[2rem] hover:shadow-2xl hover:shadow-[#BF2496]/40 hover:scale-105 transition-all duration-500 text-[11px] uppercase tracking-[0.2em]"
          >
            <MessageCircle size={18} />
            <span>Agendar ahora</span>
            <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
          </a>
        </div>

      </div>
    </section>
  );
}