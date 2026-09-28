import type { NextConfig } from "next";

// Configuración de Next.js 16 para el proyecto Vitrina Dev.
// No se requieren opciones especiales: el App Router, Server Components
// y Turbopack (usado en "npm run dev") vienen habilitados por defecto.
const nextConfig: NextConfig = {
  images: {
    // Permitimos imágenes remotas alojadas en Unsplash e imágenes subidas
    // manualmente a Supabase Storage, para las portadas de cada proyecto.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "*.supabase.co",
      },
    ],
  },
};

export default nextConfig;
