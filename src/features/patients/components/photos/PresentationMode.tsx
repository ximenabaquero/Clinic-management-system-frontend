"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import {
  CameraIcon,
  XMarkIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  Squares2X2Icon,
  QueueListIcon,
} from "@heroicons/react/24/outline";
import type { PatientPhoto, PhotoStage } from "../../types";
import { STAGE_META, ALL_STAGES, STAGE_SHORT, formatDate } from "./config";

export interface PresentationModeProps {
  photos: PatientPhoto[];
  onClose: () => void;
}

export function PresentationMode({ photos, onClose }: PresentationModeProps) {
  const [viewMode, setViewMode] = useState<"sequence" | "comparison">("sequence");
  const [currentIndex, setCurrentIndex] = useState(0);

  const latestOf = (stage: PhotoStage): PatientPhoto | null =>
    photos.filter((p) => p.stage === stage).at(-1) ?? null;

  const goNext = useCallback(() => setCurrentIndex((i) => (i + 1) % ALL_STAGES.length), []);
  const goPrev = useCallback(() => setCurrentIndex((i) => (i - 1 + ALL_STAGES.length) % ALL_STAGES.length), []);

  const lastStageWithPhoto: PhotoStage =
    [...ALL_STAGES].reverse().find((s) => photos.some((p) => p.stage === s)) ?? "DESPUES";

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (viewMode === "sequence") {
        if (e.key === "ArrowRight" || e.key === "ArrowDown") goNext();
        if (e.key === "ArrowLeft"  || e.key === "ArrowUp")   goPrev();
      }
    };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose, goNext, goPrev, viewMode]);

  const currentStage = ALL_STAGES[currentIndex];
  const currentMeta  = STAGE_META[currentStage];
  const currentPhoto = latestOf(currentStage);

  return (
    <div className="fixed inset-0 z-50 bg-gray-50 flex flex-col select-none">

      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-3 bg-white border-b border-gray-100 shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-teal-50 flex items-center justify-center">
            <CameraIcon className="w-4 h-4 text-teal-500" />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-900 leading-tight">Evolución del procedimiento</p>
            <p className="text-[10px] text-gray-400">Coldesthetic · Presentación clínica</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center bg-gray-100 rounded-lg p-0.5 gap-0.5">
            <button
              onClick={() => setViewMode("sequence")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[11px] font-semibold transition-all ${viewMode === "sequence" ? "bg-white text-gray-900 shadow-sm" : "text-gray-400 hover:text-gray-600"}`}
            >
              <QueueListIcon className="w-3.5 h-3.5" />
              Secuencia
            </button>
            <button
              onClick={() => setViewMode("comparison")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[11px] font-semibold transition-all ${viewMode === "comparison" ? "bg-white text-gray-900 shadow-sm" : "text-gray-400 hover:text-gray-600"}`}
            >
              <Squares2X2Icon className="w-3.5 h-3.5" />
              Comparación
            </button>
          </div>

          <button onClick={onClose} className="p-2 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-all" title="Salir (Esc)">
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Sequence mode */}
      {viewMode === "sequence" && (
        <div className="flex-1 flex flex-col items-center justify-between overflow-hidden px-6 py-6 gap-4">
          <div className="text-center shrink-0">
            <p className={`text-2xl font-bold tracking-tight ${currentMeta.accent}`}>{currentMeta.title}</p>
            <p className="text-sm text-gray-400 mt-0.5">{currentMeta.subtitle}</p>
            {currentPhoto && <p className="text-xs text-gray-300 mt-1">{formatDate(currentPhoto.taken_at)}</p>}
          </div>

          <div className="flex-1 flex items-center justify-center w-full min-h-0">
            <div className="relative h-full max-h-[62vh] aspect-[3/4] rounded-2xl overflow-hidden shadow-lg">
              {currentPhoto ? (
                <Image src={currentPhoto.image_url} alt={currentMeta.title} fill className="object-cover" sizes="(max-width: 640px) 80vw, 50vw" unoptimized priority />
              ) : (
                <div className="absolute inset-0 bg-white border border-gray-100 flex flex-col items-center justify-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
                    <CameraIcon className="w-8 h-8 text-gray-300" />
                  </div>
                  <div className="text-center px-6">
                    <p className="text-sm font-semibold text-gray-400">Foto no registrada</p>
                    <p className="text-xs text-gray-300 mt-1">{currentMeta.subtitle}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col items-center gap-4 shrink-0 w-full">
            <div className="flex items-end gap-3">
              {ALL_STAGES.map((stage, idx) => {
                const hasPhoto = latestOf(stage) !== null;
                const isActive = idx === currentIndex;
                const meta = STAGE_META[stage];
                return (
                  <button key={stage} onClick={() => setCurrentIndex(idx)} className="flex flex-col items-center gap-1.5" title={meta.title}>
                    <span className={`transition-all duration-300 rounded-full ${isActive ? `w-3 h-3 ${meta.dotColor}` : hasPhoto ? `w-2 h-2 ${meta.dotColor} opacity-40` : "w-2 h-2 bg-gray-200"}`} />
                    <span className={`text-[10px] font-medium transition-colors ${isActive ? meta.accent : "text-gray-300"}`}>
                      {STAGE_SHORT[stage]}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-3">
              <button onClick={goPrev} className="flex items-center gap-2 px-5 py-2.5 border border-gray-200 rounded-xl text-gray-600 text-sm font-medium hover:bg-white hover:border-gray-300 hover:shadow-sm transition-all bg-white/80">
                <ChevronLeftIcon className="w-4 h-4" />
                Anterior
              </button>
              <span className="text-xs text-gray-300 font-medium w-12 text-center">{currentIndex + 1} / {ALL_STAGES.length}</span>
              <button onClick={goNext} className="flex items-center gap-2 px-5 py-2.5 border border-gray-200 rounded-xl text-gray-600 text-sm font-medium hover:bg-white hover:border-gray-300 hover:shadow-sm transition-all bg-white/80">
                Siguiente
                <ChevronRightIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Comparison mode */}
      {viewMode === "comparison" && (
        <div className="flex-1 flex flex-col overflow-hidden px-6 py-5 gap-5">
          <div className="text-center shrink-0">
            <p className="text-sm text-gray-500">
              Comparando{" "}
              <span className={`font-bold ${STAGE_META["ANTES"].accent}`}>Antes</span>
              {" "}vs{" "}
              <span className={`font-bold ${STAGE_META[lastStageWithPhoto].accent}`}>
                {STAGE_META[lastStageWithPhoto].title}
              </span>
            </p>
          </div>

          <div className="flex-1 flex flex-col sm:flex-row gap-5 min-h-0">
            {/* Left — ANTES */}
            <div className="flex-1 flex flex-col gap-2 min-h-0 min-w-0">
              <div className="flex items-center gap-2 shrink-0">
                <span className={`text-xs font-semibold ${STAGE_META["ANTES"].accent}`}>{STAGE_META["ANTES"].title}</span>
                <span className="text-[11px] text-gray-300">·</span>
                <span className="text-[11px] text-gray-400">{STAGE_META["ANTES"].subtitle}</span>
                {latestOf("ANTES") && <span className="text-[11px] text-gray-300 ml-auto">{formatDate(latestOf("ANTES")!.taken_at)}</span>}
              </div>
              <div className="flex-1 relative rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm min-h-0">
                {latestOf("ANTES") ? (
                  <Image src={latestOf("ANTES")!.image_url} alt="Antes" fill className="object-contain" sizes="(max-width: 640px) 90vw, 45vw" unoptimized priority />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                    <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center">
                      <CameraIcon className="w-7 h-7 text-gray-300" />
                    </div>
                    <p className="text-sm text-gray-400 font-medium">Foto no registrada</p>
                  </div>
                )}
              </div>
            </div>

            <div className="hidden sm:flex flex-col items-center justify-center shrink-0 gap-2">
              <div className="flex-1 w-px bg-gray-200" />
              <span className="text-[10px] text-gray-300 font-medium">vs</span>
              <div className="flex-1 w-px bg-gray-200" />
            </div>

            {/* Right — last stage with photo */}
            <div className="flex-1 flex flex-col gap-2 min-h-0 min-w-0">
              <div className="flex items-center gap-2 shrink-0">
                <span className={`text-xs font-semibold ${STAGE_META[lastStageWithPhoto].accent}`}>{STAGE_META[lastStageWithPhoto].title}</span>
                <span className="text-[11px] text-gray-300">·</span>
                <span className="text-[11px] text-gray-400">{STAGE_META[lastStageWithPhoto].subtitle}</span>
                {latestOf(lastStageWithPhoto) && <span className="text-[11px] text-gray-300 ml-auto">{formatDate(latestOf(lastStageWithPhoto)!.taken_at)}</span>}
              </div>
              <div className="flex-1 relative rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm min-h-0">
                {latestOf(lastStageWithPhoto) ? (
                  <Image src={latestOf(lastStageWithPhoto)!.image_url} alt={STAGE_META[lastStageWithPhoto].title} fill className="object-contain" sizes="(max-width: 640px) 90vw, 45vw" unoptimized priority />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                    <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center">
                      <CameraIcon className="w-7 h-7 text-gray-300" />
                    </div>
                    <p className="text-sm text-gray-400 font-medium">Foto no registrada</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom hint */}
      <div className="px-6 py-2 border-t border-gray-100 bg-white flex items-center justify-center shrink-0">
        <p className="text-[10px] text-gray-300">
          {viewMode === "sequence"
            ? "Usa las flechas del teclado para navegar · "
            : "Comparación automática: primer vs último registro · "}
          <kbd className="px-1 py-0.5 rounded bg-gray-100 text-gray-400 font-mono text-[9px]">Esc</kbd> para salir
        </p>
      </div>
    </div>
  );
}
