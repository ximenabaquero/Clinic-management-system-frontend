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

// ─── FieldItem ────────────────────────────────────────────────────────────────

export type FieldItem = {
  label: string;
  value: string | null | undefined;
  active: boolean;
};

// ─── getAllLabels ─────────────────────────────────────────────────────────────
//
// Returns ALL fields from the label map, marking each as active or not.
//   boolean true  → active, value = "Sí"
//   boolean false → inactive, value = "No"
//   string/number → active if non-empty, else inactive with value = "—"
//   null/undefined → inactive, value = "—"

export function getAllLabels<T extends object>(
  data: T,
  labelMap: Partial<Record<keyof T, string>>,
): FieldItem[] {
  return (Object.keys(labelMap) as (keyof T)[]).map((key) => {
    const raw = data[key];
    const label = labelMap[key] as string;

    if (raw === null || raw === undefined) {
      return { label, value: "—", active: false };
    }

    if (typeof raw === "boolean") {
      return { label, value: raw ? "Sí" : "No", active: raw };
    }

    const str = String(raw).trim();
    if (str === "" || str === "0") {
      return { label, value: "—", active: false };
    }

    return { label, value: str, active: true };
  });
}

// Backward-compatible alias for callers that still use getActiveLabels
export type ActiveItem = { label: string; value: string };

export function getActiveLabels<T extends object>(
  data: T,
  labelMap: Partial<Record<keyof T, string>>,
): ActiveItem[] {
  return getAllLabels(data, labelMap)
    .filter((item) => item.active)
    .map(({ label, value }) => ({ label, value: value ?? "—" }));
}

// ─── ClinicalSubsectionCard ───────────────────────────────────────────────────
//
// Renders ALL fields. Active findings (true / non-empty text) appear bold
// with a colored badge. Inactive fields render in muted gray with "No" or "—".
//
// columns = 2 splits the list into two columns — ideal for boolean-heavy
// sections like metabolic or habits where most fields are short one-liners.

type ClinicalSubsectionCardProps = {
  title: string;
  items: FieldItem[];
  columns?: 1 | 2;
};

export function ClinicalSubsectionCard({
  title,
  items,
  columns = 1,
}: ClinicalSubsectionCardProps) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white overflow-hidden shadow-sm">
      {/* ── Header ──────────────────────────────────────────────────── */}
      <div className="px-4 py-2.5 border-b border-slate-100 bg-slate-50/60">
        <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">
          {title}
        </p>
      </div>

      {/* ── Body ────────────────────────────────────────────────────── */}
      <div
        className={`px-4 py-2 ${
          columns === 2 ? "grid grid-cols-2 gap-x-4" : "flex flex-col"
        }`}
      >
        {items.map(({ label, value, active }) => (
          <FieldRow key={label} label={label} value={value} active={active} />
        ))}
      </div>
    </div>
  );
}

// ─── FieldRow ─────────────────────────────────────────────────────────────────

function FieldRow({
  label,
  value,
  active,
}: {
  label: string;
  value: string | null | undefined;
  active: boolean;
}) {
  return (
    <div className="flex items-baseline justify-between gap-3 py-1.5 border-b border-slate-50 last:border-0">
      {/* Label */}
      <span
        className={`text-xs leading-snug truncate ${
          active ? "font-semibold text-slate-800" : "text-slate-400 font-normal"
        }`}
      >
        {label}
      </span>

      {/* Value */}
      <ValueBadge value={value} active={active} />
    </div>
  );
}

// ─── ValueBadge ──────────────────────────────────────────────────────────────

function ValueBadge({
  value,
  active,
}: {
  value: string | null | undefined;
  active: boolean;
}) {
  if (value === "Sí") {
    return (
      <span className="shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-50 text-rose-600 border border-rose-100">
        Sí
      </span>
    );
  }

  if (value === "No") {
    return (
      <span className="shrink-0 text-[10px] text-slate-300 font-normal">
        No
      </span>
    );
  }

  if (!value || value === "—") {
    return (
      <span className="shrink-0 text-[10px] text-slate-300 font-normal">—</span>
    );
  }

  // Numeric or text note with active finding
  if (active) {
    return (
      <span className="shrink-0 text-xs font-semibold text-slate-700 text-right max-w-[55%] leading-snug">
        {value}
      </span>
    );
  }

  return (
    <span className="shrink-0 text-xs text-slate-400 text-right max-w-[55%] leading-snug">
      {value}
    </span>
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
