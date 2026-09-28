# Vitrina Dev — Portafolio de Proyectos

Landing page construida con **Next.js 16 (App Router)** y **Supabase** como backend serverless, que muestra un catálogo de proyectos de software organizados por categoría de tecnología.

## 📚 Descripción del proyecto

Vitrina Dev es un portafolio personal de proyectos de desarrollo de software. Permite:

- Ver los proyectos destacados y todas las categorías desde la página de inicio.
- Consultar el listado completo de proyectos (`/proyectos`).
- Ver el detalle de un proyecto específico (`/proyectos/[slug]`), incluyendo su categoría, tecnologías usadas, enlaces a repositorio/demo.
- Consultar el listado de categorías (`/categorias`).
- Ver todos los proyectos de una categoría específica (`/categorias/[slug]`).

Toda la información (proyectos y categorías) se almacena en una base de datos **PostgreSQL gestionada por Supabase**, y se consulta directamente desde **Server Components** de Next.js — no se expone ninguna API propia ni se usa `fetch` del lado del cliente para cargar estos datos.

## 🧱 Stack técnico

| Componente         | Tecnología                          |
|---------------------|--------------------------------------|
| Framework           | Next.js 16 (App Router, Turbopack)  |
| Lenguaje            | TypeScript                          |
| Estilos             | Tailwind CSS 4                      |
| Backend / Base de datos | Supabase (PostgreSQL + RLS)     |
| Despliegue          | Vercel                              |

## 🗂️ Estructura de rutas

```
/                       Página de inicio (proyectos destacados + categorías)
/proyectos              Listado completo de proyectos
/proyectos/[slug]       Detalle de un proyecto (ruta dinámica)
/categorias             Listado de categorías
/categorias/[slug]      Proyectos de una categoría (ruta dinámica)
```

Cada ruta dinámica incluye su propio `loading.tsx` (estado de carga mientras se consulta Supabase) y usa `notFound()` para mostrar una página 404 clara cuando el slug no existe. También hay un `error.tsx` global para capturar errores inesperados de renderizado.

## 🗄️ Estructura de datos en Supabase

Dos tablas relacionadas:

- **`categorias`**: `id`, `nombre`, `slug`, `descripcion`, `icono`.
- **`proyectos`**: `id`, `categoria_id` (FK a `categorias`), `titulo`, `slug`, `resumen`, `descripcion`, `tecnologias` (array de texto), `imagen_url`, `repositorio_url`, `demo_url`, `destacado`, `anio`.

El archivo [`supabase/schema.sql`](./supabase/schema.sql) contiene:

1. La creación de ambas tablas.
2. Row Level Security (RLS) **activado** en ambas tablas.
3. Políticas de **solo lectura pública** (`select` para los roles `anon` y `authenticated`) — no existen políticas de escritura, por lo que insertar, actualizar o borrar datos con la clave pública (`anon key`) está bloqueado por defecto.
4. Datos de ejemplo: 4 categorías y 6 proyectos.

## 🚀 Instalación local

### 1. Requisitos previos

- Node.js 20 o superior
- Una cuenta gratuita de [Supabase](https://supabase.com)

### 2. Clonar el repositorio e instalar dependencias

```bash
git clone https://github.com/<tu-usuario>/vitrina-dev-nextjs.git
cd vitrina-dev-nextjs
npm install
```

### 3. Crear el proyecto en Supabase

1. Entra a [supabase.com/dashboard](https://supabase.com/dashboard) y crea un nuevo proyecto.
2. Ve a **SQL Editor** → **New query**.
3. Copia y pega todo el contenido de [`supabase/schema.sql`](./supabase/schema.sql) y dale **Run**.
4. Verifica en **Table Editor** que las tablas `categorias` y `proyectos` se crearon con datos de ejemplo.

### 4. Configurar las variables de entorno

```bash
cp .env.example .env.local
```

Edita `.env.local` con los datos de tu proyecto de Supabase (**Project Settings → API**):

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

> ⚠️ Usa siempre la clave **`anon` / `public`**, nunca la `service_role` (esa es secreta y no debe usarse en el frontend).

### 5. Correr en desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

### 6. Build de producción (opcional, para verificar antes de desplegar)

```bash
npm run build
npm run start
```

## 🔑 Variables de entorno necesarias

| Variable                        | Descripción                                              |
|----------------------------------|-----------------------------------------------------------|
| `NEXT_PUBLIC_SUPABASE_URL`      | URL del proyecto de Supabase (Project Settings → API).    |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Clave pública ("anon key") del proyecto de Supabase.      |

Ver [`.env.example`](./.env.example) para la plantilla completa (sin credenciales reales).

## ☁️ Despliegue en Vercel

1. Sube este repositorio a GitHub (público).
2. Entra a [vercel.com/new](https://vercel.com/new) e importa el repositorio.
3. En **Environment Variables**, agrega `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_ANON_KEY` con los mismos valores de tu `.env.local`.
4. Dale **Deploy**. Vercel detecta Next.js automáticamente y no requiere configuración adicional.

## ✅ Buenas prácticas aplicadas

- **Server Components** en todas las páginas que consultan datos (ninguna usa `"use client"` para leer de Supabase).
- **Loading states** (`loading.tsx`) en cada segmento de ruta, incluyendo las rutas dinámicas.
- **Manejo de errores**: `error.tsx` global (Error Boundary) y verificación explícita del campo `error` devuelto por cada consulta a Supabase, con `notFound()` para slugs inexistentes.
- **RLS configurado correctamente**: solo lectura pública, sin exponer operaciones de escritura a la clave anónima.
- **Variables de entorno** documentadas en `.env.example`, nunca committeadas con valores reales (`.env.local` está en `.gitignore`).

## 👤 Autor

Ricardo García
