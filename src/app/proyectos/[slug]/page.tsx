import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import type { ProyectoConCategoria } from "@/lib/types";
import TechBadge from "@/components/TechBadge";

// -----------------------------------------------------------------
// Ruta dinámica: /proyectos/[slug]
// -----------------------------------------------------------------
// Desde Next.js 15+ (incluye Next 16), "params" llega como una Promise
// tanto en la página como en generateMetadata, por lo que debe
// esperarse con "await" antes de usarlo.
// -----------------------------------------------------------------

interface PaginaProyectoProps {
  params: Promise<{ slug: string }>;
}

/**
 * Busca un proyecto por su slug, incluyendo los datos de su categoría
 * relacionada mediante un JOIN. Se reutiliza tanto en generateMetadata
 * como en el componente de página.
 */
async function obtenerProyectoPorSlug(slug: string) {
  const { data, error } = await supabase
    .from("proyectos")
    .select("*, categoria:categorias(*)")
    .eq("slug", slug)
    .single();

  if (error || !data) {
    return null;
  }

  // Casteamos el resultado al tipo esperado: el cliente de Supabase no
  // usa el generic Database<> (ver src/lib/supabase.ts), así que el
  // tipado explícito se hace aquí, una vez resuelta la consulta.
  return data as ProyectoConCategoria;
}

// generateMetadata permite que cada proyecto tenga su propio título de
// pestaña del navegador (SEO dinámico basado en datos de la base).
export async function generateMetadata({
  params,
}: PaginaProyectoProps): Promise<Metadata> {
  const { slug } = await params;
  const proyecto = await obtenerProyectoPorSlug(slug);

  if (!proyecto) {
    return { title: "Proyecto no encontrado" };
  }

  return {
    title: proyecto.titulo,
    description: proyecto.resumen,
  };
}

export default async function PaginaProyecto({ params }: PaginaProyectoProps) {
  const { slug } = await params;
  const proyecto = await obtenerProyectoPorSlug(slug);

  // Si el slug no corresponde a ningún proyecto, mostramos la página
  // 404 estándar de Next.js (src/app/not-found.tsx) en vez de una
  // página en blanco o un error de servidor.
  if (!proyecto) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-4xl px-6 py-16">
      <Link
        href="/proyectos"
        className="mb-6 inline-block text-sm text-[var(--color-texto-tenue)] hover:text-[var(--color-texto)]"
      >
        ← Volver a proyectos
      </Link>

      <div className="relative mb-8 h-72 w-full overflow-hidden rounded-xl sm:h-96">
        <Image
          src={proyecto.imagen_url}
          alt={`Portada del proyecto ${proyecto.titulo}`}
          fill
          sizes="(max-width: 768px) 100vw, 800px"
          className="object-cover"
          priority
        />
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <Link
          href={`/categorias/${proyecto.categoria.slug}`}
          className="rounded-full bg-[var(--color-primario)]/15 px-3 py-1 text-xs font-medium text-[var(--color-primario-claro)] hover:bg-[var(--color-primario)]/25"
        >
          {proyecto.categoria.icono} {proyecto.categoria.nombre}
        </Link>
        <span className="text-xs text-[var(--color-texto-tenue)]">{proyecto.anio}</span>
      </div>

      <h1 className="mb-4 text-3xl font-bold text-[var(--color-texto)] sm:text-4xl">
        {proyecto.titulo}
      </h1>

      <p className="mb-8 text-lg leading-relaxed text-[var(--color-texto-tenue)]">
        {proyecto.descripcion}
      </p>

      <div className="mb-8 flex flex-wrap gap-2">
        {proyecto.tecnologias.map((tecnologia) => (
          <TechBadge key={tecnologia} nombre={tecnologia} />
        ))}
      </div>

      <div className="flex flex-wrap gap-4">
        {proyecto.repositorio_url && (
          <a
            href={proyecto.repositorio_url}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-[var(--color-borde)] px-5 py-2.5 text-sm font-medium text-[var(--color-texto)] hover:border-[var(--color-primario)]"
          >
            Ver repositorio
          </a>
        )}
        {proyecto.demo_url && (
          <a
            href={proyecto.demo_url}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-[var(--color-primario)] px-5 py-2.5 text-sm font-medium text-white hover:bg-[var(--color-primario-claro)]"
          >
            Ver demo en vivo
          </a>
        )}
      </div>
    </article>
  );
}
