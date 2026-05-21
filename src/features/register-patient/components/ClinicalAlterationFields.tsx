import ValidatedInput from "../../../components/ValidatedInput";

// ─── Types ────────────────────────────────────────────────────────────────────

export type ClinicalAlterationData = {
  // Booleanos
  diabetes: boolean;
  cardiac: boolean;
  varicose_veins: boolean;
  thrombosis: boolean;
  fluid_retention: boolean;
  hepatitis: boolean;
  surgeries: boolean;
  constipation: boolean;
  gastritis: boolean;
  irritable_bowel: boolean;
  reflux: boolean;
  kidney_issues: boolean;
  thyroid_issues: boolean;
  smokes: boolean;
  anxiety: boolean;
  alcohol: boolean;
  depression: boolean;
  // Texto
  intestinal_habit: string;
  lupus_notes: string;
  allergy_notes: string;
  keloid_notes: string;
  vitiligo_notes: string;
  dermatitis_notes: string;
  other_skin_notes: string;
  birth_control: string;
  medications: string;
  // Numérico / fecha
  sleep_hours: string;
  num_children: string;
  last_period: string;
};

export const INITIAL_CLINICAL_ALTERATION: ClinicalAlterationData = {
  diabetes: false,
  cardiac: false,
  varicose_veins: false,
  thrombosis: false,
  fluid_retention: false,
  hepatitis: false,
  surgeries: false,
  constipation: false,
  gastritis: false,
  irritable_bowel: false,
  reflux: false,
  kidney_issues: false,
  thyroid_issues: false,
  smokes: false,
  anxiety: false,
  alcohol: false,
  depression: false,
  intestinal_habit: "",
  lupus_notes: "",
  allergy_notes: "",
  keloid_notes: "",
  vitiligo_notes: "",
  dermatitis_notes: "",
  other_skin_notes: "",
  birth_control: "",
  medications: "",
  sleep_hours: "",
  num_children: "",
  last_period: "",
};

// ─── Sub-componente YesNoToggle ───────────────────────────────────────────────

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
              ? "bg-[#BF2496] text-white border-[#BF2496]"
              : "bg-white text-gray-500 border-gray-300 hover:border-[#BF2496]"
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

// ─── Props ────────────────────────────────────────────────────────────────────

type Props = {
  data: ClinicalAlterationData;
  onChange: (data: ClinicalAlterationData) => void;
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function ClinicalAlterationFields({ data, onChange }: Props) {
  const setToggle = (field: keyof ClinicalAlterationData) => (value: boolean) =>
    onChange({ ...data, [field]: value });

  const setText = (field: keyof ClinicalAlterationData) => (value: string) =>
    onChange({ ...data, [field]: value });

  return (
    <div className="mt-6 space-y-6">
      <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">
        ANTECEDENTES CLÍNICOS
      </p>

      {/* ── Metabólicos / Cardiovasculares ──────────────────────── */}
      <section>
        <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold mb-3">
          METABÓLICOS Y CARDIOVASCULARES
        </p>
        <div className="rounded-xl border border-gray-200 bg-white px-4 py-2 shadow-sm">
          <YesNoToggle
            label="Diabetes"
            value={data.diabetes}
            onChange={setToggle("diabetes")}
          />
          <YesNoToggle
            label="Problemas cardíacos"
            value={data.cardiac}
            onChange={setToggle("cardiac")}
          />
          <YesNoToggle
            label="Várices"
            value={data.varicose_veins}
            onChange={setToggle("varicose_veins")}
          />
          <YesNoToggle
            label="Trombosis"
            value={data.thrombosis}
            onChange={setToggle("thrombosis")}
          />
          <YesNoToggle
            label="Retención de líquidos"
            value={data.fluid_retention}
            onChange={setToggle("fluid_retention")}
          />
          <YesNoToggle
            label="Hepatitis"
            value={data.hepatitis}
            onChange={setToggle("hepatitis")}
          />
          <YesNoToggle
            label="Cirugías previas"
            value={data.surgeries}
            onChange={setToggle("surgeries")}
          />
          <YesNoToggle
            label="Problemas renales"
            value={data.kidney_issues}
            onChange={setToggle("kidney_issues")}
          />
          <YesNoToggle
            label="Problemas de tiroides"
            value={data.thyroid_issues}
            onChange={setToggle("thyroid_issues")}
          />
        </div>
      </section>

      {/* ── Digestivos ──────────────────────────────────────────── */}
      <section>
        <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold mb-3">
          DIGESTIVOS
        </p>
        <div className="rounded-xl border border-gray-200 bg-white px-4 py-2 shadow-sm">
          <YesNoToggle
            label="Estreñimiento"
            value={data.constipation}
            onChange={setToggle("constipation")}
          />
          <YesNoToggle
            label="Gastritis"
            value={data.gastritis}
            onChange={setToggle("gastritis")}
          />
          <YesNoToggle
            label="Intestino irritable"
            value={data.irritable_bowel}
            onChange={setToggle("irritable_bowel")}
          />
          <YesNoToggle
            label="Reflujo"
            value={data.reflux}
            onChange={setToggle("reflux")}
          />
        </div>
        <div className="mt-3">
          <ValidatedInput
            id="intestinal_habit"
            label="Hábito intestinal"
            placeholder="Ej: Regular, irregular, cada 2 días..."
            value={data.intestinal_habit}
            onChange={setText("intestinal_habit")}
            maxLength={100}
          />
        </div>
      </section>

      {/* ── Piel ────────────────────────────────────────────────── */}
      <section>
        <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold mb-3">
          CONDICIONES DE PIEL
        </p>
        <div className="space-y-3">
          <ValidatedInput
            id="lupus_notes"
            label="Lupus"
            placeholder="Observaciones sobre lupus (si aplica)"
            value={data.lupus_notes}
            onChange={setText("lupus_notes")}
            maxLength={200}
          />
          <ValidatedInput
            id="allergy_notes"
            label="Alergias"
            placeholder="Alergias conocidas"
            value={data.allergy_notes}
            onChange={setText("allergy_notes")}
            maxLength={200}
          />
          <ValidatedInput
            id="keloid_notes"
            label="Queloides"
            placeholder="Observaciones sobre queloides"
            value={data.keloid_notes}
            onChange={setText("keloid_notes")}
            maxLength={200}
          />
          <ValidatedInput
            id="vitiligo_notes"
            label="Vitiligo"
            placeholder="Observaciones sobre vitiligo"
            value={data.vitiligo_notes}
            onChange={setText("vitiligo_notes")}
            maxLength={200}
          />
          <ValidatedInput
            id="dermatitis_notes"
            label="Dermatitis"
            placeholder="Observaciones sobre dermatitis"
            value={data.dermatitis_notes}
            onChange={setText("dermatitis_notes")}
            maxLength={200}
          />
          <ValidatedInput
            id="other_skin_notes"
            label="Otras condiciones de piel"
            placeholder="Otras condiciones relevantes"
            value={data.other_skin_notes}
            onChange={setText("other_skin_notes")}
            maxLength={200}
          />
        </div>
      </section>

      {/* ── Hábitos y salud mental ───────────────────────────────── */}
      <section>
        <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold mb-3">
          HÁBITOS Y SALUD MENTAL
        </p>
        <div className="rounded-xl border border-gray-200 bg-white px-4 py-2 shadow-sm">
          <YesNoToggle
            label="Fuma"
            value={data.smokes}
            onChange={setToggle("smokes")}
          />
          <YesNoToggle
            label="Consume alcohol"
            value={data.alcohol}
            onChange={setToggle("alcohol")}
          />
          <YesNoToggle
            label="Ansiedad"
            value={data.anxiety}
            onChange={setToggle("anxiety")}
          />
          <YesNoToggle
            label="Depresión"
            value={data.depression}
            onChange={setToggle("depression")}
          />
        </div>
        <div className="mt-3">
          <ValidatedInput
            id="sleep_hours"
            label="Horas de sueño"
            type="number"
            placeholder="Ej: 7"
            value={data.sleep_hours}
            onChange={setText("sleep_hours")}
            min={0}
            max={24}
          />
        </div>
      </section>

      {/* ── Ginecológico / Medicación ────────────────────────────── */}
      <section>
        <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold mb-3">
          GINECOLÓGICO Y MEDICACIÓN
        </p>
        <div className="space-y-3">
          <ValidatedInput
            id="birth_control"
            label="Método anticonceptivo"
            placeholder="Ej: Pastillas, DIU, ninguno..."
            value={data.birth_control}
            onChange={setText("birth_control")}
            maxLength={100}
          />
          <ValidatedInput
            id="last_period"
            label="Última menstruación"
            type="date"
            value={data.last_period}
            onChange={setText("last_period")}
          />
          <ValidatedInput
            id="num_children"
            label="Número de hijos"
            type="number"
            placeholder="Ej: 2"
            value={data.num_children}
            onChange={setText("num_children")}
            min={0}
            max={20}
          />
          <ValidatedInput
            id="medications"
            label="Medicamentos actuales"
            as="textarea"
            rows={3}
            placeholder="Nombre y dosis de medicamentos que toma actualmente"
            value={data.medications}
            onChange={setText("medications")}
            maxLength={300}
          />
        </div>
      </section>
    </div>
  );
}
