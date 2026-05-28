// ─────────────────────────────────────────────────────────────────────────────
// Shared primitives
// ─────────────────────────────────────────────────────────────────────────────

/** Estados posibles de una evaluación médica. */
export type EvaluationStatus = "EN_ESPERA" | "CONFIRMADO" | "CANCELADO";

export enum DocumentType {
  CC = "CC", // Cédula de Ciudadanía
  CE = "CE", // Cédula de Extranjería
  PAS = "PAS", // Pasaporte
  TI = "TI", // Tarjeta de Identidad
}

// ─────────────────────────────────────────────────────────────────────────────
// Patient
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Estado actual del paciente en el sistema.
 * Se usa ÚNICAMENTE en getPatientProfile — nunca como fuente histórica.
 */
export type Patient = {
  id: number;
  first_name?: string;
  last_name?: string;
  full_name?: string;
  cedula: string;
  document_type?: DocumentType;
  date_of_birth: string;
  age?: number;
  biological_sex?: string;
  cellphone: string;
  phone?: string;
  address?: string;
  marital_status?: string;
  eps?: string;
  occupation?: string;
};

// ─────────────────────────────────────────────────────────────────────────────
// Patient Profile  →  getPatientProfile
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Tarjeta de evaluación dentro del perfil del paciente.
 * procedure_date viene de un subquery — es la fecha del último procedimiento
 * asociado a la evaluación. Solo fecha, sin hora ("YYYY-MM-DD").
 */
export type EvaluationCard = {
  id: number;
  patient_id: number;
  user_id: number;
  status: EvaluationStatus;
  referrer_name: string | null;
  procedure_date: string | null;
};

/** Respuesta completa de getPatientProfile. */
export type PatientProfile = {
  patient: Patient;
  evaluations: EvaluationCard[];
};

// ─────────────────────────────────────────────────────────────────────────────
// Procedures  →  getFullRecord
// ─────────────────────────────────────────────────────────────────────────────

export type ProcedureItem = {
  id: number;
  procedure_id: number;
  item_name: string;
  price: string;
};

/**
 * Procedimiento dentro del registro clínico completo.
 * No incluye procedure_date — el campo relevante es created_at
 * (fecha + hora en que se registró en el sistema).
 */
export type Procedure = {
  id: number;
  medical_evaluation_id: number;
  total_amount: number;
  notes: string | null;
  created_at: string; // ISO 8601 — "YYYY-MM-DDTHH:MM:SSZ"
  items: ProcedureItem[];
};

// ─────────────────────────────────────────────────────────────────────────────
// Snapshot  →  getFullRecord
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Foto histórica del paciente en el momento de la evaluación.
 * Se lee SIEMPRE desde aquí — nunca desde Patient — para fidelidad histórica.
 */
export type EvaluationSnapshot = {
  id: number;
  evaluation_id: number;
  // Identidad
  document_type: DocumentType;
  cedula: string;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  biological_sex: string;
  // Contacto
  cellphone: string;
  phone: string | null;
  // Administrativo
  address: string;
  marital_status: string;
  eps: string;
  occupation: string;
  // Acompañante
  companion_name: string;
  companion_relationship: string;
  companion_cellphone: string;
};

// ─────────────────────────────────────────────────────────────────────────────
// Clinical findings / Lab results
// Solo contienen campos con valor real — el backend filtra los false/null.
// ─────────────────────────────────────────────────────────────────────────────

export type ClinicalFindings = Partial<{
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
  kidney_issues: boolean;
  thyroid_issues: boolean;
  smokes: boolean;
  anxiety: boolean;
  alcohol: boolean;
  depression: boolean;
  intestinal_habit: string;
  lupus_notes: string;
  allergy_notes: string;
  keloid_notes: string;
  vitiligo_notes: string;
  dermatitis_notes: string;
  other_skin_notes: string;
  sleep_hours: number;
  num_children: number;
  last_period: string;
  birth_control: string;
  medications: string;
}>;

export type LabResults = Partial<{
  has_exams: boolean;
  hemoglobin_done: boolean;
  inr_value: number;
  glucose_value: number;
  hematocrit_value: number;
}>;

// ─────────────────────────────────────────────────────────────────────────────
// User
// ─────────────────────────────────────────────────────────────────────────────

export type EvaluationUser = {
  id: number;
  name?: string;
  first_name?: string;
  last_name?: string;
  brand_name?: string;
};

type ConfirmedBy = {
  id: number;
  first_name: string;
  last_name: string;
} | null;

// ─────────────────────────────────────────────────────────────────────────────
// Full Record  →  getFullRecord
// ─────────────────────────────────────────────────────────────────────────────

/** Respuesta completa de getFullRecord. */
export type FullRecord = {
  evaluation: {
    id: number;
    patient_id: number;
    user_id: number;
    status: EvaluationStatus;
    referrer_name: string;
    medical_background: string;
    weight: number;
    height: number;
    bmi: number;
    bmi_status: string;
    patient_age_at_evaluation: number;
    confirmed_at: string | null;
    canceled_at: string | null;
    terms_accepted_at: string | null;
    patient_signature: string | null;
  };
  snapshot: EvaluationSnapshot;
  clinical_findings: ClinicalFindings;
  lab_results: LabResults;
  procedures: Procedure[];
  user: EvaluationUser | null;
  confirmed_by: ConfirmedBy;
  canceled_by: ConfirmedBy;
};

// ─────────────────────────────────────────────────────────────────────────────
// Photos & Appointments
// ─────────────────────────────────────────────────────────────────────────────

export type PhotoStage = "ANTES" | "DESPUES" | "MES1" | "MES2" | "MES3";

export type PatientPhoto = {
  id: number;
  stage: PhotoStage;
  image_url: string;
  notes: string | null;
  taken_at: string;
  created_at: string;
};

export type Appointment = {
  id: number;
  medical_evaluation_id: number;
  patient_id: number;
  appointment_datetime: string;
  duration_minutes: number;
  procedure_type: "concejacion" | "sincecion";
  doctor_name: string | null;
  fasting_required: boolean;
  notes: string | null;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  created_at: string;
};
