import { forwardRef } from "react";
import Image from "next/image";
import { CheckBadgeIcon, PlusIcon } from "@heroicons/react/24/solid";

import type { FullRecord, Procedure } from "../../types";
import { formatDateTime, fullName } from "../../services/utils";
import { PersonalDataSection } from "./PersonalDataSection";
import { ClinicalEvaluationSection } from "./ClinicalEvaluationSection";
import { ProceduresSection } from "./ProceduresSection";

// ─── Types ────────────────────────────────────────────────────────────────────

type Props = {
  record: FullRecord;
  currentYear: number;
  onEditEval: () => void;
  onEditProc: (proc: Procedure) => void;
  onRegisterUsage?: () => void;
};

// ─── Component ────────────────────────────────────────────────────────────────

const ClinicalRecordView = forwardRef<HTMLDivElement, Props>(
  ({ record, currentYear, onEditEval, onEditProc, onRegisterUsage }, ref) => {
    const { evaluation, snapshot, clinical_findings, lab_results, procedures } =
      record;

    const isConfirmed = evaluation.status === "CONFIRMADO";
    const firstProcedureDate = procedures[0]?.created_at;

    return (
      <div
        ref={ref}
        className="max-w-5xl mx-auto bg-white border border-gray-100 shadow-md rounded-2xl overflow-hidden"
      >
        {/* ── Header ─────────────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start px-4 sm:px-8 py-6 bg-white gap-4">
          <div>
            <div className="mt-1 flex items-center gap-2">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br p-[2px] ">
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
              <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent tracking-tight">
                Cold Esthetic Reform
              </h1>
            </div>
            <p className="ml-12 text-[10px] uppercase tracking-wider text-gray-400">
              Realiza tus sueños de una forma segura
            </p>
          </div>

          <div className="mt-2 flex flex-wrap items-center justify-end gap-6 text-[13px] text-gray-700">
            <div className="flex flex-col items-start">
              <p className="text-[10px] uppercase tracking-wider text-gray-400 mb-1">
                Profesional
              </p>
              <div className="flex items-center gap-1">
                <CheckBadgeIcon className="w-4 h-4 text-emerald-500" />
                <span className="font-medium">{evaluation.referrer_name}</span>
              </div>
            </div>
            <span className="text-gray-300">|</span>
            <div className="flex flex-col items-start">
              <p className="text-[10px] uppercase tracking-wider text-gray-400 mb-1">
                Fecha de registro
              </p>
              <p className="font-medium">
                {formatDateTime(firstProcedureDate)}
              </p>
            </div>
          </div>
        </div>

        {/* ── Botón registrar consumo ─────────────────────────────────────────────── */}
        <div className="flex items-center justify-end px-4 sm:px-8 py-3 border-t border-gray-100">
          {onRegisterUsage && isConfirmed && (
            <button
              onClick={onRegisterUsage}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-teal-500 rounded-xl shadow-md shadow-indigo-200 hover:from-indigo-700 hover:to-teal-600 transition-all duration-200"
            >
              <PlusIcon className="w-4 h-4" />
              Registrar consumo
            </button>
          )}
        </div>

        {/* ── Sections ───────────────────────────────────────────────── */}
        <div className="px-4 sm:px-8 py-6 space-y-10">
          <PersonalDataSection snapshot={snapshot} evaluation={evaluation} />

          <ClinicalEvaluationSection
            evaluation={evaluation}
            clinicalFindings={clinical_findings}
            labResults={lab_results}
            isConfirmed={isConfirmed}
            onEdit={onEditEval}
          />

          <ProceduresSection
            procedures={procedures}
            isConfirmed={isConfirmed}
            onEditProc={onEditProc}
            evaluation={evaluation}
            confirmedBy={record.confirmed_by}
          />
        </div>

        {/* ── Footer ─────────────────────────────────────────────────── */}
        <div className="border-t border-gray-200 text-center text-[10px] text-gray-400 py-4">
          Coldesthetic © {currentYear} | Sistema de Gestión Clínica | Documento
          de Carácter Confidencial
        </div>
      </div>
    );
  },
);

ClinicalRecordView.displayName = "ClinicalRecordView";
export default ClinicalRecordView;
