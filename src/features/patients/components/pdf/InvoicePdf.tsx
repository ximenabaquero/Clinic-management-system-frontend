import { forwardRef } from "react";
import type { FullRecord } from "../../types";
import { formatDateTime, formatCOP } from "../../services/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

type Props = {
  record: FullRecord;
  evaluationId: number;
  currentYear: number;
};

// ─── Style tokens ─────────────────────────────────────────────────────────────

const s = {
  label: {
    color: "#9ca3af",
    fontSize: "9px",
    textTransform: "uppercase" as const,
    letterSpacing: "0.08em",
    marginBottom: "3px",
  },
  value: {
    fontWeight: 600,
    color: "#1f2937",
    fontSize: "12px",
  },
  sectionLabel: {
    fontSize: "10px",
    fontWeight: 700,
    color: "#9ca3af",
    textTransform: "uppercase" as const,
    letterSpacing: "0.08em",
    marginBottom: "10px",
  },
} satisfies Record<string, React.CSSProperties>;

// ─── Component ────────────────────────────────────────────────────────────────

const InvoicePdf = forwardRef<HTMLDivElement, Props>(
  ({ record, evaluationId, currentYear }, ref) => {
    const { evaluation, snapshot, procedures } = record;

    const firstProcedureDate = procedures[0]?.created_at;
    const grandTotal = procedures.reduce((sum, proc) => sum + Number(proc.total_amount), 0);
    const hasMultipleSessions = procedures.length > 1;

    return (
      <div className="fixed -left-[9999px] top-0" aria-hidden="true">
        <div
          ref={ref}
          style={{ width: "794px", background: "#fff", fontFamily: "sans-serif", color: "#111827" }}
        >
          {/* Barra verde superior */}
          <div style={{ height: "4px", background: "#059669" }} />

          <div style={{ padding: "36px 48px 48px" }}>

            {/* ── Encabezado (2 columnas) ───────────────────────────────────── */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "28px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/coldestheticlogo.png" alt="Coldesthetic" style={{ width: "44px", height: "44px", objectFit: "contain" }} />
                <div>
                  <p style={{ fontSize: "22px", fontWeight: 800, color: "#059669", marginBottom: "2px" }}>
                    Coldesthetic
                  </p>
                  <p style={{ fontSize: "10px", color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                    Realiza tus sueños de una forma segura
                  </p>
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <p style={{ fontSize: "9px", color: "#9ca3af", textTransform: "uppercase", marginBottom: "2px" }}>
                  Factura N°
                </p>
                <p style={{ fontSize: "18px", fontWeight: 700, color: "#1f2937" }}>
                  #{String(evaluationId).padStart(5, "0")}
                </p>
                <p style={{ fontSize: "11px", color: "#6b7280", marginTop: "4px" }}>
                  {formatDateTime(firstProcedureDate)}
                </p>
              </div>
            </div>

            <div style={{ borderTop: "1px solid #e5e7eb", marginBottom: "24px" }} />

            {/* ── Datos de la paciente ──────────────────────────────────────── */}
            <div style={{ marginBottom: "24px" }}>
              <p style={s.sectionLabel}>Datos de la paciente</p>
              <div style={{
                background: "#f9fafb",
                borderRadius: "10px",
                padding: "16px",
                border: "1px solid #e5e7eb",
              }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }}>
                  {[
                    { label: "Nombre completo", value: `${snapshot.first_name} ${snapshot.last_name}` },
                    { label: "Documento", value: `${snapshot.document_type} ${snapshot.cedula}` },
                    { label: "Celular", value: snapshot.cellphone },
                    { label: "Remitente", value: evaluation.referrer_name ?? "—" },
                    { label: "Dirección", value: snapshot.address },
                  ].map(({ label, value }) => (
                    <div key={label}>
                      <p style={s.label}>{label}</p>
                      <p style={s.value}>{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Tabla de procedimientos ───────────────────────────────────── */}
            <div style={{ marginBottom: "24px" }}>
              <p style={s.sectionLabel}>Procedimientos</p>

              {hasMultipleSessions ? (
                // Múltiples sesiones → agrupar por sesión
                procedures.map((proc, idx) => (
                  <div key={proc.id} style={{ marginBottom: "16px" }}>
                    <p style={{ fontSize: "10px", fontWeight: 600, color: "#6b7280", marginBottom: "6px" }}>
                      Sesión {idx + 1} — {formatDateTime(proc.created_at)}
                    </p>
                    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "12px", marginBottom: "6px" }}>
                      <thead>
                        <tr style={{ background: "#ecfdf5" }}>
                          <th style={{ textAlign: "left", padding: "8px 12px", color: "#059669", fontSize: "9px", textTransform: "uppercase", fontWeight: 700 }}>
                            Descripción
                          </th>
                          <th style={{ textAlign: "right", padding: "8px 12px", color: "#059669", fontSize: "9px", textTransform: "uppercase", fontWeight: 700 }}>
                            Valor
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {proc.items.map((item, i) => (
                          <tr key={item.id} style={{ background: i % 2 === 0 ? "#fff" : "#f9fafb", borderBottom: "1px solid #f3f4f6" }}>
                            <td style={{ padding: "8px 12px", color: "#374151" }}>{item.item_name}</td>
                            <td style={{ padding: "8px 12px", textAlign: "right", color: "#1f2937", fontWeight: 600 }}>
                              {formatCOP(item.price)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div style={{ display: "flex", justifyContent: "flex-end" }}>
                      <p style={{ fontSize: "11px", color: "#6b7280" }}>
                        Subtotal sesión: <strong style={{ color: "#1f2937" }}>{formatCOP(proc.total_amount)}</strong>
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                // Sesión única
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "12px" }}>
                  <thead>
                    <tr style={{ background: "#ecfdf5" }}>
                      <th style={{ textAlign: "left", padding: "10px 12px", color: "#059669", fontSize: "9px", textTransform: "uppercase", fontWeight: 700 }}>
                        Descripción
                      </th>
                      <th style={{ textAlign: "right", padding: "10px 12px", color: "#059669", fontSize: "9px", textTransform: "uppercase", fontWeight: 700 }}>
                        Valor
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {procedures.flatMap((proc) =>
                      proc.items.map((item, i) => (
                        <tr key={item.id} style={{ background: i % 2 === 0 ? "#fff" : "#f9fafb", borderBottom: "1px solid #f3f4f6" }}>
                          <td style={{ padding: "10px 12px", color: "#374151" }}>{item.item_name}</td>
                          <td style={{ padding: "10px 12px", textAlign: "right", color: "#1f2937", fontWeight: 600 }}>
                            {formatCOP(item.price)}
                          </td>
                        </tr>
                      )),
                    )}
                  </tbody>
                </table>
              )}
            </div>

            {/* ── Total (2 columnas: forma de pago | total) ─────────────────── */}
            <div style={{ display: "flex", gap: "20px", marginBottom: "36px", alignItems: "stretch" }}>
              {/* Forma de pago — espacio para anotar */}
              <div style={{
                flex: 1,
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                padding: "14px 16px",
              }}>
                <p style={s.sectionLabel}>Forma de pago</p>
                <div style={{ height: "40px", borderBottom: "1px solid #d1d5db", marginBottom: "8px" }} />
                <div style={{ height: "40px", borderBottom: "1px solid #d1d5db" }} />
              </div>

              {/* Total a pagar */}
              <div style={{
                flex: "0 0 42%",
                background: "#f0fdf4",
                border: "1px solid #bbf7d0",
                borderRadius: "8px",
                padding: "14px 16px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "flex-end",
              }}>
                <p style={{ fontSize: "10px", color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "6px" }}>
                  Total a pagar
                </p>
                <p style={{ fontSize: "34px", fontWeight: 800, color: "#059669", lineHeight: 1 }}>
                  {formatCOP(grandTotal)}
                </p>
              </div>
            </div>

            {/* ── Firma ──────────────────────────────────────────────────────── */}
            {evaluation.patient_signature && (
              <div style={{ marginBottom: "24px" }}>
                <div style={{ borderTop: "1px solid #e5e7eb", marginBottom: "20px" }} />
                <p style={s.sectionLabel}>Firma de la paciente</p>
                <div style={{ display: "flex", alignItems: "flex-end", gap: "20px" }}>
                  <div style={{ border: "1px solid #e5e7eb", borderRadius: "10px", padding: "8px", background: "#f9fafb" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={evaluation.patient_signature} alt="Firma" style={{ height: "80px", objectFit: "contain" }} />
                  </div>
                  <div style={{ fontSize: "10px", color: "#9ca3af" }}>
                    {evaluation.confirmed_at && (
                      <p>Firmado el {formatDateTime(evaluation.confirmed_at)}</p>
                    )}
                    <p style={{ fontStyle: "italic" }}>
                      La paciente acepta los procedimientos y valores descritos en este documento.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* ── Pie ──────────────────────────────────────────────────────── */}
            <div style={{ borderTop: "1px solid #e5e7eb", paddingTop: "12px", textAlign: "center", fontSize: "9px", color: "#9ca3af" }}>
              Coldesthetic © {currentYear} | Sistema de Gestión Clínica | Documento de Carácter Confidencial
            </div>
          </div>
        </div>
      </div>
    );
  },
);

InvoicePdf.displayName = "InvoicePdf";
export default InvoicePdf;
