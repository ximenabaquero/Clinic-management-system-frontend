"use client";

import { ArrowsPointingOutIcon, PlayIcon } from "@heroicons/react/24/outline";
import type { PatientPhoto, PhotoStage } from "../../types";
import { STAGE_META, ALL_STAGES } from "./config";
import { ComparisonPhotoPanel } from "./ComparisonPhotoPanel";

function StagePill({ stage, isActive, isDisabled, onClick }: {
  stage: PhotoStage; isActive: boolean; isDisabled: boolean; onClick: () => void;
}) {
  const meta = STAGE_META[stage];
  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all whitespace-nowrap ${
        isActive
          ? "bg-teal-600 text-white shadow-sm"
          : isDisabled
          ? "bg-gray-50 text-gray-300 cursor-not-allowed"
          : `${meta.accentBg} ${meta.accent} hover:opacity-80`
      }`}
    >
      {meta.title}
    </button>
  );
}

export interface ClinicalComparisonProps {
  photos: PatientPhoto[];
  leftStage: PhotoStage;
  rightStage: PhotoStage;
  onChangeLeft: (s: PhotoStage) => void;
  onChangeRight: (s: PhotoStage) => void;
  onFullscreen: () => void;
  onPresent: () => void;
}

export function ClinicalComparison({
  photos,
  leftStage,
  rightStage,
  onChangeLeft,
  onChangeRight,
  onFullscreen,
  onPresent,
}: ClinicalComparisonProps) {
  const latestOf = (stage: PhotoStage): PatientPhoto | null =>
    photos.filter((p) => p.stage === stage).at(-1) ?? null;

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 space-y-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h4 className="text-sm font-bold text-gray-900 leading-tight">Comparación clínica</h4>
          <p className="text-[11px] text-gray-400 mt-0.5">
            Selecciona dos controles para comparar la evolución del procedimiento
          </p>
        </div>
        <button
          onClick={onFullscreen}
          className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-medium text-gray-500 border border-gray-200 rounded-lg hover:border-gray-300 hover:text-gray-700 bg-white transition-all shrink-0"
          title="Ver en pantalla completa"
        >
          <ArrowsPointingOutIcon className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Pantalla completa</span>
        </button>
      </div>

      <div className="space-y-2.5">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[11px] font-medium text-gray-400 w-16 shrink-0">Control A</span>
          <div className="flex gap-1.5 flex-wrap">
            {ALL_STAGES.map((stage) => (
              <StagePill key={stage} stage={stage} isActive={leftStage === stage} isDisabled={rightStage === stage} onClick={() => onChangeLeft(stage)} />
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex-1 border-t border-dashed border-gray-200" />
          <span className="text-[10px] text-gray-300 font-medium px-1">vs</span>
          <div className="flex-1 border-t border-dashed border-gray-200" />
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[11px] font-medium text-gray-400 w-16 shrink-0">Control B</span>
          <div className="flex gap-1.5 flex-wrap">
            {ALL_STAGES.map((stage) => (
              <StagePill key={stage} stage={stage} isActive={rightStage === stage} isDisabled={leftStage === stage} onClick={() => onChangeRight(stage)} />
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <ComparisonPhotoPanel stage={leftStage}  photo={latestOf(leftStage)}  label="A" />
        <div className="hidden sm:block w-px bg-gray-200 self-stretch mx-1" />
        <ComparisonPhotoPanel stage={rightStage} photo={latestOf(rightStage)} label="B" />
      </div>

      <div className="flex flex-col sm:flex-row gap-2 pt-1">
        <button
          onClick={onPresent}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-teal-600 text-white text-sm font-bold rounded-xl hover:bg-teal-700 active:scale-[0.98] transition-all shadow-sm"
        >
          <PlayIcon className="w-4 h-4" />
          Presentar evolución
        </button>
        <button
          onClick={onFullscreen}
          className="flex-1 sm:flex-none flex items-center justify-center gap-2 py-2.5 px-5 text-sm font-medium text-gray-600 border border-gray-200 rounded-xl hover:border-gray-300 hover:text-gray-800 bg-white transition-all"
        >
          <ArrowsPointingOutIcon className="w-4 h-4" />
          Ver en pantalla completa
        </button>
      </div>
    </div>
  );
}
