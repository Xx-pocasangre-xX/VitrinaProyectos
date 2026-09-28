"use client";

// Los archivos error.tsx de Next.js son Error Boundaries de React y
// SIEMPRE deben ser Client Components ("use client"), porque React
// necesita poder capturar el error y volver a renderizar en el navegador.

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // En un proyecto real aquí se enviaría el error a un servicio de
    // monitoreo (Sentry, LogRocket, etc.). Por ahora solo lo registramos
    // en la consola del servidor para poder depurarlo.
    console.error("Error inesperado en la aplicación:", error);
  }, [error]);

  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 px-6 py-24 text-center">
      <h1 className="text-3xl font-bold text-red-400">Algo salió mal</h1>
      <p className="text-[var(--color-texto-tenue)]">
        Ocurrió un error inesperado al cargar esta página. Puedes intentar
        de nuevo.
      </p>
      <button
        onClick={() => reset()}
        className="rounded-lg bg-[var(--color-primario)] px-6 py-3 font-medium text-white transition-colors hover:bg-[var(--color-primario-claro)]"
      >
        Intentar de nuevo
      </button>
    </div>
  );
}
