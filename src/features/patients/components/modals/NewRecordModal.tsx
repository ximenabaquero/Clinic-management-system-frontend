"use client";
import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import ReactDOM from "react-dom";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { XMarkIcon } from "@heroicons/react/24/outline";

import HorizontalSteps from "../HorizontalSteps";
import PatientReadonlyStep from "../forms/PatientReadonlyFields";
import ClinicalInfoFields, {
  type ClinicalData,
  INITIAL_CLINICAL,
} from "../../../register-patient/components/ClinicalInfoFields";
import ProceduresSelector from "../../../register-patient/components/ProceduresSelector";
import {
  type CompanionData,
  INITIAL_COMPANION,
} from "../forms/CompanionFields";
import type { Patient } from "../../types";
import type { ProcedureItem } from "../../../register-patient/services/patientRegistrationService";
import StickySubmitBar from "@/features/register-patient/components/StickySubmitBar";

// ─── Constants ────────────────────────────────────────────────────────────────

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/+$/, "");

const STEP_LABELS = [
  "Paciente",
  "Evaluación clínica",
  "Procedimientos",
] as const;

type StepIndex = 0 | 1 | 2;

// ─── Helpers ──────────────────────────────────────────────────────────────────

function parseOptionalFloat(value: string): number | undefined {
  const n = parseFloat(value);
  return isNaN(n) ? undefined : n;
}

function parseOptionalInt(value: string): number | undefined {
  const n = parseInt(value, 10);
  return isNaN(n) ? undefined : n;
}

// ─── Props ────────────────────────────────────────────────────────────────────

interface Props {
  patientId: number;
  patient: Patient;
  onClose: () => void;
  onSuccess: () => void;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function NewRecordModal({
  patientId,
  patient,
  onClose,
  onSuccess,
}: Props) {
  // ── State ────────────────────────────────────────────────────────────────
  const [step, setStep] = useState<StepIndex>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [companionData, setCompanionData] =
    useState<CompanionData>(INITIAL_COMPANION);
  const [clinicalData, setClinicalData] =
    useState<ClinicalData>(INITIAL_CLINICAL);
  const [procedureItems, setProcedureItems] = useState<ProcedureItem[]>([]);
  const [procedureNotes, setProcedureNotes] = useState("");
  const router = useRouter();

  // ── Step completion ──────────────────────────────────────────────────────
  const step0Completed =
    companionData.companionName.trim() !== "" &&
    companionData.companionRelationship.trim() !== "" &&
    companionData.companionCellphone.trim() !== "";

  const step1Completed =
    parseFloat(clinicalData.weightKg) > 0 &&
    parseFloat(clinicalData.heightM) > 0 &&
    clinicalData.medicalBackground.trim() !== "";

  const step2Completed =
    procedureItems.length > 0 && procedureNotes.trim() !== "";

  const stepCompleted = [step0Completed, step1Completed, step2Completed];

  // ── Handlers ─────────────────────────────────────────────────────────────
  const updateCompanion = useCallback(
    (field: keyof CompanionData, value: string) =>
      setCompanionData((prev) => ({ ...prev, [field]: value })),
    [],
  );

  const updateClinical = useCallback(
    (field: keyof ClinicalData, value: unknown) =>
      setClinicalData((prev) => ({ ...prev, [field]: value })),
    [],
  );

  const clearSubmitError = useCallback(() => {}, []);

  const goNext = () => {
    setStep((s) => Math.min(2, s + 1) as StepIndex);
  };

  const goPrev = () => setStep((s) => Math.max(0, s - 1) as StepIndex);

  // ── Submit ────────────────────────────────────────────────────────────────
  // ── Submit ────────────────────────────────────────────────────────────────
  async function handleSubmit() {
    if (!step2Completed) {
      toast.error("Agrega al menos un procedimiento y las notas clínicas");
      return;
    }

    setIsSubmitting(true);
    const token = Cookies.get("XSRF-TOKEN") ?? "";

    const payload = {
      snapshot: {
        companion_name: companionData.companionName,
        companion_relationship: companionData.companionRelationship,
        companion_cellphone: companionData.companionCellphone,
      },
      evaluation: {
        weight: parseFloat(clinicalData.weightKg),
        height: parseFloat(clinicalData.heightM),
        medical_background: clinicalData.medicalBackground,
      },
      clinical_alteration: {
        ...clinicalData.clinicalAlteration,
        // parseInt/parseFloat devuelven NaN si está vacío → el backend
        // espera null, no undefined (undefined se omite en JSON.stringify)
        sleep_hours:
          parseOptionalInt(clinicalData.clinicalAlteration.sleep_hours) ?? null,
        num_children:
          parseOptionalInt(clinicalData.clinicalAlteration.num_children) ??
          null,
        last_period: clinicalData.clinicalAlteration.last_period || null,
      },
      lab_result: {
        has_exams: clinicalData.labResult.has_exams,
        hemoglobin_done: clinicalData.labResult.hemoglobin_done,
        inr_value: parseOptionalFloat(clinicalData.labResult.inr_value) ?? null,
        glucose_value:
          parseOptionalFloat(clinicalData.labResult.glucose_value) ?? null,
        hematocrit_value:
          parseOptionalFloat(clinicalData.labResult.hematocrit_value) ?? null,
      },
      procedure: {
        notes: procedureNotes,
        items: procedureItems.map((it) => ({
          item_name: it.item_name,
          price: Number((it.price || "").replace(/\D/g, "")),
        })),
      },
    };

    try {
      const res = await fetch(
        `${apiBaseUrl}/api/v1/patients/${patientId}/clinical-records`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "X-XSRF-TOKEN": token,
          },
          body: JSON.stringify(payload),
        },
      );

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        const validationErrors = (data as { errors?: Record<string, string[]> })
          .errors;
        const firstValidationError = validationErrors
          ? Object.values(validationErrors).flat()[0]
          : undefined;

        throw new Error(
          firstValidationError ??
            (data as { data?: { message?: string }; message?: string }).data
              ?.message ??
            (data as { message?: string }).message ??
            "Error al crear registro clínico",
        );
      }

      const evaluationId = (
        data as { data?: { evaluation?: { evaluation?: { id?: number } } } }
      ).data?.evaluation?.evaluation?.id;

      toast.success("Registro clínico creado correctamente");

      if (evaluationId) {
        router.push(`/patients/${patientId}/records/${evaluationId}`);
      }

      onSuccess();
      onClose();
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : "Error inesperado");
    } finally {
      setIsSubmitting(false);
    }
  }

  // ── Derived ───────────────────────────────────────────────────────────────
  const totalCop = procedureItems
    .reduce(
      (sum, item) => sum + (Number((item.price || "").replace(/\D/g, "")) || 0),
      0,
    )
    .toLocaleString("es-CO");

  // ── Render ────────────────────────────────────────────────────────────────
  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        {/* ── Header ────────────────────────────────────────────── */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 shrink-0">
          <div>
            <h2 className="text-base font-bold text-gray-900">
              Nuevo registro clínico
            </h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 hover:bg-gray-100 transition"
          >
            <XMarkIcon className="h-5 w-5 text-gray-400" />
          </button>
        </div>

        {/* ── Stepper horizontal ────────────────────────────────── */}
        <div className="px-6 pt-4 pb-3 border-b border-gray-50 shrink-0">
          <HorizontalSteps
            steps={STEP_LABELS.map((label, i) => ({
              label,
              completed: stepCompleted[i],
            }))}
            currentStep={step}
            onStepClick={(i) => setStep(i as StepIndex)}
          />
        </div>

        {/* ── Body ──────────────────────────────────────────────── */}
        <div className="px-6 py-5 overflow-y-auto flex-1">
          {step === 0 && (
            <PatientReadonlyStep
              patient={patient}
              companionData={companionData}
              onCompanionChange={updateCompanion}
            />
          )}

          {step === 1 && (
            <ClinicalInfoFields
              data={clinicalData}
              onChange={updateClinical}
              onDirty={clearSubmitError}
            />
          )}

          {step === 2 && (
            <div className="space-y-4">
              <ProceduresSelector
                procedureItems={procedureItems}
                setProcedureItems={setProcedureItems}
                procedureNotes={procedureNotes}
                setProcedureNotes={setProcedureNotes}
                clearSubmitError={clearSubmitError}
                compact={true}
              />

              <StickySubmitBar
                selectedCount={procedureItems.length}
                stickyTotalCop={`$${totalCop}`}
                isSubmitting={isSubmitting}
              />
            </div>
          )}
        </div>

        {/* ── Footer ────────────────────────────────────────────── */}
        <div className="px-6 py-4 border-t border-gray-100 flex justify-between gap-3 bg-white shrink-0">
          {step === 0 ? (
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-xl transition font-medium"
            >
              Cancelar
            </button>
          ) : (
            <button
              onClick={goPrev}
              disabled={isSubmitting}
              className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-xl transition font-medium disabled:opacity-50"
            >
              ← Atrás
            </button>
          )}

          {step < 2 ? (
            <button
              onClick={goNext}
              className="px-5 py-2 text-sm font-semibold text-white rounded-xl bg-emerald-600 hover:bg-emerald-700 transition"
            >
              Siguiente →
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting || !step2Completed}
              className={`px-5 py-2 text-sm font-semibold text-white rounded-xl transition disabled:opacity-50 ${
                step2Completed
                  ? "bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-700 hover:to-teal-600 shadow-sm shadow-emerald-200"
                  : "bg-emerald-200 cursor-not-allowed"
              }`}
            >
              {isSubmitting ? "Guardando..." : "Crear registro"}
            </button>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}
