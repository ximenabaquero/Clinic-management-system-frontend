import { forwardRef } from "react";
import Image from "next/image";
import { CheckBadgeIcon } from "@heroicons/react/24/solid";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import type { Procedure, EvaluationData } from "../types";

type Props = {
  evaluation: EvaluationData;
  currentYear: number;
  isConfirmed: boolean;
  status?: "EN_ESPERA" | "CONFIRMADO" | "CANCELADO";
  onEditEval: () => void;
  onEditProc: (proc: Procedure) => void;
  onRegisterSupplies?: () => void;
};

const ClinicalRecordView = forwardRef<HTMLDivElement, Props>(
  ({ evaluation, currentYear, isConfirmed, status = "EN_ESPERA", onEditEval, onEditProc, onRegisterSupplies }, ref) => {
    const { patient, procedures } = evaluation;

    const procedureDate = procedures?.[0]?.procedure_date ?? evaluation.created_at;
    const formattedDate = procedureDate
      ? (() => {
          const f = new Date(procedureDate).toLocaleString("es-ES", {
            dateStyle: "medium",
            timeStyle: "short",
          });
          return f.charAt(0).toUpperCase() + f.slice(1);
        })()
      : "";

    return (
      <div
        ref={ref}
        className="max-w-5xl mx-auto bg-white border border-gray-100 shadow-md rounded-2xl"
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start px-4 sm:px-8 py-6 bg-white rounded-t-2xl gap-4">
          <div>
            <div className="mt-2 flex items-center gap-2">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#BF2496] to-blue-500 p-[2px] shadow-sm">
                <div className="h-full w-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                  <Image
                    src="/coldestheticlogo.png"
                    alt="Coldesthetic"
                    width={32}
                    height={32}
                    className="h-full w-full object-contain"
                    priority
                  />
                </div>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-[#BF2496] to-blue-500 bg-clip-text text-transparent tracking-tight">
                {evaluation.user?.brand_name}
              </h1>
            </div>
            <p className="ml-12 text-[10px] uppercase tracking-wider text-gray-400">
              Realiza tus suenos de una forma segura
            </p>
          </div>
          <div className="mt-2 flex flex-wrap items-center justify-end gap-6 text-[13px] text-gray-700">
            <div className="flex flex-col items-start">
              <p className="text-[10px] uppercase tracking-wider text-gray-400 mb-1">Remitente</p>
              <div className="flex items-center gap-1">
                <CheckBadgeIcon className="w-4 h-4 text-[#BF2496]" />
                <span className="font-medium">{evaluation.referrer_name}</span>
              </div>
            </div>
            <span className="text-gray-300">|</span>
            <div className="flex flex-col items-start">
              <p className="text-[10px] uppercase tracking-wider text-gray-400 mb-1">Fecha</p>
              <p className="font-medium">{formattedDate}</p>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-100 mt-1 mb-3" />

        <div className="px-4 sm:px-8 py-6 space-y-10">

          {/* Datos personales */
          <section>
            <div className="flex items-center gap-2 mb-4">
              <span className="h-5 w-1 bg-[#BF2496] rounded-full" />
              <h3 className="text-lg font-semibold text-gray-800 tracking-tight">Datos personales</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 rounded-xl border border-gray-200 bg-white p-4 text-sm">
              {[
                { label: "Nombre completo", value: `${patient.first_name} ${patient.last_name}` },
                { label: "Cedula", value: patient.cedula },
                { label: "Fecha de nacimiento", value: new Date(patient.date_of_birth).toLocaleDateString("es-ES") },
                { label: "Edad", value: `${evaluation.patient_age_at_evaluation} años` },
                { label: "Sexo biológico", value: patient.biological_sex },
                { label: "Celular", value: patient.cellphone },
                ...(patient.address ? [{ label: "Dirección", value: patient.address }] : []),
                ...(patient.email ? [{ label: "Correo electrónico", value: patient.email }] : []),
                ...(patient.family_member_name ? [{ label: "Familiar", value: patient.family_member_name }] : []),
              ].map(({ label, value }) => (
                <div key={label}>
                  <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wide mb-1">{label}</p>
                  <p className="font-medium text-gray-800">{value}</p>
                </div>
              ))}
            </div>
          </section>
          }
          {/* Evaluación clínica */}
          <section>
            <div className="flex items-center justify-between gap-2 mb-4">
              <div className="flex items-center gap-2">
                <span className="h-5 w-1 bg-blue-500 rounded-full" />
                <h3 className="text-lg font-semibold text-gray-800 tracking-tight">Evaluación clínica</h3>
              </div>
              {!isConfirmed && (
                <button
                  onClick={onEditEval}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition print:hidden"
                >
                  <PencilSquareIcon className="h-3.5 w-3.5" />
                  Editar
                </button>
              )}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm mb-4">
              {evaluation.talla && (
                <div>
                  <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wide mb-1">Talla</p>
                  <p className="font-medium">{evaluation.talla}</p>
                  <div className="border-t border-gray-100 mt-2" />
                </div>
              )}
              {evaluation.tipo_pie && (
                <div>
                  <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wide mb-1">Tipo de pie</p>
                  <span className="inline-block rounded-full bg-[#BF2496]/10 px-2 py-0.5 text-[11px] font-bold text-[#BF2496]">
                    {evaluation.tipo_pie}
                  </span>
                  <div className="border-t border-gray-100 mt-2" />
                </div>
              )}
            </div>

            {/* Antecedentes personales */}
            {(evaluation.antecedentes_patologicos || evaluation.antecedentes_quirurgicos || evaluation.antecedentes_farmacologicos || evaluation.antecedentes_alergicos || evaluation.antecedentes_toxicos || evaluation.antecedentes_gineco_obstetricos || evaluation.antecedentes_otros) && (
              <div className="mb-4">
                <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wide mb-2">Antecedentes personales</p>
                <div className="bg-gray-50 rounded-xl p-4 text-sm space-y-2">
                  {[
                    { label: "Patológicos", value: evaluation.antecedentes_patologicos },
                    { label: "Quirúrgicos", value: evaluation.antecedentes_quirurgicos },
                    { label: "Farmacológicos", value: evaluation.antecedentes_farmacologicos },
                    { label: "Alérgicos", value: evaluation.antecedentes_alergicos },
                    { label: "Tóxicos", value: evaluation.antecedentes_toxicos },
                    { label: "Gineco-obstétricos", value: evaluation.antecedentes_gineco_obstetricos },
                    { label: "Otros", value: evaluation.antecedentes_otros },
                  ].filter(({ value }) => value).map(({ label, value }) => (
                    <div key={label}>
                      <span className="font-semibold text-gray-600">{label}: </span>
                      <span className="text-gray-700">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Factores de riesgo */}
            <div className="mb-4">
              <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wide mb-2">Factores de riesgo</p>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: "Anticoagulado", value: evaluation.anticoagulado },
                  { label: "En Diálisis", value: evaluation.en_dialisis },
                  { label: "VIH/SIDA", value: evaluation.vih_sida },
                  { label: "En embarazo", value: evaluation.en_embarazo },
                  { label: "Trat. CA", value: evaluation.en_tratamiento_ca },
                  { label: "Otros", value: evaluation.otros_riesgo },
                ].map(({ label, value }) => (
                  <span
                    key={label}
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${
                      value ? "bg-red-100 text-red-700" : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {label}: {value ? "SI" : "NO"}
                  </span>
                ))}
              </div>
            </div>

            {/* Motivo de consulta */}
            {evaluation.motivo_consulta && (
              <div className="mb-4">
                <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wide mb-2">Motivo de consulta</p>
                <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-700">
                  {evaluation.motivo_consulta}
                </div>
              </div>
            )}

            {/* Examen físico */}
            <div className="mb-4">
              <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wide mb-2">Examen físico</p>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: "Onicomicosis", value: evaluation.onicomicosis },
                  { label: "Onicogrifosis", value: evaluation.onicogrifosis },
                  { label: "Onicocriptosis", value: evaluation.onicocriptosis },
                  { label: "Resequedad", value: evaluation.resequedad },
                  { label: "Exostosis", value: evaluation.exostosis },
                  { label: "Edemas", value: evaluation.edemas },
                  { label: "Hiperqueratosis", value: evaluation.hiperqueratosis },
                  { label: "Verruga", value: evaluation.verruga },
                ].map(({ label, value }) => (
                  <span
                    key={label}
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${
                      value ? "bg-amber-100 text-amber-700" : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {label}: {value ? "SI" : "NO"}
                  </span>
                ))}
              </div>
            </div>

            {/* Tratamiento indicado */}
            {evaluation.tratamiento_indicado && (
              <div className="mb-4">
                <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wide mb-2">Tratamiento indicado</p>
                <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-700">
                  {evaluation.tratamiento_indicado}
                </div>
              </div>
            )}

            {/* Seguimiento */}
            {evaluation.seguimiento && (
              <div>
                <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wide mb-2">Seguimiento</p>
                <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-700">
                  {evaluation.seguimiento}
                </div>
              </div>
            )}
          </section>

          {/* Procedimientos */}
          <section>
            <div className="flex items-center justify-between gap-2 mb-4">
              <div className="flex items-center gap-2">
                <span className="h-5 w-1 bg-[#BF2496] rounded-full" />
                <h3 className="text-lg font-semibold text-gray-800 tracking-tight">Procedimientos y precios</h3>
              </div>
              {onRegisterSupplies && status !== "CANCELADO" && (
                <button
                  onClick={onRegisterSupplies}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-[#BF2496]/10 text-[#BF2496] rounded-lg hover:bg-[#BF2496]/20 transition print:hidden"
                >
                  <span className="text-base">💉</span>
                  Registrar insumos
                </button>
              )}
            </div>
            {procedures.map((proc) => (
              <div key={proc.id} className="space-y-4 mb-8">
                <div className="flex justify-end print:hidden">
                  <button
                    onClick={() => onEditProc(proc)}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition"
                  >
                    <PencilSquareIcon className="h-3.5 w-3.5" />
                    Editar procedimiento
                  </button>
                </div>
                <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
                  <thead className="bg-gray-50 text-xs uppercase text-gray-500">
                    <tr>
                      <th className="text-[10px] uppercase font-bold text-gray-500 tracking-wide text-left py-3 px-3">Procedimiento</th>
                      <th className="text-[10px] uppercase font-bold text-gray-500 tracking-wide text-right py-3 px-3">Precio unitario</th>
                    </tr>
                  </thead>
                  <tbody>
                    {proc.items.map((item) => (
                      <tr key={item.id} className="border-t border-gray-100">
                        <td className="py-2 px-3 text-gray-700">{item.item_name}</td>
                        <td className="py-2 px-3 text-right font-medium text-gray-800">
                          ${Number(item.price).toLocaleString("es-CO")}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wide mb-1">Notas clínicas</p>
                <div className="bg-white border border-gray-200 rounded-xl p-4 text-sm italic text-gray-600">
                  {proc.notes}
                </div>
                <div className="text-right">
                  <div className="border-t border-gray-100 mt-1 mb-4" />
                  <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-1">Valor clínico total</p>
                  <p className="text-4xl font-extrabold text-green-500">
                    ${Number(proc.total_amount).toLocaleString("es-CO")}
                  </p>
                </div>
              </div>
            ))}
          </section>
        </div>

        {/* Firma existente */}
        {evaluation.patient_signature && (
          <div className="px-4 sm:px-8 pb-6">
            <div className="border-t border-gray-100 mb-6" />
            <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wide mb-3">Firma de la paciente</p>
            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4">
              <div className="border border-gray-200 rounded-xl overflow-hidden bg-gray-50 p-2 inline-block">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={evaluation.patient_signature} alt="Firma de la paciente" className="h-24 object-contain" />
              </div>
              <div className="text-xs text-gray-500 space-y-0.5">
                {evaluation.confirmed_at && (
                  <p>
                    Firmado el{" "}
                    {new Date(evaluation.confirmed_at).toLocaleString("es-CO", {
                      day: "2-digit", month: "long", year: "numeric",
                      hour: "2-digit", minute: "2-digit",
                    })}
                  </p>
                )}
                <p className="text-gray-400 italic">
                  La paciente confirma haber leído y aceptado el registro clínico.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="border-t border-gray-200 text-center text-[10px] text-gray-400 py-4">
          Coldesthetic - Historia Clinica (c) {currentYear} | Documento confidencial
        </div>
      </div>
    );
  },
);

ClinicalRecordView.displayName = "ClinicalRecordView";
export default ClinicalRecordView;
