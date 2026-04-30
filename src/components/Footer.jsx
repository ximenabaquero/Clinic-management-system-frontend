"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  MapPin,
  Phone,
  Clock,
  Instagram,
  Facebook,
  Mail,
  ArrowUp,
} from "lucide-react";
import { useState } from "react";

const quickLinks = [
  { name: "Inicio", href: "#" },
  { name: "Especialidades", href: "#servicios" },
  { name: "Sobre Nosotros", href: "#nosotros" },
  { name: "Preguntas Frecuentes", href: "#faq" },
  { name: "Contacto", href: "#contacto" },
];

const areas = [
  { name: "Podología Clínica" },
  // { name: "Sueroterapia" },
  { name: "Enfermería" },
  { name: "Pedicure Medicinal" },
  { name: "Análisis de Marcha" },
];

export default function Footer() {
  const [currentYear] = useState(new Date().getFullYear());

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#F9F9F9] text-gray-800 overflow-hidden border-t border-gray-100">
      
      {/* Acento de color superior */}
      <div className="h-1.5 w-full bg-gradient-to-r from-[#05F2DB] via-[#F285C1] to-[#D929AA]"></div>

      <div className="container mx-auto px-6 lg:px-16 py-16 md:py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-8 mb-16">
          
          {/* Columna 1: Logo y Marca (Actualizado) */}
          <div className="space-y-8">
            <Link href="/" className="flex items-center gap-3 sm:gap-4 group">
              <div className="relative h-16 w-16 sm:h-20 sm:w-20 transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/podocare/podocare.png"
                  alt="PodoCare Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>

              <div className="flex flex-col justify-center">
                <span className="text-2xl sm:text-4xl leading-none font-serif tracking-tight">
                  <span className="text-[#F285C1] font-medium">Podo</span>
                  <span className="text-[#BF2496] font-bold">Care</span>
                </span>
                <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.25em] font-bold text-[#05F2DB] mt-1 leading-none">
                  Salud a cada paso
                </span>
              </div>
            </Link>

            <p className="text-sm text-gray-500 leading-relaxed font-light max-w-xs">
              Líderes en salud podológica y bienestar integral en Mosquera. 
              Cuidamos tus pasos con tecnología de vanguardia.
            </p>

            <div className="flex gap-4">
              {[
                { icon: <Instagram size={18} />, href: "http://instagram.com/podocaremosquera/" },
                { icon: <Facebook size={18} />, href: "https://www.facebook.com/share/1Dr6q7U41m/?mibextid=wwXIfr" },
                { icon: <Mail size={18} />, href: "mailto:contacto@podocare.com" },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-[#D929AA] hover:border-[#D929AA]/20 hover:shadow-lg transition-all duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Columna 2: Especialidades */}
          <div>
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#05F2DB] mb-8">
              Áreas Médicas
            </h3>
            <ul className="space-y-4">
              {areas.map((area, i) => (
                <li key={i} className="text-sm text-gray-500 font-medium">
                  {area.name}
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 4: Contacto */}
          <div className="space-y-6">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-900 mb-8">
              Ubícanos
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="text-[#D929AA] shrink-0" size={18} />
                <p className="text-sm text-gray-500 font-medium">
                  Calle 1 #1-11 Cons. 202<br />Mosquera, Cundinamarca
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="text-[#D929AA] shrink-0" size={18} />
                <p className="text-sm text-gray-500 font-medium">
                  Lun - Sáb: 8:00 AM - 6:00 PM
                </p>
              </div>
              <div className="pt-4">
                <a 
                  href="tel:+573232312333"
                  className="inline-flex items-center gap-2 text-gray-900 font-bold hover:text-[#D929AA] transition-colors"
                >
                  <Phone size={18} />
                  +57 323 231 2333
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Banner Inferior */}
        <div className="pt-10 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest text-center md:text-left">
            © {currentYear} PodoCare • <span className="text-gray-300">Mosquera, Cundinamarca</span>
          </p>
          
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-gray-900 transition-all"
          >
            Volver al inicio
            <div className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center group-hover:bg-gray-900 group-hover:text-white transition-all">
              <ArrowUp size={14} />
            </div>
          </button>


        </div>
      </div>
    </footer>
  );
}