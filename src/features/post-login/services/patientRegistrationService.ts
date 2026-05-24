import Cookies from "js-cookie";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/+$/, "");

// ─── Types ────────────────────────────────────────────────────────────────────

export type ProcedureItem = {
  item_name: string;
  price: string;
};

export type DocumentType = "CC" | "CE" | "TI" | "PAS";

export type RegisterPatientPayload = {
  patient: {
    first_name: string;
    last_name: string;
    date_of_birth: string;
    document_type: DocumentType;
    cedula: string;
    cellphone: string;
    biological_sex: string;
  };
  evaluation: {
    weight: number;
    height: number;
    medical_background: string;
  };
  procedure: {
    notes: string;
    items: ProcedureItem[];
  };
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

// ─── Main function ────────────────────────────────────────────────────────────

export async function registerClinicalRecord(
  payload: RegisterPatientPayload,
): Promise<RegisterPatientResult> {
  const body = {
    patient: payload.patient,
    evaluation: payload.evaluation,
    procedure: {
      notes: payload.procedure.notes,
      items: payload.procedure.items.map((item) => ({
        item_name: item.item_name,
        price: Number((item.price || "").replace(/\D/g, "")),
      })),
    },
  };

  const res = await fetch(`${apiBaseUrl}/api/v1/clinical-records`, {
    method: "POST",
    credentials: "include",
    headers: xsrfHeaders(),
    body: JSON.stringify(body),
  });

  // Paciente ya existe
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
    evaluation_id: json.data.evaluation.id as number,
  };
}
