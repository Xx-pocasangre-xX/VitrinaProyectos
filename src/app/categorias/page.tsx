import type { Metadata } from "next";
import { supabase } from "@/lib/supabase";
import type { Categoria } from "@/lib/types";
import CategoriaCard from "@/components/CategoriaCard";

export const metadata: Metadata = {
  title: "Categorías",
  description: "Explora los proyectos organizados por categoría.",
};

export default async function CategoriasPage() {
  const { data, error } = await supabase
    .from("categorias")
    .select("*")
    .order("nombre", { ascending: true });

  const categorias = data as Categoria[] | null;

  if (error) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-24 text-center">
        <h1 className="text-2xl font-bold text-red-400">
          No se pudieron cargar las categorías
        </h1>
        <p className="mt-4 text-[var(--color-texto-tenue)]">{error.message}</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="mb-2 text-3xl font-bold text-[var(--color-texto)]">
        Categorías
      </h1>
      <p className="mb-10 text-[var(--color-texto-tenue)]">
        Explora los proyectos agrupados por tipo de tecnología.
      </p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {categorias?.map((categoria) => (
          <CategoriaCard key={categoria.id} categoria={categoria} />
        ))}
      </div>
    </div>
  );
}
