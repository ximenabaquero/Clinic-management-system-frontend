import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/features/auth/AuthContext";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Coldesthetic - Estética Médica Avanzada",
  description:
    "Lipólisis láser asistida. Procedimiento mínimamente invasivo para reducción de grasa localizada con tecnología médica certificada",
  icons: {
    icon: { url: "/coldestheticlogo.png", type: "image/png" },
    apple: "/coldestheticlogo.png",
    shortcut: "/coldestheticlogo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={inter.variable}>
      <body className="font-sans antialiased">
        <AuthProvider>
          <main className="min-h-screen">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
