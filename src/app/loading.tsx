/**
 * Estado de carga de la página de inicio.
 * Next.js muestra este componente automáticamente (usando React
 * Suspense) mientras HomePage espera la respuesta de Supabase.
 */
export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl animate-pulse px-6 py-16">
      <div className="h-10 w-2/3 rounded-lg bg-[var(--color-superficie)]" />
      <div className="mt-4 h-4 w-1/2 rounded-lg bg-[var(--color-superficie)]" />

      <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, indice) => (
          <div
            key={indice}
            className="h-64 rounded-xl border border-[var(--color-borde)] bg-[var(--color-superficie)]"
          />
        ))}
      </div>
    </div>
  );
}
