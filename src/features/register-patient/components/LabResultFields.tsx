import SectionDetails from "./SectionDetails";
import ValidatedInput from "../../../components/ValidatedInput";

// ─── Types ────────────────────────────────────────────────────────────────────
export type LabResultData = {
  has_exams: boolean;
  hemoglobin_done: boolean;
  inr_value: string;
  glucose_value: string;
  hematocrit_value: string;
};

export const INITIAL_LAB_RESULT: LabResultData = {
  has_exams: false,
  hemoglobin_done: false,
  inr_value: "",
  glucose_value: "",
  hematocrit_value: "",
};

// ─── Sub-componente YesNoToggle ───────────────────────────────────────────────
// Se define localmente para no acoplar este archivo a ClinicalAlterationFields.

function YesNoToggle({
  label,
  value,
  onChange,
}: {
  label: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between py-1.5 border-b border-gray-100 last:border-0">
      <span className="text-sm text-gray-700">{label}</span>
      <div className="flex gap-1">
        <button
          type="button"
          onClick={() => onChange(true)}
          className={`px-3 py-0.5 rounded-full text-xs font-semibold border transition ${
            value === true
              ? "bg-emerald-500 text-white border-emerald-500"
              : "bg-white text-gray-500 border-gray-300 hover:border-emerald-500"
          }`}
        >
          SI
        </button>
        <button
          type="button"
          onClick={() => onChange(false)}
          className={`px-3 py-0.5 rounded-full text-xs font-semibold border transition ${
            value === false
              ? "bg-red-400 text-white border-red-400"
              : "bg-white text-gray-500 border-gray-300 hover:border-red-300"
          }`}
        >
          NO
        </button>
      </div>
    </div>
  );
}

// ─── Subcomponente NumericField ───────────────────────────────────────────────
// Input numérico minimalista consistente con el estilo del formulario.

function NumericField({
  id,
  label,
  placeholder,
  value,
  onChange,
}: {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      <input
        id={id}
        type="number"
        step="0.01"
        min={0}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
      />
    </div>
  );
}

// ─── Props ────────────────────────────────────────────────────────────────────

type Props = {
  data: LabResultData;
  onChange: (data: LabResultData) => void;
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function LabResultFields({ data, onChange }: Props) {
  const setToggle = (field: keyof LabResultData) => (value: boolean) =>
    onChange({ ...data, [field]: value });

  const setText = (field: keyof LabResultData) => (value: string) =>
    onChange({ ...data, [field]: value });

  const countLaboratorio = [
    data.has_exams,
    data.hemoglobin_done,
    data.inr_value,
    data.glucose_value,
    data.hematocrit_value,
  ].filter(Boolean).length;

  return (
    <div className="mt-6 space-y-4">
      <SectionDetails
        label="Resultados de laboratorio"
        count={countLaboratorio}
      >
        {/* Booleanos */}
        <div className="rounded-xl border border-gray-200 bg-white px-4 py-2 shadow-sm">
          <YesNoToggle
            label="¿Trae exámenes?"
            value={data.has_exams}
            onChange={setToggle("has_exams")}
          />
          <YesNoToggle
            label="Hemoglobina realizada"
            value={data.hemoglobin_done}
            onChange={setToggle("hemoglobin_done")}
          />
        </div>

        {/* Valores numéricos — solo visibles si trae exámenes */}
        {data.has_exams && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1 mt-2">
            <div>
              <label
                htmlFor="inr_value"
                className="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-1"
              >
                INR
                <span className="text-gray-400 text-[10px] font-normal">
                  (opcional)
                </span>
              </label>
              <ValidatedInput
                id="inr_value"
                label=""
                type="number"
                placeholder="Ej: 1.2"
                value={data.inr_value}
                onChange={setText("inr_value")}
                min={0.1}
                max={10.0}
                clampToMin
              />
            </div>

            <div>
              <label
                htmlFor="glucose_value"
                className="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-1"
              >
                Glucosa (mg/dL)
                <span className="text-gray-400 text-[10px] font-normal">
                  (opcional)
                </span>
              </label>
              <ValidatedInput
                id="glucose_value"
                label=""
                type="number"
                placeholder="Ej: 95"
                value={data.glucose_value}
                onChange={setText("glucose_value")}
                min={10}
                max={1000}
                clampToMin
              />
            </div>

            <div>
              <label
                htmlFor="hematocrit_value"
                className="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-1"
              >
                Hematocrito (%)
                <span className="text-gray-400 text-[10px] font-normal">
                  (opcional)
                </span>
              </label>
              <ValidatedInput
                id="hematocrit_value"
                label=""
                type="number"
                placeholder="Ej: 42"
                value={data.hematocrit_value}
                onChange={setText("hematocrit_value")}
                min={0}
                max={80}
                clampToMin
              />
            </div>
          </div>
        )}
      </SectionDetails>
    </div>
  );
}
