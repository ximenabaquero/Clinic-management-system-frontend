"use client";

import { useEffect } from "react";
import { CameraIcon, XMarkIcon } from "@heroicons/react/24/outline";
import type { PatientPhoto, PhotoStage } from "../../types";
import { ComparisonPhotoPanel } from "./ComparisonPhotoPanel";

export interface ComparisonFullscreenProps {
  photos: PatientPhoto[];
  leftStage: PhotoStage;
  rightStage: PhotoStage;
  onClose: () => void;
}

export function ComparisonFullscreen({ photos, leftStage, rightStage, onClose }: ComparisonFullscreenProps) {
  const latestOf = (stage: PhotoStage): PatientPhoto | null =>
    photos.filter((p) => p.stage === stage).at(-1) ?? null;

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 bg-gray-950/97 backdrop-blur-md flex flex-col">
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-teal-500/20 flex items-center justify-center">
            <CameraIcon className="w-4 h-4 text-teal-400" />
          </div>
          <div>
            <p className="text-white font-bold text-sm leading-tight">Comparación clínica</p>
            <p className="text-white/40 text-[11px]">Coldesthetic · Registro fotográfico</p>
          </div>
        </div>
        <button onClick={onClose} className="p-2 rounded-xl text-white/50 hover:text-white hover:bg-white/10 transition-all" title="Cerrar (Esc)">
          <XMarkIcon className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 flex flex-col sm:flex-row items-center justify-center gap-6 overflow-auto p-6">
        <div className="flex flex-col items-center gap-3 flex-1 min-w-0 max-w-sm">
          <ComparisonPhotoPanel stage={leftStage}  photo={latestOf(leftStage)}  label="A" fullscreen />
        </div>
        <div className="hidden sm:flex flex-col items-center gap-2 shrink-0">
          <div className="h-16 w-px bg-white/10" />
          <span className="text-white/20 text-xs font-bold tracking-widest">VS</span>
          <div className="h-16 w-px bg-white/10" />
        </div>
        <div className="flex flex-col items-center gap-3 flex-1 min-w-0 max-w-sm">
          <ComparisonPhotoPanel stage={rightStage} photo={latestOf(rightStage)} label="B" fullscreen />
        </div>
      </div>

      <div className="px-6 py-3 border-t border-white/10 flex items-center justify-center shrink-0">
        <p className="text-white/25 text-[11px]">
          Presiona <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white/40 font-mono text-[10px]">Esc</kbd> para cerrar
        </p>
      </div>
    </div>
  );
}
