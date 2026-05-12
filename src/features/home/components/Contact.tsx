"use client";

import { useEffect, useRef, useState } from "react";
import { MessageCircle, Phone, MapPin, Clock, ArrowRight, Instagram, ShieldCheck, Sparkles } from 'lucide-react';
import { generateWhatsAppURL } from "@/utils/whatsapp";

const socialLinks = [
  {
    name: 'WhatsApp',
    href: generateWhatsAppURL("contact"),
    icon: <MessageCircle className="w-6 h-6" />,
    color: 'bg-[#BF2496]',
    description: '+57 (323) 231-2333'
  },
  {
    name: 'Instagram',
    href: 'http://instagram.com/podocaremosquera/',
    icon: <Instagram className="w-6 h-6" />,
    color: 'bg-[#D929AA]',
    description: '@podocaremosquera'
  },
  {
    name: 'Llamada',
    href: 'tel:+573232312333',
    icon: <Phone className="w-6 h-6" />,
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
    <div id="contact" className="relative w-full bg-[#FFF5F8] overflow-hidden">
      
      {/* Elementos Decorativos */}
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-gradient-to-br from-[#F285C1]/20 to-transparent rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-[20%] left-[-10%] w-[600px] h-[600px] bg-gradient-to-tr from-[#05F2DB]/10 to-transparent rounded-full blur-3xl" />

      {/* 1. CABECERA EDITORIAL (Alineada con el sistema visual) */}
      <section className="relative w-full pt-24 pb-16 lg:pt-32 z-10">
        <div className="container mx-auto px-6 lg:px-16">
          <div className="max-w-4xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-[2px] w-12 bg-[#BF2496]" />
              <span className="text-xs font-black uppercase tracking-[0.5em] text-[#BF2496]">
                Contacto
              </span>
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/60 backdrop-blur-md border border-[#BF2496]/20 mb-8 shadow-sm">
              <Sparkles size={14} className="text-[#BF2496]" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#BF2496]">Centro Podológico</span>
            </div>

            <h2 className="text-5xl md:text-7xl font-serif italic text-gray-900 leading-[1.1] mb-8">
              Comienza tu <br />
              <span className="text-[#BF2496] not-italic font-sans uppercase tracking-tighter">
                cuidado profesional.
              </span>
            </h2>

            <p className="text-gray-400 text-sm md:text-base font-light max-w-xl leading-relaxed italic">
              &ldquo;Agenda tu valoración en Mosquera y da el primer paso hacia unos pies sanos, funcionales y sin dolor.&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* 2. CONTACT CHANNELS (GRID) */}
      <section id="canales" className="relative pb-20 px-6 container mx-auto lg:px-16 z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {socialLinks.map((link, i) => (
            <div
              key={link.name}
              data-index={i}
              ref={(el) => { cardsRef.current[i] = el; }}
              className={`transition-all duration-1000 transform ${visibleCards[i] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <a 
                href={link.href}
                className="group block bg-white/80 backdrop-blur-lg rounded-[3rem] p-10 shadow-xl shadow-[#BF2496]/5 border border-white hover:-translate-y-2 transition-all duration-500 text-center"
              >
                <div className={`w-20 h-20 rounded-[2rem] mx-auto mb-8 flex items-center justify-center text-white shadow-lg ${link.color} group-hover:rotate-[10deg] transition-transform duration-500`}>
                  {link.icon}
                </div>
                <h3 className="text-2xl font-serif italic text-gray-900 mb-2">{link.name}</h3>
                <p className="text-gray-500 text-[11px] mb-8 font-black uppercase tracking-widest">{link.description}</p>
                <div className="inline-flex items-center gap-3 text-[#BF2496] font-black text-[10px] uppercase tracking-[0.3em] group-hover:gap-5 transition-all">
                  Conectar <ArrowRight size={14} />
                </div>
              </a>
            </div>
          ))}
        </div>

        {/* 3. INFO & CTA FINAL */}
        <div className="mt-20 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Ubicación y Horarios */}
          <div className="lg:col-span-5 bg-white/40 backdrop-blur-md rounded-[3.5rem] p-10 md:p-14 border border-white shadow-inner">
            <div className="flex items-center gap-4 mb-14">
              <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-[#BF2496] shadow-sm">
                <MapPin size={28} />
              </div>
              <h3 className="text-3xl font-serif italic text-gray-900">Visítanos</h3>
            </div>
            
            <div className="space-y-12">
              <div className="flex gap-6">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#BF2496] shadow-sm shrink-0">
                  <Clock size={20} />
                </div>
                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#BF2496]/60 mb-3">Horario Clínico</h4>
                  <p className="text-gray-900 font-bold text-lg leading-none mb-2 font-sans tracking-tight">Lunes a Viernes</p>
                  <p className="text-gray-500 font-medium text-sm mb-4">8:00 AM — 5:00 PM</p>
                  <p className="text-gray-900 font-bold text-lg leading-none mb-2 font-sans tracking-tight">Sábados</p>
                  <p className="text-gray-500 font-medium text-sm">8:00 AM — 2:00 PM</p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#BF2496] shadow-sm shrink-0">
                  <Phone size={20} />
                </div>
                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#BF2496]/60 mb-2">Atención Directa</h4>
                  <p className="text-2xl font-black text-gray-900 tracking-tighter font-sans uppercase">+57 (323) 231-2333</p>
                </div>
              </div>
            </div>
          </div>

          {/* Card CTA Final (Modo Oscuro para contraste) */}
          <div className="lg:col-span-7 relative group overflow-hidden rounded-[3.5rem] shadow-2xl">
            <div className="absolute inset-0 bg-gray-950" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#BF2496]/20 rounded-full blur-3xl -mr-20 -mt-20 group-hover:bg-[#05F2DB]/20 transition-colors duration-1000" />
            
            <div className="relative p-10 md:p-16 h-full flex flex-col z-10">
              <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-xl flex items-center justify-center text-[#05F2DB] mb-12 border border-white/10">
                <ShieldCheck size={32} />
              </div>
              
              <h3 className="text-5xl md:text-6xl font-serif italic text-white mb-8 leading-[0.9]">
                Tu salud <br /> <span className="not-italic font-sans font-black uppercase tracking-tighter text-[#05F2DB]">no da espera.</span>
              </h3>
              
              <p className="text-lg text-gray-400 font-light mb-12 max-w-sm leading-relaxed italic">
                &ldquo;Escríbenos ahora mismo y recibe una respuesta inmediata de nuestro equipo especializado.&rdquo;
              </p>

              <div className="mt-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a 
                  href={generateWhatsAppURL("general")}
                  className="flex items-center justify-center gap-3 bg-[#BF2496] text-white py-6 rounded-[2rem] font-black uppercase tracking-[0.2em] text-[11px] hover:bg-white hover:text-[#BF2496] transition-all duration-500 shadow-xl shadow-[#BF2496]/20"
                >
                  <MessageCircle size={18} /> WhatsApp
                </a>
                <a 
                  href="tel:+573232312333"
                  className="flex items-center justify-center gap-3 bg-white/5 border border-white/10 text-white py-6 rounded-[2rem] font-black uppercase tracking-[0.2em] text-[11px] hover:bg-white/10 transition-all duration-500"
                >
                  <Phone size={18} /> Llamar ahora
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 4. MAPA FULL-WIDTH */}
        <div className="mt-12 rounded-[4rem] overflow-hidden border-8 border-white shadow-2xl relative group">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d500!2d-74.2302042!3d4.7031208!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f77002089d93b%3A0x42c0d1393533479!2sPodoCare!5e0!3m2!1ses!2sco!4v1715000000000!5m2!1ses!2sco"
            width="100%"
            height="450"
            style={{ border: 0, display: 'block', filter: 'grayscale(0.2) contrast(1.1)' }}
            allowFullScreen
            loading="lazy"
            title="Ubicación PodoCare Mosquera"
          />
          <a
            href="https://maps.app.goo.gl/xy414V4CuuKsaC356"
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center justify-center gap-4 px-10 py-5 bg-white text-gray-900 rounded-full text-[11px] font-black uppercase tracking-[0.3em] hover:bg-[#BF2496] hover:text-white transition-all duration-500 shadow-2xl border border-gray-100"
          >
            <MapPin size={16} /> Ver ruta en Maps
          </a>
        </div>
      </section>
    </div>
  );
}