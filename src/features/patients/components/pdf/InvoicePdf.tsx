import { forwardRef } from "react";
import type { FullRecord } from "../../types";
import { formatDateTime, formatCOP } from "../../services/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

type Props = {
  record: FullRecord;
  evaluationId: number;
  currentYear: number;
};

// ─── Component ────────────────────────────────────────────────────────────────

const InvoicePdf = forwardRef<HTMLDivElement, Props>(
  ({ record, evaluationId, currentYear }, ref) => {
    const { evaluation, snapshot, procedures } = record;

    const firstProcedureDate = procedures[0]?.created_at;

    const grandTotal = procedures
      .reduce((sum, proc) => sum + Number(proc.total_amount), 0)
      .toLocaleString("es-CO");

    return (
      <div className="fixed -left-[9999px] top-0" aria-hidden="true">
        <div
          ref={ref}
          className="bg-white font-sans"
          style={{ width: "794px", padding: "48px" }}
        >
          {/* ── Encabezado ─────────────────────────────────────────────── */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: "32px",
            }}
          >
            <div>
              <p
                style={{
                  fontSize: "22px",
                  fontWeight: 800,
                  color: "#059669",
                  marginBottom: "2px",
                }}
              >
                Coldesthetic
              </p>
              <p
                style={{
                  fontSize: "10px",
                  color: "#9ca3af",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                Realiza tus sueños de una forma segura
              </p>
            </div>
            <div style={{ textAlign: "right" }}>
              <p
                style={{
                  fontSize: "10px",
                  color: "#9ca3af",
                  textTransform: "uppercase",
                  marginBottom: "2px",
                }}
              >
                Factura N°
              </p>
              <p
                style={{ fontSize: "18px", fontWeight: 700, color: "#1f2937" }}
              >
                #{String(evaluationId).padStart(5, "0")}
              </p>
              <p
                style={{ fontSize: "11px", color: "#6b7280", marginTop: "4px" }}
              >
                {formatDateTime(firstProcedureDate)}
              </p>
            </div>
          </div>

          <div
            style={{ borderTop: "1px solid #e5e7eb", marginBottom: "28px" }}
          />

          {/* ── Datos de la paciente (desde snapshot) ──────────────────── */}
          <div style={{ marginBottom: "28px" }}>
            <p
              style={{
                fontSize: "10px",
                fontWeight: 700,
                color: "#9ca3af",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                marginBottom: "10px",
              }}
            >
              Datos de la paciente
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: "16px",
                background: "#f9fafb",
                borderRadius: "10px",
                padding: "16px",
                fontSize: "12px",
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
                { label: "Remitente", value: evaluation.referrer_name ?? "—" },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p
                    style={{
                      color: "#9ca3af",
                      fontSize: "9px",
                      textTransform: "uppercase",
                      marginBottom: "3px",
                    }}
                  >
                    {label}
                  </p>
                  <p style={{ fontWeight: 600, color: "#1f2937" }}>{value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Tabla de procedimientos ─────────────────────────────────── */}
          <div style={{ marginBottom: "24px" }}>
            <p
              style={{
                fontSize: "10px",
                fontWeight: 700,
                color: "#9ca3af",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                marginBottom: "10px",
              }}
            >
              Procedimientos
            </p>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: "12px",
              }}
            >
              <thead>
                <tr style={{ background: "#f3f4f6" }}>
                  <th
                    style={{
                      textAlign: "left",
                      padding: "10px 12px",
                      color: "#6b7280",
                      fontSize: "10px",
                      textTransform: "uppercase",
                      fontWeight: 700,
                    }}
                  >
                    Descripción
                  </th>
                  <th
                    style={{
                      textAlign: "right",
                      padding: "10px 12px",
                      color: "#6b7280",
                      fontSize: "10px",
                      textTransform: "uppercase",
                      fontWeight: 700,
                    }}
                  >
                    Valor
                  </th>
                </tr>
              </thead>
              <tbody>
                {procedures.flatMap((proc) =>
                  proc.items.map((item) => (
                    <tr
                      key={item.id}
                      style={{ borderBottom: "1px solid #f3f4f6" }}
                    >
                      <td style={{ padding: "10px 12px", color: "#374151" }}>
                        {item.item_name}
                      </td>
                      <td
                        style={{
                          padding: "10px 12px",
                          textAlign: "right",
                          color: "#1f2937",
                          fontWeight: 600,
                        }}
                      >
                        {formatCOP(item.price)}
                      </td>
                    </tr>
                  )),
                )}
              </tbody>
            </table>
          </div>

          {/* ── Total ───────────────────────────────────────────────────── */}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginBottom: "36px",
            }}
          >
            <div
              style={{
                borderTop: "2px solid #e5e7eb",
                paddingTop: "12px",
                textAlign: "right",
              }}
            >
              <p
                style={{
                  fontSize: "10px",
                  color: "#9ca3af",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  marginBottom: "4px",
                }}
              >
                Total a pagar
              </p>
              <p
                style={{ fontSize: "32px", fontWeight: 800, color: "#059669" }}
              >
                ${grandTotal}
              </p>
            </div>
          </div>

          {/* ── Firma ────────────────────────────────────────────────────── */}
          {evaluation.patient_signature && (
            <div style={{ marginBottom: "24px" }}>
              <div
                style={{ borderTop: "1px solid #e5e7eb", marginBottom: "20px" }}
              />
              <p
                style={{
                  fontSize: "10px",
                  fontWeight: 700,
                  color: "#9ca3af",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  marginBottom: "10px",
                }}
              >
                Firma de la paciente
              </p>
              <div
                style={{ display: "flex", alignItems: "flex-end", gap: "20px" }}
              >
                <div
                  style={{
                    border: "1px solid #e5e7eb",
                    borderRadius: "10px",
                    padding: "8px",
                    background: "#f9fafb",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={evaluation.patient_signature}
                    alt="Firma"
                    style={{ height: "80px", objectFit: "contain" }}
                  />
                </div>
                <div style={{ fontSize: "10px", color: "#9ca3af" }}>
                  {evaluation.confirmed_at && (
                    <p>Firmado el {formatDateTime(evaluation.confirmed_at)}</p>
                  )}
                  <p style={{ fontStyle: "italic" }}>
                    La paciente acepta los procedimientos y valores descritos en
                    este documento.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ── Pie ──────────────────────────────────────────────────────── */}
          <div
            style={{
              borderTop: "1px solid #e5e7eb",
              paddingTop: "12px",
              textAlign: "center",
              fontSize: "9px",
              color: "#9ca3af",
            }}
          >
            Coldesthetic — Factura © {currentYear} | Documento confidencial
          </div>
        </div>
      </div>
    );
  },
);

InvoicePdf.displayName = "InvoicePdf";
export default InvoicePdf;
