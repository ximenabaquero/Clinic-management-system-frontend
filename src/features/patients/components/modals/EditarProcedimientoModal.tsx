"use client";

import { useState } from "react";
import { XMarkIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

import ValidatedInput from "@/components/ValidatedInput";
import SectionDetails from "@/features/register-patient/components/SectionDetails";
import {
  PROCEDURE_GROUPS,
  PROCEDURES,
} from "@/features/register-patient/data/procedures";
import StickySubmitBar from "@/features/register-patient/components/StickySubmitBar";

// ─── Constants ────────────────────────────────────────────────────────────────

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/+$/, "");

// ─── Types ────────────────────────────────────────────────────────────────────

type ProcedureItem = {
  id?: number;
  item_name: string;
  price: string;
};

type ProcForm = {
  notes: string;
  items: ProcedureItem[];
};

type Props = {
  procedureId: number;
  initialData: ProcForm;
  onClose: () => void;
  onSaved: () => void;
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function parsePrice(raw: string): number {
  return parseFloat(raw.replace(/\./g, "").replace(",", ".")) || 0;
}

function formatPrice(raw: string): string {
  const digits = raw.replace(/[^\d]/g, "");
  if (!digits) return "";
  const numeric = Number(digits);
  if (numeric < 0) return "";
  return numeric.toLocaleString("es-CO");
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function EditarProcedimientoModal({
  procedureId,
  initialData,
  onClose,
  onSaved,
}: Props) {
  const [items, setItems] = useState<ProcedureItem[]>(initialData.items);
  const [notes, setNotes] = useState(initialData.notes ?? "");
  const [isSaving, setIsSaving] = useState(false);

  // ── Derived ──────────────────────────────────────────────────────────────

  const isSelected = (label: string) =>
    items.some((item) => item.item_name === label);

  const getPrice = (label: string) =>
    items.find((item) => item.item_name === label)?.price ?? "";

  const total = items.reduce((sum, item) => sum + parsePrice(item.price), 0);

  const totalFormatted = total.toLocaleString("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  });

  const getGroupCount = (groupProcedureIds: string[]) =>
    groupProcedureIds.reduce((count, procId) => {
      const proc = PROCEDURES.find((p) => p.id === procId);
      if (!proc) return count;
      return items.some((item) => item.item_name === proc.label)
        ? count + 1
        : count;
    }, 0);

  // ── Item handlers ─────────────────────────────────────────────────────────

  const toggleItem = (label: string) => {
    if (isSelected(label)) {
      setItems((prev) => prev.filter((item) => item.item_name !== label));
      if (label.includes("Faja")) {
        setNotes((prev) => prev.replace(/Faja talla:.*(\n\n)?/, ""));
      }
      if (label.includes("Pierna")) {
        setNotes((prev) => prev.replace(/Pierna:.*(\n\n)?/, ""));
      }
    } else {
      setItems((prev) => [...prev, { item_name: label, price: "" }]);
    }
  };

  const handlePriceChange =
    (itemName: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const formatted = formatPrice(e.target.value);
      setItems((prev) =>
        prev.map((item) =>
          item.item_name === itemName ? { ...item, price: formatted } : item,
        ),
      );
    };

  const handleFajaChange = (value: string) => {
    setNotes((prev) => {
      const clean = prev.replace(/Faja talla:.*(\n\n)?/, "");
      if (!clean) return `Faja talla: ${value}`;
      return `Faja talla: ${value}\n\n${clean}`;
    });
  };

  const handlePiernaChange = (interna: boolean, externa: boolean) => {
    let note = "";
    if (interna && externa) note = "Pierna: interna y externa";
    else if (interna) note = "Pierna: interna";
    else if (externa) note = "Pierna: externa";

    setNotes((prev) => {
      const clean = prev.replace(/Pierna:.*(\n\n)?/, "");
      if (!note) return clean;
      if (!clean) return note;
      return `${note}\n\n${clean}`;
    });
  };

  // ── Save ──────────────────────────────────────────────────────────────────

  const handleSave = async () => {
    if (!notes.trim()) {
      toast.error("Las observaciones clínicas son obligatorias");
      return;
    }
    if (items.length === 0) {
      toast.error("Debes seleccionar al menos un procedimiento");
      return;
    }
    if (items.some((it) => !it.item_name.trim() || !it.price)) {
      toast.error(
        "Completa el precio de todos los procedimientos seleccionados",
      );
      return;
    }

    setIsSaving(true);
    const token = Cookies.get("XSRF-TOKEN") ?? "";

    try {
      const res = await fetch(
        `${apiBaseUrl}/api/v1/procedures/${procedureId}`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "X-XSRF-TOKEN": token,
          },
          body: JSON.stringify({
            notes,
            items: items.map((item) => ({
              item_name: item.item_name.trim(),
              price: parsePrice(item.price),
            })),
          }),
        },
      );

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(
          (err as { message?: string }).message ?? "Error al guardar",
        );
      }

      toast.success("Procedimiento actualizado");
      onSaved();
      onClose();
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : "Error inesperado");
    } finally {
      setIsSaving(false);
    }
  };

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 backdrop-blur-sm overflow-y-auto py-6 px-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* ── Header ──────────────────────────────────────────────────────── */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 sticky top-0 bg-white z-10">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-50">
              <PencilSquareIcon className="h-4 w-4 text-emerald-600" />
            </div>
            <div>
              <h2 className="text-base font-bold text-gray-900 leading-tight">
                Editar procedimiento
              </h2>
              <p className="text-xs text-gray-400">
                Modificá los procedimientos seleccionados y sus precios
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 hover:bg-gray-100 transition"
          >
            <XMarkIcon className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* ── Body ────────────────────────────────────────────────────────── */}
        <div className="px-6 py-5 space-y-4">
          {/* Sección: Grupos de procedimientos ───────────────────────────── */}
          <div>
            <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold mb-3">
              PROCEDIMIENTOS
            </p>
            <div className="space-y-4">
              {PROCEDURE_GROUPS.map((group) => (
                <SectionDetails
                  key={group.id}
                  label={group.label}
                  count={getGroupCount(group.procedureIds)}
                >
                  {/* Column headers */}
                  <div className="grid grid-cols-[28px_1fr_200px_160px] gap-3 border-y border-gray-100 py-2 text-xs font-semibold text-gray-500">
                    <div />
                    <div>Procedimiento</div>
                    <div>Detalles</div>
                    <div>Precio (COP)</div>
                  </div>

                  {/* Rows */}
                  <div className="divide-y divide-gray-100">
                    {group.procedureIds.map((procId) => {
                      const procedure = PROCEDURES.find((p) => p.id === procId);
                      if (!procedure) return null;

                      const checked = isSelected(procedure.label);
                      const priceValue = getPrice(procedure.label);

                      const isFaja = procedure.id === "faja_postoperatoria";
                      const isPierna = procedure.id === "pierna";

                      const fajaDetalle = notes.includes("Faja talla:");
                      const piernaInterna = notes.includes("Pierna: interna");
                      const piernaExterna = notes.includes("Pierna: externa");
                      const piernaAmbas = notes.includes("interna y externa");
                      const piernaDetalle =
                        piernaInterna || piernaExterna || piernaAmbas;

                      const disablePrice =
                        (isFaja && !fajaDetalle) ||
                        (isPierna && !piernaDetalle);

                      return (
                        <div
                          key={procedure.id}
                          className="grid grid-cols-[28px_1fr_200px_160px] gap-3 py-3 items-center"
                        >
                          {/* Checkbox */}
                          <div className="pt-0.5">
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={() => toggleItem(procedure.label)}
                              className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500/30"
                            />
                          </div>

                          {/* Label */}
                          <label
                            className={`text-sm font-medium cursor-pointer ${
                              checked ? "text-gray-900" : "text-gray-700"
                            }`}
                            onClick={() => toggleItem(procedure.label)}
                          >
                            {procedure.label}
                          </label>

                          {/* Detalles */}
                          {checked ? (
                            <>
                              {isFaja ? (
                                <input
                                  type="text"
                                  onChange={(e) =>
                                    handleFajaChange(e.target.value)
                                  }
                                  className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 focus:ring-2 focus:ring-emerald-400 focus:outline-none"
                                  placeholder="Talla (Ej. S / M / L)"
                                />
                              ) : isPierna ? (
                                <div className="flex gap-4">
                                  <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                                    <input
                                      type="checkbox"
                                      checked={piernaInterna || piernaAmbas}
                                      onChange={(e) =>
                                        handlePiernaChange(
                                          e.target.checked,
                                          piernaExterna,
                                        )
                                      }
                                      className="h-4 w-4 rounded border-gray-300"
                                    />
                                    Interna
                                  </label>
                                  <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                                    <input
                                      type="checkbox"
                                      checked={piernaExterna || piernaAmbas}
                                      onChange={(e) =>
                                        handlePiernaChange(
                                          piernaInterna,
                                          e.target.checked,
                                        )
                                      }
                                      className="h-4 w-4 rounded border-gray-300"
                                    />
                                    Externa
                                  </label>
                                </div>
                              ) : (
                                <div className="text-sm text-gray-400">—</div>
                              )}
                            </>
                          ) : (
                            <div className="text-sm text-gray-400">—</div>
                          )}

                          {/* Precio */}
                          {checked ? (
                            <input
                              type="text"
                              value={priceValue}
                              onChange={handlePriceChange(procedure.label)}
                              disabled={disablePrice}
                              className={`rounded-xl border px-3 py-2 text-sm w-full focus:ring-2 focus:ring-emerald-400 focus:outline-none ${
                                disablePrice
                                  ? "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
                                  : "bg-white border-gray-200 text-gray-900"
                              }`}
                              placeholder="Precio en COP"
                            />
                          ) : (
                            <div className="text-sm text-gray-400">—</div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </SectionDetails>
              ))}
            </div>
          </div>

          {/* Observaciones ───────────────────────────────────────────────── */}
          <div>
            <ValidatedInput
              id="procedure_notes"
              label="Observaciones clínicas del procedimiento"
              as="textarea"
              rows={4}
              required
              value={notes}
              onChange={setNotes}
              maxLength={500}
              placeholder="Notas relevantes sobre el procedimiento, recomendaciones o cualquier información adicional que el profesional deba tener en cuenta."
            />
            <p className="text-[11px] text-gray-400 mt-1.5 pl-0.5">
              Máximo 500 caracteres · {notes.length}/500
            </p>
          </div>

          {/* Total ────────────────────────────────────────────────────────── */}
          <StickySubmitBar
            selectedCount={items.length}
            stickyTotalCop={totalFormatted}
            isSubmitting={isSaving}
          />
        </div>

        {/* ── Footer ──────────────────────────────────────────────────────── */}
        <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3 sticky bottom-0 bg-white">
          <button
            onClick={onClose}
            disabled={isSaving}
            className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition disabled:opacity-50"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="px-5 py-2 text-sm bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition font-medium disabled:opacity-50 flex items-center gap-2"
          >
            {isSaving ? (
              <>
                <span className="h-3.5 w-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                Guardando...
              </>
            ) : (
              "Guardar cambios"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
