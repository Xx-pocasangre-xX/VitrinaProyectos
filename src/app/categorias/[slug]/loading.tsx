export default function LoadingCategoria() {
  return (
    <div className="mx-auto max-w-6xl animate-pulse px-6 py-16">
      <div className="h-4 w-32 rounded bg-[var(--color-superficie)]" />
      <div className="mt-6 h-10 w-64 rounded-lg bg-[var(--color-superficie)]" />
      <div className="mt-3 h-4 w-80 rounded-lg bg-[var(--color-superficie)]" />

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
