import Image from "next/image";
import { CameraIcon } from "@heroicons/react/24/outline";
import type { PatientPhoto, PhotoStage } from "../../types";
import { STAGE_META, formatDate } from "./config";

interface Props {
  stage: PhotoStage;
  photo: PatientPhoto | null;
  label: "A" | "B";
  fullscreen?: boolean;
}

export function ComparisonPhotoPanel({ stage, photo, label, fullscreen = false }: Props) {
  const meta = STAGE_META[stage];
  return (
    <div className="flex flex-col gap-2 flex-1 min-w-0">
      <div className="flex items-center gap-2">
        <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${fullscreen ? "bg-white/10 text-white/60" : "bg-gray-100 text-gray-400"}`}>
          Control {label}
        </span>
        <span className={`text-sm font-bold ${fullscreen ? "text-white" : meta.accent}`}>{meta.title}</span>
        {photo && (
          <span className={`text-[11px] ${fullscreen ? "text-white/50" : "text-gray-400"}`}>
            · {formatDate(photo.taken_at)}
          </span>
        )}
      </div>
      <div className={`relative w-full aspect-[3/4] rounded-2xl overflow-hidden ${fullscreen ? "bg-gray-800" : "bg-gray-50 border border-gray-100 shadow-sm"}`}>
        {photo ? (
          <Image
            src={photo.image_url}
            alt={meta.title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 90vw, 45vw"
            unoptimized
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
            <div className={`w-14 h-14 rounded-full flex items-center justify-center ${fullscreen ? "bg-white/10" : "bg-gray-100"}`}>
              <CameraIcon className={`w-7 h-7 ${fullscreen ? "text-white/30" : "text-gray-300"}`} />
            </div>
            <p className={`text-sm font-medium ${fullscreen ? "text-white/40" : "text-gray-400"}`}>Foto no registrada</p>
            <p className={`text-[11px] ${fullscreen ? "text-white/25" : "text-gray-300"}`}>{meta.subtitle}</p>
          </div>
        )}
      </div>
    </div>
  );
}
