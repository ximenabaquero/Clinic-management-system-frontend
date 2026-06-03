"use client";

import { useState, useMemo } from "react";
import { toast } from "react-hot-toast";
import CategorySelector from "../CategorySelector";
import CategoryManager from "../CategoryManager";
import InventorySearchBar from "../InventorySearchBar";
import ProductTable from "./ProductTable";
import type { InventoryProduct, InventoryCategory } from "../../types";
import { exportToExcel } from "../../utils/exportUtils";
import ExportDropdown from "@/components/ExportDropdown";

interface ProductTabProps {
  products: InventoryProduct[];
  categories: InventoryCategory[];
  onRefreshCategories: () => void;
  onRefreshProducts?: () => void;
  isAdmin: boolean;
}

const normalize = (str: string) =>
  str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

export default function ProductTab({
  products,
  categories,
  onRefreshCategories,
  onRefreshProducts,
  isAdmin,
}: ProductTabProps) {
  const [search, setSearch] = useState("");
  const [activeCategoryId, setActiveCategoryId] = useState<number | null>(null);

  const filtered = useMemo(() => {
    const q = normalize(search);
    return products.filter((p) => {
      const matchSearch = !q || normalize(p.name).includes(q);
      const matchCategory =
        activeCategoryId === null || p.category_id === activeCategoryId;
      return matchSearch && matchCategory;
    });
  }, [products, search, activeCategoryId]);

  const insumos = useMemo(
    () => filtered.filter((p) => p.type === "INSUMO"),
    [filtered],
  );
  const equipos = useMemo(
    () => filtered.filter((p) => p.type === "EQUIPO"),
    [filtered],
  );

  const handleExportExcel = async () => {
    const loading = toast.loading("Generando Excel…");
    const ok = await exportToExcel(
      filtered,
      categories,
      "inventario_productos",
    );
    toast.dismiss(loading);
    toast[ok ? "success" : "error"](
      ok ? "Excel exportado correctamente" : "Error al exportar Excel",
    );
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Fila 1: Categorías + ícono gestionar */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex-1 min-w-0">
          <CategorySelector
            categories={categories}
            activeCategoryId={activeCategoryId}
            onSelect={setActiveCategoryId}
          />
        </div>

        {isAdmin && (
          <CategoryManager
            categories={categories}
            onRefresh={onRefreshCategories}
            onRefreshProducts={onRefreshProducts}
          />
        )}
      </div>

      {/* Fila 2: Buscador + Export */}
      <div className="flex items-end gap-3">
        <div className="flex-1">
          <InventorySearchBar
            contexto="dashboard"
            value={search}
            onSearch={setSearch}
          />
        </div>

        <ExportDropdown
          items={[{ label: "Exportar como Excel", onClick: handleExportExcel }]}
        />
      </div>

      {/* Fila 3: Tablas */}
      <ProductTable products={insumos} title="Insumos Médicos" type="INSUMO" />
      <ProductTable
        products={equipos}
        title="Equipos & Mobiliario"
        type="EQUIPO"
      />
    </div>
  );
}
