"use client";

import { useState } from "react";
import useSWR from "swr";
import { CameraIcon } from "@heroicons/react/24/outline";
import type { PatientPhoto, PhotoStage } from "../types";
import { photosKey } from "../services/patientPhotosService";
import { ALL_STAGES, fetcher } from "./photos/config";
import { StageCard } from "./photos/StageCard";
import { ClinicalComparison } from "./photos/ClinicalComparison";
import { ComparisonFullscreen } from "./photos/ComparisonFullscreen";
import { PresentationMode } from "./photos/PresentationMode";

interface Props {
  evaluationId: number;
}

export default function PatientPhotosSection({ evaluationId }: Props) {
  const { data, mutate, isLoading } = useSWR<{ data: PatientPhoto[] }>(
    photosKey(evaluationId),
    fetcher,
  );
  const photos: PatientPhoto[] = data?.data ?? [];

  const [selectedStage,      setSelectedStage]      = useState<PhotoStage>("ANTES");
  const [leftStage,          setLeftStage]           = useState<PhotoStage>("ANTES");
  const [rightStage,         setRightStage]          = useState<PhotoStage>("DESPUES");
  const [isFullscreen,       setIsFullscreen]        = useState(false);
  const [isPresentationOpen, setIsPresentationOpen]  = useState(false);

  const latestOf = (stage: PhotoStage): PatientPhoto | null =>
    photos.filter((p) => p.stage === stage).at(-1) ?? null;

  const totalPhotos = photos.length;

  return (
    <>
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
        {/* Header */}
        <div className="flex items-center gap-2.5 px-6 py-4 border-b border-gray-100">
          <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center shrink-0">
            <CameraIcon className="w-4 h-4 text-teal-500" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-gray-900 leading-tight">Registro fotográfico</h3>
            <p className="text-[11px] text-gray-400">
              {totalPhotos > 0
                ? `${totalPhotos} foto${totalPhotos !== 1 ? "s" : ""} registrada${totalPhotos !== 1 ? "s" : ""}`
                : "Seguimiento visual del procedimiento"}
            </p>
          </div>
        </div>

        {/* Stage cards */}
        <div className="px-5 pt-4 pb-5">
          <p className="text-xs font-medium text-gray-400 tracking-wide mb-3">
            Evolución del procedimiento
          </p>
          {isLoading ? (
            <div className="flex items-center justify-center py-12 text-gray-400 text-sm">
              Cargando registros…
            </div>
          ) : (
            <div className="flex gap-3 overflow-x-auto pb-1">
              {ALL_STAGES.map((stage) => (
                <StageCard
                  key={stage}
                  stage={stage}
                  photo={latestOf(stage)}
                  evaluationId={evaluationId}
                  isSelected={selectedStage === stage}
                  onClick={() => setSelectedStage(stage)}
                  onMutate={mutate}
                />
              ))}
            </div>
          )}
        </div>

        {/* Comparación clínica */}
        <div className="px-5 pb-5">
          <ClinicalComparison
            photos={photos}
            leftStage={leftStage}
            rightStage={rightStage}
            onChangeLeft={setLeftStage}
            onChangeRight={setRightStage}
            onFullscreen={() => setIsFullscreen(true)}
            onPresent={() => setIsPresentationOpen(true)}
          />
        </div>
      </div>

      {isFullscreen && (
        <ComparisonFullscreen
          photos={photos}
          leftStage={leftStage}
          rightStage={rightStage}
          onClose={() => setIsFullscreen(false)}
        />
      )}

      {isPresentationOpen && (
        <PresentationMode
          photos={photos}
          onClose={() => setIsPresentationOpen(false)}
        />
      )}
    </>
  );
}
