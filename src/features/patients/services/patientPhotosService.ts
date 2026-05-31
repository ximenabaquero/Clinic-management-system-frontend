import Cookies from "js-cookie";
import type { PatientPhoto, PhotoStage } from "../types";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/+$/, "");

export function photosKey(evaluationId: number): string {
  return `${apiBaseUrl}/api/v1/medical-evaluations/${evaluationId}/photos`;
}

// El backend almacena los stages en minúsculas (enum MySQL).
// Estas helpers convierten en la frontera del servicio.
const toApiStage  = (stage: PhotoStage): string => stage.toLowerCase();
const fromApiStage = (raw: string): PhotoStage  => raw.toUpperCase() as PhotoStage;

function normalizePhoto(raw: Record<string, unknown>): PatientPhoto {
  return { ...(raw as PatientPhoto), stage: fromApiStage(raw.stage as string) };
}

export async function uploadPatientPhoto(
  evaluationId: number,
  stage: PhotoStage,
  file: File,
  notes?: string,
): Promise<PatientPhoto> {
  const form = new FormData();
  form.append("stage", toApiStage(stage));
  form.append("image", file);
  if (notes) form.append("notes", notes);

  const res = await fetch(
    `${apiBaseUrl}/api/v1/medical-evaluations/${evaluationId}/photos`,
    {
      method: "POST",
      credentials: "include",
      headers: { "X-XSRF-TOKEN": Cookies.get("XSRF-TOKEN") ?? "", Accept: "application/json" },
      body: form,
    },
  );

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as { error?: string }).error ?? "Error al subir la foto");
  }
  const json = await res.json();
  return normalizePhoto(json.data);
}

export async function deletePatientPhoto(
  evaluationId: number,
  photoId: number,
): Promise<void> {
  const res = await fetch(
    `${apiBaseUrl}/api/v1/medical-evaluations/${evaluationId}/photos/${photoId}`,
    {
      method: "DELETE",
      credentials: "include",
      headers: { "X-XSRF-TOKEN": Cookies.get("XSRF-TOKEN") ?? "", Accept: "application/json" },
    },
  );
  if (!res.ok) throw new Error("Error al eliminar la foto");
}

// Fetcher para SWR — normaliza los stages a mayúsculas al recibir del backend
export const photosFetcher = (url: string) =>
  fetch(url, { credentials: "include", headers: { Accept: "application/json" } })
    .then((r) => r.json())
    .then((json: { data: Record<string, unknown>[] }) => ({
      ...json,
      data: Array.isArray(json.data) ? json.data.map(normalizePhoto) : json.data,
    }));
