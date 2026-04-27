"use client";

import { generateWhatsAppURL } from "@/utils/whatsapp";
import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { MessageCircle, Phone, MapPin, Mail, Clock, Sparkles, Heart, ArrowRight, Instagram, ShieldCheck } from 'lucide-react';

function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const socialLinks = [
  {
    name: 'WhatsApp',
    href: generateWhatsAppURL("contact"),
    icon: <MessageCircle className="w-6 h-6 md:w-7 md:h-7" />,
    color: 'bg-gradient-to-br from-[#BF2496] to-[#D929AA]',
    description: '+57 (323) 231-2333',
    gradient: 'from-[#BF2496] to-[#F285C1]'
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/podocare.mosquera/', 
    icon: <Instagram className="w-6 h-6 md:w-7 md:h-7" />,
    color: 'bg-gradient-to-br from-[#D929AA] to-[#05F2DB]',
    description: '@podocare.mosquera',
    gradient: 'from-[#D929AA] to-[#05F2DB]'
  },
  {
    name: 'Atención Directa',
    href: 'tel:+573232312333',
    icon: <Phone className="w-6 h-6 md:w-7 md:h-7" />,
    color: 'bg-gradient-to-br from-[#05F2DB] to-[#BF2496]',
    description: 'Llamada inmediata',
    gradient: 'from-[#05F2DB] to-[#BF2496]'
  }
];

export default function Contact() {
  const [visible, setVisible] = useState<boolean[]>(() => socialLinks.map(() => false));
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const floatStyles = useMemo<CSSProperties[]>(() => {
    const rand = mulberry32(987654);
    return Array.from({ length: 8 }, () => {
      const size = rand() * 60 + 20;
      const left = rand() * 100;
      const top = rand() * 100;
      return {
        width: `${size}px`,
        height: `${size}px`,
        left: `${left}%`,
        top: `${top}%`,
      };
    });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number((entry.target as HTMLElement).dataset.index);
            setVisible((prev) => prev.map((v, i) => (i === index ? true : v)));
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-white" id="contacto">
      {/* Fondo con acentos de marca */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-[#F285C1]/5 to-[#05F2DB]/5">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#BF2496]/5 via-transparent to-transparent"></div>
      </div>

      {/* Elementos flotantes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
        {floatStyles.map((style, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-[#BF2496]/5 border border-[#BF2496]/10"
            style={style}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        {/* Header Section */}
        <div className="max-w-3xl mb-16 md:mb-24">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white shadow-sm border border-gray-100 mb-8">
            <MessageCircle size={16} className="text-[#BF2496]" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">
              Estamos para escucharte
            </span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-serif italic text-gray-900 leading-tight mb-8">
            Comienza tu <span className="not-italic font-bold font-sans text-[#BF2496]">Cuidado</span>
          </h2>
          
          <p className="text-lg md:text-xl text-gray-500 font-light leading-relaxed max-w-2xl">
            Resuelve tus dudas o agenda tu cita. Nuestro equipo clínico está listo para brindarte una atención personalizada.
          </p>
        </div>

        {/* Contact Channels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {socialLinks.map((link, index) => (
            <div
              key={link.name}
              data-index={index}
              ref={(el) => { cardsRef.current[index] = el; }}
              className="group relative"
            >
              <div className={`absolute -inset-0.5 bg-gradient-to-r ${link.gradient} rounded-[2rem] blur opacity-0 group-hover:opacity-20 transition duration-500`}></div>
              
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`relative block h-full bg-white rounded-[2rem] border border-gray-100 p-8 shadow-sm hover:shadow-xl transition-all duration-500 text-center ${
                  visible[index] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className={`relative w-20 h-20 rounded-2xl mx-auto mb-6 ${link.color} flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                  <div className="text-white">
                    {link.icon}
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-3 uppercase tracking-tight">
                  {link.name}
                </h3>

                <p className="text-gray-500 font-medium mb-6">
                  {link.description}
                </p>

                <div className="inline-flex items-center gap-2 text-[#BF2496] font-black text-[10px] uppercase tracking-widest">
                  <span>Contactar</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </a>
            </div>
          ))}
        </div>

        {/* Info & CTA Split */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-stretch">
          {/* Left: Info */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-[2.5rem] border border-gray-100 p-8 md:p-10 shadow-sm h-full">
              <h3 className="text-2xl font-bold text-gray-900 mb-10 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#05F2DB]/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-[#05F2DB]" />
                </div>
                <span>Ubicación y Horarios</span>
              </h3>
              
              <div className="space-y-8">
                <div className="flex items-start gap-5">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:text-[#BF2496] transition-colors">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Teléfono Central</h4>
                    <a href="tel:+573232312333" className="text-lg font-bold text-gray-900 hover:text-[#BF2496] transition-colors">
                      +57 (323) 231-2333
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-gray-400">
                    <Clock size={20} />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Horario Clínico</h4>
                    <p className="text-gray-900 font-bold">Lunes a Viernes</p>
                    <p className="text-gray-500 font-medium">9:00 AM - 7:00 PM</p>
                    <p className="text-gray-900 font-bold mt-2">Sábados</p>
                    <p className="text-gray-500 font-medium">9:00 AM - 2:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Big CTA */}
          <div className="lg:col-span-3 relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-[#BF2496] to-[#05F2DB] blur-2xl opacity-10 group-hover:opacity-20 transition-opacity duration-700 rounded-[2.5rem]" />
            
            <div className="relative bg-white rounded-[2.5rem] border border-gray-100 overflow-hidden h-full flex flex-col shadow-sm">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#BF2496] via-[#F285C1] to-[#05F2DB]" />
              
              <div className="p-10 md:p-12 lg:p-16 flex flex-col h-full">
                <div className="w-20 h-20 rounded-3xl bg-[#BF2496]/10 flex items-center justify-center mb-8">
                  <ShieldCheck className="w-10 h-10 text-[#BF2496]" />
                </div>
                
                <h3 className="text-4xl md:text-5xl font-serif italic text-gray-900 mb-6">
                  Tu salud <span className="not-italic font-bold font-sans">no espera.</span>
                </h3>
                
                <p className="text-xl text-gray-500 font-light leading-relaxed mb-10 max-w-md">
                  Agenda hoy mismo tu valoración profesional y da el primer paso hacia unos pies sanos.
                </p>

                <div className="mt-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <a
                    href={generateWhatsAppURL("contact")}
                    className="flex items-center justify-center gap-3 bg-gray-900 text-white font-bold uppercase tracking-widest text-[11px] py-5 px-8 rounded-2xl hover:bg-[#BF2496] transition-all duration-300"
                  >
                    <MessageCircle size={18} />
                    WhatsApp
                  </a>
                  <a
                    href="tel:+573232312333"
                    className="flex items-center justify-center gap-3 bg-white border border-gray-200 text-gray-900 font-bold uppercase tracking-widest text-[11px] py-5 px-8 rounded-2xl hover:border-[#05F2DB] transition-all duration-300"
                  >
                    <Phone size={18} />
                    Llamar
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}