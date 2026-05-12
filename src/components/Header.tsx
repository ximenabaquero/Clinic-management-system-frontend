"use client";

import { Menu, X, Phone, LogOut, User, Award } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/features/auth/AuthContext";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero"); // Rastreador de sección
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout, loading } = useAuth();

  // Lista de navegación centralizada
  const navLinks = [
    { name: "Inicio", href: "/#hero", id: "hero" },
    { name: "Servicios", href: "/#servicios", id: "servicios" },
    { name: "Beneficios", href: "/#benefits", id: "benefits" },
    { name: "Testimonios", href: "/#testimonials", id: "testimonials" },
    { name: "Educación", href: "/#education", id: "education" },
    { name: "Contacto", href: "/#contact", id: "contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      // 1. Control de fondo del header
      setScrolled(window.scrollY > 20);

      // 2. Lógica de Scroll Spy: Detecta qué sección está en el viewport
      if (pathname === "/") {
        const sectionIds = navLinks.map(link => link.id);
        for (const id of sectionIds) {
          const element = document.getElementById(id);
          if (element) {
            const rect = element.getBoundingClientRect();
            // Si la parte superior de la sección está cerca del tope de la pantalla
            if (rect.top >= -200 && rect.top <= 300) {
              setActiveSection(id);
              break;
            }
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  if (loading) return null;

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  // Si el usuario está logueado, mostramos el header simplificado de admin
  if (user) {
    return (
      <header className="relative w-full z-50 bg-white shadow-md py-3">
        <div className="container mx-auto px-4 sm:px-6 lg:px-10 flex justify-end">
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D929AA] text-white font-bold uppercase tracking-[0.15em] transition hover:bg-[#BF2496]"
          >
            <LogOut size={18} />
            Cerrar sesión
          </button>
        </div>
      </header>
    );
  }

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled ? "bg-white shadow-md py-2" : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-2 lg:grid-cols-3 items-center">
          
          {/* COLUMNA 1: LOGO */}
          <div className="flex justify-start pointer-events-none">
            <Link href="/" className="flex items-center gap-2 sm:gap-3 group pointer-events-auto">
              <div
                className={`relative shrink-0 transition-all duration-300 ${
                  scrolled ? "h-11 w-11" : "h-12 w-12 sm:h-14 sm:w-14"
                } group-hover:scale-105`}
              >
                <Image
                  src="/logopodocare.webp"
                  alt="PodoCare Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div className="flex flex-col justify-center leading-tight">
                <span className="text-lg sm:text-xl leading-none font-serif tracking-tight text-gray-900">
                  <span className="text-[#F285C1] font-medium">Podo</span>
                  <span className="text-[#BF2496] font-bold">Care</span>
                </span>
                <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.15em] sm:tracking-[0.2em] font-bold text-[#05F2DB] mt-1">
                  Salud a cada paso
                </span>
              </div>
            </Link>
          </div>

          {/* COLUMNA 2: NAVEGACIÓN DESKTOP */}
          <nav className="hidden lg:flex justify-center relative z-20">
            <div className="flex items-center gap-1 px-1.5 py-1.5 rounded-full bg-white shadow-xl border border-gray-100 pointer-events-auto">
              {navLinks.map((link) => {
                // El botón está activo si el estado coincide con el ID del link
                const isActive = activeSection === link.id;
                
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`px-6 py-2.5 text-[10px] font-black uppercase tracking-[0.2em] rounded-full transition-all duration-300 cursor-pointer ${
                      isActive
                        ? "bg-[#BF2496] text-white shadow-lg shadow-[#BF2496]/20"
                        : "text-gray-600 hover:text-[#BF2496]"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* COLUMNA 3: ACCIONES */}
          <div className="flex justify-end items-center gap-2 sm:gap-4 pointer-events-none">
            <a
              href="tel:+573232312333"
              className={`hidden xl:flex items-center gap-2 px-5 py-2.5 rounded-full transition-all font-bold text-[10px] uppercase tracking-widest border pointer-events-auto ${
                scrolled
                  ? "bg-gray-50 border-gray-200 text-gray-600 hover:bg-[#05F2DB] hover:text-white"
                  : "bg-white text-gray-900 border-transparent shadow-lg"
              }`}
            >
              <Phone size={14} />
              <span>Agendar</span>
            </a>

            <button
              className={`lg:hidden p-2.5 rounded-xl transition-all outline-none border-none pointer-events-auto ${
                scrolled
                  ? "bg-gray-100 text-[#D929AA]"
                  : "bg-white text-[#D929AA] shadow-lg"
              }`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* MENÚ MÓVIL DESPLEGABLE */}
      <div
        className={`lg:hidden absolute top-full left-0 w-full bg-white shadow-2xl transition-all duration-300 ease-in-out overflow-hidden ${
          isMenuOpen ? "max-h-[500px] opacity-100 visible" : "max-h-0 opacity-0 invisible"
        }`}
      >
        <div className="flex flex-col items-center gap-2 p-6 bg-white border-t border-gray-50">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`w-full text-center py-4 rounded-2xl font-bold text-xs uppercase tracking-[0.2em] transition-colors ${
                activeSection === link.id
                  ? "bg-[#BF2496] text-white"
                  : "bg-gray-50 text-gray-700 hover:bg-[#BF2496] hover:text-white"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <a
            href="tel:+573232312333"
            className="w-full flex items-center justify-center gap-3 py-4 mt-2 rounded-2xl bg-[#05F2DB]/10 text-[#04b09f] font-bold text-xs uppercase tracking-widest"
          >
            <Phone size={18} /> Llamar ahora
          </a>
        </div>
      </div>
    </header>
  );
}