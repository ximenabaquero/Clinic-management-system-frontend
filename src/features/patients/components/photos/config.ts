import type { PhotoStage } from "../../types";

export type StageMeta = {
  title: string;
  subtitle: string;
  accent: string;
  accentBg: string;
  dotColor: string;
  barColor: string;
};

export const STAGE_META: Record<PhotoStage, StageMeta> = {
  ANTES:   { title: "Antes",     subtitle: "Foto inicial",        accent: "text-teal-600",    accentBg: "bg-teal-50",    dotColor: "bg-teal-500",    barColor: "bg-teal-400"    },
  DESPUES: { title: "Después",   subtitle: "Resultado inmediato", accent: "text-emerald-600", accentBg: "bg-emerald-50", dotColor: "bg-emerald-500", barColor: "bg-emerald-400" },
  MES1:    { title: "Control 1", subtitle: "Seguimiento clínico", accent: "text-violet-500",  accentBg: "bg-violet-50",  dotColor: "bg-violet-500",  barColor: "bg-violet-400"  },
  MES2:    { title: "Control 2", subtitle: "Seguimiento clínico", accent: "text-amber-500",   accentBg: "bg-amber-50",   dotColor: "bg-amber-400",   barColor: "bg-amber-300"   },
  MES3:    { title: "Control 3", subtitle: "Seguimiento clínico", accent: "text-rose-500",    accentBg: "bg-rose-50",    dotColor: "bg-rose-400",    barColor: "bg-rose-400"    },
};

export const ALL_STAGES: PhotoStage[] = ["ANTES", "DESPUES", "MES1", "MES2", "MES3"];

export const STAGE_SHORT: Record<PhotoStage, string> = {
  ANTES: "A", DESPUES: "D", MES1: "C1", MES2: "C2", MES3: "C3",
};

export { photosFetcher as fetcher } from "../../services/patientPhotosService";

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("es-CO", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}
