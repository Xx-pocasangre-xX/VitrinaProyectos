import Link from "next/link";

/**
 * Página 404 global. Next.js la muestra automáticamente cuando se
 * visita una ruta que no existe, o cuando se llama a notFound()
 * dentro de una página (por ejemplo, un slug de proyecto inválido).
 */
export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 px-6 py-24 text-center">
      <span className="text-6xl">🔍</span>
      <h1 className="text-3xl font-bold text-[var(--color-texto)]">
        Página no encontrada
      </h1>
      <p className="text-[var(--color-texto-tenue)]">
        No pudimos encontrar lo que buscas. Puede que el enlace esté roto
        o que el proyecto ya no exista.
      </p>
      <Link
        href="/"
        className="rounded-lg bg-[var(--color-primario)] px-6 py-3 font-medium text-white transition-colors hover:bg-[var(--color-primario-claro)]"
      >
        Volver al inicio
      </Link>
    </div>
  );
}
