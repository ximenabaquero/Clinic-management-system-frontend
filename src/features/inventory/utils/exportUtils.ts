import type { InventoryProduct, InventoryCategory } from "../types";

// ─── Types ───────────────────────────────────────────────────────────────────

interface ExportRow {
  ID: number | string;
  Nombre: string;
  Categoría: string;
  Tipo: string;
  "Stock/Cantidad": number | null;
  Estado: string;
  Descripción: string;
  "Última Compra": string;
}

interface ColumnWidth {
  wch: number;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const COLUMN_WIDTHS: ColumnWidth[] = [
  { wch: 6 }, // ID
  { wch: 30 }, // Nombre
  { wch: 20 }, // Categoría
  { wch: 10 }, // Tipo
  { wch: 15 }, // Stock/Cantidad
  { wch: 12 }, // Estado
  { wch: 30 }, // Descripción
  { wch: 15 }, // Fecha Creación
];

const SHEET_NAME = "Inventario";
const LOCALE = "es-CO";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getTimestamp(): string {
  const now = new Date();
  const date = [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, "0"),
    String(now.getDate()).padStart(2, "0"),
  ].join("");
  const time = [
    String(now.getHours()).padStart(2, "0"),
    String(now.getMinutes()).padStart(2, "0"),
  ].join("");

  return `${date}_${time}`;
}

function buildCategoryMap(
  categories: InventoryCategory[],
): Map<string | number, string> {
  return new Map(categories.map((c) => [c.id, c.name]));
}

function parseDate(
  value: string | number | Date | null | undefined,
): Date | null {
  if (!value) return null;
  const normalized =
    typeof value === "string" ? value.replace(" ", "T") : value;

  const date = new Date(normalized);
  return isNaN(date.getTime()) ? null : date;
}

function formatDate(value: string | number | Date | null | undefined): string {
  const date = parseDate(value);
  return date ? date.toLocaleDateString(LOCALE) : "Sin fecha";
}

function mapProductToRow(
  product: InventoryProduct,
  categoryMap: Map<string | number, string>,
): ExportRow {
  return {
    ID: product.id,
    Nombre: product.name,
    Categoría: categoryMap.get(product.category_id) ?? "Sin categoría",
    Tipo: product.type === "INSUMO" ? "Insumo" : "Equipo",
    "Stock/Cantidad": product.cantidad,
    Estado: product.estado ?? "N/A",
    Descripción: product.description ?? "",
    "Última Compra": formatDate(product.last_purchase_date), // ← campo nuevo
  };
}

// ─── Export ───────────────────────────────────────────────────────────────────

/**
 * Exports inventory data to an Excel (.xlsx) file and triggers a browser download.
 *
 * @param products   - List of inventory products to export.
 * @param categories - List of categories used to resolve category names.
 * @param filename   - Base name for the downloaded file (default: "inventario").
 * @returns `true` if the export succeeded, `false` otherwise.
 */
export async function exportToExcel(
  products: InventoryProduct[],
  categories: InventoryCategory[],
  filename: string = "inventario",
): Promise<boolean> {
  try {
    const XLSX = await import("xlsx");

    const categoryMap = buildCategoryMap(categories);
    const rows: ExportRow[] = products.map((product) =>
      mapProductToRow(product, categoryMap),
    );

    const worksheet = XLSX.utils.json_to_sheet(rows);
    worksheet["!cols"] = COLUMN_WIDTHS;

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, SHEET_NAME);

    XLSX.writeFile(workbook, `${filename}_${getTimestamp()}.xlsx`);

    return true;
  } catch (error) {
    console.error("Error al exportar a Excel:", error);
    return false;
  }
}
