"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { MessageCircle, Phone, MapPin, Clock, ArrowRight, Instagram, ShieldCheck, Sparkles, ChevronDown } from 'lucide-react';
import { generateWhatsAppURL } from "@/utils/whatsapp";

// Generador de semillas para elementos decorativos
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
    icon: <MessageCircle className="w-6 h-6" />,
    color: 'bg-[#BF2496]',
    gradient: 'from-[#BF2496] to-[#D929AA]',
    description: '+57 (323) 231-2333'
  },
  {
    name: 'Instagram',
    href: 'http://instagram.com/podocaremosquera/',
    icon: <Instagram className="w-6 h-6" />,
    color: 'bg-[#D929AA]',
    gradient: 'from-[#D929AA] to-[#05F2DB]',
    description: '@podocaremosquera'
  },
  {
    name: 'Llamada',
    href: 'tel:+573232312333',
    icon: <Phone className="w-6 h-6" />,
    color: 'bg-[#05F2DB]',
    gradient: 'from-[#05F2DB] to-[#BF2496]',
    description: 'Atención Directa'
  }
];

export default function Contact() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [visibleCards, setVisibleCards] = useState<boolean[]>(new Array(3).fill(false));
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Elementos flotantes calculados una sola vez
  const particles = useMemo(() => {
    const rand = mulberry32(42);
    return Array.from({ length: 12 }, (_, i) => ({
      id: i,
      size: rand() * 100 + 50,
      left: rand() * 100,
      top: rand() * 100,
      delay: rand() * 5,
      duration: 15 + rand() * 10
    }));
  }, []);

  useEffect(() => {
    setIsLoaded(true);
    
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
    <div className="relative w-full bg-white">
      
      {/* 1. HERO SECTION CON IMAGEN DE FONDO */}
      <section className="relative w-full h-[85vh] flex items-center justify-center overflow-hidden bg-gray-950">
        {/* Capa de Imagen */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/podocare/herocontact.jpg" 
            alt="PodoCare Background" 
            className={`w-full h-full object-cover object-center transition-transform duration-[10000ms] ${isLoaded ? 'scale-100' : 'scale-110'}`}
          />
          {/* Overlays: Uno oscuro para contraste y un gradiente para fundir con el blanco inferior */}
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white" />
        </div>

        {/* Partículas Flotantes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
          {particles.map((p) => (
            <div
              key={p.id}
              className="absolute rounded-full bg-white/5 border border-white/10 blur-xl animate-pulse"
              style={{
                width: p.size,
                height: p.size,
                left: `${p.left}%`,
                top: `${p.top}%`,
                animationDelay: `${p.delay}s`,
                animationDuration: `${p.duration}s`
              }}
            />
          ))}
        </div>

        {/* Contenido Hero */}
        <div className="container mx-auto px-6 relative z-20">
          <div className={`max-w-4xl mx-auto text-center transition-all duration-1000 transform ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8">
              <Sparkles size={14} className="text-[#05F2DB]" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white">Centro Podológico</span>
            </div>
            
            <h1 className="text-5xl md:text-8xl font-serif italic text-white leading-tight mb-6">
              Comienza tu <br />
              <span className="not-italic font-sans font-black text-transparent bg-clip-text bg-gradient-to-r from-[#05F2DB] to-[#F285C1]">
                Cuidado
              </span>
            </h1>
            
            <p className="text-lg md:text-2xl text-gray-200 font-light max-w-2xl mx-auto mb-12">
              Agenda tu valoración profesional en Mosquera y da el primer paso hacia unos pies sanos y sin dolor.
            </p>

            {/* <a 
              href="#canales" 
              className="inline-flex items-center gap-3 bg-white text-gray-900 font-bold uppercase tracking-widest text-[11px] py-5 px-12 rounded-2xl hover:bg-[#BF2496] hover:text-white transition-all duration-300 group"
            >
              Ver canales de atención
              <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
            </a> */}
          </div>
        </div>
      </section>

      {/* 2. CONTACT CHANNELS (GRID) */}
      <section id="canales" className="relative z-30 -mt-24 pb-20 px-6 container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {socialLinks.map((link, i) => (
            <div
              key={link.name}
              data-index={i}
              ref={(el) => { cardsRef.current[i] = el; }}
              className={`transition-all duration-700 transform ${visibleCards[i] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <a 
                href={link.href}
                className="group block bg-white rounded-[2.5rem] p-10 shadow-2xl shadow-gray-200/50 border border-gray-100 hover:-translate-y-2 transition-all duration-500 text-center"
              >
                <div className={`w-16 h-16 rounded-2xl mx-auto mb-6 flex items-center justify-center text-white shadow-lg ${link.color} group-hover:scale-110 transition-transform duration-500`}>
                  {link.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{link.name}</h3>
                <p className="text-gray-500 text-sm mb-8">{link.description}</p>
                <div className="inline-flex items-center gap-2 text-[#BF2496] font-black text-[10px] uppercase tracking-[0.2em]">
                  Conectar ahora <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </a>
            </div>
          ))}
        </div>

        {/* 3. INFO & CTA FINAL */}
        <div className="mt-20 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Ubicación y Horarios */}
          <div className="lg:col-span-5 bg-gray-50 rounded-[3rem] p-10 border border-gray-100">
            <div className="flex items-center gap-4 mb-12">
              <div className="w-12 h-12 rounded-2xl bg-[#05F2DB]/10 flex items-center justify-center text-[#05F2DB]">
                <MapPin size={24} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Visítanos</h3>
            </div>
            
            <div className="space-y-10">
              <div className="flex gap-6">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-400 border border-gray-100 shrink-0">
                  <Clock size={18} />
                </div>
                <div>
                  <h4 className="text-[11px] font-black uppercase tracking-widest text-gray-400 mb-3">Horario Clínico</h4>
                  <p className="text-gray-900 font-bold mb-1">Lunes a Viernes</p>
                  <p className="text-gray-500 text-sm mb-4">9:00 AM — 7:00 PM</p>
                  <p className="text-gray-900 font-bold mb-1">Sábados</p>
                  <p className="text-gray-500 text-sm">9:00 AM — 2:00 PM</p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-400 border border-gray-100 shrink-0">
                  <Phone size={18} />
                </div>
                <div>
                  <h4 className="text-[11px] font-black uppercase tracking-widest text-gray-400 mb-2">Teléfono</h4>
                  <p className="text-xl font-bold text-gray-900">+57 (323) 231-2333</p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-400 border border-gray-100 shrink-0">
                  <MapPin size={18} />
                </div>
                <div>
                  <h4 className="text-[11px] font-black uppercase tracking-widest text-gray-400 mb-2">Dirección</h4>
                  <p className="text-gray-900 font-bold">Mosquera, Cundinamarca</p>
                  <p className="text-gray-500 text-sm">Colombia</p>
                </div>
              </div>

              <div className="rounded-2xl overflow-hidden border border-gray-100">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d500!2d-74.2302042!3d4.7031208!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f77002089d93b%3A0x42c0d1393533479!2sPodoCare!5e0!3m2!1ses!2sco!4v1715000000000!5m2!1ses!2sco"
                  width="100%"
                  height="220"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ubicación PodoCare Mosquera"
                />
                <a
                  href="https://maps.app.goo.gl/xy414V4CuuKsaC356"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 bg-gray-50 text-[#BF2496] text-[10px] font-black uppercase tracking-widest hover:bg-[#BF2496] hover:text-white transition-all duration-300"
                >
                  <MapPin size={12} /> Cómo llegar
                </a>
              </div>
            </div>
          </div>

          {/* Card CTA Final */}
          <div className="lg:col-span-7 relative group overflow-hidden rounded-[3rem]">
            <div className="absolute inset-0 bg-gray-900 transition-colors group-hover:bg-gray-800 duration-500" />
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#BF2496] to-[#05F2DB]" />
            
            <div className="relative p-10 md:p-16 h-full flex flex-col">
              <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-[#05F2DB] mb-10 border border-white/10">
                <ShieldCheck size={32} />
              </div>
              
              <h3 className="text-4xl md:text-6xl font-serif italic text-white mb-6">
                Tu salud <br /> <span className="not-italic font-sans font-bold">no tiene que esperar.</span>
              </h3>
              
              <p className="text-lg text-gray-400 font-light mb-12 max-w-md">
                Escríbenos ahora mismo y recibe una respuesta inmediata de nuestro equipo especializado.
              </p>

              <div className="mt-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a 
                  href={generateWhatsAppURL("general")}
                  className="flex items-center justify-center gap-3 bg-[#BF2496] text-white py-5 rounded-2xl font-bold uppercase tracking-widest text-[11px] hover:bg-[#D929AA] transition-all duration-300"
                >
                  <MessageCircle size={18} /> WhatsApp
                </a>
                <a 
                  href="tel:+573232312333"
                  className="flex items-center justify-center gap-3 bg-white/5 border border-white/10 text-white py-5 rounded-2xl font-bold uppercase tracking-widest text-[11px] hover:bg-white/10 transition-all duration-300"
                >
                  <Phone size={18} /> Llamar ahora
                </a>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}