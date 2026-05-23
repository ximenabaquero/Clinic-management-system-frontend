import ValidatedInput from "../../../components/ValidatedInput";
import ClinicalAlterationFields, {
  type ClinicalAlterationData,
  INITIAL_CLINICAL_ALTERATION,
} from "./ClinicalAlterationFields";
import LabResultFields, {
  type LabResultData,
  INITIAL_LAB_RESULT,
} from "./LabResultFields";

// ─── Types ────────────────────────────────────────────────────────────────────

export type ClinicalData = {
  weightKg: string;
  heightM: string;
  medicalBackground: string;
  clinicalAlteration: ClinicalAlterationData;
  labResult: LabResultData;
};

export const INITIAL_CLINICAL: ClinicalData = {
  weightKg: "",
  heightM: "",
  medicalBackground: "",
  clinicalAlteration: INITIAL_CLINICAL_ALTERATION,
  labResult: INITIAL_LAB_RESULT,
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

// ─── Props ────────────────────────────────────────────────────────────────────

type Props = {
  data: ClinicalData;
  onChange: (field: keyof ClinicalData, value: unknown) => void;
  onDirty: () => void;
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function ClinicalInfoFields({ data, onChange, onDirty }: Props) {
  const set = (field: keyof ClinicalData) => (value: string) => {
    onChange(field, value);
    onDirty();
  };

  const weight = parseFloat(data.weightKg);
  const height = parseFloat(data.heightM);
  const bmi =
    weight > 0 && height > 0 ? +(weight / (height * height)).toFixed(2) : null;

  return (
    <>
      {/* ── Peso y Estatura ─────────────────────────────────────── */}
      {/* ── Peso y Estatura ─────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="col-span-2 -mb-2">
          <p className="text-[10px] uppercase tracking-wider text-gray-400">
            TODOS LOS CAMPOS SON OBLIGATORIOS **
          </p>
        </div>
        <ValidatedInput
          id="weight"
          label="Peso (kg)"
          type="number"
          placeholder="Peso del paciente"
          value={data.weightKg}
          onChange={set("weightKg")}
          onBlur={() => {
            const n = parseFloat(data.weightKg);
            if (!isNaN(n) && n < 2) set("weightKg")("2");
            if (!isNaN(n) && n > 400) set("weightKg")("400");
          }}
          required
          min={2}
          max={400}
        />
        <ValidatedInput
          id="height"
          label="Estatura (m)"
          type="number"
          placeholder="Estatura del paciente"
          value={data.heightM}
          onChange={set("heightM")}
          onBlur={() => {
            const n = parseFloat(data.heightM);
            if (!isNaN(n) && n < 1.2) set("heightM")("1.2");
            if (!isNaN(n) && n > 2.5) set("heightM")("2.5");
          }}
          required
          min={1.2}
          max={2.5}
        />
      </div>
      {/* ── IMC ─────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        <div>
          <label
            htmlFor="bmi_preview"
            className="block text-sm font-medium text-gray-700"
          >
            IMC
          </label>
          <input
            id="bmi_preview"
            value={bmi ?? ""}
            disabled
            className="mt-1 w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Estado del IMC
          </label>
          <div className="mt-1 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 shadow-sm text-sm text-gray-900 flex items-center">
            {bmi !== null ? getBmiStatus(bmi) : "—"}
          </div>
        </div>
      </div>

      {/* ── Alteraciones clínicas ────────────────────────────────── */}
      <ClinicalAlterationFields
        data={data.clinicalAlteration}
        onChange={(val) => {
          onChange("clinicalAlteration", val);
          onDirty();
        }}
      />

      {/* ── Resultados de laboratorio ────────────────────────────── */}
      <LabResultFields
        data={data.labResult}
        onChange={(val) => {
          onChange("labResult", val);
          onDirty();
        }}
      />

      {/* ── Observaciones clínicas ─────────────────────────────────── */}
      <div className="mt-6">
        <ValidatedInput
          id="medical_background"
          label="Observaciones de la evaluación clínica"
          as="textarea"
          rows={4}
          required
          value={data.medicalBackground}
          onChange={(val) => {
            onChange("medicalBackground", val);
            onDirty();
          }}
          maxLength={500}
          placeholder="Observaciones relevantes sobre la evaluación clínica del paciente, como síntomas, diagnósticos previos, alergias, etc."
        />
        <p className="text-[11px] text-gray-400 mt-1.5 pl-0.5">
          Máximo 500 caracteres · {data.medicalBackground.length}/500
        </p>
      </div>
    </>
  );
}
