"use client";

import { Menu, X, Phone, LogOut, User } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/features/auth/AuthContext";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();
  const { user, logout, loading } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (loading) return null;

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 bg-white border-b ${scrolled ? "py-2 shadow-md border-[#F285C1]/20" : "py-4 border-transparent"
        }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between">

          {/* Logo + Brand */}
          <div className="flex items-center gap-4 sm:gap-6">
            <Link href="/" className="flex items-center gap-3 sm:gap-4 group">
              {/* Logo con tamaño acorde a los textos */}
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
                {/* Slogan más corto y alineado al ancho del título */}
                <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.25em] font-bold text-[#05F2DB] mt-1 leading-none">
                  Salud a cada paso
                </span>
              </div>
            </Link>

            {/* Navegación Desktop */}
            <nav className="hidden lg:flex items-center gap-8 ml-8">
              <Link
                href="/"
                className="text-sm font-bold text-gray-700 hover:text-[#BF2496] transition-colors uppercase tracking-widest"
              >
                Inicio
              </Link>
              <Link
                href="/servicios"
                className="text-sm font-bold text-gray-700 hover:text-[#BF2496] transition-colors uppercase tracking-widest"
              >
                Servicios
              </Link>
              <Link
                href="/galeria"
                className="text-sm font-bold text-gray-700 hover:text-[#BF2496] transition-colors uppercase tracking-widest"
              >
                Galería
              </Link>
              <Link
                href="/contacto"
                className="text-sm font-bold text-gray-700 hover:text-[#BF2496] transition-colors uppercase tracking-widest"
              >
                Contacto
              </Link>
            </nav>

            {/* Perfil de Usuario (Desktop) */}
            {user && (
              <div className="hidden md:flex items-center gap-3 ml-2 pl-6 border-l border-gray-100">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#F285C1] to-[#BF2496] p-[1.5px]">
                  <div className="h-full w-full rounded-full bg-white flex items-center justify-center">
                    <span className="text-xs font-bold text-[#BF2496] uppercase">{user.name.charAt(0)}</span>
                  </div>
                </div>
                <div className="flex flex-col">
                  <p className="text-[11px] font-bold text-gray-800 tracking-tight leading-none">{user.name}</p>
                  <p className="text-[9px] font-black uppercase text-gray-400 mt-1">
                    {user.role === "ADMIN" ? "Admin" : "Paciente"}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Acciones */}
          <div className="flex items-center gap-2 sm:gap-4">
            <a
              href="tel:+573232312333"
              className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-full bg-gray-50 text-gray-600 hover:bg-[#05F2DB]/10 hover:text-[#04b09f] transition-all font-bold text-[10px] uppercase tracking-widest border border-gray-100"
            >
              <Phone size={14} className="text-[#05F2DB]" />
              <span>Agendar</span>
            </a>

            {user ? (
              <button
                onClick={handleLogout}
                className="p-2.5 rounded-xl text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all"
                title="Cerrar Sesión"
              >
                <LogOut size={20} />
              </button>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-2 px-6 py-2.5 rounded-full text-[11px] font-bold text-white bg-[#D929AA] hover:bg-[#BF2496] transition-all shadow-sm active:scale-95"
              >
                <User size={14} />
                <span className="uppercase tracking-widest">Entrar</span>
              </Link>
            )}

            {/* Menú Móvil */}
            <button
              className="lg:hidden p-2 rounded-xl bg-gray-50 text-[#D929AA]"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full p-4 bg-white border-b shadow-xl animate-in fade-in slide-in-from-top-2">
            <div className="flex flex-col gap-2">
              {/* Navegación Móvil */}
              <Link
                href="/"
                className="flex items-center justify-between px-5 py-4 rounded-xl bg-gray-50 text-gray-700 font-bold text-xs uppercase tracking-widest"
                onClick={() => setIsMenuOpen(false)}
              >
                <span>Inicio</span>
              </Link>              <Link
                href="/servicios"
                className="flex items-center justify-between px-5 py-4 rounded-xl bg-gray-50 text-gray-700 font-bold text-xs uppercase tracking-widest"
                onClick={() => setIsMenuOpen(false)}
              >
                <span>Servicios</span>
              </Link>
              <Link
                href="/galeria"
                className="flex items-center justify-between px-5 py-4 rounded-xl bg-gray-50 text-gray-700 font-bold text-xs uppercase tracking-widest"
                onClick={() => setIsMenuOpen(false)}
              >
                <span>Galería</span>
              </Link>
              <Link
                href="/contacto"
                className="flex items-center justify-between px-5 py-4 rounded-xl bg-gray-50 text-gray-700 font-bold text-xs uppercase tracking-widest"
                onClick={() => setIsMenuOpen(false)}
              >
                <span>Contacto</span>
              </Link>

              <div className="border-t border-gray-100 my-2"></div>

              <a
                href="tel:+573232312333"
                className="flex items-center justify-between px-5 py-4 rounded-xl bg-gray-50 text-gray-700"
              >
                <span className="font-bold text-xs uppercase tracking-widest">Llamar Ahora</span>
                <Phone size={18} className="text-[#05F2DB]" />
              </a>

              {user ? (
                <button
                  onClick={() => { setIsMenuOpen(false); handleLogout(); }}
                  className="flex items-center justify-between px-5 py-4 rounded-xl bg-red-50 text-red-500 font-bold text-xs uppercase tracking-widest"
                >
                  <span>Cerrar Sesión</span>
                  <LogOut size={18} />
                </button>
              ) : (
                <Link
                  href="/login"
                  className="flex items-center justify-between px-5 py-4 rounded-xl bg-[#D929AA] text-white font-bold text-xs uppercase tracking-widest"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span>Iniciar Sesión</span>
                  <User size={18} />
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}