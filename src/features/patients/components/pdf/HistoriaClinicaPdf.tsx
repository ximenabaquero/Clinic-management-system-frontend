import { forwardRef } from "react";
import type { ClinicalFindings, FullRecord } from "../../types";
import {
  MARITAL_STATUS_LABELS,
  LAB_LABELS,
  FINDING_LABELS,
} from "../../services/constants";
import { formatDateTime, formatCOP, fullName } from "../../services/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

type Props = {
  record: FullRecord;
  evaluationId: number;
  currentYear: number;
};

// ─── Style tokens ─────────────────────────────────────────────────────────────

const s = {
  label: {
    fontSize: "9px",
    fontWeight: 700,
    color: "#6b7280",
    textTransform: "uppercase" as const,
    letterSpacing: "0.08em",
    marginBottom: "3px",
  },
  value: {
    fontSize: "12px",
    fontWeight: 600,
    color: "#111827",
  },
  sectionTitle: {
    fontSize: "10px",
    fontWeight: 700,
    color: "#374151",
    textTransform: "uppercase" as const,
    letterSpacing: "0.08em",
    marginBottom: "8px",
    borderBottom: "1px solid #e5e7eb",
    paddingBottom: "4px",
  },
  categoryTitle: {
    fontSize: "9px",
    fontWeight: 700,
    color: "#374151",
    textTransform: "uppercase" as const,
    letterSpacing: "0.07em",
    marginBottom: "8px",
  },
} satisfies Record<string, React.CSSProperties>;

// ─── Helpers ──────────────────────────────────────────────────────────────────

type FindingKey = keyof ClinicalFindings;

const CATEGORIES: { title: string; fields: FindingKey[] }[] = [
  {
    title: "Metabólicos y cardiovasculares",
    fields: [
      "diabetes",
      "cardiac",
      "varicose_veins",
      "thrombosis",
      "fluid_retention",
      "surgeries",
      "hepatitis",
      "kidney_issues",
      "thyroid_issues",
    ],
  },
  {
    title: "Digestivos",
    fields: [
      "constipation",
      "gastritis",
      "irritable_bowel",
      "reflux",
      "intestinal_habit",
    ],
  },
  {
    title: "Condiciones de piel",
    fields: [
      "lupus_notes",
      "allergy_notes",
      "keloid_notes",
      "vitiligo_notes",
      "dermatitis_notes",
      "other_skin_notes",
    ],
  },
  {
    title: "Hábitos y salud mental",
    fields: ["smokes", "anxiety", "alcohol", "depression", "sleep_hours"],
  },
  {
    title: "Ginecológico y medicación",
    fields: ["last_period", "birth_control", "num_children", "medications"],
  },
];

function displayFindingValue(val: unknown): string {
  if (val === undefined || val === null) return "—";
  if (typeof val === "boolean") return val ? "Sí" : "—";
  return String(val);
}

function categoryHasData(
  fields: FindingKey[],
  findings: FullRecord["clinical_findings"],
): boolean {
  return fields.some((f) => {
    const v = findings[f];
    return v !== undefined && v !== null && v !== false && v !== "";
  });
}

function FieldRow({
  label,
  value,
  active,
}: {
  label: string;
  value: string;
  active: boolean;
}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "baseline",
        marginBottom: "4px",
      }}
    >
      <span
        style={{
          fontSize: "10px",
          color: active ? "#374151" : "#9ca3af",
          flex: 1,
          paddingRight: "8px",
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontSize: "10px",
          fontWeight: active ? 700 : 400,
          color: active ? "#b45309" : "#9ca3af",
          whiteSpace: "nowrap",
        }}
      >
        {value}
      </span>
    </div>
  );
}

function CategoryBox({
  title,
  fields,
  findings,
}: {
  title: string;
  fields: FindingKey[];
  findings: FullRecord["clinical_findings"];
}) {
  const activeFields = fields.filter((field) => {
    const raw = findings[field];
    return raw !== undefined && raw !== null && raw !== false && raw !== "";
  });
  const hasData = activeFields.length > 0;

  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #e5e7eb",
        borderLeft: hasData ? "3px solid #d97706" : "3px solid #e5e7eb",
        borderRadius: "6px",
        padding: "10px 12px",
        breakInside: "avoid",
      }}
    >
      <p style={s.categoryTitle}>{title}</p>
      {hasData ? (
        activeFields.map((field) => {
          const raw = findings[field];
          const val = typeof raw === "boolean" ? "Sí" : String(raw);
          return (
            <FieldRow
              key={field}
              label={FINDING_LABELS[field] ?? String(field)}
              value={val}
              active
            />
          );
        })
      ) : (
        <p style={{ fontSize: "10px", color: "#9ca3af", fontStyle: "italic" }}>
          Ninguna
        </p>
      )}
    </div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

const HistoriaClinicaPdf = forwardRef<HTMLDivElement, Props>(
  ({ record, evaluationId, currentYear }, ref) => {
    const {
      evaluation,
      snapshot,
      procedures,
      clinical_findings,
      lab_results,
      confirmed_by,
    } = record;

    const firstProcedureDate = procedures[0]?.created_at;
    const labEntries = Object.entries(lab_results) as [
      keyof typeof lab_results,
      unknown,
    ][];
    const hasLabData = labEntries.length > 0;

    return (
      <div className="fixed -left-[9999px] top-0" aria-hidden="true">
        <div
          ref={ref}
          style={{
            width: "794px",
            background: "#fff",
            fontFamily: "sans-serif",
            color: "#111827",
          }}
        >
          {/* Barra teal superior */}
          <div style={{ height: "4px", background: "#0d9488" }} />

          <div style={{ padding: "36px 48px 48px" }}>
            {/* ── Encabezado ─────────────────────────────────────────────── */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: "24px",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "12px" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/coldestheticlogo.png"
                  alt="Coldesthetic"
                  style={{
                    width: "44px",
                    height: "44px",
                    objectFit: "contain",
                  }}
                />
                <div>
                  <p
                    style={{
                      fontSize: "20px",
                      fontWeight: 800,
                      color: "#111827",
                      marginBottom: "2px",
                    }}
                  >
                    Cold Esthetic
                  </p>
                  <p
                    style={{
                      fontSize: "9px",
                      color: "#9ca3af",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                    }}
                  >
                    Historia Clínica — Documento confidencial
                  </p>
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <p
                  style={{
                    fontSize: "9px",
                    color: "#9ca3af",
                    textTransform: "uppercase",
                    marginBottom: "2px",
                  }}
                >
                  Registro N°
                </p>
                <p
                  style={{
                    fontSize: "16px",
                    fontWeight: 700,
                    color: "#111827",
                  }}
                >
                  #{String(evaluationId).padStart(5, "0")}
                </p>
                <p
                  style={{
                    fontSize: "11px",
                    color: "#6b7280",
                    marginTop: "4px",
                  }}
                >
                  {formatDateTime(firstProcedureDate)}
                </p>
              </div>
            </div>

            <div
              style={{ borderTop: "2px solid #111827", marginBottom: "20px" }}
            />

            {/* ── Datos personales + Acompañante (2 columnas) ────────────── */}
            <div style={{ display: "flex", gap: "24px", marginBottom: "20px" }}>
              {/* Columna izquierda — Datos de la paciente */}
              <div style={{ flex: "0 0 58%" }}>
                <p style={s.sectionTitle}>Datos de la paciente</p>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "10px 16px",
                  }}
                >
                  {[
                    {
                      label: "Nombre completo",
                      value: `${snapshot.first_name} ${snapshot.last_name}`,
                    },
                    {
                      label: "Documento",
                      value: `${snapshot.document_type} ${snapshot.cedula}`,
                    },
                    {
                      label: "Fecha de nacimiento",
                      value: new Date(
                        snapshot.date_of_birth,
                      ).toLocaleDateString("es-CO", { timeZone: "UTC" }),
                    },
                    {
                      label: "Edad al momento",
                      value: `${evaluation.patient_age_at_evaluation} años`,
                    },
                    { label: "Sexo biológico", value: snapshot.biological_sex },
                    {
                      label: "Estado civil",
                      value:
                        MARITAL_STATUS_LABELS[snapshot.marital_status] ??
                        snapshot.marital_status,
                    },
                    { label: "EPS", value: snapshot.eps },
                    { label: "Ocupación", value: snapshot.occupation },
                    { label: "Celular", value: snapshot.cellphone },
                    { label: "Teléfono fijo", value: snapshot.phone ?? "—" },
                  ].map(({ label, value }) => (
                    <div key={label}>
                      <p style={s.label}>{label}</p>
                      <p style={s.value}>{value}</p>
                    </div>
                  ))}
                </div>
                {/* Dirección — fila completa */}
                <div style={{ marginTop: "10px" }}>
                  <p style={s.label}>Dirección</p>
                  <p style={s.value}>{snapshot.address}</p>
                </div>
              </div>

              {/* Columna derecha — Acompañante + Remitente */}
              <div style={{ flex: 1 }}>
                <p style={s.sectionTitle}>Datos del acompañante</p>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    marginBottom: "20px",
                  }}
                >
                  {[
                    {
                      label: "Nombre completo",
                      value: snapshot.companion_name,
                    },
                    {
                      label: "Parentesco",
                      value: snapshot.companion_relationship,
                    },
                    { label: "Celular", value: snapshot.companion_cellphone },
                  ].map(({ label, value }) => (
                    <div key={label}>
                      <p style={s.label}>{label}</p>
                      <p style={s.value}>{value ?? "—"}</p>
                    </div>
                  ))}
                </div>
                <p style={s.sectionTitle}>Remitente</p>
                <p style={s.value}>{evaluation.referrer_name ?? "—"}</p>
              </div>
            </div>

            {/* ── Evaluación clínica (2 columnas) ──────────────────────────── */}
            <div style={{ display: "flex", gap: "24px", marginBottom: "20px" }}>
              {/* Vitales */}
              <div
                style={{
                  flex: "0 0 35%",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  padding: "14px",
                  background: "#f9fafb",
                }}
              >
                <p style={s.sectionTitle}>Datos biométricos</p>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "12px",
                  }}
                >
                  {[
                    { label: "Peso", value: `${evaluation.weight} kg` },
                    { label: "Estatura", value: `${evaluation.height} m` },
                    { label: "IMC", value: String(evaluation.bmi) },
                    { label: "Estado IMC", value: evaluation.bmi_status },
                  ].map(({ label, value }) => (
                    <div key={label}>
                      <p style={s.label}>{label}</p>
                      <p style={s.value}>{value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Antecedentes médicos */}
              <div style={{ flex: 1 }}>
                <p style={s.sectionTitle}>Antecedentes médicos</p>
                <div
                  style={{
                    border: "1px solid #e5e7eb",
                    borderRadius: "6px",
                    padding: "12px",
                    fontSize: "12px",
                    color: "#374151",
                    lineHeight: 1.6,
                    minHeight: "80px",
                  }}
                >
                  {evaluation.medical_background || "—"}
                </div>
              </div>
            </div>

            {/* ── Alteraciones clínicas (6 categorías en 2 columnas) ────────── */}
            <div style={{ marginBottom: "20px" }}>
              <p style={s.sectionTitle}>Alteraciones clínicas</p>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "10px",
                }}
              >
                {CATEGORIES.map((cat) => (
                  <CategoryBox
                    key={cat.title}
                    title={cat.title}
                    fields={cat.fields}
                    findings={clinical_findings}
                  />
                ))}

                {/* 6ª categoría — Resultados de laboratorio */}
                <div
                  style={{
                    background: "#fff",
                    border: "1px solid #e5e7eb",
                    borderLeft: hasLabData
                      ? "3px solid #d97706"
                      : "3px solid #e5e7eb",
                    borderRadius: "6px",
                    padding: "10px 12px",
                  }}
                >
                  <p style={s.categoryTitle}>Resultados de laboratorio</p>
                  {(() => {
                    const activeLabEntries = labEntries.filter(
                      ([, val]) =>
                        val !== false && val !== null && val !== undefined,
                    );
                    return activeLabEntries.length > 0 ? (
                      activeLabEntries.map(([key, val]) => (
                        <FieldRow
                          key={key}
                          label={LAB_LABELS[key] ?? String(key)}
                          value={typeof val === "boolean" ? "Sí" : String(val)}
                          active
                        />
                      ))
                    ) : (
                      <p
                        style={{
                          fontSize: "10px",
                          color: "#9ca3af",
                          fontStyle: "italic",
                        }}
                      >
                        Ninguna
                      </p>
                    );
                  })()}
                </div>
              </div>
            </div>

            {/* ── Procedimientos ────────────────────────────────────────────── */}
            {procedures.map((proc, idx) => (
              <div key={proc.id} style={{ marginBottom: "20px" }}>
                <p style={s.sectionTitle}>
                  Procedimiento{procedures.length > 1 ? ` ${idx + 1}` : ""}
                </p>
                <p
                  style={{
                    fontSize: "11px",
                    color: "#6b7280",
                    marginBottom: "8px",
                  }}
                >
                  Fecha: {formatDateTime(proc.created_at)}
                </p>

                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    fontSize: "12px",
                    marginBottom: "10px",
                  }}
                >
                  <thead>
                    <tr style={{ background: "#f0fdfa" }}>
                      <th
                        style={{
                          textAlign: "left",
                          padding: "8px 12px",
                          fontSize: "9px",
                          textTransform: "uppercase",
                          color: "#0d9488",
                          fontWeight: 700,
                        }}
                      >
                        Procedimiento
                      </th>
                      <th
                        style={{
                          textAlign: "right",
                          padding: "8px 12px",
                          fontSize: "9px",
                          textTransform: "uppercase",
                          color: "#0d9488",
                          fontWeight: 700,
                        }}
                      >
                        Precio
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {proc.items.map((item, i) => (
                      <tr
                        key={item.id}
                        style={{
                          background: i % 2 === 0 ? "#fff" : "#f9fafb",
                          borderBottom: "1px solid #e5e7eb",
                        }}
                      >
                        <td style={{ padding: "8px 12px", color: "#374151" }}>
                          {item.item_name}
                        </td>
                        <td
                          style={{
                            padding: "8px 12px",
                            textAlign: "right",
                            fontWeight: 600,
                            color: "#111827",
                          }}
                        >
                          {formatCOP(item.price)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginBottom: "10px",
                  }}
                >
                  <div
                    style={{
                      borderTop: "2px solid #374151",
                      paddingTop: "6px",
                      textAlign: "right",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "9px",
                        color: "#6b7280",
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        marginBottom: "2px",
                      }}
                    >
                      Total sesión
                    </p>
                    <p
                      style={{
                        fontSize: "18px",
                        fontWeight: 800,
                        color: "#111827",
                      }}
                    >
                      {formatCOP(proc.total_amount)}
                    </p>
                  </div>
                </div>

                {proc.notes && (
                  <div>
                    <p style={s.label}>Notas clínicas</p>
                    <div
                      style={{
                        border: "1px solid #e5e7eb",
                        borderRadius: "6px",
                        padding: "10px",
                        fontSize: "12px",
                        color: "#374151",
                        fontStyle: "italic",
                        lineHeight: 1.6,
                      }}
                    >
                      {proc.notes}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* ── Firma ──────────────────────────────────────────────────────── */}
            {evaluation.patient_signature && (
              <div style={{ marginBottom: "24px" }}>
                <div
                  style={{
                    borderTop: "1px solid #d1d5db",
                    marginBottom: "16px",
                  }}
                />
                <p style={s.sectionTitle}>Firma de la paciente</p>
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-end",
                    gap: "20px",
                  }}
                >
                  <div
                    style={{
                      border: "1px solid #d1d5db",
                      borderRadius: "6px",
                      padding: "6px",
                      background: "#f9fafb",
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={evaluation.patient_signature}
                      alt="Firma"
                      style={{ height: "72px", objectFit: "contain" }}
                    />
                  </div>
                  <div style={{ fontSize: "10px", color: "#6b7280" }}>
                    {evaluation.confirmed_at && (
                      <p>
                        Confirmado por {fullName(confirmed_by) ?? "el sistema"}{" "}
                        el {formatDateTime(evaluation.confirmed_at)}
                      </p>
                    )}
                    <p style={{ fontStyle: "italic", marginTop: "4px" }}>
                      La paciente confirma haber leído y aceptado el registro
                      clínico.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* ── Pie ──────────────────────────────────────────────────────── */}
            <div
              style={{
                borderTop: "1px solid #d1d5db",
                paddingTop: "10px",
                textAlign: "center",
                fontSize: "9px",
                color: "#9ca3af",
              }}
            >
              Coldesthetic © {currentYear} | Sistema de Gestión Clínica |
              Documento de Carácter Confidencial
            </div>
          </div>
        </div>
      </div>
    );
  },
);

HistoriaClinicaPdf.displayName = "HistoriaClinicaPdf";
export default HistoriaClinicaPdf;
