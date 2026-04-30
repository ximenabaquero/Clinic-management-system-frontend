import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// ¿TIENES ESTAS IMPORTACIONES?
// import Header from '@/components/Header';
// import Footer from '@/components/Footer';
import { AuthProvider } from "@/features/auth/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: "PodoCare - Salud a Cada Paso",
  description:
    "Centro podológico especializado en Mosquera. Cuidamos tus pies con tecnología avanzada y atención personalizada.",
  icons: {
    icon: [
      { url: "/podocarelogo.svg?v=2", type: "image/svg+xml" },
    ],
    shortcut: ["/podocarelogo.svg?v=2"],
    apple: ["/logopodocare.png"],
  },
  openGraph: {
    title: "PodoCare - Salud a Cada Paso",
    description:
      "Centro podológico especializado en Mosquera. Cuidamos tus pies con tecnología avanzada y atención personalizada.",
    url: "https://www.podocareclinic.com",
    siteName: "PodoCare",
    images: [
      {
        url: "/podocarelogo.svg",
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
  return (
    <html lang="es">
      <body className={inter.className}>
        {/* ¿TIENES HEADER Y FOOTER AQUÍ? */}
        {/* <Header /> */}
        <AuthProvider>
          <main className="min-h-screen">{children}</main>
        </AuthProvider>
        {/* <Footer /> */}
      </body>
    </html>
  );
}
