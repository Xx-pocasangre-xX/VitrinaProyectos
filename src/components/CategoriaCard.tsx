import Link from "next/link";
import type { Categoria } from "@/lib/types";

/**
 * Tarjeta usada para mostrar una categoría dentro de una cuadrícula
 * (en la página de inicio y en /categorias).
 */
export default function CategoriaCard({ categoria }: { categoria: Categoria }) {
  return (
    <Link
      href={`/categorias/${categoria.slug}`}
      className="flex flex-col items-start gap-2 rounded-xl border border-[var(--color-borde)] bg-[var(--color-superficie)] p-6 transition-colors hover:border-[var(--color-primario)]"
    >
      <span className="text-3xl">{categoria.icono}</span>
      <h3 className="text-base font-semibold text-[var(--color-texto)]">
        {categoria.nombre}
      </h3>
      <p className="text-sm text-[var(--color-texto-tenue)]">{categoria.descripcion}</p>
    </Link>
  );
}
