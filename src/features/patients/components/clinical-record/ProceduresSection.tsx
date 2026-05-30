import { PencilSquareIcon } from "@heroicons/react/24/solid";

import type { Procedure, FullRecord } from "../../types";
import { formatCOP, formatDateTime, fullName } from "../../services/utils";
import { SectionHeader } from "./ui";

// ─── ProcedureCard ────────────────────────────────────────────────────────────

function ProcedureCard({
  proc,
  isConfirmed,
  onEdit,
  evaluation,
  confirmedBy,
  showEditButton,
}: {
  proc: Procedure;
  isConfirmed: boolean;
  onEdit: () => void;
  evaluation: any;
  confirmedBy: any;
  showEditButton: boolean; // solo false cuando el header ya tiene el botón (1 procedimiento)
}) {
  return (
    <div className="space-y-4 mb-8">
      {/* Botón por procedimiento: solo visible si hay más de uno */}
      {!isConfirmed && showEditButton && (
        <div className="flex justify-end print:hidden">
          <button
            onClick={onEdit}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition"
          >
            <PencilSquareIcon className="h-3.5 w-3.5" />
            Editar procedimiento
          </button>
        </div>
      )}

      <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
        <thead className="bg-gray-50">
          <tr>
            <th className="text-[10px] uppercase font-bold text-gray-500 tracking-wide text-left py-3 px-3">
              Procedimiento
            </th>
            <th className="text-[10px] uppercase font-bold text-gray-500 tracking-wide text-right py-3 px-3">
              Precio unitario
            </th>
          </tr>
        </thead>
        <tbody>
          {proc.items.map((item) => (
            <tr key={item.id} className="border-t border-gray-100">
              <td className="py-2 px-3 text-gray-700">{item.item_name}</td>
              <td className="py-2 px-3 text-right font-medium text-gray-800">
                {formatCOP(item.price)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {proc.notes && (
        <>
          <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wide">
            Notas clínicas del procedimiento
          </p>
          <div className="bg-white border border-gray-200 rounded-xl p-4 text-sm italic text-gray-600 whitespace-pre-wrap">
            {proc.notes}
          </div>
        </>
      )}

      <div className="border-t border-gray-100 mt-1 mb-6" />

      <div className="flex flex-col md:flex-row justify-between items-start gap-6 w-full mt-8">
        {evaluation.patient_signature ? (
          <div className="text-left max-w-xl">
            <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wide mb-2">
              Firma de la paciente
            </p>
            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4">
              <div className="border border-gray-200 rounded-xl overflow-hidden bg-gray-50 p-2 inline-block">
                <img
                  src={evaluation.patient_signature}
                  alt="Firma de la paciente"
                  className="h-20 object-contain"
                />
              </div>
              <div className="text-[11px] text-gray-500 space-y-0.5 leading-tight">
                {evaluation.confirmed_at && (
                  <p>
                    Confirmado por{" "}
                    <span className="font-medium">
                      {fullName(confirmedBy) ?? "el sistema"}
                    </span>{" "}
                    el {formatDateTime(evaluation.confirmed_at)}
                  </p>
                )}
                <p className="text-gray-400 italic">
                  La paciente confirma haber leído y aceptado el registro
                  clínico.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div />
        )}

        <div className="text-right shrink-0 mt-0.5">
          <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-1">
            Valor clínico total
          </p>
          <p className="text-4xl font-extrabold text-green-500 leading-none">
            {formatCOP(proc.total_amount)}
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Types ────────────────────────────────────────────────────────────────────

type Props = {
  procedures: Procedure[];
  isConfirmed: boolean;
  onEditProc: (proc: Procedure) => void;
  evaluation: any;
  confirmedBy: any;
};

// ─── Component ────────────────────────────────────────────────────────────────

export function ProceduresSection({
  procedures,
  isConfirmed,
  onEditProc,
  evaluation,
  confirmedBy,
}: Props) {
  const isSingle = procedures.length === 1;

  return (
    <section>
      <SectionHeader
        color="emerald"
        title="Procedimientos y precios"
        action={
          !isConfirmed && isSingle ? (
            <button
              onClick={() => onEditProc(procedures[0])}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition print:hidden"
            >
              <PencilSquareIcon className="h-3.5 w-3.5" />
              Editar procedimiento
            </button>
          ) : undefined
        }
      />

      {procedures.map((proc) => (
        <ProcedureCard
          key={proc.id}
          proc={proc}
          isConfirmed={isConfirmed}
          onEdit={() => onEditProc(proc)}
          evaluation={evaluation}
          confirmedBy={confirmedBy}
          showEditButton={!isSingle} // si hay varios, cada card muestra su propio botón
        />
      ))}
    </section>
  );
}
