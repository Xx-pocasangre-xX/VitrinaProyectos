import Link from "next/link";

/**
 * Barra de navegación superior, compartida por todas las páginas.
 * Es un Server Component (no usa hooks ni interactividad de cliente),
 * por lo que no necesita la directiva "use client".
 */
export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-borde)] bg-[var(--color-fondo)]/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold text-[var(--color-texto)]">
          <span className="text-2xl">🚀</span>
          Vitrina<span className="text-[var(--color-primario-claro)]">Dev</span>
        </Link>

        <div className="flex gap-6 text-sm font-medium text-[var(--color-texto-tenue)]">
          <Link href="/" className="hover:text-[var(--color-texto)]">
            Inicio
          </Link>
          <Link href="/proyectos" className="hover:text-[var(--color-texto)]">
            Proyectos
          </Link>
          <Link href="/categorias" className="hover:text-[var(--color-texto)]">
            Categorías
          </Link>
        </div>
      </nav>
    </header>
  );
}
