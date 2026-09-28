import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Vitrina Dev — Portafolio de Proyectos",
    template: "%s | Vitrina Dev",
  },
  description:
    "Portafolio de proyectos de software construido con Next.js y Supabase.",
};

/**
 * Layout raíz de la aplicación. Envuelve TODAS las páginas con la
 * barra de navegación y el pie de página, y define el idioma del
 * documento HTML.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="flex min-h-screen flex-col antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
