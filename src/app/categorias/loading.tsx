export default function LoadingCategorias() {
  return (
    <div className="mx-auto max-w-6xl animate-pulse px-6 py-16">
      <div className="h-8 w-48 rounded-lg bg-[var(--color-superficie)]" />
      <div className="mt-3 h-4 w-64 rounded-lg bg-[var(--color-superficie)]" />

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, indice) => (
          <div
            key={indice}
            className="h-32 rounded-xl border border-[var(--color-borde)] bg-[var(--color-superficie)]"
          />
        ))}
      </div>
    </div>
  );
}
