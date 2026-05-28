import type { ClinicalFindings, LabResults } from "../types";

// ─── Status UI config ────────────────────────────────────────────────────────

import {
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";

export const STATUS_CONFIG = {
  EN_ESPERA: {
    label: "En espera",
    icon: ClockIcon,
    bg: "bg-yellow-50",
    border: "border-yellow-200",
    text: "text-yellow-700",
    iconColor: "text-yellow-500",
    // For segmented control in detail page
    segmented: "bg-yellow-100 text-yellow-700",
  },
  CONFIRMADO: {
    label: "Confirmado",
    icon: CheckCircleIcon,
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    text: "text-emerald-700",
    iconColor: "text-emerald-500",
    segmented: "bg-emerald-100 text-emerald-700",
  },
  CANCELADO: {
    label: "Cancelado",
    icon: XCircleIcon,
    bg: "bg-red-50",
    border: "border-red-200",
    text: "text-red-700",
    iconColor: "text-red-500",
    segmented: "bg-red-100 text-red-600",
  },
} as const;

// ─── Clinical findings labels ────────────────────────────────────────────────

export const FINDING_LABELS: Record<keyof ClinicalFindings, string> = {
  diabetes: "Diabetes",
  cardiac: "Problemas cardíacos",
  varicose_veins: "Várices",
  thrombosis: "Trombosis",
  fluid_retention: "Retención de líquidos",
  hepatitis: "Hepatitis",
  surgeries: "Cirugías previas",
  constipation: "Estreñimiento",
  gastritis: "Gastritis",
  irritable_bowel: "Intestino irritable",
  reflux: "Reflujo",
  kidney_issues: "Problemas renales",
  thyroid_issues: "Problemas de tiroides",
  smokes: "Fuma",
  anxiety: "Ansiedad",
  alcohol: "Consume alcohol",
  depression: "Depresión",
  intestinal_habit: "Hábito intestinal",
  lupus_notes: "Lupus",
  allergy_notes: "Alergias",
  keloid_notes: "Queloides",
  vitiligo_notes: "Vitiligo",
  dermatitis_notes: "Dermatitis",
  other_skin_notes: "Otras condiciones de piel",
  sleep_hours: "Horas de sueño",
  num_children: "Número de hijos",
  last_period: "Última menstruación",
  birth_control: "Anticonceptivo",
  medications: "Medicamentos",
};

export const LAB_LABELS: Record<keyof LabResults, string> = {
  has_exams: "Trae exámenes",
  hemoglobin_done: "Hemoglobina realizada",
  inr_value: "INR",
  glucose_value: "Glucosa (mg/dL)",
  hematocrit_value: "Hematocrito (%)",
};

export const MARITAL_STATUS_LABELS: Record<string, string> = {
  SOLTERO: "Soltero/a",
  CASADO: "Casado/a",
  UNION_LIBRE: "Unión libre",
  DIVORCIADO: "Divorciado/a",
  VIUDO: "Viudo/a",
};
