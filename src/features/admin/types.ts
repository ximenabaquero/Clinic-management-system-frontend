export interface Remitente {
  id: number;
  name: string;
  first_name: string;
  last_name: string;
  email: string;
  cellphone: string;
  role: string;
  status: "ACTIVE" | "INACTIVE" | "FIRED";
  created_at: string;
}
