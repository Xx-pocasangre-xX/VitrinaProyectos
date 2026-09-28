import { createClient } from "@supabase/supabase-js";

// -----------------------------------------------------------------
// Cliente de Supabase para Server Components.
// -----------------------------------------------------------------
// Como este proyecto solo hace LECTURA de datos públicos (protegidos
// por políticas RLS de "solo lectura"), no necesitamos manejar cookies
// de sesión ni autenticación de usuarios: basta con un cliente simple
// creado con la clave "anon" (pública), usado directamente dentro de
// Server Components. Next.js ejecuta este código únicamente en el
// servidor, así que las peticiones a Supabase nunca corren en el
// navegador del visitante.
//
// Nota: a propósito NO se usa el genérico Database<> de createClient()
// aquí. Cada consulta se tipa individualmente con ".returns<Tipo>()"
// (ver src/lib/types.ts), lo cual es más flexible para manejar joins
// con alias (como "categoria:categorias(*)") sin pelear con las reglas
// estrictas de inferencia del generic completo de Supabase.
// -----------------------------------------------------------------

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  // Lanzamos un error claro en vez de dejar que Supabase falle con un
  // mensaje críptico si alguien olvida configurar el archivo .env.local.
  throw new Error(
    "Faltan las variables de entorno de Supabase. Verifica que " +
      "NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY estén " +
      "definidas en tu archivo .env.local (ver .env.example)."
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    // No se necesita persistir sesión: este cliente solo se usa en el
    // servidor para lecturas públicas, nunca para autenticar usuarios.
    persistSession: false,
  },
});
