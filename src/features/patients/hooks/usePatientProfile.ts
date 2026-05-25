import useSWR from "swr";
import type { Patient } from "../types";
import type { EvaluationData } from "../types";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/+$/, "");

async function fetcher(url: string) {
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("XSRF-TOKEN="))
    ?.split("=")[1];

  const res = await fetch(url, {
    credentials: "include",
    headers: {
      Accept: "application/json",
      "X-XSRF-TOKEN": token ? decodeURIComponent(token) : "",
    },
  });

  if (!res.ok) throw new Error("Error al cargar perfil del paciente");
  return res.json();
}

export type PatientProfileResponse = {
  patient: Patient;
  evaluations: EvaluationData[];
};

export function usePatientProfile(patientId: number) {
  const { data, error, isLoading, mutate } = useSWR<{
    data: PatientProfileResponse;
  }>(
    patientId
      ? `${apiBaseUrl}/api/v1/patients/${patientId}/clinical-records`
      : null,
    fetcher,
  );

  return {
    patient: data?.data?.patient,
    evaluations: data?.data?.evaluations ?? [],
    isLoading,
    error,
    mutate,
  };
}
