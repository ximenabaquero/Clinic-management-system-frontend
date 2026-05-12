import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/features/auth/AuthContext";

const inter = Inter({ subsets: ["latin"] });

// 1. URL base para producción.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.podocareclinic.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "PodoCare - Salud a Cada Paso",
  description:
    "Centro podológico especializado en Mosquera. Cuidamos tus pies con tecnología avanzada y atención personalizada.",
  icons: {
    // Apuntamos a los diferentes tamaños para que Google y los navegadores elijan el mejor
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon48.ico', sizes: '48x48', type: 'image/x-icon' },
      { url: '/favicon144.ico', sizes: '144x144', type: 'image/x-icon' },
    ],
    shortcut: '/favicon.ico',
    apple: '/favicon144.ico', // Los iPhone prefieren tamaños grandes
  },
  openGraph: {
    title: "PodoCare - Salud a Cada Paso",
    description:
      "Centro podológico especializado en Mosquera. Cuidamos tus pies con tecnología avanzada y atención personalizada.",
    url: "https://www.podocareclinic.com",
    siteName: "PodoCare",
    images: [
      {
        url: "/podocarelogo.svg", // Imagen que sale cuando compartes el link en WhatsApp
        width: 800,
        height: 800,
        alt: "PodoCare Logo",
      },
    ],
    locale: "es_CO",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 2. Datos estructurados para el buscador (Favicon/Logo de Marca)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "PodoCare",
    "url": siteUrl,
    "logo": `${siteUrl}/favicon144.ico` // Google usa esto para indexar tu logo
  };

  return (
    <html lang="es">
      <body className={inter.className}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <AuthProvider>
          <main className="min-h-screen">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}