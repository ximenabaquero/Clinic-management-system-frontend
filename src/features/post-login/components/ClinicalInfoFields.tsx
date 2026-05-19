import ValidatedInput from "../../../components/ValidatedInput";

export type ClinicalItemData = {
  diabetes: boolean;
  alteraciones_cardiacas: boolean;
  varices: boolean;
  trombos: boolean;
  retencion_liquidos: boolean;
  hepatitis: boolean;
  cirugias_realizadas: boolean;
  estrenimiento: boolean;
  gastritis: boolean;
  colon_irritable: boolean;
  reflujo: boolean;
  habito_intestinal: string;
  alteraciones_renales: boolean;
  alteraciones_tiroides: boolean;
  lupus: string;
  alergias: string;
  queloide: string;
  vitiligo: string;
  dermatitis: string;
  otros_antecedentes: string;
  horas_sueno: string;
  fuma: boolean;
  ansiedad: boolean;
  consume_licor: boolean;
  depresion: boolean;
  metodo_planificacion: string;
  medicamentos: string;
  ultimo_periodo: string;
  num_hijos: string;
  examenes_medicos: boolean;
  hemoglobina: boolean;
  inr: string;
  glucosa: string;
  hematocrito: string;
};

export const INITIAL_CLINICAL_ITEMS: ClinicalItemData = {
  diabetes: false,
  alteraciones_cardiacas: false,
  varices: false,
  trombos: false,
  retencion_liquidos: false,
  hepatitis: false,
  cirugias_realizadas: false,
  estrenimiento: false,
  gastritis: false,
  colon_irritable: false,
  reflujo: false,
  habito_intestinal: "",
  alteraciones_renales: false,
  alteraciones_tiroides: false,
  lupus: "",
  alergias: "",
  queloide: "",
  vitiligo: "",
  dermatitis: "",
  otros_antecedentes: "",
  horas_sueno: "",
  fuma: false,
  ansiedad: false,
  consume_licor: false,
  depresion: false,
  metodo_planificacion: "",
  medicamentos: "",
  ultimo_periodo: "",
  num_hijos: "",
  examenes_medicos: false,
  hemoglobina: false,
  inr: "",
  glucosa: "",
  hematocrito: "",
};

export type ClinicalData = {
  weightKg: string;
  heightM: string;
  medicalBackground: string;
  clinicalItems: ClinicalItemData;
};

type StringClinicalField = "weightKg" | "heightM" | "medicalBackground";

type ClinicalInfoFieldsProps = {
  data: ClinicalData;
  onChange: (field: StringClinicalField, value: string) => void;
  onChangeClinicalItem: <K extends keyof ClinicalItemData>(
    field: K,
    value: ClinicalItemData[K]
  ) => void;
  onDirty: () => void;
};

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

function SectionTitle({ label, color = "bg-blue-500" }: { label: string; color?: string }) {
  return (
    <div className="flex items-center gap-2 mb-3 mt-6">
      <span className={`h-4 w-0.5 ${color} rounded-full`} />
      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{label}</p>
    </div>
  );
}

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
    <div className="flex items-center justify-between px-3 py-2 rounded-lg border border-gray-100 bg-gray-50/60">
      <span className="text-sm text-gray-700">{label}</span>
      <div className="flex gap-1">
        <button
          type="button"
          onClick={() => onChange(true)}
          className={`px-2.5 py-1 rounded text-xs font-semibold transition-all ${
            value
              ? "bg-emerald-500 text-white shadow-sm"
              : "bg-white border border-gray-200 text-gray-500 hover:border-emerald-300"
          }`}
        >
          SI
        </button>
        <button
          type="button"
          onClick={() => onChange(false)}
          className={`px-2.5 py-1 rounded text-xs font-semibold transition-all ${
            !value
              ? "bg-red-400 text-white shadow-sm"
              : "bg-white border border-gray-200 text-gray-500 hover:border-red-300"
          }`}
        >
          NO
        </button>
      </div>
    </div>
  );
}

export default function ClinicalInfoFields({
  data,
  onChange,
  onChangeClinicalItem,
  onDirty,
}: ClinicalInfoFieldsProps) {
  const set = (field: StringClinicalField) => (value: string) => {
    onChange(field, value);
    onDirty();
  };

  const setItem = <K extends keyof ClinicalItemData>(field: K) =>
    (value: ClinicalItemData[K]) => {
      onChangeClinicalItem(field, value);
      onDirty();
    };

  const ci = data.clinicalItems;

  const weight = parseFloat(data.weightKg);
  const height = parseFloat(data.heightM);
  const bmi =
    weight > 0 && height > 0 ? +(weight / (height * height)).toFixed(2) : null;
  const bmiPreview = bmi !== null ? bmi.toString() : "";
  const bmiStatusPreview = bmi !== null ? getBmiStatus(bmi) : "";

  return (
    <>
      {/* Peso y Estatura */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="col-span-2 -mb-2">
          <p className="text-[10px] uppercase tracking-wider text-gray-400">
            LOS CAMPOS CON * SON OBLIGATORIOS
          </p>
        </div>

        <ValidatedInput
          id="weight"
          label="Peso (kg) *"
          type="number"
          placeholder="Peso del paciente"
          value={data.weightKg}
          onChange={set("weightKg")}
          required
          min={2}
          max={400}
          clampToMin
        />

        <ValidatedInput
          id="height"
          label="Estatura (m) *"
          type="number"
          placeholder="Estatura del paciente"
          value={data.heightM}
          onChange={set("heightM")}
          required
          min={1.2}
          max={2.5}
          clampToMin
        />
      </div>

      {/* BMI y Estado del BMI */}
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
            value={bmiPreview}
            disabled
            className="mt-1 w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 shadow-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Estado del IMC
          </label>
          <div className="mt-1 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 shadow-sm text-sm text-gray-900 flex items-center">
            {bmiStatusPreview || "—"}
          </div>
        </div>
      </div>

      {/* Antecedentes médicos */}
      <div className="mt-6">
        <ValidatedInput
          id="medical_background"
          label="Antecedentes médicos relevantes *"
          as="textarea"
          rows={3}
          required
          value={data.medicalBackground}
          onChange={(val) => {
            onChange("medicalBackground", val);
            onDirty();
          }}
          maxLength={500}
          placeholder="Patologías previas, intervenciones quirúrgicas, alergias, medicación actual, condiciones relevantes para el procedimiento."
        />
      </div>

      {/* ── ALTERACIONES ────────────────────────────────────────────────────── */}
      <SectionTitle label="Alteraciones" color="bg-red-400" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <YesNoToggle label="Diabetes" value={ci.diabetes} onChange={setItem("diabetes")} />
        <YesNoToggle label="Alteraciones Cardiacas" value={ci.alteraciones_cardiacas} onChange={setItem("alteraciones_cardiacas")} />
        <YesNoToggle label="Varices" value={ci.varices} onChange={setItem("varices")} />
        <YesNoToggle label="Trombos" value={ci.trombos} onChange={setItem("trombos")} />
        <YesNoToggle label="Ret. Líquidos" value={ci.retencion_liquidos} onChange={setItem("retencion_liquidos")} />
        <YesNoToggle label="Hepatitis" value={ci.hepatitis} onChange={setItem("hepatitis")} />
        <YesNoToggle label="Cirugías Realizadas" value={ci.cirugias_realizadas} onChange={setItem("cirugias_realizadas")} />
      </div>

      {/* ── ALTERACIONES DIGESTIVAS ─────────────────────────────────────────── */}
      <SectionTitle label="Alteraciones Digestivas" color="bg-orange-400" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <YesNoToggle label="Estreñimiento" value={ci.estrenimiento} onChange={setItem("estrenimiento")} />
        <YesNoToggle label="Gastritis" value={ci.gastritis} onChange={setItem("gastritis")} />
        <YesNoToggle label="Colon Irritable" value={ci.colon_irritable} onChange={setItem("colon_irritable")} />
        <YesNoToggle label="Reflujo" value={ci.reflujo} onChange={setItem("reflujo")} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
        <ValidatedInput
          id="habito_intestinal"
          label="Hábito Intestinal"
          placeholder="Describa..."
          value={ci.habito_intestinal}
          onChange={setItem("habito_intestinal")}
          maxLength={200}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
        <YesNoToggle label="Alteraciones Renales" value={ci.alteraciones_renales} onChange={setItem("alteraciones_renales")} />
        <YesNoToggle label="Alteraciones Tiroides" value={ci.alteraciones_tiroides} onChange={setItem("alteraciones_tiroides")} />
      </div>

      {/* ── ALTERACIONES DE PIEL ─────────────────────────────────────────────── */}
      <SectionTitle label="Alteraciones de Piel" color="bg-pink-400" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <ValidatedInput id="lupus" label="Lupus" placeholder="Describa..." value={ci.lupus} onChange={setItem("lupus")} maxLength={200} />
        <ValidatedInput id="alergias" label="Alergias" placeholder="Describa..." value={ci.alergias} onChange={setItem("alergias")} maxLength={200} />
        <ValidatedInput id="queloide" label="Queloide" placeholder="Describa..." value={ci.queloide} onChange={setItem("queloide")} maxLength={200} />
      </div>

      {/* ── ANTECEDENTES ──────────────────────────────────────────────────────── */}
      <SectionTitle label="Antecedentes" color="bg-violet-400" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <ValidatedInput id="vitiligo" label="Vitiligo" placeholder="Describa..." value={ci.vitiligo} onChange={setItem("vitiligo")} maxLength={200} />
        <ValidatedInput id="dermatitis" label="Dermatitis" placeholder="Describa..." value={ci.dermatitis} onChange={setItem("dermatitis")} maxLength={200} />
        <ValidatedInput id="otros_antecedentes" label="Otros" placeholder="Otros antecedentes..." value={ci.otros_antecedentes} onChange={setItem("otros_antecedentes")} maxLength={300} />
        <ValidatedInput id="horas_sueno" label="Horas de Sueño" placeholder="Ej. 7" value={ci.horas_sueno} onChange={setItem("horas_sueno")} maxLength={10} />
        <ValidatedInput id="num_hijos" label="N° Hijos" placeholder="Número de hijos" value={ci.num_hijos} onChange={setItem("num_hijos")} maxLength={5} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
        <YesNoToggle label="Fuma" value={ci.fuma} onChange={setItem("fuma")} />
        <YesNoToggle label="Ansiedad" value={ci.ansiedad} onChange={setItem("ansiedad")} />
        <YesNoToggle label="Consume Licor" value={ci.consume_licor} onChange={setItem("consume_licor")} />
        <YesNoToggle label="Depresión" value={ci.depresion} onChange={setItem("depresion")} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
        <ValidatedInput id="metodo_planificacion" label="Método de Planificación" placeholder="Describa..." value={ci.metodo_planificacion} onChange={setItem("metodo_planificacion")} maxLength={200} />
        <ValidatedInput id="medicamentos" label="Medicamentos" placeholder="Medicamentos actuales..." value={ci.medicamentos} onChange={setItem("medicamentos")} maxLength={300} />
        <ValidatedInput id="ultimo_periodo" label="Último Periodo" placeholder="Fecha del último periodo" value={ci.ultimo_periodo} onChange={setItem("ultimo_periodo")} maxLength={50} />
      </div>

      {/* ── EXÁMENES MÉDICOS ──────────────────────────────────────────────────── */}
      <SectionTitle label="Exámenes Médicos" color="bg-teal-400" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <YesNoToggle label="Exámenes Médicos" value={ci.examenes_medicos} onChange={setItem("examenes_medicos")} />
        <YesNoToggle label="Hemoglobina" value={ci.hemoglobina} onChange={setItem("hemoglobina")} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-3">
        <ValidatedInput id="inr" label="INR" placeholder="Valor..." value={ci.inr} onChange={setItem("inr")} maxLength={20} />
        <ValidatedInput id="glucosa" label="Glucosa" placeholder="Valor..." value={ci.glucosa} onChange={setItem("glucosa")} maxLength={20} />
        <ValidatedInput id="hematocrito" label="Hematocrito" placeholder="Valor..." value={ci.hematocrito} onChange={setItem("hematocrito")} maxLength={20} />
      </div>
    </>
  );
}
