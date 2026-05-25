"use client";

import { useRouter } from "next/navigation";
import {
  DocumentCheckIcon,
  DocumentIcon,
  DocumentMinusIcon,
  ArrowRightIcon,
  UserIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/outline";
import PaginationBar from "@/components/PaginationBar";
import { usePagination } from "@/utils/usePagination";
import { usePatientProfile } from "../hooks/usePatientProfile";

interface Props {
  patientId: number;
}

// ─── Config ───────────────────────────────────────────────────────────────────

const STATUS_CONFIG = {
  CONFIRMADO: {
    label: "Confirmado",
    icon: DocumentCheckIcon,
    dot: "bg-emerald-500",
    badge: "bg-emerald-50 text-emerald-700 border border-emerald-100",
    accent: "border-l-emerald-500",
    iconColor: "text-emerald-600",
    iconBg: "bg-emerald-50",
  },
  EN_ESPERA: {
    label: "En espera",
    icon: DocumentIcon,
    dot: "bg-amber-400",
    badge: "bg-amber-50 text-amber-700 border border-amber-100",
    accent: "border-l-amber-400",
    iconColor: "text-amber-500",
    iconBg: "bg-amber-50",
  },
  CANCELADO: {
    label: "Cancelado",
    icon: DocumentMinusIcon,
    dot: "bg-red-400",
    badge: "bg-red-50 text-red-600 border border-red-100",
    accent: "border-l-red-400",
    iconColor: "text-red-500",
    iconBg: "bg-red-50",
  },
};

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return {
    day: date.toLocaleDateString("es-ES", { day: "2-digit" }),
    month: date
      .toLocaleDateString("es-ES", { month: "short" })
      .replace(".", "")
      .toUpperCase(),
    year: date.toLocaleDateString("es-ES", { year: "numeric" }),
  };
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function PatientRecordsList({ patientId }: Props) {
  const router = useRouter();
  const { evaluations, isLoading } = usePatientProfile(patientId);

  const {
    currentPage,
    totalPages,
    paginatedItems: paginatedRecords,
    goToNext,
    goToPrev,
    isFirstPage,
    isLastPage,
  } = usePagination(evaluations, 10);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-40 rounded-2xl bg-gray-100 animate-pulse" />
        ))}
      </div>
    );
  }

  if (evaluations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-14 h-14 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center mb-4">
          <DocumentIcon className="w-6 h-6 text-gray-300" />
        </div>
        <p className="text-sm font-medium text-gray-400">
          Sin registros clínicos
        </p>
        <p className="text-xs text-gray-300 mt-1">
          Este paciente no tiene registros aún.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl">
        {paginatedRecords.map((record) => {
          const cfg = STATUS_CONFIG[record.status];
          const Icon = cfg.icon;
          const { day, month, year } = formatDate(
            record.procedure_date ?? new Date().toISOString(),
          );

          return (
            <div
              key={record.id}
              className={`group relative bg-white rounded-2xl border border-gray-100 border-l-4 ${cfg.accent} shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden`}
            >
              <div className="flex items-start justify-between px-5 pt-5 pb-3">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center ${cfg.iconBg}`}
                >
                  <Icon
                    className={`w-4.5 h-4.5 ${cfg.iconColor}`}
                    strokeWidth={1.8}
                  />
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 justify-end text-gray-400 mb-0.5">
                    <CalendarDaysIcon className="w-3 h-3" />
                    <span className="text-[10px] uppercase tracking-wider">
                      {month} {year}
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-gray-800 leading-none">
                    {day}
                  </p>
                </div>
              </div>

              <div className="mx-5 border-t border-gray-50" />

              <div className="px-5 py-3">
                <p className="text-xs font-bold uppercase tracking-wider text-gray-900 mb-1">
                  Registro clínico
                </p>
                <div className="flex items-center gap-1.5">
                  <UserIcon className="w-3 h-3 text-gray-400 shrink-0" />
                  <p className="text-xs text-gray-500 truncate">
                    {record.referrer_name}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-2 px-5 pb-4">
                <span
                  className={`inline-flex items-center gap-1.5 text-[10px] font-semibold px-2.5 py-1 rounded-full w-fit ${cfg.badge}`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                  {cfg.label}
                </span>
                <button
                  onClick={() =>
                    router.push(`/patients/${patientId}/records/${record.id}`)
                  }
                  className="flex items-center justify-center gap-1.5 w-full py-2 rounded-xl bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 transition-colors duration-200"
                >
                  Ver detalles
                  <ArrowRightIcon className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <PaginationBar
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={evaluations.length}
        itemsPerPage={10}
        onNext={goToNext}
        onPrev={goToPrev}
        isFirstPage={isFirstPage}
        isLastPage={isLastPage}
      />
    </div>
  );
}
