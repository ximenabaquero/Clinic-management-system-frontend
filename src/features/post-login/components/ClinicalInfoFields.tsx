export type ClinicalData = {
  // Antecedentes personales
  antecedentesPatologicos: string;
  antecedentesQuirurgicos: string;
  antecedentesFarmacologicos: string;
  antecedentesAlergicos: string;
  antecedentesToxicos: string;
  antecedentesGinecoObstetricos: string;
  antecedentesOtros: string;
  // Factores de riesgo
  anticoagulado: boolean;
  enDialisis: boolean;
  vihSida: boolean;
  enEmbarazo: boolean;
  enTratamientoCA: boolean;
  otrosRiesgo: boolean;
  // Motivo de consulta
  motivoConsulta: string;
  // Examen físico
  onicomicosis: boolean;
  onicogrifosis: boolean;
  onicocriptosis: boolean;
  resequedad: boolean;
  exostosis: boolean;
  edemas: boolean;
  hiperqueratosis: boolean;
  verruga: boolean;
  talla: string;
  // Tipo de pie y tratamiento
  tipoPie: string;
  tratamientoIndicado: string;
  seguimiento: string;
};

type ClinicalInfoFieldsProps = {
  data: ClinicalData;
  onChange: (field: keyof ClinicalData, value: string | boolean) => void;
  onDirty: () => void;
};

const TIPOS_PIE = ["Egipcio", "Romano", "Griego", "Germánico", "Celta"];

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

export default function ClinicalInfoFields({ data, onChange, onDirty }: ClinicalInfoFieldsProps) {
  const set = (field: keyof ClinicalData) => (value: string | boolean) => {
    onChange(field, value);
    onDirty();
  };

  const setToggle = (field: keyof ClinicalData) => (value: boolean) => {
    onChange(field, value);
    onDirty();
  };

  return (
    <div className="space-y-6">

      {/* ANTECEDENTES PERSONALES */}
      <section>
        <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold mb-3">
          ANTECEDENTES PERSONALES
        </p>
        <div className="space-y-3">
          {[
            { field: "antecedentesPatologicos" as keyof ClinicalData, label: "Patológicos" },
            { field: "antecedentesQuirurgicos" as keyof ClinicalData, label: "Quirúrgicos" },
            { field: "antecedentesFarmacologicos" as keyof ClinicalData, label: "Farmacológicos" },
          ].map(({ field, label }) => (
            <div key={field}>
              <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
              <textarea
                rows={2}
                value={data[field] as string}
                onChange={(e) => { set(field)(e.target.value); }}
                className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-[#BF2496] focus:outline-none focus:ring-2 focus:ring-[#BF2496]/20"
                placeholder={`Antecedentes ${label.toLowerCase()}...`}
              />
            </div>
          ))}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Alérgicos</label>
              <input
                type="text"
                value={data.antecedentesAlergicos}
                onChange={(e) => { set("antecedentesAlergicos")(e.target.value); }}
                className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-[#BF2496] focus:outline-none focus:ring-2 focus:ring-[#BF2496]/20"
                placeholder="Alergias conocidas..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tóxicos</label>
              <input
                type="text"
                value={data.antecedentesToxicos}
                onChange={(e) => { set("antecedentesToxicos")(e.target.value); }}
                className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-[#BF2496] focus:outline-none focus:ring-2 focus:ring-[#BF2496]/20"
                placeholder="Tabaco, alcohol, etc..."
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Gineco-obstétricos</label>
            <input
              type="text"
              value={data.antecedentesGinecoObstetricos}
              onChange={(e) => { set("antecedentesGinecoObstetricos")(e.target.value); }}
              className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-[#BF2496] focus:outline-none focus:ring-2 focus:ring-[#BF2496]/20"
              placeholder="Antecedentes gineco-obstétricos..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Otros</label>
            <input
              type="text"
              value={data.antecedentesOtros}
              onChange={(e) => { set("antecedentesOtros")(e.target.value); }}
              className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-[#BF2496] focus:outline-none focus:ring-2 focus:ring-[#BF2496]/20"
              placeholder="Otros antecedentes relevantes..."
            />
          </div>
        </div>
      </section>

      {/* FACTORES DE RIESGO */}
      <section>
        <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold mb-3">
          FACTORES DE RIESGO
        </p>
        <div className="rounded-xl border border-gray-200 bg-white px-4 py-2 shadow-sm">
          <YesNoToggle label="Anticoagulado" value={data.anticoagulado} onChange={setToggle("anticoagulado")} />
          <YesNoToggle label="En Diálisis" value={data.enDialisis} onChange={setToggle("enDialisis")} />
          <YesNoToggle label="VIH/SIDA" value={data.vihSida} onChange={setToggle("vihSida")} />
          <YesNoToggle label="En embarazo" value={data.enEmbarazo} onChange={setToggle("enEmbarazo")} />
          <YesNoToggle label="En tratamiento de CA" value={data.enTratamientoCA} onChange={setToggle("enTratamientoCA")} />
          <YesNoToggle label="Otros/¿cuál?" value={data.otrosRiesgo} onChange={setToggle("otrosRiesgo")} />
        </div>
      </section>

      {/* MOTIVO DE CONSULTA */}
      <section>
        <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold mb-3">
          MOTIVO DE CONSULTA
        </p>
        <textarea
          rows={3}
          value={data.motivoConsulta}
          onChange={(e) => { set("motivoConsulta")(e.target.value); }}
          className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-[#BF2496] focus:outline-none focus:ring-2 focus:ring-[#BF2496]/20"
          placeholder="Describa el motivo de consulta del paciente..."
        />
      </section>

      {/* EXAMEN FÍSICO */}
      <section>
        <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold mb-3">
          EXAMEN FÍSICO
        </p>
        <div className="rounded-xl border border-gray-200 bg-white px-4 py-2 shadow-sm">
          <YesNoToggle label="Onicomicosis" value={data.onicomicosis} onChange={setToggle("onicomicosis")} />
          <YesNoToggle label="Onicogrifosis" value={data.onicogrifosis} onChange={setToggle("onicogrifosis")} />
          <YesNoToggle label="Onicocriptosis" value={data.onicocriptosis} onChange={setToggle("onicocriptosis")} />
          <YesNoToggle label="Resequedad" value={data.resequedad} onChange={setToggle("resequedad")} />
          <YesNoToggle label="Exostosis" value={data.exostosis} onChange={setToggle("exostosis")} />
          <YesNoToggle label="Edemas" value={data.edemas} onChange={setToggle("edemas")} />
          <YesNoToggle label="Hiperqueratosis" value={data.hiperqueratosis} onChange={setToggle("hiperqueratosis")} />
          <YesNoToggle label="Verruga" value={data.verruga} onChange={setToggle("verruga")} />
        </div>
        <div className="mt-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">Talla</label>
          <input
            type="text"
            value={data.talla}
            onChange={(e) => { set("talla")(e.target.value); }}
            className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-[#BF2496] focus:outline-none focus:ring-2 focus:ring-[#BF2496]/20"
            placeholder="Ej: 38"
          />
        </div>
      </section>

      {/* TIPO DE PIE */}
      <section>
        <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold mb-3">
          TIPO DE PIE
        </p>
        <div className="flex flex-wrap gap-2">
          {TIPOS_PIE.map((tipo) => (
            <button
              key={tipo}
              type="button"
              onClick={() => { set("tipoPie")(data.tipoPie === tipo ? "" : tipo); }}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition ${
                data.tipoPie === tipo
                  ? "bg-[#BF2496] text-white border-[#BF2496]"
                  : "bg-white text-gray-600 border-gray-300 hover:border-[#BF2496]"
              }`}
            >
              {tipo}
            </button>
          ))}
        </div>
      </section>

      {/* TRATAMIENTO INDICADO */}
      <section>
        <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold mb-3">
          TRATAMIENTO INDICADO
        </p>
        <textarea
          rows={3}
          value={data.tratamientoIndicado}
          onChange={(e) => { set("tratamientoIndicado")(e.target.value); }}
          className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-[#BF2496] focus:outline-none focus:ring-2 focus:ring-[#BF2496]/20"
          placeholder="Describa el tratamiento indicado..."
        />
      </section>

      {/* SEGUIMIENTO */}
      <section>
        <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold mb-3">
          SEGUIMIENTO
        </p>
        <textarea
          rows={3}
          value={data.seguimiento}
          onChange={(e) => { set("seguimiento")(e.target.value); }}
          className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-[#BF2496] focus:outline-none focus:ring-2 focus:ring-[#BF2496]/20"
          placeholder="Notas de seguimiento..."
        />
      </section>

    </div>
  );
}
