/**
 * Formatea una fecha ISO 8601 completa o una fecha simple "YYYY-MM-DD".
 * Para fechas con hora, muestra fecha + hora; de lo contrario solo fecha.
 */
export function formatDateTime(dateString?: string | null): string {
  if (!dateString) return "—";
  const isDateOnly = /^\d{4}-\d{2}-\d{2}$/.test(dateString);
  const d = new Date(isDateOnly ? `${dateString}T00:00:00` : dateString);
  const formatted = isDateOnly
    ? d.toLocaleDateString("es-ES", { dateStyle: "medium" })
    : d.toLocaleString("es-ES", { dateStyle: "medium", timeStyle: "short" });
  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
}

/** Nombre completo de una persona nulable. */
export function fullName(
  person: { first_name: string; last_name: string } | null | undefined,
): string | null {
  if (!person) return null;
  return `${person.first_name} ${person.last_name}`.trim();
}

/** Formatea un número como precio en pesos colombianos. */
export function formatCOP(amount: number | string): string {
  return `$${Number(amount).toLocaleString("es-CO")}`;
}
