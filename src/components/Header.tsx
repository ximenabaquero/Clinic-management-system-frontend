"use client";

import { Menu, X, Phone, LogOut, User } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation"; // Importamos usePathname
import { useAuth } from "@/features/auth/AuthContext";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();
  const pathname = usePathname(); // Obtenemos la ruta actual
  const { user, logout, loading } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (loading) return null;

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  const navLinks = [
    { name: "Inicio", href: "/" },
    { name: "Servicios", href: "/servicios" },
    { name: "Contacto", href: "/contacto" },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled 
          ? "bg-white shadow-md py-2" 
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-2 lg:grid-cols-3 items-center">

          {/* COLUMNA 1: LOGO */}
          <div className="flex justify-start">
            <Link href="/" className="flex items-center gap-3 group">
              <div className={`relative transition-all duration-300 ${
                scrolled ? "h-12 w-12" : "h-14 w-14 sm:h-16 sm:w-16"
              } group-hover:scale-105`}>
                <Image
                  src="/podocare/podocare.png"
                  alt="PodoCare Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div className="flex flex-col justify-center">
                <span className={`text-xl sm:text-2xl leading-none font-serif tracking-tight transition-colors duration-300 ${
                  scrolled ? "text-gray-900" : "text-white"
                }`}>
                  <span className="text-[#F285C1] font-medium">Podo</span>
                  <span className="text-[#BF2496] font-bold">Care</span>
                </span>
                <span className="text-[8px] uppercase tracking-[0.2em] font-bold text-[#05F2DB] mt-1">
                  Salud a cada paso
                </span>
              </div>
            </Link>
          </div>

          {/* COLUMNA 2: NAVEGACIÓN DESKTOP */}
          <nav className="hidden lg:flex justify-center">
            <div className="flex items-center gap-1 px-1.5 py-1.5 rounded-full bg-white shadow-xl border border-gray-100">
              {navLinks.map((link) => {
                const isActive = pathname === link.href; // Validación de ruta activa
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`px-6 py-2.5 text-[10px] font-black uppercase tracking-[0.2em] rounded-full transition-all duration-300 ${
                      isActive 
                        ? "bg-[#BF2496] text-white" 
                        : "text-gray-600 hover:text-white hover:bg-[#BF2496]/80"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* COLUMNA 3: ACCIONES */}
          <div className="flex justify-end items-center gap-2 sm:gap-4">
            <a
              href="tel:+573232312333"
              className={`hidden xl:flex items-center gap-2 px-5 py-2.5 rounded-full transition-all font-bold text-[10px] uppercase tracking-widest border ${
                scrolled 
                  ? "bg-gray-50 border-gray-200 text-gray-600 hover:bg-[#05F2DB] hover:text-white" 
                  : "bg-white text-gray-900 border-transparent shadow-lg"
              }`}
            >
              <Phone size={14} />
              <span>Agendar</span>
            </a>

            {user ? (
              <button
                onClick={handleLogout}
                className={`p-2.5 rounded-xl transition-all outline-none ${
                  scrolled ? "text-gray-400 hover:text-red-500" : "text-white/80"
                }`}
              >
                <LogOut size={20} />
              </button>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-2 px-6 py-2.5 rounded-full text-[10px] font-black text-white bg-[#D929AA] hover:bg-[#BF2496] transition-all shadow-lg active:scale-95 uppercase tracking-widest"
              >
                <User size={14} />
                <span>Entrar</span>
              </Link>
            )}

            <button
              className={`lg:hidden p-2.5 rounded-xl transition-all outline-none border-none focus:ring-0 ${
                scrolled ? "bg-gray-100 text-[#D929AA]" : "bg-white text-[#D929AA] shadow-lg"
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
        className={`lg:hidden absolute top-full left-0 w-full bg-white shadow-2xl transition-all duration-300 ease-in-out border-none overflow-hidden ${
          isMenuOpen ? "max-h-[500px] opacity-100 visible" : "max-h-0 opacity-0 invisible"
        }`}
      >
        <div className="flex flex-col items-center gap-2 p-6 bg-white border-t border-gray-50">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`w-full text-center py-4 rounded-2xl font-bold text-xs uppercase tracking-[0.2em] transition-colors border-none outline-none ${
                  isActive 
                    ? "bg-[#BF2496] text-white" 
                    : "bg-gray-50 text-gray-700 hover:bg-[#BF2496] hover:text-white"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            );
          })}
          <a 
            href="tel:+573232312333" 
            className="w-full flex items-center justify-center gap-3 py-4 mt-2 rounded-2xl bg-[#05F2DB]/10 text-[#04b09f] font-bold text-xs uppercase tracking-widest border-none"
          >
            <Phone size={18} /> Llamar ahora
          </a>
        </div>
      </div>
    </header>
  );
}