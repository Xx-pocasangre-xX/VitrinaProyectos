export default function LoadingProyecto() {
  return (
    <div className="mx-auto max-w-4xl animate-pulse px-6 py-16">
      <div className="h-4 w-32 rounded bg-[var(--color-superficie)]" />
      <div className="mt-6 h-72 w-full rounded-xl bg-[var(--color-superficie)] sm:h-96" />
      <div className="mt-8 h-8 w-2/3 rounded bg-[var(--color-superficie)]" />
      <div className="mt-4 h-4 w-full rounded bg-[var(--color-superficie)]" />
      <div className="mt-2 h-4 w-5/6 rounded bg-[var(--color-superficie)]" />
    </div>
  );
}
