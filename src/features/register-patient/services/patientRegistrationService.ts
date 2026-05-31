import Cookies from "js-cookie";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/+$/, "");

// ─── Types ────────────────────────────────────────────────────────────────────

export type ProcedureItem = {
  item_name: string;
  price: string;
};

export type DocumentType = "CC" | "CE" | "TI" | "PAS";

export type MaritalStatus =
  | "SOLTERO"
  | "CASADO"
  | "UNION_LIBRE"
  | "DIVORCIADO"
  | "VIUDO";

export const DOCUMENT_TYPE_OPTIONS = [
  { value: "CC", label: "Cédula de Ciudadanía" },
  { value: "CE", label: "Cédula de Extranjería" },
  { value: "TI", label: "Tarjeta de Identidad" },
  { value: "PAS", label: "Pasaporte" },
] as const satisfies { value: DocumentType; label: string }[];

export const MARITAL_STATUS_OPTIONS = [
  { value: "SOLTERO", label: "Soltero/a" },
  { value: "CASADO", label: "Casado/a" },
  { value: "UNION_LIBRE", label: "Unión libre" },
  { value: "DIVORCIADO", label: "Divorciado/a" },
  { value: "VIUDO", label: "Viudo/a" },
] as const satisfies { value: MaritalStatus; label: string }[];

export type PatientPayload = {
  first_name: string;
  last_name: string;
  date_of_birth: string;
  document_type: DocumentType;
  cedula: string;
  cellphone: string;
  phone?: string;
  address: string;
  marital_status: MaritalStatus;
  eps: string;
  occupation: string;
  biological_sex: string;
};

export type SnapshotPayload = {
  companion_name: string;
  companion_relationship: string;
  companion_cellphone: string;
};

export type EvaluationPayload = {
  weight: number;
  height: number;
  medical_background: string;
};

export type ProcedurePayload = {
  notes: string;
  items: ProcedureItem[];
};

export type ClinicalAlterationPayload = Partial<{
  diabetes: boolean;
  cardiac: boolean;
  varicose_veins: boolean;
  thrombosis: boolean;
  fluid_retention: boolean;
  hepatitis: boolean;
  surgeries: boolean;
  constipation: boolean;
  gastritis: boolean;
  irritable_bowel: boolean;
  reflux: boolean;
  intestinal_habit: string;
  kidney_issues: boolean;
  thyroid_issues: boolean;
  lupus_notes: string;
  allergy_notes: string;
  keloid_notes: string;
  vitiligo_notes: string;
  dermatitis_notes: string;
  other_skin_notes: string;
  sleep_hours: number;
  smokes: boolean;
  anxiety: boolean;
  alcohol: boolean;
  depression: boolean;
  birth_control: string;
  medications: string;
  last_period: string;
  num_children: number;
}>;

export type LabResultPayload = Partial<{
  has_exams: boolean;
  hemoglobin_done: boolean;
  inr_value: number;
  glucose_value: number;
  hematocrit_value: number;
}>;

export type RegisterPatientPayload = {
  patient: PatientPayload;
  snapshot: SnapshotPayload;
  evaluation: EvaluationPayload;
  clinical_alteration?: ClinicalAlterationPayload;
  lab_result?: LabResultPayload;
  procedure: ProcedurePayload;
};

export type RegisterPatientResult = {
  patient_id: number;
  evaluation_id: number;
};

// ─── Errors ───────────────────────────────────────────────────────────────────

export class PatientExistsError extends Error {
  constructor(public readonly patient: { id: number; full_name: string }) {
    super("PATIENT_EXISTS");
    this.name = "PatientExistsError";
  }
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function xsrfHeaders(): HeadersInit {
  return {
    "Content-Type": "application/json",
    Accept: "application/json",
    "X-XSRF-TOKEN": Cookies.get("XSRF-TOKEN") ?? "",
  };
}

function extractError(
  body: Record<string, unknown> | null,
  fallback: string,
): string {
  if (!body) return fallback;
  if (typeof body.message === "string") return body.message;
  if (body.errors && typeof body.errors === "object") {
    return Object.values(body.errors as Record<string, string[]>)
      .flat()
      .join(" ");
  }
  if (typeof body.error === "string") return body.error;
  return fallback;
}

function normalizeProcedureItems(items: ProcedureItem[]) {
  return items.map((item) => ({
    item_name: item.item_name,
    price: Number((item.price || "").replace(/\D/g, "")),
  }));
}

// ─── Main function ────────────────────────────────────────────────────────────

export async function registerClinicalRecord(
  payload: RegisterPatientPayload,
): Promise<RegisterPatientResult> {
  const body: Record<string, unknown> = {
    patient: payload.patient,
    snapshot: payload.snapshot,
    evaluation: payload.evaluation,
    procedure: {
      notes: payload.procedure.notes,
      items: normalizeProcedureItems(payload.procedure.items),
    },
  };

  // Solo se incluyen si el caller los provee (campos opcionales del backend)
  if (payload.clinical_alteration) {
    body.clinical_alteration = payload.clinical_alteration;
  }
  if (payload.lab_result) {
    body.lab_result = payload.lab_result;
  }

  const res = await fetch(`${apiBaseUrl}/api/v1/clinical-records`, {
    method: "POST",
    credentials: "include",
    headers: xsrfHeaders(),
    body: JSON.stringify(body),
  });

  if (res.status === 409) {
    const errBody = await res.json().catch(() => null);
    if (errBody?.error === "PATIENT_EXISTS" && errBody?.data?.patient) {
      throw new PatientExistsError(errBody.data.patient);
    }
  }

  if (res.status === 401) {
    throw new Error("Sesión expirada. Inicia sesión nuevamente.");
  }

  if (res.status === 403) {
    const errBody = await res.json().catch(() => null);
    throw new Error(extractError(errBody, "Cuenta no activa."));
  }

  if (!res.ok) {
    const errBody = await res.json().catch(() => null);
    throw new Error(extractError(errBody, "Error al crear registro clínico"));
  }

  const json = await res.json();
  return {
    patient_id: json.data.patient.id as number,
    evaluation_id: json.data.evaluation_id as number,
  };
}
