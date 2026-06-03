"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { CameraIcon, TrashIcon, PencilSquareIcon, ArrowUpTrayIcon } from "@heroicons/react/24/outline";
import toast from "react-hot-toast";
import type { PatientPhoto, PhotoStage } from "../../types";
import { uploadPatientPhoto, deletePatientPhoto } from "../../services/patientPhotosService";
import { STAGE_META, formatDate } from "./config";

function Spinner() {
  return (
    <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
    </svg>
  );
}

export interface StageCardProps {
  stage: PhotoStage;
  photo: PatientPhoto | null;
  evaluationId: number;
  isSelected: boolean;
  onClick: () => void;
  onMutate: () => Promise<unknown>;
}

export function StageCard({ stage, photo, evaluationId, isSelected, onClick, onMutate }: StageCardProps) {
  const meta = STAGE_META[stage];
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      await uploadPatientPhoto(evaluationId, stage, file);
      await onMutate();
      toast.success(`Foto "${meta.title}" guardada`);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Error al subir");
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!photo) return;
    try {
      await deletePatientPhoto(evaluationId, photo.id);
      await onMutate();
      toast.success("Foto eliminada");
    } catch {
      toast.error("Error al eliminar");
    } finally {
      setConfirmDelete(false);
    }
  };

  return (
    <div
      onClick={onClick}
      className={`group flex-none w-44 sm:w-auto sm:flex-1 flex flex-col bg-white border rounded-2xl shadow-sm overflow-hidden cursor-pointer transition-all duration-200 ${
        isSelected
          ? "border-teal-300 ring-2 ring-teal-400/40 shadow-md"
          : "border-gray-100 hover:border-gray-200 hover:shadow-md"
      }`}
    >
      <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={handleFile} />

      <div className={`h-[3px] w-full ${meta.barColor}`} />
      <div className="px-3 pt-3 pb-2.5">
        <p className={`text-[13px] font-semibold leading-tight ${meta.accent}`}>{meta.title}</p>
        <p className="text-[11px] text-gray-400 mt-0.5">{meta.subtitle}</p>
      </div>

      <div className="relative mx-3 mt-3 aspect-[3/4] rounded-xl overflow-hidden bg-gray-50">
        {photo ? (
          <>
            <Image src={photo.image_url} alt={meta.title} fill className="object-cover" sizes="(max-width: 640px) 44vw, 20vw" unoptimized />
            {confirmDelete ? (
              <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center gap-2.5 p-3">
                <p className="text-white text-xs font-semibold text-center leading-tight">¿Eliminar esta foto?</p>
                <div className="flex gap-2">
                  <button onClick={handleDelete} className="px-3 py-1.5 bg-red-500 text-white text-[11px] font-bold rounded-lg hover:bg-red-600 transition">Eliminar</button>
                  <button onClick={(e) => { e.stopPropagation(); setConfirmDelete(false); }} className="px-3 py-1.5 bg-white/20 backdrop-blur-sm text-white text-[11px] font-bold rounded-lg hover:bg-white/30 transition">Cancelar</button>
                </div>
              </div>
            ) : (
              <button onClick={(e) => { e.stopPropagation(); setConfirmDelete(true); }} className="absolute top-2 right-2 p-1.5 rounded-full bg-white/80 backdrop-blur-sm text-gray-400 opacity-0 group-hover:opacity-100 hover:bg-white hover:text-red-500 transition-all shadow-sm" title="Eliminar foto">
                <TrashIcon className="w-3.5 h-3.5" />
              </button>
            )}
          </>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
              <CameraIcon className="w-5 h-5 text-gray-300" />
            </div>
            <p className="text-[11px] text-gray-400 text-center px-2 leading-tight">Foto no registrada</p>
          </div>
        )}
      </div>

      <div className="px-3 py-3 flex flex-col gap-2 mt-auto">
        <div className="flex items-center justify-between gap-1 flex-wrap">
          <p className="text-[10px] text-gray-400 truncate">{photo ? formatDate(photo.taken_at) : "—"}</p>
          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full whitespace-nowrap ${photo ? "bg-teal-50 text-teal-700" : "bg-gray-100 text-gray-400"}`}>
            {photo ? "Registrado" : "Sin registro"}
          </span>
        </div>
        {photo ? (
          <button onClick={(e) => { e.stopPropagation(); fileRef.current?.click(); }} disabled={uploading} className="flex items-center justify-center gap-1.5 w-full py-1.5 text-[11px] font-medium text-gray-500 border border-gray-200 rounded-lg hover:border-gray-300 hover:text-gray-700 transition-all disabled:opacity-50">
            {uploading ? <Spinner /> : <PencilSquareIcon className="w-3.5 h-3.5" />}
            {uploading ? "Subiendo…" : "Cambiar foto"}
          </button>
        ) : (
          <button onClick={(e) => { e.stopPropagation(); fileRef.current?.click(); }} disabled={uploading} className="flex items-center justify-center gap-1.5 w-full py-2 text-xs font-semibold text-white bg-teal-600 rounded-xl hover:bg-teal-700 active:scale-95 transition-all disabled:opacity-50">
            {uploading ? <Spinner /> : <ArrowUpTrayIcon className="w-3.5 h-3.5" />}
            {uploading ? "Subiendo…" : "+ Subir foto"}
          </button>
        )}
      </div>
    </div>
  );
}
