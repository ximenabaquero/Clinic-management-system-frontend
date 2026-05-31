import ValidatedInput from "../../../components/ValidatedInput";
import SectionDetails from "./SectionDetails";
import DatePickerSelect from "./DataPickerSelect";

// ─── Types ────────────────────────────────────────────────────────────────────

export type ClinicalAlterationData = {
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
  intestinal_habit: string;
  lupus_notes: string;
  allergy_notes: string;
  keloid_notes: string;
  vitiligo_notes: string;
  dermatitis_notes: string;
  other_skin_notes: string;
  birth_control: string;
  medications: string;
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

  // Contadores por sección (campos en true)
  const countMetabolic = [
    data.diabetes,
    data.cardiac,
    data.varicose_veins,
    data.thrombosis,
    data.fluid_retention,
    data.hepatitis,
    data.surgeries,
    data.kidney_issues,
    data.thyroid_issues,
  ].filter(Boolean).length;

  const countDigestive =
    [
      data.constipation,
      data.gastritis,
      data.irritable_bowel,
      data.reflux,
    ].filter(Boolean).length + (data.intestinal_habit ? 1 : 0);

  const countSkin = [
    data.lupus_notes,
    data.allergy_notes,
    data.keloid_notes,
    data.vitiligo_notes,
    data.dermatitis_notes,
    data.other_skin_notes,
  ].filter(Boolean).length;

  const countHabits =
    [data.smokes, data.alcohol, data.anxiety, data.depression].filter(Boolean)
      .length + (data.sleep_hours ? 1 : 0);

  const countGyneco = [
    data.birth_control,
    data.last_period,
    data.num_children,
    data.medications,
  ].filter(Boolean).length;

  return (
    <div className="mt-6 space-y-4">
      <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">
        ANTECEDENTES CLÍNICOS
      </p>

      {/* ── Metabólicos / Cardiovasculares ──────────────────────── */}
      <SectionDetails
        label="Metabólicos y cardiovasculares"
        count={countMetabolic}
      >
        <div className="rounded-xl border border-gray-100 bg-gray-50/50 px-4 py-2">
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
            label="Trombos"
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
            label="Cirugías realizadas"
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
      </SectionDetails>

      {/* ── Digestivos ──────────────────────────────────────────── */}
      <SectionDetails label="Digestivos" count={countDigestive}>
        <div className="space-y-3">
          <div className="rounded-xl border border-gray-100 bg-gray-50/50 px-4 py-2">
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
              label="Colon irritable"
              value={data.irritable_bowel}
              onChange={setToggle("irritable_bowel")}
            />
            <YesNoToggle
              label="Reflujo"
              value={data.reflux}
              onChange={setToggle("reflux")}
            />
          </div>
          <label
            htmlFor="p-description"
            className="flex items-center gap-1.5 text-sm font-medium text-gray-700"
          >
            Hábito intestinal
            <span className="text-gray-400 font-normal">(opcional)</span>
          </label>
          <ValidatedInput
            id="intestinal_habit"
            label=""
            placeholder="Ej: Regular, irregular, cada 2 días..."
            value={data.intestinal_habit}
            onChange={setText("intestinal_habit")}
            maxLength={100}
          />
        </div>
      </SectionDetails>

      {/* ── Piel ────────────────────────────────────────────────── */}
      <SectionDetails label="Condiciones de piel" count={countSkin}>
        <div className="space-y-3">
          <label
            htmlFor="p-description"
            className="flex items-center gap-1.5 text-sm font-medium text-gray-700"
          >
            Lupus
            <span className="text-gray-400 font-normal">(opcional)</span>
          </label>
          <ValidatedInput
            id="lupus_notes"
            label=""
            placeholder="Observaciones sobre lupus (si aplica)"
            value={data.lupus_notes}
            onChange={setText("lupus_notes")}
            maxLength={255}
          />

          <label
            htmlFor="p-description"
            className="flex items-center gap-1.5 text-sm font-medium text-gray-700"
          >
            Alergias
            <span className="text-gray-400 font-normal">(opcional)</span>
          </label>
          <ValidatedInput
            id="allergy_notes"
            label=""
            placeholder="Alergias conocidas"
            value={data.allergy_notes}
            onChange={setText("allergy_notes")}
            maxLength={255}
          />

          <label
            htmlFor="p-description"
            className="flex items-center gap-1.5 text-sm font-medium text-gray-700"
          >
            Queloides
            <span className="text-gray-400 font-normal">(opcional)</span>
          </label>
          <ValidatedInput
            id="keloid_notes"
            label=""
            placeholder="Observaciones sobre queloides"
            value={data.keloid_notes}
            onChange={setText("keloid_notes")}
            maxLength={255}
          />

          <label
            htmlFor="p-description"
            className="flex items-center gap-1.5 text-sm font-medium text-gray-700"
          >
            Vitiligo
            <span className="text-gray-400 font-normal">(opcional)</span>
          </label>
          <ValidatedInput
            id="vitiligo_notes"
            label=""
            placeholder="Observaciones sobre vitiligo"
            value={data.vitiligo_notes}
            onChange={setText("vitiligo_notes")}
            maxLength={255}
          />

          <label
            htmlFor="p-description"
            className="flex items-center gap-1.5 text-sm font-medium text-gray-700"
          >
            Dermatitis
            <span className="text-gray-400 font-normal">(opcional)</span>
          </label>
          <ValidatedInput
            id="dermatitis_notes"
            label=""
            placeholder="Observaciones sobre dermatitis"
            value={data.dermatitis_notes}
            onChange={setText("dermatitis_notes")}
            maxLength={255}
          />

          <label
            htmlFor="p-description"
            className="flex items-center gap-1.5 text-sm font-medium text-gray-700"
          >
            Otras condiciones de piel
            <span className="text-gray-400 font-normal">(opcional)</span>
          </label>
          <ValidatedInput
            id="other_skin_notes"
            label=""
            placeholder="Otras condiciones relevantes"
            value={data.other_skin_notes}
            onChange={setText("other_skin_notes")}
            maxLength={255}
          />
        </div>
      </SectionDetails>

      {/* ── Hábitos y salud mental ───────────────────────────────── */}
      <SectionDetails label="Hábitos y salud mental" count={countHabits}>
        <div className="space-y-3">
          <div className="rounded-xl border border-gray-100 bg-gray-50/50 px-4 py-2">
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

          <label
            htmlFor="p-description"
            className="flex items-center gap-1.5 text-sm font-medium text-gray-700"
          >
            Horas de sueño
            <span className="text-gray-400 font-normal">(opcional)</span>
          </label>
          <ValidatedInput
            id="sleep_hours"
            label=""
            type="number"
            placeholder="Ej: 7"
            value={data.sleep_hours}
            onChange={setText("sleep_hours")}
            min={0}
            max={24}
            clampToMin
          />
        </div>
      </SectionDetails>

      {/* ── Ginecológico / Medicación ────────────────────────────── */}
      <SectionDetails label="Ginecológico y medicación" count={countGyneco}>
        <div className="space-y-3">
          <label
            htmlFor="p-description"
            className="flex items-center gap-1.5 text-sm font-medium text-gray-700"
          >
            Método anticonceptivo
            <span className="text-gray-400 font-normal">(opcional)</span>
          </label>
          <ValidatedInput
            id="birth_control"
            label=""
            placeholder="Ej: Pastillas, DIU, ninguno..."
            value={data.birth_control}
            onChange={setText("birth_control")}
            maxLength={100}
          />
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mt-4">
            <div className="sm:col-span-3">
              <label
                htmlFor="p-description"
                className="flex items-center gap-1.5 text-sm font-medium text-gray-700"
              >
                Última menstruación
                <span className="text-gray-400 font-normal">(opcional)</span>
              </label>
              <DatePickerSelect
                label=""
                value={data.last_period}
                onChange={setText("last_period")}
                showAge={false}
                minYear={new Date().getFullYear() - 6}
              />
            </div>
            <div className="sm:col-span-1">
              <label
                htmlFor="p-description"
                className="flex items-center gap-1.5 text-sm font-medium text-gray-700"
              >
                N° hijos
                <span className="text-gray-400 font-normal">(opcional)</span>
              </label>
              <ValidatedInput
                id="num_children"
                label=""
                type="number"
                placeholder="Ej: 2"
                value={data.num_children}
                onChange={setText("num_children")}
                min={0}
                max={20}
                clampToMin
              />
            </div>
          </div>

          <label
            htmlFor="p-description"
            className="flex items-center gap-1.5 text-sm font-medium text-gray-700"
          >
            Medicamentos actuales
            <span className="text-gray-400 font-normal">(opcional)</span>
          </label>
          <ValidatedInput
            id="medications"
            label=""
            as="textarea"
            rows={3}
            placeholder="Nombre y dosis de medicamentos que toma actualmente"
            value={data.medications}
            onChange={setText("medications")}
            maxLength={255}
          />
        </div>
        <p className="text-[11px] text-gray-400 mt-1.5 pl-0.5">
          Máximo 255 caracteres · {data.medications.length}/255
        </p>
      </SectionDetails>
    </div>
  );
}
