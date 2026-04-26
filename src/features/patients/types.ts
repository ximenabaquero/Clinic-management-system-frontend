export type ProcedureItem = {
  id?: number;
  item_name: string;
  price: string;
};

export type Procedure = {
  id: number;
  procedure_date?: string;
  notes?: string;
  items: ProcedureItem[];
  total_amount: number | string;
};

export type Patient = {
  first_name: string;
  last_name: string;
  cedula: string;
  date_of_birth: string;
  biological_sex: string;
  cellphone: string;
  address?: string;
  email?: string;
  family_member_name?: string;
};

export type EvaluationData = {
  patient: Patient;
  patient_age_at_evaluation: number;
  // Antecedentes personales
  antecedentes_patologicos?: string;
  antecedentes_quirurgicos?: string;
  antecedentes_farmacologicos?: string;
  antecedentes_alergicos?: string;
  antecedentes_toxicos?: string;
  antecedentes_gineco_obstetricos?: string;
  antecedentes_otros?: string;
  // Factores de riesgo (SI/NO)
  anticoagulado?: boolean;
  en_dialisis?: boolean;
  vih_sida?: boolean;
  en_embarazo?: boolean;
  en_tratamiento_ca?: boolean;
  otros_riesgo?: boolean;
  // Motivo de consulta
  motivo_consulta?: string;
  // Examen físico (SI/NO)
  onicomicosis?: boolean;
  onicogrifosis?: boolean;
  onicocriptosis?: boolean;
  resequedad?: boolean;
  exostosis?: boolean;
  edemas?: boolean;
  hiperqueratosis?: boolean;
  verruga?: boolean;
  // Otros hallazgos
  talla?: string;
  tipo_pie?: string;
  tratamiento_indicado?: string;
  seguimiento?: string;
  // Metadatos
  procedures: Procedure[];
  patient_signature?: string;
  confirmed_at?: string;
  user?: { brand_name?: string };
  referrer_name?: string;
  created_at?: string;
  status?: string;
};
