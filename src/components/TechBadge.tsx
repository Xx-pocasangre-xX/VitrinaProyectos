/**
 * Pequeña etiqueta (badge) para mostrar el nombre de una tecnología,
 * usada dentro de las tarjetas de proyecto y en la página de detalle.
 */
export default function TechBadge({ nombre }: { nombre: string }) {
  return (
    <span className="rounded-full border border-[var(--color-borde)] bg-[var(--color-superficie)] px-3 py-1 text-xs font-medium text-[var(--color-texto-tenue)]">
      {nombre}
    </span>
  );
}
