import type { EvaluationSnapshot, FullRecord } from "../../types";
import { MARITAL_STATUS_LABELS } from "../../services/constants";
import { SectionHeader, DataGrid } from "./ui";

// ─── Types ────────────────────────────────────────────────────────────────────

type Props = {
  snapshot: EvaluationSnapshot;
  evaluation: FullRecord["evaluation"];
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function Field({
  label,
  value,
  colSpan = 1,
}: {
  label: string;
  value: React.ReactNode;
  colSpan?: 1 | 2;
}) {
  return (
    <div className={colSpan === 2 ? "col-span-2" : "col-span-1"}>
      <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wide mb-1">
        {label}
      </p>
      <p className="font-medium text-gray-800 text-sm">{value ?? "—"}</p>
    </div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export function PersonalDataSection({ snapshot, evaluation }: Props) {
  const companionItems = [
    { label: "Nombre Completo", value: snapshot.companion_name },
    { label: "Parentesco", value: snapshot.companion_relationship },
    { label: "Celular", value: snapshot.companion_cellphone },
  ];

  return (
    <div className="space-y-4">
      {/* ── Datos personales ── */}
      <section>
        <SectionHeader color="emerald" title="Datos personales" />

        <div className="grid grid-cols-4 gap-x-6 gap-y-5 rounded-xl border border-gray-200 bg-white p-4 text-sm">
          {/* Row 1 */}
          <Field
            label="Nombre completo"
            value={`${snapshot.first_name} ${snapshot.last_name}`}
          />
          <Field
            label="Documento"
            value={`${snapshot.document_type} ${snapshot.cedula}`}
          />
          <Field label="Fecha de nacimiento" value={snapshot.date_of_birth} />
          <Field
            label="Edad"
            value={`${evaluation.patient_age_at_evaluation} años`}
          />

          {/* Row 2 */}
          <Field label="Sexo biológico" value={snapshot.biological_sex} />
          <Field label="EPS" value={snapshot.eps} />
          <Field
            label="Estado civil"
            value={
              MARITAL_STATUS_LABELS[snapshot.marital_status] ??
              snapshot.marital_status
            }
          />
          <Field label="Ocupación" value={snapshot.occupation} />

          {/* Row 3 */}
          <Field label="Dirección" value={snapshot.address} colSpan={2} />
          <Field label="Celular" value={snapshot.cellphone} />
          <Field label="Teléfono fijo" value={snapshot.phone ?? "—"} />
        </div>
      </section>

      {/* ── Datos del acompañante ── */}
      <section>
        <div className="flex items-center gap-2 mb-3">
          <h4 className="text-sm font-semibold text-gray-800 tracking-tight">
            Datos del acompañante
          </h4>
        </div>
        <DataGrid items={companionItems} />
      </section>
    </div>
  );
}
