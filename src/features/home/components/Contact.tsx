"use client";

import { useEffect, useRef, useState } from "react";
import { MessageCircle, Phone, MapPin, Clock, ArrowRight, Instagram, ShieldCheck, Sparkles } from 'lucide-react';
import { generateWhatsAppURL } from "@/utils/whatsapp";

const socialLinks = [
  {
    name: 'WhatsApp',
    href: generateWhatsAppURL("contact"),
    icon: <MessageCircle className="w-5 h-5 stroke-[1.5]" />,
    color: 'bg-[#BF2496]',
    description: '+57 (323) 231-2333'
  },
  {
    name: 'Instagram',
    href: 'http://instagram.com/podocaremosquera/',
    icon: <Instagram className="w-5 h-5 stroke-[1.5]" />,
    color: 'bg-[#D929AA]',
    description: '@podocaremosquera'
  },
  {
    name: 'Llamada',
    href: 'tel:+573232312333',
    icon: <Phone className="w-5 h-5 stroke-[1.5]" />,
    color: 'bg-[#05F2DB]',
    description: 'Atención Directa'
  }
];

export default function Contact() {
  const [visibleCards, setVisibleCards] = useState<boolean[]>(new Array(3).fill(false));
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-index'));
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

    cardsRef.current.forEach(card => card && observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return (
    <div id="contact" className="relative w-full bg-[#FFFBFD] overflow-hidden">
      
      {/* Elementos Decorativos más sutiles */}
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-gradient-to-br from-[#F285C1]/10 to-transparent rounded-full blur-3xl opacity-60" />
      <div className="absolute bottom-[20%] left-[-10%] w-[600px] h-[600px] bg-gradient-to-tr from-[#05F2DB]/5 to-transparent rounded-full blur-3xl opacity-40" />

      {/* 1. CABECERA EDITORIAL */}
      <section className="relative w-full pt-24 pb-16 lg:pt-32 z-10">
        <div className="container mx-auto px-6 lg:px-16">
          <div className="max-w-4xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-[1px] w-12 bg-[#BF2496]/40" />
              <span className="text-[11px] font-medium uppercase tracking-[0.4em] text-[#BF2496]">
                Contacto
              </span>
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#BF2496]/10 mb-8 shadow-sm">
              <Sparkles size={12} className="text-[#BF2496] opacity-70" />
              <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#BF2496]/80">Centro Podológico</span>
            </div>

            <h2 className="text-5xl md:text-7xl font-serif italic text-gray-900 leading-[1.1] mb-8">
              Comienza tu <br />
              <span className="text-[#BF2496] not-italic  font-sans uppercase tracking-tighter">
                cuidado profesional.
              </span>
            </h2>

            <p className="text-gray-500 text-base md:text-lg font-light max-w-xl leading-relaxed italic opacity-80">
              “Agenda tu valoración en Mosquera y da el primer paso hacia unos pies sanos, funcionales y sin dolor.”
            </p>
          </div>
        </div>
      </section>

      {/* 2. CONTACT CHANNELS */}
      <section id="canales" className="relative pb-20 px-6 container mx-auto lg:px-16 z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {socialLinks.map((link, i) => (
            <div
              key={link.name}
              data-index={i}
              ref={(el) => { cardsRef.current[i] = el; }}
              className={`transition-all duration-1000 transform ${visibleCards[i] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <a 
                href={link.href}
                className="group block bg-white/60 backdrop-blur-sm rounded-[2.5rem] p-10 border border-white hover:border-[#BF2496]/20 hover:shadow-2xl hover:shadow-[#BF2496]/5 transition-all duration-500 text-center"
              >
                <div className={`w-16 h-16 rounded-full mx-auto mb-8 flex items-center justify-center text-white shadow-sm ${link.color} opacity-90 group-hover:scale-110 transition-transform duration-500`}>
                  {link.icon}
                </div>
                <h3 className="text-xl font-serif italic text-gray-800 mb-2">{link.name}</h3>
                <p className="text-gray-400 text-[10px] mb-8 font-medium uppercase tracking-[0.2em]">{link.description}</p>
                <div className="inline-flex items-center gap-2 text-[#BF2496] font-medium text-[10px] uppercase tracking-[0.2em] group-hover:gap-4 transition-all opacity-70 group-hover:opacity-100">
                  Conectar <ArrowRight size={12} strokeWidth={1.5} />
                </div>
              </a>
            </div>
          ))}
        </div>

        {/* 3. INFO & CTA FINAL */}
        <div className="mt-20 grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Ubicación y Horarios */}
          <div className="lg:col-span-5 bg-white/40 rounded-[3rem] p-10 md:p-14 border border-white/60 shadow-sm">
            <div className="flex items-center gap-4 mb-14">
              <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-[#BF2496] shadow-sm">
                <MapPin size={24} strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-serif italic text-gray-800">Visítanos</h3>
            </div>
            
            <div className="space-y-10">
              <div className="flex gap-6">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#BF2496]/60 shadow-sm shrink-0 border border-gray-50">
                  <Clock size={18} strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#BF2496]/60 mb-3">Horario Clínico</h4>
                  <p className="text-gray-800 font-medium text-base mb-1 font-sans tracking-tight">Lunes a Viernes</p>
                  <p className="text-gray-400 font-light text-sm mb-4">08:00 AM — 05:00 PM</p>
                  <p className="text-gray-800 font-medium text-base mb-1 font-sans tracking-tight">Sábados</p>
                  <p className="text-gray-400 font-light text-sm">08:00 AM — 02:00 PM</p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#BF2496]/60 shadow-sm shrink-0 border border-gray-50">
                  <Phone size={18} strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#BF2496]/60 mb-2">Atención Directa</h4>
                  <p className="text-xl font-light text-gray-800 tracking-wide font-sans">+57 (323) 231-2333</p>
                </div>
              </div>
            </div>
          </div>

          {/* Card CTA Final */}
          <div className="lg:col-span-7 relative group overflow-hidden rounded-[3rem] shadow-xl">
            <div className="absolute inset-0 bg-[#1A1A1A]" />
            
            <div className="relative p-10 md:p-16 h-full flex flex-col z-10">
              <div className="w-14 h-14 rounded-xl bg-white/5 backdrop-blur-xl flex items-center justify-center text-[#05F2DB]/70 mb-12 border border-white/10">
                <ShieldCheck size={28} strokeWidth={1} />
              </div>
              
              <div className="mb-8">
                <p className="text-5xl md:text-6xl font-serif italic text-white leading-tight font-light">
                  Tu salud
                </p>
                <p className="text-3xl md:text-4xl font-sans font-bold uppercase tracking-[0.15em] text-[#05F2DB] mt-3 leading-tight">
                  no da espera.
                </p>
              </div>
              
              <p className="text-base text-gray-400 font-light mb-12 max-w-sm leading-relaxed italic opacity-80">
                “Escríbenos ahora mismo y recibe una respuesta inmediata de nuestro equipo especializado.”
              </p>

              <div className="mt-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a 
                  href={generateWhatsAppURL("general")}
                  className="flex items-center justify-center gap-3 bg-[#BF2496]/90 text-white py-5 rounded-2xl font-medium uppercase tracking-[0.2em] text-[10px] hover:bg-white hover:text-[#BF2496] transition-all duration-500 shadow-lg"
                >
                  <MessageCircle size={16} strokeWidth={1.5} /> WhatsApp
                </a>
                <a 
                  href="tel:+573232312333"
                  className="flex items-center justify-center gap-3 bg-white/5 border border-white/10 text-white/80 py-5 rounded-2xl font-medium uppercase tracking-[0.2em] text-[10px] hover:bg-white/10 transition-all duration-500"
                >
                  <Phone size={16} strokeWidth={1.5} /> Llamar ahora
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 4. MAPA */}
        <div className="mt-12 rounded-[3rem] overflow-hidden border-[1px] border-white shadow-xl relative group">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d500!2d-74.2302042!3d4.7031208!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f77002089d93b%3A0x42c0d1393533479!2sPodoCare!5e0!3m2!1ses!2sco!4v1715000000000!5m2!1ses!2sco"
            width="100%"
            height="400"
            style={{ border: 0, display: 'block', filter: 'grayscale(0.4) contrast(1.1) opacity(0.8)' }}
            allowFullScreen
            loading="lazy"
            title="Ubicación PodoCare Mosquera"
          />
          <a
            href="https://maps.app.goo.gl/xy414V4CuuKsaC356"
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center justify-center gap-3 px-8 py-4 bg-white/90 backdrop-blur-md text-gray-800 rounded-full text-[10px] font-semibold uppercase tracking-[0.2em] hover:bg-[#BF2496] hover:text-white transition-all duration-500 shadow-lg border border-gray-100"
          >
            <MapPin size={14} strokeWidth={1.5} /> Ver ruta en Maps
          </a>
        </div>
      </section>
    </div>
  );
}