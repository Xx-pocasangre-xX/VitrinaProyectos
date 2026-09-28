import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import type { Categoria, Proyecto } from "@/lib/types";
import ProyectoCard from "@/components/ProyectoCard";

interface PaginaCategoriaProps {
  params: Promise<{ slug: string }>;
}

/** Busca una categoría por su slug. Reutilizada en generateMetadata y en la página. */
async function obtenerCategoriaPorSlug(slug: string) {
  const { data, error } = await supabase
    .from("categorias")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !data) {
    return null;
  }

  // Casteamos el resultado al tipo esperado: el cliente de Supabase no
  // usa el generic Database<> (ver src/lib/supabase.ts), así que el
  // tipado explícito se hace aquí, una vez resuelta la consulta.
  return data as Categoria;
}

export async function generateMetadata({
  params,
}: PaginaCategoriaProps): Promise<Metadata> {
  const { slug } = await params;
  const categoria = await obtenerCategoriaPorSlug(slug);

  if (!categoria) {
    return { title: "Categoría no encontrada" };
  }

  return {
    title: categoria.nombre,
    description: categoria.descripcion,
  };
}

export default async function PaginaCategoria({ params }: PaginaCategoriaProps) {
  const { slug } = await params;

  const categoria = await obtenerCategoriaPorSlug(slug);

  // Si la categoría no existe, mostramos la página 404 en vez de una
  // lista vacía sin contexto.
  if (!categoria) {
    notFound();
  }

  // Segunda consulta: todos los proyectos que pertenecen a esta categoría,
  // filtrando por su categoria_id (relación 1 a muchos).
  const { data, error: errorProyectos } = await supabase
    .from("proyectos")
    .select("*")
    .eq("categoria_id", categoria.id)
    .order("anio", { ascending: false });

  const proyectos = data as Proyecto[] | null;

  if (errorProyectos) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-24 text-center">
        <h1 className="text-2xl font-bold text-red-400">
          No se pudieron cargar los proyectos de esta categoría
        </h1>
        <p className="mt-4 text-[var(--color-texto-tenue)]">{errorProyectos.message}</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <Link
        href="/categorias"
        className="mb-6 inline-block text-sm text-[var(--color-texto-tenue)] hover:text-[var(--color-texto)]"
      >
        ← Volver a categorías
      </Link>

      <div className="mb-10 flex items-start gap-4">
        <span className="text-4xl">{categoria.icono}</span>
        <div>
          <h1 className="text-3xl font-bold text-[var(--color-texto)]">
            {categoria.nombre}
          </h1>
          <p className="mt-1 text-[var(--color-texto-tenue)]">{categoria.descripcion}</p>
        </div>
      </div>

      {proyectos && proyectos.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {proyectos.map((proyecto) => (
            <ProyectoCard key={proyecto.id} proyecto={proyecto} />
          ))}
        </div>
      ) : (
        <p className="text-[var(--color-texto-tenue)]">
          Todavía no hay proyectos en esta categoría.
        </p>
      )}
    </div>
  );
}
