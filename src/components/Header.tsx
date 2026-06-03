"use client";

import { Menu, X, Phone } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/features/auth/AuthContext";
import EditarPerfilAdminModal from "@/components/EditarPerfilAdminModal";
import { ROUTES } from "@/lib/routes";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showEditPerfil, setShowEditPerfil] = useState(false);
  const router = useRouter();
  const { user, logout, loading } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (loading) return null;

  const handleLogout = async () => {
    await logout();
    router.push(ROUTES.login);
  };

  return (
    <>
      <header
        className={`sticky top-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white shadow-sm border-b border-gray-100"
            : "bg-white/80 backdrop-blur-md border-b border-transparent"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo + usuario */}
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2.5 group">
                <div className="relative h-9 w-9">
                  <Image
                    src="/coldestheticlogo.png"
                    alt="Coldesthetic"
                    width={32}
                    height={32}
                    className="h-full w-full object-contain"
                    priority
                  />
                </div>
                <span className="text-lg font-bold bg-gradient-to-r from-emerald-500 to-blue-500 bg-clip-text text-transparent tracking-tight">
                  Coldesthetic
                </span>
              </Link>

              {user && (
                <div className="hidden sm:flex items-center gap-3">
                  <div className="w-px h-5 bg-gray-200" />
                  <div className="flex items-center gap-2.5">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-emerald-400 to-blue-500 flex items-center justify-center shrink-0 shadow-sm">
                      <span className="text-xs font-bold text-white uppercase">
                        {user.name.charAt(0)}
                      </span>
                    </div>
                    <div className="leading-tight">
                      <p className="text-xs font-semibold text-gray-800 max-w-[150px] truncate">
                        {user.name}
                      </p>
                      <p className="text-[10px] font-medium text-emerald-600">
                        {user.role === "ADMIN" ? "Administrador" : "Remitente"}
                      </p>
                    </div>
                    {user.role === "ADMIN" && (
                      <button
                        onClick={() => setShowEditPerfil(true)}
                        className="ml-1 p-1 rounded-md text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 transition"
                        title="Editar perfil"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-3.5 h-3.5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125"
                          />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Right section */}
            <div className="flex items-center gap-2">
              {/* Phone */}
              <a
                href="tel:+573004108199"
                className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg text-gray-500 hover:text-emerald-600 hover:bg-emerald-50 transition-all duration-200"
                aria-label="Llamar"
              >
                <Phone size={15} className="flex-shrink-0" />
                <span className="text-sm font-medium">+57 300 410 8199</span>
              </a>

              {/* Divider */}
              <div className="hidden sm:block w-px h-5 bg-gray-200 mx-1" />

              {user && (
                <button
                  type="button"
                  onClick={handleLogout}
                  className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-red-500 hover:bg-red-50 transition-all duration-200"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
                    />
                  </svg>
                  <span>Cerrar sesión</span>
                </button>
              )}

              {/* Mobile menu button */}
              <button
                className="lg:hidden ml-1 p-2 rounded-lg text-gray-500 hover:text-emerald-600 hover:bg-emerald-50 transition-all duration-200"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="lg:hidden border-t border-gray-100 py-3 pb-4">
              <div className="flex flex-col gap-1">
                <a
                  href="tel:+573004108199"
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 transition-all duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Phone size={17} />
                  <span className="font-medium text-sm">+57 300 410 8199</span>
                </a>

                {user?.role === "ADMIN" && (
                  <button
                    type="button"
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 transition-all duration-200 text-left"
                    onClick={() => {
                      setIsMenuOpen(false);
                      setShowEditPerfil(true);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125"
                      />
                    </svg>
                    <span className="font-medium text-sm">Editar perfil</span>
                  </button>
                )}

                {user ? (
                  <button
                    type="button"
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 hover:text-red-500 hover:bg-red-50 transition-all duration-200 text-left"
                    onClick={() => {
                      setIsMenuOpen(false);
                      handleLogout();
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
                      />
                    </svg>
                    <span className="font-medium text-sm">Cerrar sesión</span>
                  </button>
                ) : null}
              </div>
            </div>
          )}
        </div>
      </header>

      {showEditPerfil && (
        <EditarPerfilAdminModal onClose={() => setShowEditPerfil(false)} />
      )}
    </>
  );
}
