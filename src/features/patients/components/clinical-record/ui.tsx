import {
  ClockIcon,
  UserCircleIcon,
  DocumentCheckIcon,
  DocumentIcon,
  DocumentMinusIcon,
} from "@heroicons/react/24/outline";

import type { FullRecord, ClinicalFindings, LabResults } from "../../types";
import { formatDateTime, fullName } from "../../services/utils";

// ─── SectionHeader ────────────────────────────────────────────────────────────

type SectionHeaderColor = "emerald" | "blue" | "violet";

const SECTION_HEADER_BAR: Record<SectionHeaderColor, string> = {
  emerald: "bg-emerald-500",
  blue: "bg-blue-500",
  violet: "bg-violet-500",
};

export function SectionHeader({
  color,
  title,
  action,
}: {
  color: SectionHeaderColor;
  title: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-2 mb-4">
      <div className="flex items-center gap-2">
        <span className={`h-5 w-1 ${SECTION_HEADER_BAR[color]} rounded-full`} />
        <h3 className="text-lg font-semibold text-gray-800 tracking-tight">
          {title}
        </h3>
      </div>
      {action}
    </div>
  );
}

// ─── DataGrid ─────────────────────────────────────────────────────────────────

export type DataGridItem = { label: string; value: React.ReactNode };

export function DataGrid({ items }: { items: DataGridItem[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 rounded-xl border border-gray-200 bg-white p-4 text-sm">
      {items.map(({ label, value }) => (
        <div key={label}>
          <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wide mb-1">
            {label}
          </p>
          <p className="font-medium text-gray-800">{value ?? "—"}</p>
        </div>
      ))}
    </div>
  );
}

// ─── ClinicalSubsectionCard ───────────────────────────────────────────────────

export type SubsectionColorKey =
  | "rose"
  | "amber"
  | "violet"
  | "indigo"
  | "pink"
  | "teal";

type SubsectionColorConfig = {
  border: string;
  headerBg: string;
  badgeBase: string;
  badgeActive: string;
  pill: string;
  pillText: string;
  dot: string;
  bar: string;
};

const SUBSECTION_COLORS: Record<SubsectionColorKey, SubsectionColorConfig> = {
  rose: {
    border: "border-rose-100",
    headerBg: "bg-rose-50/60",
    badgeBase: "bg-gray-100 text-gray-400",
    badgeActive: "bg-rose-100 text-rose-600",
    pill: "bg-rose-50 border border-rose-100",
    pillText: "text-rose-700",
    dot: "bg-rose-400",
    bar: "bg-rose-400",
  },
  amber: {
    border: "border-amber-100",
    headerBg: "bg-amber-50/60",
    badgeBase: "bg-gray-100 text-gray-400",
    badgeActive: "bg-amber-100 text-amber-600",
    pill: "bg-amber-50 border border-amber-100",
    pillText: "text-amber-700",
    dot: "bg-amber-400",
    bar: "bg-amber-400",
  },
  violet: {
    border: "border-violet-100",
    headerBg: "bg-violet-50/60",
    badgeBase: "bg-gray-100 text-gray-400",
    badgeActive: "bg-violet-100 text-violet-600",
    pill: "bg-violet-50 border border-violet-100",
    pillText: "text-violet-700",
    dot: "bg-violet-400",
    bar: "bg-violet-400",
  },
  indigo: {
    border: "border-indigo-100",
    headerBg: "bg-indigo-50/60",
    badgeBase: "bg-gray-100 text-gray-400",
    badgeActive: "bg-indigo-100 text-indigo-600",
    pill: "bg-indigo-50 border border-indigo-100",
    pillText: "text-indigo-700",
    dot: "bg-indigo-400",
    bar: "bg-indigo-400",
  },
  pink: {
    border: "border-pink-100",
    headerBg: "bg-pink-50/60",
    badgeBase: "bg-gray-100 text-gray-400",
    badgeActive: "bg-pink-100 text-pink-600",
    pill: "bg-pink-50 border border-pink-100",
    pillText: "text-pink-700",
    dot: "bg-pink-400",
    bar: "bg-pink-400",
  },
  teal: {
    border: "border-teal-100",
    headerBg: "bg-teal-50/60",
    badgeBase: "bg-gray-100 text-gray-400",
    badgeActive: "bg-teal-100 text-teal-600",
    pill: "bg-teal-50 border border-teal-100",
    pillText: "text-teal-700",
    dot: "bg-teal-400",
    bar: "bg-teal-400",
  },
};

// ─── ClinicalSubsectionCard ───────────────────────────────────────────────────

export function ClinicalSubsectionCard({
  title,
  activeItems,
}: {
  title: string;
  colorKey?: SubsectionColorKey; // se mantiene por compatibilidad pero ya no se usa
  activeItems: ActiveItem[];
}) {
  const hasItems = activeItems.length > 0;

  return (
    <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
      <div className="px-4 py-2.5 border-b border-gray-100 bg-gray-50">
        <p className="text-[11px] uppercase font-bold text-gray-500 tracking-wide">
          {title}
        </p>
      </div>

      <div className="px-4 py-3 min-h-[52px]">
        {!hasItems ? (
          <p className="text-xs text-gray-400 italic">
            Sin alteraciones registradas
          </p>
        ) : (
          <ul className="divide-y divide-gray-50">
            {activeItems.map(({ label, value }) => (
              <li
                key={label}
                className="flex items-baseline justify-between gap-4 py-1.5 first:pt-0 last:pb-0"
              >
                <span className="text-xs text-gray-500">{label}</span>
                <span className="text-xs font-medium text-gray-800 text-right">
                  {value}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

// ─── RecordAuditBanner ────────────────────────────────────────────────────────
export function RecordAuditBanner({ record }: { record: FullRecord }) {
  const { evaluation, confirmed_by, canceled_by } = record;
  const { status } = evaluation;

  const isConfirmed = status === "CONFIRMADO";
  const isCanceled = status === "CANCELADO";
  const isPending = status === "EN_ESPERA";

  if (!isConfirmed && !isCanceled && !isPending) return null;

  const actionDate = isConfirmed
    ? evaluation.confirmed_at
    : isCanceled
      ? evaluation.canceled_at
      : null;

  const actionBy = isConfirmed ? confirmed_by : isCanceled ? canceled_by : null;
  const personName = fullName(actionBy) ?? "el sistema";

  const styles = isConfirmed
    ? {
        wrapper: "bg-emerald-50 border-emerald-200 text-emerald-800",
        icon: "text-emerald-500",
        label: "Registro clínico confirmado",
        IconComponent: DocumentCheckIcon,
      }
    : isCanceled
      ? {
          wrapper: "bg-red-50 border-red-200 text-red-800",
          icon: "text-red-500",
          label: "Registro clínico cancelado",
          IconComponent: DocumentMinusIcon,
        }
      : {
          wrapper: "bg-amber-50 border-amber-200 text-amber-800",
          icon: "text-amber-500",
          label: "Registro clínico en espera",
          IconComponent: DocumentIcon,
        };

  const { wrapper, icon, label, IconComponent } = styles;

  return (
    <div
      className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 sm:px-8 py-3 border ${wrapper} rounded-2xl mb-3`}
    >
      <div className="flex items-center gap-2">
        <IconComponent className={`w-5 h-5 shrink-0 ${icon}`} />
        <span className="text-sm font-semibold">{label}</span>
      </div>

      {!isPending && (
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
          <div className="flex items-center gap-1.5">
            <UserCircleIcon className={`w-4 h-4 ${icon}`} />
            <span>
              <span className="font-medium">Por: </span>
              {personName}
            </span>
          </div>
          {actionDate && (
            <div className="flex items-center gap-1.5">
              <ClockIcon className={`w-4 h-4 ${icon}`} />
              <span>
                <span className="font-medium">Fecha: </span>
                {formatDateTime(actionDate)}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── getActiveLabels ──────────────────────────────────────────────────────────

/**
 * Returns the human-readable labels for fields that are active (truthy, non-empty)
 * in a given findings or lab results object.
 */
// ─── getActiveLabels ──────────────────────────────────────────────────────────

export type ActiveItem = { label: string; value: string };

export function getActiveLabels<T extends object>(
  data: T,
  labelMap: Partial<Record<keyof T, string>>,
): ActiveItem[] {
  return (Object.keys(labelMap) as (keyof T)[])
    .filter((key) => {
      const val = data[key];
      return val !== null && val !== undefined && val !== false && val !== "";
    })
    .map((key) => ({
      label: labelMap[key] as string,
      value: typeof data[key] === "boolean" ? "Sí" : String(data[key]),
    }));
}
