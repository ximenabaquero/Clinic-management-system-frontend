"use client";

import { useMemo, useState, type CSSProperties } from "react";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Shield,
  Home,
  User,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useAuth } from "./AuthContext";

function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/+$/, "");

  const floatStyles = useMemo<CSSProperties[]>(() => {
    const rand = mulberry32(246810);
    return Array.from({ length: 12 }, () => {
      const size = rand() * 100 + 50;
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

  const router = useRouter();
  const { setUser } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    try {
      await fetch(`${apiBaseUrl}/sanctum/csrf-cookie`, {
        credentials: "include",
      });

      const token = Cookies.get("XSRF-TOKEN") ?? "";

      const res = await fetch(`${apiBaseUrl}/api/v1/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-XSRF-TOKEN": token,
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        setErrorMessage(data?.message || "No se pudo iniciar sesión.");
        return;
      }

      setUser(data.user);

      const params = new URLSearchParams(window.location.search);
      const next = params.get("next") || "/register-patient";
      router.push(next);
    } catch (error) {
      setErrorMessage("Error de conexión con el servidor.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF5FA] relative">
      {/* CAPA DE TEXTURA 1: Malla de puntos/cuadrícula sutil */}
      <div 
        className="absolute inset-0 opacity-[0.15] pointer-events-none" 
        style={{
          backgroundImage: `radial-gradient(#BF2496 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}
      ></div>

      {/* CAPA DE TEXTURA 2: Degradado radial suave para dar profundidad */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#F285C1]/10 via-transparent to-[#05F2DB]/5 pointer-events-none"></div>

      {/* Elementos decorativos de fondo (Círculos flotantes mejorados) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-60">
        {floatStyles.map((style, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-gradient-to-br from-[#BF2496]/5 to-[#F285C1]/10 border border-[#BF2496]/5 backdrop-blur-[2px]"
            style={style}
          />
        ))}
      </div>

      {/* Header/Navigation */}
      <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-md border-b border-[#BF2496]/10 py-3">
        <div className="container mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 sm:gap-3 group">
              <div className="relative shrink-0 w-11 h-11 group-hover:scale-105 transition-all duration-300">
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

            <Link
              href="/"
              className="px-5 py-2.5 text-[10px] font-black uppercase tracking-[0.2em] rounded-full text-gray-600 hover:text-white hover:bg-[#BF2496] transition-all duration-300 flex items-center gap-2 bg-white/80 shadow-sm border border-gray-100"
            >
              <Home className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Inicio</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-6 py-12 relative z-10">
        <div className="w-full max-w-md">
          {/* Tarjeta del Login con ligero efecto Glassmorphism para acoplarse a las texturas de fondo */}
          <div className="bg-white/95 backdrop-blur-md rounded-[2.5rem] border border-white shadow-2xl shadow-[#BF2496]/5 overflow-hidden">
            {/* Top Branding Line */}
            <div className="h-2 bg-gradient-to-r from-[#BF2496] via-[#F285C1] to-[#05F2DB]"></div>

            <div className="p-10 md:p-12">
              <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 bg-[#BF2496]/5 rounded-full px-4 py-2 mb-6 border border-[#BF2496]/10">
                  <Shield className="w-4 h-4 text-[#BF2496]" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#BF2496]">
                    Acceso Restringido
                  </span>
                </div>

                <h2 className="text-4xl font-serif text-gray-900 mb-2 tracking-tight">
                  <span className="text-[#F285C1] font-medium">Portal</span>{" "}
                  <span className="text-[#BF2496] font-bold">Clínico</span>
                </h2>
                <p className="text-[9px] uppercase tracking-[0.2em] text-[#04b09f] font-bold">
                  Gestión administrativa de pacientes
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {errorMessage ? (
                  <div className="rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-xs font-bold text-red-600">
                    {errorMessage}
                  </div>
                ) : null}

                {/* Email field */}
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1"
                  >
                    Usuario / Email
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                      <Mail className="w-4 h-4 text-gray-300 group-focus-within:text-[#BF2496] transition-colors" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="ejemplo@podocare.com"
                      className="w-full pl-12 pr-4 py-4 bg-gray-50/50 border border-gray-100 rounded-2xl focus:bg-white focus:border-[#BF2496] focus:ring-4 focus:ring-[#BF2496]/5 focus:outline-none transition-all duration-300 text-gray-900 placeholder-gray-300 font-medium"
                    />
                  </div>
                </div>

                {/* Password field */}
                <div className="space-y-2">
                  <label
                    htmlFor="password"
                    className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1"
                  >
                    Contraseña
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                      <Lock className="w-4 h-4 text-gray-300 group-focus-within:text-[#BF2496] transition-colors" />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="••••••••"
                      className="w-full pl-12 pr-12 py-4 bg-gray-50/50 border border-gray-100 rounded-2xl focus:bg-white focus:border-[#BF2496] focus:ring-4 focus:ring-[#BF2496]/5 focus:outline-none transition-all duration-300 text-gray-900 placeholder-gray-300 font-medium"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-300 hover:text-[#BF2496] transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="group relative w-full py-5 px-6 bg-gray-900 text-white font-bold uppercase tracking-widest text-[10px] tracking-[0.2em] rounded-2xl shadow-lg hover:shadow-2xl hover:bg-[#BF2496] transition-all duration-500 hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                >
                  <div className="relative flex items-center justify-center gap-3">
                    {isLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Verificando...</span>
                      </>
                    ) : (
                      <>
                        <User className="w-4 h-4" />
                        <span>Entrar al Sistema</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </div>
                </button>
              </form>
            </div>
          </div>

          {/* Security notice footer */}
          <div className="mt-12 space-y-6 flex flex-col items-center">
            <div className="flex items-center gap-3 opacity-40">
              <div className="h-[1px] w-12 bg-gray-300"></div>
              <Lock className="w-3 h-3 text-gray-400" />
              <div className="h-[1px] w-12 bg-gray-300"></div>
            </div>

            <div className="bg-[#05F2DB]/5 backdrop-blur-sm rounded-2xl p-6 border border-[#05F2DB]/10">
              <p className="text-[10px] leading-relaxed text-gray-400 text-center mt-2 font-medium italic">
                El acceso no autorizado será monitoreado y reportado bajo los
                protocolos de seguridad vigentes.
              </p>
            </div>
          </div>
        </div>
      </main> 
    </div>
  );
}