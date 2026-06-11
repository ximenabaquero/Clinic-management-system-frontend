"use client";

import { useState } from "react";
import { XMarkIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

import ValidatedInput from "@/components/ValidatedInput";
import ClinicalAlterationFields, {
  type ClinicalAlterationData,
  INITIAL_CLINICAL_ALTERATION,
} from "@/features/register-patient/components/ClinicalAlterationFields";
import LabResultFields, {
  type LabResultData,
  INITIAL_LAB_RESULT,
} from "@/features/register-patient/components/LabResultFields";

import type { FullRecord } from "../../types";

// ─── Constants ────────────────────────────────────────────────────────────────

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/+$/, "");

// ─── Types ────────────────────────────────────────────────────────────────────

type EvalSection = {
  weight: string;
  height: string;
  medical_background: string;
};

type FormState = {
  evaluation: EvalSection;
  clinical_alteration: ClinicalAlterationData;
  lab_result: LabResultData;
};

type Props = {
  evaluationId: number;
  record: FullRecord;
  onClose: () => void;
  onSaved: () => void;
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getBmiStatus(bmi: number): string {
  if (bmi < 16.0) return "Delgadez severa (< 16.0)";
  if (bmi < 17.0) return "Delgadez moderada (16.0–16.9)";
  if (bmi < 18.5) return "Delgadez leve (17.0–18.4)";
  if (bmi < 25.0) return "Peso normal (18.5–24.9)";
  if (bmi < 30.0) return "Sobrepeso (25.0–29.9)";
  if (bmi < 35.0) return "Obesidad grado I (30.0–34.9)";
  if (bmi < 40.0) return "Obesidad grado II (35.0–39.9)";
  return "Obesidad grado III (≥ 40)";
}

/**
 * Convierte el ClinicalFindings del FullRecord al shape que espera
 * ClinicalAlterationFields (todos los campos presentes, strings vacíos y booleans false por defecto).
 */
function mapFindingsToForm(
  findings: FullRecord["clinical_findings"],
): ClinicalAlterationData {
  return {
    ...INITIAL_CLINICAL_ALTERATION,
    ...Object.fromEntries(
      Object.entries(findings ?? {}).map(([k, v]) => [
        k,
        v === null ? "" : typeof v === "number" ? String(v) : v,
      ]),
    ),
  };
}

/**
 * Convierte los LabResults del FullRecord al shape que espera LabResultFields.
 */
function mapLabResultsToForm(
  results: FullRecord["lab_results"],
): LabResultData {
  return {
    ...INITIAL_LAB_RESULT,
    ...Object.fromEntries(
      Object.entries(results ?? {}).map(([k, v]) => [
        k,
        v === null ? "" : typeof v === "number" ? String(v) : v,
      ]),
    ),
  };
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function EditarEvaluacionModal({
  evaluationId,
  record,
  onClose,
  onSaved,
}: Props) {
  const [form, setForm] = useState<FormState>(() => ({
    evaluation: {
      weight: String(record.evaluation.weight ?? ""),
      height: String(record.evaluation.height ?? ""),
      medical_background: record.evaluation.medical_background ?? "",
    },
    clinical_alteration: mapFindingsToForm(record.clinical_findings),
    lab_result: mapLabResultsToForm(record.lab_results),
  }));

  const [isSaving, setIsSaving] = useState(false);

  // ── Derived ──────────────────────────────────────────────────────────────
  const weight = parseFloat(form.evaluation.weight);
  const height = parseFloat(form.evaluation.height);
  const bmi =
    weight > 0 && height > 0 ? +(weight / (height * height)).toFixed(2) : null;

  // ── Handlers ─────────────────────────────────────────────────────────────
  const setEval = (field: keyof EvalSection) => (value: string) =>
    setForm((prev) => ({
      ...prev,
      evaluation: { ...prev.evaluation, [field]: value },
    }));

  const handleSave = async () => {
    const w = parseFloat(form.evaluation.weight);
    const h = parseFloat(form.evaluation.height);

    if (!form.evaluation.weight || !form.evaluation.height) {
      toast.error("El peso y la estatura son obligatorios");
      return;
    }
    if (w < 2 || w > 400) {
      toast.error("El peso debe estar entre 2 y 400 kg");
      return;
    }
    if (h < 1.2 || h > 2.5) {
      toast.error("La estatura debe estar entre 1.20 m y 2.50 m");
      return;
    }

    setIsSaving(true);
    const token = Cookies.get("XSRF-TOKEN") ?? "";

    try {
      const res = await fetch(
        `${apiBaseUrl}/api/v1/medical-evaluations/${evaluationId}`,
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "X-XSRF-TOKEN": token,
          },
          body: JSON.stringify({
            evaluation: {
              weight: w,
              height: h,
              medical_background: form.evaluation.medical_background,
            },
            clinical_alteration: {
              ...form.clinical_alteration,
              sleep_hours: form.clinical_alteration.sleep_hours
                ? parseInt(form.clinical_alteration.sleep_hours, 10)
                : null,
              num_children: form.clinical_alteration.num_children
                ? parseInt(form.clinical_alteration.num_children, 10)
                : null,
              last_period: form.clinical_alteration.last_period || null,
            },
            lab_result: {
              has_exams: form.lab_result.has_exams,
              hemoglobin_done: form.lab_result.hemoglobin_done,
              inr_value: form.lab_result.inr_value
                ? parseFloat(form.lab_result.inr_value)
                : null,
              glucose_value: form.lab_result.glucose_value
                ? parseFloat(form.lab_result.glucose_value)
                : null,
              hematocrit_value: form.lab_result.hematocrit_value
                ? parseFloat(form.lab_result.hematocrit_value)
                : null,
            },
          }),
        },
      );

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(
          (err as { message?: string }).message ?? "Error al guardar",
        );
      }

      toast.success("Evaluación actualizada correctamente");
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
        {/* ── Header ──────────────────────────────────────────────────── */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 sticky top-0 bg-white z-10">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-50">
              <PencilSquareIcon className="h-4 w-4 text-emerald-600" />
            </div>
            <div>
              <h2 className="text-base font-bold text-gray-900 leading-tight">
                Editar evaluación clínica
              </h2>
              <p className="text-xs text-gray-400">
                Edición de la evaluación clínica del paciente
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

        {/* ── Body ────────────────────────────────────────────────────── */}
        <div className="px-6 py-5 space-y-6">
          {/* Sección: Medidas ─────────────────────────────────────────── */}
          <div>
            <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold mb-3">
              MEDIDAS CORPORALES
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ValidatedInput
                id="edit-weight"
                label="Peso (kg)"
                type="number"
                placeholder="Peso del paciente"
                value={form.evaluation.weight}
                onChange={setEval("weight")}
                onBlur={() => {
                  const n = parseFloat(form.evaluation.weight);
                  if (!isNaN(n) && n < 2) setEval("weight")("2");
                  if (!isNaN(n) && n > 400) setEval("weight")("400");
                }}
                required
                min={2}
                max={400}
              />
              <ValidatedInput
                id="edit-height"
                label="Estatura (m)"
                type="number"
                placeholder="Estatura del paciente"
                value={form.evaluation.height}
                onChange={setEval("height")}
                onBlur={() => {
                  const n = parseFloat(form.evaluation.height);
                  if (!isNaN(n) && n < 1.2) setEval("height")("1.2");
                  if (!isNaN(n) && n > 2.5) setEval("height")("2.5");
                }}
                required
                min={1.2}
                max={2.5}
              />
            </div>

            {/* IMC calculado ─────────────────────────────────────── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <div>
                <label
                  htmlFor="edit-bmi"
                  className="block text-sm font-medium text-gray-700"
                >
                  IMC
                </label>
                <input
                  id="edit-bmi"
                  value={bmi ?? ""}
                  disabled
                  className="mt-1 w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 shadow-sm text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Estado del IMC
                </label>
                <div className="mt-1 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 shadow-sm text-sm text-gray-900 flex items-center min-h-[38px]">
                  {bmi !== null ? getBmiStatus(bmi) : "—"}
                </div>
              </div>
            </div>
          </div>

          {/* Sección: Alteraciones clínicas ──────────────────────────── */}
          <ClinicalAlterationFields
            data={form.clinical_alteration}
            onChange={(val) =>
              setForm((prev) => ({ ...prev, clinical_alteration: val }))
            }
          />

          {/* Sección: Laboratorio ────────────────────────────────────── */}
          <LabResultFields
            data={form.lab_result}
            onChange={(val) =>
              setForm((prev) => ({ ...prev, lab_result: val }))
            }
          />

          {/* Sección: Antecedentes ────────────────────────────────────── */}
          <div>
            <ValidatedInput
              id="edit-medical-background"
              label="Observaciones de la evaluación clínica"
              as="textarea"
              rows={4}
              required
              value={form.evaluation.medical_background}
              onChange={(val) => {
                setForm((prev) => ({
                  ...prev,
                  evaluation: { ...prev.evaluation, medical_background: val },
                }));
              }}
              maxLength={500}
              placeholder="Observaciones relevantes sobre la evaluación clínica del paciente"
            />
            <p className="text-[11px] text-gray-400 mt-1.5 pl-0.5">
              Máximo 500 caracteres ·{" "}
              {form.evaluation.medical_background.length}/500
            </p>
          </div>
        </div>

        {/* ── Footer ──────────────────────────────────────────────────── */}
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
