-- ===================================================================
-- Vitrina Dev - Esquema de base de datos para Supabase
-- ===================================================================
-- Cómo usar este archivo:
-- 1. Entra a tu proyecto en https://supabase.com/dashboard
-- 2. Ve a "SQL Editor" -> "New query"
-- 3. Pega todo este archivo y dale "Run"
--
-- Esto crea las tablas "categorias" y "proyectos", activa Row Level
-- Security (RLS), define las políticas de solo lectura pública, y
-- siembra ambas tablas con datos de ejemplo.
-- ===================================================================

-- Habilitamos la extensión necesaria para generar UUIDs aleatorios.
create extension if not exists "pgcrypto";

-- -------------------------------------------------------------------
-- Tabla: categorias
-- -------------------------------------------------------------------
-- Agrupa los proyectos por tipo de tecnología (Android, Web, etc.).
-- -------------------------------------------------------------------
create table if not exists public.categorias (
    id          uuid primary key default gen_random_uuid(),
    nombre      text not null,
    slug        text not null unique,          -- usado en la URL: /categorias/[slug]
    descripcion text not null,
    icono       text not null default '💻',     -- emoji simple para no depender de un set de íconos
    created_at  timestamptz not null default now()
);

-- -------------------------------------------------------------------
-- Tabla: proyectos
-- -------------------------------------------------------------------
-- Cada proyecto pertenece a una categoría (relación 1 a muchos).
-- -------------------------------------------------------------------
create table if not exists public.proyectos (
    id               uuid primary key default gen_random_uuid(),
    categoria_id     uuid not null references public.categorias (id) on delete cascade,
    titulo           text not null,
    slug             text not null unique,      -- usado en la URL: /proyectos/[slug]
    resumen          text not null,             -- descripción corta, usada en tarjetas/listados
    descripcion      text not null,             -- descripción larga, usada en el detalle del proyecto
    tecnologias      text[] not null default '{}', -- ej: {"Kotlin", "Jetpack Compose"}
    imagen_url       text not null,
    repositorio_url  text,
    demo_url         text,
    destacado        boolean not null default false, -- true = aparece en la portada
    anio             integer not null,
    created_at       timestamptz not null default now()
);

-- Índice para acelerar el filtrado de proyectos por categoría
-- (usado en la ruta /categorias/[slug]).
create index if not exists idx_proyectos_categoria_id on public.proyectos (categoria_id);

-- ===================================================================
-- ROW LEVEL SECURITY (RLS)
-- ===================================================================
-- Activamos RLS en ambas tablas. Por defecto, esto BLOQUEA todo acceso
-- hasta que se defina una política explícita. Como este es un sitio
-- público de solo lectura (catálogo de proyectos), solo creamos
-- políticas de SELECT para el rol "anon" (visitantes sin sesión) y
-- "authenticated". No existen políticas de INSERT/UPDATE/DELETE, por
-- lo que esas operaciones quedan bloqueadas para cualquier cliente que
-- use la clave pública (anon key) — solo la "service_role" (secreta,
-- nunca usada en el frontend) podría escribir datos.
-- ===================================================================

alter table public.categorias enable row level security;
alter table public.proyectos enable row level security;

-- Lectura pública de categorías.
create policy "Permitir lectura pública de categorias"
    on public.categorias
    for select
    to anon, authenticated
    using (true);

-- Lectura pública de proyectos.
create policy "Permitir lectura pública de proyectos"
    on public.proyectos
    for select
    to anon, authenticated
    using (true);

-- ===================================================================
-- DATOS DE EJEMPLO (SEED)
-- ===================================================================
-- Estos son los proyectos reales del portafolio de Ricardo. Los
-- proyectos desarrollados en el trabajo actual se describen sin
-- mencionar el nombre de la empresa, por preferencia personal del autor.
-- ===================================================================

insert into public.categorias (nombre, slug, descripcion, icono) values
    ('Aplicaciones Móviles', 'moviles', 'Apps nativas para Android construidas con Kotlin.', '📱'),
    ('Desarrollo Web', 'web', 'Plataformas web full-stack construidas con el stack MERN.', '🌐'),
    ('Sistemas Empresariales', 'empresariales', 'ERPs, APIs y sistemas de gestión construidos con C#/.NET.', '🏢'),
    ('Proyectos Académicos', 'academicos', 'Proyectos multiplataforma desarrollados durante la carrera.', '🎓'),
    ('Proyectos Personales', 'personales', 'Ideas y experimentos desarrollados por cuenta propia.', '🚀')
on conflict (slug) do nothing;

-- Insertamos los proyectos usando una subconsulta para obtener el id
-- de cada categoría a partir de su slug (más legible que escribir
-- UUIDs literales a mano).
insert into public.proyectos
    (categoria_id, titulo, slug, resumen, descripcion, tecnologias, imagen_url, repositorio_url, demo_url, destacado, anio)
values
    (
        (select id from public.categorias where slug = 'empresariales'),
        'Sistema Interno MOPT',
        'sistema-interno-mopt',
        'Módulos de mantenimiento para el Ministerio de Obras Públicas y Transporte, durante un período de prácticas profesionales.',
        'Sistema administrativo desarrollado para el Ministerio de Obras Públicas y Transporte durante un período de prácticas profesionales, construido dentro de un framework institucional en capas ya existente (Entidad-DAL-BLL). Se implementaron módulos de mantenimiento (catálogos administrativos como tipos de documento, notarios y registro de propiedad), con ajustes de diseño de interfaz y pruebas funcionales, trabajando en equipo junto a otros practicantes.',
        array['C#', 'ASP.NET', 'SQL Server', 'UI/UX Design', 'QA Testing'],
        'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
        null,
        null,
        false,
        2025
    ),
    (
        (select id from public.categorias where slug = 'web'),
        'Marquesa',
        'marquesa',
        'Plataforma e-commerce de regalos personalizados para un emprendimiento real, con app móvil y chat en tiempo real.',
        'Marquesa es una plataforma e-commerce completa para una tienda de regalos personalizados, desarrollada sobre arquitectura MERN con una aplicación móvil en React Native/Expo, digitalizando un emprendimiento real de arreglos florales y gift boxes. El aporte incluyó gran parte del desarrollo frontend (web y móvil) y del diseño de experiencia de usuario, además de dos piezas desarrolladas por completo: un sistema de ruleta de descuentos gamificado y ajustes al chat en tiempo real entre clientes y administración (Socket.IO).',
        array['React', 'Node.js', 'Express', 'MongoDB', 'React Native', 'Socket.IO'],
        'https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=800&q=80',
        'https://github.com/xxDianaPadilla/Marquesa',
        null,
        true,
        2025
    ),
    (
        (select id from public.categorias where slug = 'web'),
        'HomeClick',
        'homeclick',
        'Plataforma inmobiliaria full-stack con mapa interactivo y panel administrativo.',
        'HomeClick es una plataforma inmobiliaria full-stack que conecta compradores con propiedades de manera intuitiva, desarrollada sobre arquitectura MERN. El aporte se concentró en gran parte del desarrollo frontend: flujos de login, registro y recuperación de contraseña, catálogo de propiedades con mapa interactivo (Leaflet), landing page y panel administrativo (dashboard, categorías, ventas), además de integración con la API REST del backend.',
        array['React', 'React Hook Form', 'Node.js', 'Express', 'MongoDB', 'Leaflet'],
        'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80',
        'https://github.com/xxDianaPadilla/homeClick',
        null,
        true,
        2024
    ),
    (
        (select id from public.categorias where slug = 'academicos'),
        'ISSS Salud',
        'isss-salud',
        'Sistema hospitalario multiplataforma: escritorio en Java para personal médico y app móvil en Kotlin para pacientes.',
        'ISSS Salud es un proyecto académico de gestión hospitalaria compuesto por dos aplicaciones relacionadas: una de escritorio en Java/Swing para personal médico y administrativo, y una móvil en Kotlin para pacientes, ambas sobre una misma base de datos Oracle compartida. El trabajo en equipo se enfocó particularmente en la función de mensajería directa entre doctor y paciente, además de la navegación diferenciada por rol y el hashing de contraseñas (SHA-256) en ambas plataformas.',
        array['Java', 'Kotlin', 'Android', 'Oracle Database', 'Desktop App'],
        'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80',
        'https://github.com/Xx-pocasangre-xX/ISSS_Salud-Java',
        null,
        true,
        2024
    ),
    (
        (select id from public.categorias where slug = 'personales'),
        'Gestor Financiero Mensual',
        'gestor-financiero-mensual',
        'Control de finanzas personales desarrollado como app Android nativa y como aplicación web independiente.',
        'Gestor Financiero Mensual es un proyecto personal de control de finanzas propias, desarrollado como app Android nativa (Kotlin, arquitectura MVVM) y como aplicación web (React), cada una con su propio almacenamiento local. Incluye seguimiento de ingresos y gastos por categoría, metas de ahorro con aportes fechados, gráficas de flujo mensual y exportación a Excel, con un formato de respaldo en JSON compatible entre ambas plataformas para transferir datos manualmente.',
        array['Kotlin', 'Android', 'Room', 'MVVM', 'React', 'Vitest'],
        'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80',
        null,
        null,
        false,
        2025
    ),
    (
        (select id from public.categorias where slug = 'empresariales'),
        'Sistema ERP Empresarial',
        'sistema-erp-empresarial',
        'ERP con módulos de facturación, cuentas por cobrar, punto de venta y caja, construido con DevExpress XAF/XPO.',
        'Sistema ERP empresarial de gestión integral desarrollado con DevExpress XAF y XPO sobre .NET, para una empresa del sector distribución. El sistema centraliza los procesos comerciales, contables y operativos, cubriendo módulos de facturación electrónica, cuentas por cobrar, punto de venta (POS) y control de caja. El trabajo incluyó el desarrollo de la capa de API REST que consumen las apps móviles corporativas (autenticación, catálogos, ventas y caja), además de colaboración en módulos de cuentas por cobrar/pagar y catálogos comerciales sobre PostgreSQL.',
        array['C#', '.NET', 'DevExpress XAF', 'XPO', 'PostgreSQL', 'WinForms', 'Blazor'],
        'https://images.unsplash.com/photo-1553413077-190083d0b6cf?w=800&q=80',
        null,
        null,
        true,
        2026
    ),
    (
        (select id from public.categorias where slug = 'moviles'),
        'App Punteo',
        'app-punteo',
        'App Android para digitalizar el registro de clientes en campo mediante un formulario multipaso con geolocalización.',
        'Aplicación Android nativa desarrollada en Kotlin para digitalizar el registro de información de clientes en campo mediante un formulario guiado de 7 pasos, con captura de la ubicación geográfica del punto de registro usando Google Location Services. El flujo se implementó con Fragments y un estado de formulario compartido a través de la Activity contenedora, junto con una capa de red (OkHttp/Gson) preparada para integrarse con un backend corporativo en una siguiente etapa del proyecto.',
        array['Kotlin', 'Android SDK', 'Fragments', 'Google Location Services'],
        'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=800&q=80',
        null,
        null,
        false,
        2026
    ),
    (
        (select id from public.categorias where slug = 'moviles'),
        'App Ventas',
        'app-ventas',
        'App Android para gestión de ventas en campo: catálogo, pedidos y sincronización offline con impresión de tickets Bluetooth.',
        'Aplicación Android nativa desarrollada en Kotlin para la gestión de ventas en campo, que permite al equipo comercial consultar catálogos de productos, registrar pedidos y sincronizar operaciones con un sistema ERP central a través de una API REST propia. Construida con arquitectura por capas (interfaz, sincronización, acceso a datos), incluye una cola de pedidos pendientes para operar sin conexión, envío idempotente para evitar duplicados, y comunicación Bluetooth con impresoras térmicas (protocolo ESC/POS) para imprimir tickets con código QR.',
        array['Kotlin', 'Android SDK', 'Retrofit + OkHttp', 'Coroutines', 'SQLite', 'Impresión Bluetooth'],
        'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80',
        null,
        null,
        true,
        2026
    ),
    (
        (select id from public.categorias where slug = 'empresariales'),
        'ERPAPI',
        'erpapi',
        'Capa de API REST que conecta las apps móviles de campo con un sistema ERP central, con autenticación JWT y permisos por vendedor.',
        'Capa de API REST empresarial desarrollada en C#/.NET sobre PostgreSQL, que sirve de integración entre las aplicaciones móviles de campo y un sistema ERP central. Centraliza la autenticación de los clientes móviles mediante JWT y expone endpoints optimizados (con proyecciones específicas para reducir el payload) para catálogos, ventas, pedidos y caja, incluyendo control de permisos por vendedor y envío idempotente para evitar operaciones duplicadas ante reintentos de red.',
        array['C#', '.NET', 'PostgreSQL', 'JWT', 'REST API'],
        'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
        null,
        null,
        false,
        2026
    )
on conflict (slug) do nothing;
