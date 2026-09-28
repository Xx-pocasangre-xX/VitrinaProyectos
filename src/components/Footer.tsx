/**
 * Pie de página simple, compartido por todas las páginas.
 */
export default function Footer() {
  return (
    <footer className="border-t border-[var(--color-borde)] py-8">
      <div className="mx-auto max-w-6xl px-6 text-center text-sm text-[var(--color-texto-tenue)]">
        <p>
          Construido con Next.js 16 (App Router) y Supabase — Actividad
          evaluada de Ingeniería Informática, UCA.
        </p>
      </div>
    </footer>
  );
}
