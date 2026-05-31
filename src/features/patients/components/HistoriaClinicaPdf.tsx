import { forwardRef } from "react";
import type { FullRecord } from "../types";
import {
  MARITAL_STATUS_LABELS,
  LAB_LABELS,
  FINDING_LABELS,
} from "../services/constants";
import { formatDateTime, formatCOP, fullName } from "../services/utils";

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
    borderBottom: "1px solid #d1d5db",
    paddingBottom: "4px",
  },
} satisfies Record<string, React.CSSProperties>;

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

    const findingsEntries = Object.entries(clinical_findings) as [
      keyof typeof clinical_findings,
      unknown,
    ][];
    const labEntries = Object.entries(lab_results) as [
      keyof typeof lab_results,
      unknown,
    ][];

    return (
      <div className="fixed -left-[9999px] top-0" aria-hidden="true">
        <div
          ref={ref}
          style={{
            width: "794px",
            padding: "48px",
            background: "#fff",
            fontFamily: "sans-serif",
            color: "#111827",
          }}
        >
          {/* ── Encabezado ─────────────────────────────────────────────── */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: "28px",
            }}
          >
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
                style={{ fontSize: "16px", fontWeight: 700, color: "#111827" }}
              >
                #{String(evaluationId).padStart(5, "0")}
              </p>
              <p
                style={{ fontSize: "11px", color: "#6b7280", marginTop: "4px" }}
              >
                {formatDateTime(firstProcedureDate)}
              </p>
              <p
                style={{
                  fontSize: "10px",
                  fontWeight: 600,
                  color: "#374151",
                  marginTop: "4px",
                }}
              >
                Estado:{" "}
                {evaluation.status === "EN_ESPERA"
                  ? "En espera"
                  : evaluation.status === "CONFIRMADO"
                    ? "Confirmado"
                    : "Cancelado"}
              </p>
            </div>
          </div>

          <div
            style={{ borderTop: "2px solid #111827", marginBottom: "24px" }}
          />

          {/* ── Datos personales (desde snapshot) ──────────────────────── */}
          <div style={{ marginBottom: "24px" }}>
            <p style={s.sectionTitle}>Datos personales</p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: "12px",
              }}
            >
              {[
                {
                  label: "Nombre",
                  value: `${snapshot.first_name} ${snapshot.last_name}`,
                },
                {
                  label: "Documento",
                  value: `${snapshot.document_type} ${snapshot.cedula}`,
                },
                {
                  label: "Fecha de nacimiento",
                  value: new Date(
                    `${snapshot.date_of_birth}T00:00:00`,
                  ).toLocaleDateString("es-CO"),
                },
                {
                  label: "Edad al momento",
                  value: `${evaluation.patient_age_at_evaluation} años`,
                },
                { label: "Sexo biológico", value: snapshot.biological_sex },
                { label: "Celular", value: snapshot.cellphone },
                { label: "Teléfono fijo", value: snapshot.phone ?? "—" },
                { label: "Dirección", value: snapshot.address },
                {
                  label: "Estado civil",
                  value:
                    MARITAL_STATUS_LABELS[snapshot.marital_status] ??
                    snapshot.marital_status,
                },
                { label: "EPS", value: snapshot.eps },
                { label: "Ocupación", value: snapshot.occupation },
                { label: "Remitente", value: evaluation.referrer_name ?? "—" },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p style={s.label}>{label}</p>
                  <p style={s.value}>{value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Acompañante ─────────────────────────────────────────────── */}
          <div style={{ marginBottom: "24px" }}>
            <p style={s.sectionTitle}>Acompañante</p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: "12px",
              }}
            >
              {[
                { label: "Nombre", value: snapshot.companion_name },
                { label: "Parentesco", value: snapshot.companion_relationship },
                { label: "Celular", value: snapshot.companion_cellphone },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p style={s.label}>{label}</p>
                  <p style={s.value}>{value ?? "—"}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Evaluación clínica ───────────────────────────────────────── */}
          <div style={{ marginBottom: "24px" }}>
            <p style={s.sectionTitle}>Evaluación clínica</p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr 1fr",
                gap: "12px",
                marginBottom: "12px",
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
            <div>
              <p style={s.label}>Antecedentes médicos</p>
              <div
                style={{
                  border: "1px solid #d1d5db",
                  borderRadius: "6px",
                  padding: "10px",
                  fontSize: "12px",
                  color: "#374151",
                  lineHeight: 1.6,
                }}
              >
                {evaluation.medical_background}
              </div>
            </div>
          </div>

          {/* ── Alteraciones clínicas ────────────────────────────────────── */}
          {findingsEntries.length > 0 && (
            <div style={{ marginBottom: "24px" }}>
              <p style={s.sectionTitle}>Alteraciones clínicas</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {findingsEntries.map(([key, val]) => {
                  const labelText = FINDING_LABELS[key] ?? key;
                  const display =
                    typeof val === "boolean"
                      ? labelText
                      : `${labelText}: ${val}`;
                  return (
                    <span
                      key={key}
                      style={{
                        display: "inline-block",
                        padding: "3px 10px",
                        borderRadius: "999px",
                        fontSize: "10px",
                        fontWeight: 600,
                        background: "#fffbeb",
                        color: "#b45309",
                        border: "1px solid #fde68a",
                      }}
                    >
                      {display}
                    </span>
                  );
                })}
              </div>
            </div>
          )}

          {/* ── Resultados de laboratorio ────────────────────────────────── */}
          {labEntries.length > 0 && (
            <div style={{ marginBottom: "24px" }}>
              <p style={s.sectionTitle}>Resultados de laboratorio</p>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  gap: "10px",
                }}
              >
                {labEntries.map(([key, val]) => (
                  <div
                    key={key}
                    style={{
                      border: "1px solid #f3f4f6",
                      borderRadius: "8px",
                      padding: "8px 12px",
                      background: "#f9fafb",
                    }}
                  >
                    <p style={s.label}>{LAB_LABELS[key] ?? key}</p>
                    <p style={s.value}>
                      {typeof val === "boolean"
                        ? val
                          ? "Sí"
                          : "No"
                        : String(val)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── Procedimientos ───────────────────────────────────────────── */}
          {procedures.map((proc, idx) => (
            <div key={proc.id} style={{ marginBottom: "24px" }}>
              <p style={s.sectionTitle}>
                Procedimiento {procedures.length > 1 ? idx + 1 : ""}
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
                  <tr style={{ background: "#f3f4f6" }}>
                    <th
                      style={{
                        textAlign: "left",
                        padding: "8px 10px",
                        fontSize: "9px",
                        textTransform: "uppercase",
                        color: "#6b7280",
                        fontWeight: 700,
                      }}
                    >
                      Procedimiento
                    </th>
                    <th
                      style={{
                        textAlign: "right",
                        padding: "8px 10px",
                        fontSize: "9px",
                        textTransform: "uppercase",
                        color: "#6b7280",
                        fontWeight: 700,
                      }}
                    >
                      Precio
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {proc.items.map((item) => (
                    <tr
                      key={item.id}
                      style={{ borderBottom: "1px solid #e5e7eb" }}
                    >
                      <td style={{ padding: "8px 10px", color: "#374151" }}>
                        {item.item_name}
                      </td>
                      <td
                        style={{
                          padding: "8px 10px",
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
                    borderTop: "1px solid #374151",
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
                    Total
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
                      border: "1px solid #d1d5db",
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

          {/* ── Firma ────────────────────────────────────────────────────── */}
          {evaluation.patient_signature && (
            <div style={{ marginBottom: "24px" }}>
              <div
                style={{ borderTop: "1px solid #d1d5db", marginBottom: "16px" }}
              />
              <p style={s.sectionTitle}>Firma de la paciente</p>
              <div
                style={{ display: "flex", alignItems: "flex-end", gap: "20px" }}
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
                      Confirmado por {fullName(confirmed_by) ?? "el sistema"} el{" "}
                      {formatDateTime(evaluation.confirmed_at)}
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
            Cold Esthetic — Historia Clínica © {currentYear} | Documento
            confidencial
          </div>
        </div>
      </div>
    );
  },
);

HistoriaClinicaPdf.displayName = "HistoriaClinicaPdf";
export default HistoriaClinicaPdf;
