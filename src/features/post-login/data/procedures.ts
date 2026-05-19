export type ProcedureOption = {
  id: string;
  label: string;
  defaultPrice?: number;
  additionalNote?: string;
};

export type ProcedureGroup = {
  id: string;
  label: string;
  defaultOpen?: boolean;
  procedureIds: string[];
};

export const PROCEDURES: ProcedureOption[] = [
  // Procedimientos Podológicos
  { id: "quiropedia", label: "Quiropedia", defaultPrice: 120000 },
  {
    id: "una_encarnada",
    label: "Uña Encarnada",
    defaultPrice: 220000,
    additionalNote: "Adicional $80.000 por 3 sesiones · Cultivo $138.000",
  },
  {
    id: "verruga_plantar",
    label: "Verruga Plantar",
    defaultPrice: 450000,
    additionalNote: "Adicional $150.000 por cantidad indicada · Ácido Nítrico $20.000",
  },
  {
    id: "fenol",
    label: "Fenol",
    defaultPrice: 650000,
    additionalNote: "Adicional $650.000 por 3 sesiones",
  },
  { id: "exostosis", label: "Exostosis", defaultPrice: 650000 },
  { id: "heloma_plantar", label: "Heloma Plantar", defaultPrice: 220000 },
  { id: "bloqueo", label: "Bloqueo", defaultPrice: 260000 },
  { id: "control", label: "Control", defaultPrice: 95000 },

  // Productos / Inventario
  { id: "koh", label: "KOH", defaultPrice: 48000 },
  { id: "cultivo", label: "Cultivo", defaultPrice: 138000 },
  { id: "acido_nitrico", label: "Ácido Nítrico", defaultPrice: 20000 },
  { id: "ozonoterapia", label: "Ozonoterapia x10", defaultPrice: 700000 },
  { id: "laser", label: "Láser", defaultPrice: 700000 },
  { id: "alta_frecuencia", label: "Alta Frecuencia", defaultPrice: 30000 },
  { id: "unica", label: "Úñica", defaultPrice: 95000 },
  { id: "aceite_ozono", label: "Aceite de Ozono", defaultPrice: 95000 },
  { id: "silonails", label: "Silonails", defaultPrice: 95000 },
  { id: "tea_tree", label: "Tea Tree", defaultPrice: 70000 },
  { id: "ureapod", label: "Ureapod", defaultPrice: 70000 },
  { id: "urea40", label: "Urea 40", defaultPrice: 70000 },
  { id: "jabon_neutro", label: "Jabón Neutro", defaultPrice: 45000 },
  { id: "aceite_calendula", label: "Aceite de Caléndula", defaultPrice: 50000 },
  { id: "ortonixia", label: "Ortonixia", defaultPrice: 90000 },
  { id: "ortesis_silicona", label: "Ortesis de Silicona", defaultPrice: 90000 },
  { id: "plantillas", label: "Plantillas" },

  // Otros Servicios
  { id: "enfermeria", label: "Enfermería" },
  { id: "sueroterapia", label: "Sueroterapia" },
  { id: "otros", label: "Otros" },
];

export const PROCEDURE_GROUPS: ProcedureGroup[] = [
  {
    id: "procedimientos",
    label: "Procedimientos Podológicos",
    defaultOpen: true,
    procedureIds: [
      "quiropedia",
      "una_encarnada",
      "verruga_plantar",
      "fenol",
      "exostosis",
      "heloma_plantar",
      "bloqueo",
      "control",
    ],
  },
  {
    id: "productos",
    label: "Productos / Inventario",
    defaultOpen: false,
    procedureIds: [
      "koh",
      "cultivo",
      "acido_nitrico",
      "ozonoterapia",
      "laser",
      "alta_frecuencia",
      "unica",
      "aceite_ozono",
      "silonails",
      "tea_tree",
      "ureapod",
      "urea40",
      "jabon_neutro",
      "aceite_calendula",
      "ortonixia",
      "ortesis_silicona",
      "plantillas",
    ],
  },
  {
    id: "servicios",
    label: "Otros Servicios",
    defaultOpen: false,
    procedureIds: ["enfermeria", "sueroterapia", "otros"],
  },
];
