import type { InventoryProduct } from "../../../types";

export type UsageMode = "CON_PACIENTE" | "SIN_PACIENTE";

export type UsageFormProps = {
  products: InventoryProduct[];
  mode: UsageMode;
  medicalEvaluationId?: number; // solo cuando mode === "CON_PACIENTE"
  onClose: () => void;
  onSaved: () => void;
};
