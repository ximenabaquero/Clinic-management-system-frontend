import type { Patient } from "../../types";
import CompanionFields, { type CompanionData } from "./CompanionFields";

// ─── Helpers ──────────────────────────────────────────────────────────────────

const MARITAL_STATUS_LABELS: Record<string, string> = {
  SOLTERO: "Soltero/a",
  CASADO: "Casado/a",
  UNION_LIBRE: "Unión libre",
  DIVORCIADO: "Divorciado/a",
  VIUDO: "Viudo/a",
};

// Imita el look de ValidatedInput: label pequeño arriba, valor en input deshabilitado
function ReadonlyField({
  label,
  value,
  colSpan = 1,
}: {
  label: string;
  value: string;
  colSpan?: 1 | 2;
}) {
  return (
    <div className={colSpan === 2 ? "col-span-2" : ""}>
      <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="flex items-center w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-600 min-h-[38px] cursor-default select-none">
        {value || "—"}
      </div>
    </div>
  );
}

// ─── Props ────────────────────────────────────────────────────────────────────

interface Props {
  patient: Patient;
  companionData: CompanionData;
  onCompanionChange: (field: keyof CompanionData, value: string) => void;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function PatientReadonlyStep({
  patient,
  companionData,
  onCompanionChange,
}: Props) {
  const dob = patient.date_of_birth
    ? (() => {
        const [y, m, d] = patient.date_of_birth
          .slice(0, 10)
          .split("-")
          .map(Number);
        return new Date(y, m - 1, d).toLocaleDateString("es-ES", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        });
      })()
    : "—";

  const maritalLabel =
    MARITAL_STATUS_LABELS[patient.marital_status ?? ""] ??
    patient.marital_status ??
    "—";

  const iconSm = "h-3.5 w-3.5";

  return (
    <div className="space-y-5">
      {/* ── Datos del paciente (solo lectura) ────────────────────── */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <span className="h-4 w-0.5 bg-emerald-500 rounded-full" />
          <p className="text-xs font-bold uppercase tracking-widest text-gray-500">
            Datos del paciente
          </p>
          <span className="ml-auto text-[10px] text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full font-medium">
            Solo lectura
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {/* Nombre y apellido — fila completa */}
          <ReadonlyField label="Nombre(s)" value={patient.first_name ?? "—"} />
          <ReadonlyField label="Apellido(s)" value={patient.last_name ?? "—"} />

          {/* Documento */}
          <ReadonlyField
            label="N° Documento"
            value={`${patient.document_type ?? ""} ${patient.cedula ?? ""}`.trim()}
          />
          <ReadonlyField label="Fecha de nacimiento" value={dob} />

          {/* Sexo y estado civil */}
          <ReadonlyField
            label="Sexo biológico"
            value={patient.biological_sex ?? "—"}
          />
          <ReadonlyField label="Estado civil" value={maritalLabel} />

          {/* Teléfonos */}
          <ReadonlyField label="Celular" value={patient.cellphone ?? "—"} />
          <ReadonlyField label="Teléfono fijo" value={patient.phone ?? "—"} />

          {/* Admin */}
          <ReadonlyField label="EPS" value={patient.eps ?? "—"} />
          <ReadonlyField label="Ocupación" value={patient.occupation ?? "—"} />

          {/* Dirección — ancho completo */}
          <ReadonlyField
            label="Dirección"
            value={patient.address ?? "—"}
            colSpan={2}
          />
        </div>
      </div>

      {/* ── Datos del acompañante (editable) ─────────────────────── */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <span className="h-4 w-0.5 bg-emerald-500 rounded-full" />
          <p className="text-xs font-bold uppercase tracking-widest text-gray-500">
            Datos del acompañante
          </p>
        </div>

        <CompanionFields
          data={companionData}
          onChange={onCompanionChange}
          variant="modal"
        />
      </div>
    </div>
  );
}
