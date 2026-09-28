import type { Metadata } from "next";
import { supabase } from "@/lib/supabase";
import type { Proyecto } from "@/lib/types";
import ProyectoCard from "@/components/ProyectoCard";

export const metadata: Metadata = {
  title: "Proyectos",
  description: "Listado completo de proyectos de software.",
};

/**
 * Listado completo de proyectos (Server Component).
 * Ordenados del más reciente al más antiguo.
 */
export default async function ProyectosPage() {
  const { data, error } = await supabase
    .from("proyectos")
    .select("*")
    .order("anio", { ascending: false })
    .order("created_at", { ascending: false });

  const proyectos = data as Proyecto[] | null;

  if (error) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-24 text-center">
        <h1 className="text-2xl font-bold text-red-400">
          No se pudieron cargar los proyectos
        </h1>
        <p className="mt-4 text-[var(--color-texto-tenue)]">{error.message}</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="mb-2 text-3xl font-bold text-[var(--color-texto)]">
        Todos los proyectos
      </h1>
      <p className="mb-10 text-[var(--color-texto-tenue)]">
        {proyectos?.length ?? 0} proyecto(s) en total.
      </p>

      {proyectos && proyectos.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {proyectos.map((proyecto) => (
            <ProyectoCard key={proyecto.id} proyecto={proyecto} />
          ))}
        </div>
      ) : (
        <p className="text-[var(--color-texto-tenue)]">
          Todavía no hay proyectos registrados.
        </p>
      )}
    </div>
  );
}
