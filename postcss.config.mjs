/**
 * Configuración de PostCSS para Tailwind CSS 4.
 * En Tailwind v4 ya no se necesita "tailwind.config.js": la configuración
 * del tema se hace directamente en src/app/globals.css con la directiva @theme.
 */
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
