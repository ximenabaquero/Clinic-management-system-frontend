import { PencilSquareIcon } from "@heroicons/react/24/solid";

import type { FullRecord, ClinicalFindings, LabResults } from "../../types";
import { SectionHeader, ClinicalSubsectionCard, getAllLabels } from "./ui";

// ─── Label maps ───────────────────────────────────────────────────────────────

const METABOLIC_LABELS: Partial<Record<keyof ClinicalFindings, string>> = {
  diabetes: "Diabetes",
  cardiac: "Problemas cardíacos",
  varicose_veins: "Várices",
  thrombosis: "Trombosis",
  fluid_retention: "Retención de líquidos",
  hepatitis: "Hepatitis",
  surgeries: "Cirugías realizadas",
  kidney_issues: "Problemas renales",
  thyroid_issues: "Problemas de tiroides",
};

const DIGESTIVE_LABELS: Partial<Record<keyof ClinicalFindings, string>> = {
  constipation: "Estreñimiento",
  gastritis: "Gastritis",
  irritable_bowel: "Colon irritable",
  reflux: "Reflujo",
  intestinal_habit: "Hábito intestinal",
};

const SKIN_LABELS: Partial<Record<keyof ClinicalFindings, string>> = {
  lupus_notes: "Lupus",
  allergy_notes: "Alergias",
  keloid_notes: "Queloides",
  vitiligo_notes: "Vitiligo",
  dermatitis_notes: "Dermatitis",
  other_skin_notes: "Otras condiciones de piel",
};

const HABITS_LABELS: Partial<Record<keyof ClinicalFindings, string>> = {
  smokes: "Fuma",
  alcohol: "Consume alcohol",
  anxiety: "Ansiedad",
  depression: "Depresión",
  sleep_hours: "Horas de sueño",
};

const GYNECO_LABELS: Partial<Record<keyof ClinicalFindings, string>> = {
  birth_control: "Método anticonceptivo",
  last_period: "Última menstruación",
  num_children: "N° de hijos",
  medications: "Medicamentos actuales",
};

const LAB_LABELS: Partial<Record<keyof LabResults, string>> = {
  has_exams: "¿Trae exámenes?",
  hemoglobin_done: "Hemoglobina realizada",
  inr_value: "INR",
  glucose_value: "Glucosa (mg/dL)",
  hematocrit_value: "Hematocrito (%)",
};

// ─── Types ────────────────────────────────────────────────────────────────────

type Props = {
  evaluation: FullRecord["evaluation"];
  clinicalFindings: ClinicalFindings;
  labResults: LabResults;
  isConfirmed: boolean;
  onEdit: () => void;
};

// ─── Component ────────────────────────────────────────────────────────────────

export function ClinicalEvaluationSection({
  evaluation,
  clinicalFindings,
  labResults,
  isConfirmed,
  onEdit,
}: Props) {
  // Use getAllLabels so every field is always shown regardless of value
  const metabolicItems = getAllLabels(clinicalFindings, METABOLIC_LABELS);
  const digestiveItems = getAllLabels(clinicalFindings, DIGESTIVE_LABELS);
  const skinItems = getAllLabels(clinicalFindings, SKIN_LABELS);
  const habitsItems = getAllLabels(clinicalFindings, HABITS_LABELS);
  const gynecoItems = getAllLabels(clinicalFindings, GYNECO_LABELS);
  const labItems = getAllLabels(labResults, LAB_LABELS);

  return (
    <section>
      <SectionHeader
        color="blue"
        title="Evaluación clínica"
        action={
          !isConfirmed ? (
            <button
              onClick={onEdit}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-gradient-to-r from-emerald-600 to-teal-500 rounded-lg shadow-sm shadow-emerald-200 hover:from-emerald-700 hover:to-teal-600 hover:shadow-md hover:shadow-emerald-200 active:translate-y-[1px] transition-all duration-200 print:hidden"
            >
              <PencilSquareIcon className="h-3.5 w-3.5" />
              Editar evaluación clínica
            </button>
          ) : undefined
        }
      />

      {/* ── IMC metrics ──────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm mb-6">
        {[
          { label: "Peso", value: `${evaluation.weight} kg` },
          { label: "Estatura", value: `${evaluation.height} m` },
          {
            label: "IMC",
            value: (
              <span className="font-semibold text-blue-600">
                {evaluation.bmi}
              </span>
            ),
          },
          {
            label: "Estado IMC",
            value: (
              <span className="inline-block rounded-full bg-blue-100 px-2 py-0.5 text-[11px] font-bold text-blue-600">
                {evaluation.bmi_status}
              </span>
            ),
          },
        ].map(({ label, value }) => (
          <div key={label}>
            <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wide mb-1">
              {label}
            </p>
            <p className="font-medium">{value}</p>
            <div className="border-t border-gray-100 mt-2" />
          </div>
        ))}
      </div>

      {/* ── Subsection cards ─────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
        {/*
          columns=2 on boolean-heavy sections so each row is shorter
          and the card doesn't become a tall single-column list.
        */}
        <ClinicalSubsectionCard
          title="Metabólicos y cardiovasculares"
          items={metabolicItems}
          columns={2}
        />
        <ClinicalSubsectionCard
          title="Digestivos"
          items={digestiveItems}
          columns={1}
        />
        <ClinicalSubsectionCard
          title="Condiciones de piel"
          items={skinItems}
          columns={1}
        />
        <ClinicalSubsectionCard
          title="Hábitos y salud mental"
          items={habitsItems}
          columns={2}
        />
        <ClinicalSubsectionCard
          title="Ginecológico y medicación"
          items={gynecoItems}
          columns={1}
        />
        <ClinicalSubsectionCard
          title="Resultados de laboratorio"
          items={labItems}
          columns={1}
        />
      </div>

      {/* ── Observations ─────────────────────────────────────────────── */}
      <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wide mb-2">
        Observaciones de la evaluación clínica
      </p>
      <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-700">
        {evaluation.medical_background}
      </div>
    </section>
  );
}
