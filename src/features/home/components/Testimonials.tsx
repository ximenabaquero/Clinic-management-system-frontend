"use client";

import { useMemo, type CSSProperties } from "react";
import { generateWhatsAppURL } from "@/utils/whatsapp";
import Image from "next/image";
import { MessageCircle, Shield, Star, Sparkles, CheckCircle, ArrowRight, Zap, Heart } from 'lucide-react';

const mulberry32 = (seed: number) => {
  return () => {
    let t = (seed += 0x6D2B79F5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

type ChatMessage = {
  name: string;
  time: string;
  text: string;
  highlight: string;
  side: "left" | "right";
  avatar?: string;
  rating?: number;
};

const messages: ChatMessage[] = [
  {
    name: "Ricardo M.",
    time: "Hoy 09:15 a. m.",
    text: "Increíble el cambio. Llevaba meses con ese dolor en la uña y en una sola cita me lo solucionaron. Cero dolor.",
    highlight: "en una sola cita me lo solucionaron",
    side: "left",
    rating: 5,
  },
  {
    name: "Elena S.",
    time: "Ayer 6:30 p. m.",
    text: "Mi papá es diabético y nos daba miedo llevarlo a cualquier lado, pero la atención clínica aquí fue impecable. Muy profesionales.",
    highlight: "atención clínica aquí fue impecable",
    side: "left",
    rating: 5,
  },
  {
    name: "Camilo R.",
    time: "Lun 11:20 a. m.",
    text: "Soy deportista y mis pies estaban destrozados. Después de la quiropodia siento que camino en nubes. ¡Recomendadísimos!",
    highlight: "siento que camino en nubes",
    side: "left",
    rating: 5,
  },
  {
    name: "PodoCare Mosquera",
    time: "Lun 11:22 a. m.",
    text: "¡Excelente Camilo! Recuerda que para deportistas recomendamos un chequeo mensual para prevenir lesiones.",
    highlight: "chequeo mensual para prevenir lesiones",
    side: "right",
  },
];

const Highlighted = ({ text, highlight }: { text: string; highlight: string }) => {
  if (!highlight || !text.includes(highlight)) return <>{text}</>;
  const parts = text.split(highlight);
  return (
    <>
      {parts[0]}
      <span className="font-bold bg-gradient-to-r from-[#BF2496] to-[#05F2DB] bg-clip-text text-transparent">
        {highlight}
      </span>
      {parts[1]}
    </>
  );
};

const RatingStars = ({ rating }: { rating: number }) => {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-3 h-3 ${i < rating ? 'fill-[#BF2496] text-[#BF2496]' : 'text-gray-300'}`}
        />
      ))}
    </div>
  );
};

export default function Testimonials() {
  const delays = useMemo(() => messages.map((_, idx) => `${idx * 0.12}s`), []);
  const bubbleStyles = useMemo<CSSProperties[]>(() => {
    const rand = mulberry32(123456);
    return Array.from({ length: 6 }, () => {
      const width = rand() * 60 + 30;
      const height = rand() * 60 + 30;
      const left = rand() * 100;
      const top = rand() * 100;
      return {
        width: `${width}px`,
        height: `${height}px`,
        left: `${left}%`,
        top: `${top}%`,
      };
    });
  }, []);

  return (
    <section className="relative py-16 md:py-20 lg:py-24 overflow-hidden bg-white">
      {/* Background with PodoCare Tones */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-[#F285C1]/5 to-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#05F2DB]/10 via-transparent to-transparent"></div>
      </div>

      {/* Floating chat bubbles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {bubbleStyles.map((style, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-[#BF2496]/5 border border-[#BF2496]/10"
            style={style}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16 lg:mb-20 px-4">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 mb-6 md:mb-8 shadow-sm border border-[#F285C1]/20">
            <MessageCircle className="w-4 h-4 text-[#BF2496]" />
            <span className="text-sm font-semibold bg-gradient-to-r from-[#BF2496] to-[#05F2DB] bg-clip-text text-transparent">
              Pacientes Reales
            </span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
            <span className="text-gray-900">Opiniones en</span>{' '}
            <span className="bg-gradient-to-r from-[#BF2496] to-[#05F2DB] bg-clip-text text-transparent">
              WhatsApp
            </span>
          </h2>
          
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed">
            La confianza de nuestros pacientes en Mosquera es nuestro mayor respaldo técnico y clínico.
          </p>
        </div>

        {/* Chat Container */}
        <div className="max-w-4xl mx-auto">
          {/* Chat Header */}
          <div className="rounded-t-2xl md:rounded-t-3xl bg-gradient-to-r from-[#BF2496] to-[#F285C1] px-4 sm:px-6 py-4 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/20 p-1">
                  <div className="w-full h-full rounded-full overflow-hidden bg-white flex items-center justify-center p-2">
                    <img
                      src="/podocare/podocare.png"
                      alt="PodoCare"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#05F2DB] border-2 border-white"></div>
              </div>
              
              <div className="flex-1">
                <h3 className="text-white font-semibold text-lg md:text-xl">PodoCare Mosquera</h3>
                <p className="text-white/90 text-sm flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#05F2DB] animate-pulse"></span>
                  <span>Clínica Especializada • En línea</span>
                </p>
              </div>
            </div>
          </div>

          {/* Chat Body */}
          <div className="bg-gradient-to-br from-gray-50 to-white border-x border-gray-100 px-4 sm:px-6 py-6 md:py-8 space-y-4 md:space-y-6">
            {messages.map((msg, idx) => (
              <div
                key={`${msg.name}-${msg.time}`}
                className={`flex ${msg.side === "right" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`group relative max-w-md rounded-2xl px-4 py-3 md:px-5 md:py-4 shadow-lg transition-all duration-300 hover:shadow-xl ${
                    msg.side === "right"
                      ? "bg-gradient-to-r from-[#F285C1]/10 to-[#05F2DB]/10 border border-[#BF2496]/10"
                      : "bg-white border border-gray-100"
                  }`}
                  style={{ animationDelay: delays[idx] }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      msg.side === "right" 
                        ? "bg-[#BF2496]" 
                        : "bg-gray-200"
                    }`}>
                      {msg.side === "right" ? (
                        <span className="text-white text-[10px] font-bold">PC</span>
                      ) : (
                        <span className="text-gray-600 text-sm font-bold">{msg.name.charAt(0)}</span>
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className={`font-semibold ${
                          msg.side === "right" ? "text-[#BF2496]" : "text-gray-800"
                        }`}>
                          {msg.name}
                        </span>
                        <span className="text-xs text-gray-500">{msg.time}</span>
                      </div>
                      {msg.rating && <RatingStars rating={msg.rating} />}
                    </div>
                  </div>

                  <p className={`leading-relaxed text-sm md:text-base ${
                    msg.side === "right" ? "text-gray-700" : "text-gray-600"
                  }`}>
                    <Highlighted text={msg.text} highlight={msg.highlight} />
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Chat Footer */}
          <div className="rounded-b-2xl md:rounded-b-3xl bg-gradient-to-r from-white to-[#05F2DB]/5 border border-gray-100 border-t-0 px-4 sm:px-6 py-6 md:py-8 shadow-lg">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              <div className="text-center lg:text-left">
                <div className="flex items-center gap-2 mb-2 justify-center lg:justify-start">
                  <Zap className="w-5 h-5 text-[#BF2496]" />
                  <span className="text-gray-900 font-semibold text-lg">
                    ¿Tus pies necesitan atención?
                  </span>
                </div>
                <p className="text-gray-600 text-sm md:text-base">
                  Agenda tu quiropodia clínica o valoración hoy mismo.
                </p>
              </div>
              
              <a
                href={generateWhatsAppURL("contact")}
                target="_blank"
                className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-[#BF2496] to-[#F285C1] text-white font-semibold py-3 md:py-4 px-6 md:px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <MessageCircle className="w-5 h-5" />
                <span className="text-sm md:text-base">Agendar en PodoCare</span>
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-100">
              <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-xs md:text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Shield className="w-3 h-3 md:w-4 md:h-4 text-[#BF2496]" />
                  <span>Personal de Enfermería</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-[#05F2DB]" />
                  <span>Protocolos Clínicos</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}