import Image from "next/image";
import Link from "next/link";
import type { Proyecto } from "@/lib/types";
import TechBadge from "./TechBadge";

/**
 * Tarjeta usada para mostrar un proyecto dentro de una cuadrícula
 * (en la página de inicio, en /proyectos y en /categorias/[slug]).
 */
export default function ProyectoCard({ proyecto }: { proyecto: Proyecto }) {
  return (
    <Link
      href={`/proyectos/${proyecto.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-[var(--color-borde)] bg-[var(--color-superficie)] transition-transform hover:-translate-y-1 hover:border-[var(--color-primario)]"
    >
      <div className="relative h-44 w-full overflow-hidden">
        <Image
          src={proyecto.imagen_url}
          alt={`Portada del proyecto ${proyecto.titulo}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-[var(--color-texto)]">
            {proyecto.titulo}
          </h3>
          <span className="text-xs text-[var(--color-texto-tenue)]">{proyecto.anio}</span>
        </div>

        <p className="text-sm text-[var(--color-texto-tenue)]">{proyecto.resumen}</p>

        <div className="mt-auto flex flex-wrap gap-2 pt-2">
          {proyecto.tecnologias.slice(0, 3).map((tecnologia) => (
            <TechBadge key={tecnologia} nombre={tecnologia} />
          ))}
        </div>
      </div>
    </Link>
  );
}
