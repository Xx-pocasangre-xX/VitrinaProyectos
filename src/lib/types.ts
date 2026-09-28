// -----------------------------------------------------------------
// Tipos de datos de la base de datos (Supabase / PostgreSQL).
// -----------------------------------------------------------------
// Estos tipos reflejan exactamente las tablas creadas en
// supabase/schema.sql. Definirlos a mano (en vez de generarlos
// automáticamente con la CLI de Supabase) es suficiente para un
// proyecto de este tamaño y evita depender de herramientas externas.
// -----------------------------------------------------------------

export interface Categoria {
  id: string;
  nombre: string;
  slug: string;
  descripcion: string;
  icono: string;
  created_at: string;
}

export interface Proyecto {
  id: string;
  categoria_id: string;
  titulo: string;
  slug: string;
  resumen: string;
  descripcion: string;
  tecnologias: string[];
  imagen_url: string;
  repositorio_url: string | null;
  demo_url: string | null;
  destacado: boolean;
  anio: number;
  created_at: string;
}

// Un proyecto acompañado de los datos de su categoría relacionada
// (resultado de un JOIN con .select("*, categoria:categorias(*)")).
export interface ProyectoConCategoria extends Proyecto {
  categoria: Categoria;
}
