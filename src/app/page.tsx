import Link from "next/link";
import { supabase } from "@/lib/supabase";
import type { Categoria, Proyecto } from "@/lib/types";
import ProyectoCard from "@/components/ProyectoCard";
import CategoriaCard from "@/components/CategoriaCard";

// Esta página es un Server Component asíncrono: la consulta a Supabase
// se ejecuta en el servidor durante el renderizado, antes de enviar el
// HTML al navegador. No se envía JavaScript de cliente para esta lógica.
export default async function HomePage() {
  // -----------------------------------------------------------------
  // Lectura de datos desde Supabase (operación de lectura #1).
  // Traemos los proyectos marcados como "destacado" para la portada.
  // -----------------------------------------------------------------
  const { data: dataProyectos, error: errorProyectos } = await supabase
    .from("proyectos")
    .select("*")
    .eq("destacado", true)
    .order("anio", { ascending: false });

  const proyectosDestacados = dataProyectos as Proyecto[] | null;

  // -----------------------------------------------------------------
  // Lectura de datos desde Supabase (operación de lectura #2).
  // Traemos todas las categorías para mostrarlas como accesos rápidos.
  // -----------------------------------------------------------------
  const { data: dataCategorias, error: errorCategorias } = await supabase
    .from("categorias")
    .select("*")
    .order("nombre", { ascending: true });

  const categorias = dataCategorias as Categoria[] | null;

  // Manejo de errores: si Supabase falla (credenciales mal configuradas,
  // tabla inexistente, etc.), mostramos un mensaje claro en vez de que
  // la página se rompa silenciosamente o muestre datos vacíos sin explicación.
  if (errorProyectos || errorCategorias) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-24 text-center">
        <h1 className="text-2xl font-bold text-red-400">
          No se pudieron cargar los datos
        </h1>
        <p className="mt-4 text-[var(--color-texto-tenue)]">
          Verifica que las variables de entorno de Supabase estén
          configuradas correctamente y que las tablas existan.
        </p>
        <pre className="mt-4 overflow-x-auto rounded-lg bg-[var(--color-superficie)] p-4 text-left text-xs text-red-300">
          {errorProyectos?.message ?? errorCategorias?.message}
        </pre>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      {/* ----------------------------------------------------------- */}
      {/* Sección Hero                                                */}
      {/* ----------------------------------------------------------- */}
      <section className="flex flex-col items-start gap-6 py-12">
        <span className="h-1 w-16 rounded-full acento-degradado" />
        <h1 className="text-4xl font-bold leading-tight text-[var(--color-texto)] sm:text-5xl">
          Hola, soy Ricardo 👋
          <br />
          Esta es mi vitrina de proyectos.
        </h1>
        <p className="max-w-2xl text-lg text-[var(--color-texto-tenue)]">
          Una colección de aplicaciones móviles, sistemas web y proyectos
          personales que he construido mientras aprendo y practico
          desarrollo de software.
        </p>
        <Link
          href="/proyectos"
          className="rounded-lg bg-[var(--color-primario)] px-6 py-3 font-medium text-white transition-colors hover:bg-[var(--color-primario-claro)]"
        >
          Ver todos los proyectos
        </Link>
      </section>

      {/* ----------------------------------------------------------- */}
      {/* Proyectos destacados                                        */}
      {/* ----------------------------------------------------------- */}
      <section className="py-12">
        <h2 className="mb-6 text-2xl font-bold text-[var(--color-texto)]">
          Proyectos destacados
        </h2>

        {proyectosDestacados && proyectosDestacados.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {proyectosDestacados.map((proyecto) => (
              <ProyectoCard key={proyecto.id} proyecto={proyecto} />
            ))}
          </div>
        ) : (
          <p className="text-[var(--color-texto-tenue)]">
            Todavía no hay proyectos marcados como destacados.
          </p>
        )}
      </section>

      {/* ----------------------------------------------------------- */}
      {/* Categorías                                                  */}
      {/* ----------------------------------------------------------- */}
      <section className="py-12">
        <h2 className="mb-6 text-2xl font-bold text-[var(--color-texto)]">
          Explora por categoría
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categorias?.map((categoria) => (
            <CategoriaCard key={categoria.id} categoria={categoria} />
          ))}
        </div>
      </section>
    </div>
  );
}
