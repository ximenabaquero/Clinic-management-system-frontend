"use client";

import { useState } from "react";
import ReactDOM from "react-dom";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import {
  IdentificationIcon,
  CalendarIcon,
  UserIcon,
  PhoneIcon,
  PencilSquareIcon,
  XMarkIcon,
  MapPinIcon,
  BriefcaseIcon,
  HeartIcon,
  BuildingOfficeIcon,
} from "@heroicons/react/24/outline";
import PhoneInputField from "../../../components/PhoneInputField";
import { type Patient, DocumentType } from "../types";
import { usePatientProfile } from "../hooks/usePatientProfile";
import ValidatedInput from "../../../components/ValidatedInput";
import SelectField from "../../register-patient/components/SelectField";
import DatePickerSelect from "../../register-patient/components/DataPickerSelect";

interface Props {
  patientId: number;
}

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/+$/, "");

const DOCUMENT_TYPE_LABELS: Record<DocumentType, string> = {
  [DocumentType.CC]: "Cédula de Ciudadanía",
  [DocumentType.CE]: "Cédula de Extranjería",
  [DocumentType.PAS]: "Pasaporte",
  [DocumentType.TI]: "Tarjeta de Identidad",
};

const DOCUMENT_TYPE_SHORT: Record<DocumentType, string> = {
  [DocumentType.CC]: "C.C.",
  [DocumentType.CE]: "C.E.",
  [DocumentType.PAS]: "PAS.",
  [DocumentType.TI]: "T.I.",
};

const DOCUMENT_TYPE_STYLES: Record<DocumentType, string> = {
  [DocumentType.CC]: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
  [DocumentType.CE]: "bg-blue-50 text-blue-700 ring-1 ring-blue-200",
  [DocumentType.PAS]: "bg-violet-50 text-violet-700 ring-1 ring-violet-200",
  [DocumentType.TI]: "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
};

const MARITAL_STATUS_LABELS: Record<string, string> = {
  SOLTERO: "Soltero/a",
  CASADO: "Casado/a",
  UNION_LIBRE: "Unión libre",
  DIVORCIADO: "Divorciado/a",
  VIUDO: "Viudo/a",
};

// ─── Sub-componentes ──────────────────────────────────────────────────────────

function DocumentTypeBadge({ type }: { type?: DocumentType | null }) {
  if (!type)
    return (
      <span className="bg-gray-50 text-gray-600 ring-1 ring-gray-200 inline-flex items-center rounded-md px-2 py-0.5 text-xs font-semibold">
        —
      </span>
    );
  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-semibold ${DOCUMENT_TYPE_STYLES[type] ?? "bg-gray-50 text-gray-600 ring-1 ring-gray-200"}`}
    >
      {DOCUMENT_TYPE_SHORT[type] ?? type}
    </span>
  );
}

// colSpan: cuántas columnas ocupa la card en el grid de 4 columnas
function InfoCard({
  icon,
  label,
  value,
  colSpan = 1,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
  colSpan?: 1 | 2;
}) {
  return (
    <div
      className={`flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3 ${
        colSpan === 2 ? "col-span-2" : ""
      }`}
    >
      <div className="flex items-center justify-center h-9 w-9 rounded-lg bg-white border border-gray-100 shrink-0">
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[10px] uppercase font-bold tracking-wider text-gray-400">
          {label}
        </p>
        <div className="text-sm font-semibold text-gray-800 truncate">
          {value}
        </div>
      </div>
    </div>
  );
}

// ─── Component principal ──────────────────────────────────────────────────────

export default function PatientInfo({ patientId }: Props) {
  const { patient, isLoading, error, mutate } = usePatientProfile(patientId);

  const [showEdit, setShowEdit] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [form, setForm] = useState<Partial<Patient>>({});

  const openEdit = () => {
    if (patient) {
      setForm({
        ...patient,
        date_of_birth: patient.date_of_birth?.slice(0, 10) ?? "",
      });
    }
    setShowEdit(true);
  };

  const setField = (field: keyof Patient) => (val: string) =>
    setForm((f) => ({ ...f, [field]: val }));

  const handleSave = async () => {
    setIsSaving(true);
    const token = Cookies.get("XSRF-TOKEN") ?? "";
    try {
      const res = await fetch(`${apiBaseUrl}/api/v1/patients/${patientId}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-XSRF-TOKEN": token,
        },
        body: JSON.stringify({
          first_name: form.first_name,
          last_name: form.last_name,
          cellphone: form.cellphone,
          phone: form.phone || null,
          date_of_birth: form.date_of_birth,
          biological_sex: form.biological_sex,
          document_type: form.document_type,
          cedula: form.cedula,
          address: form.address,
          marital_status: form.marital_status,
          eps: form.eps,
          occupation: form.occupation,
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(
          (err as { message?: string }).message ?? "Error al actualizar",
        );
      }

      toast.success("Paciente actualizado correctamente");
      mutate();
      setShowEdit(false);
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : "Error inesperado");
    } finally {
      setIsSaving(false);
    }
  };

  // ─── Loading ───────────────────────────────────────────────────────────────

  if (isLoading) {
    return (
      <div className="rounded-xl border border-gray-100 bg-white shadow-sm p-6 animate-pulse">
        <div className="h-3 w-24 bg-gray-100 rounded mb-3" />
        <div className="h-7 w-48 bg-gray-100 rounded mb-6" />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-16 bg-gray-100 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  if (error || !patient) {
    return (
      <div className="rounded-xl border border-red-100 bg-red-50 p-4 text-sm text-red-600">
        Error al cargar los datos del paciente.
      </div>
    );
  }

  const fullName =
    patient.full_name ||
    `${patient.first_name ?? ""} ${patient.last_name ?? ""}`.trim() ||
    "Sin nombre";

  // ─── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <section className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
        {/* ── Header ────────────────────────────────────────────────── */}
        <div className="px-6 py-5 border-b border-gray-100 bg-white">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-emerald-600 font-bold mb-1">
                Paciente · ID #{patient.id}
              </p>
              <h1 className="text-2xl font-bold text-gray-900">{fullName}</h1>
              {patient.age !== undefined && (
                <p className="text-sm text-gray-400 mt-0.5">
                  {patient.age} años
                </p>
              )}
            </div>
            <button
              onClick={openEdit}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-all shrink-0"
            >
              <PencilSquareIcon className="h-4 w-4" />
              Editar
            </button>
          </div>
          <div className="mt-4 h-0.5 w-12 rounded-full bg-gradient-to-r from-emerald-500 to-teal-400" />
        </div>

        {/* ── Datos ─────────────────────────────────────────────────── */}
        <div className="p-5 space-y-3">
          {/* Fila 1 — Identidad */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <InfoCard
              icon={<IdentificationIcon className="h-5 w-5 text-emerald-600" />}
              label="N° Documento"
              value={
                <div className="flex items-center gap-1.5">
                  <span>{patient.cedula || "—"}</span>
                  <DocumentTypeBadge type={patient.document_type} />
                </div>
              }
            />
            <InfoCard
              icon={<CalendarIcon className="h-5 w-5 text-emerald-600" />}
              label="Fecha de nacimiento"
              value={new Date(patient.date_of_birth).toLocaleDateString(
                "es-ES",
                { day: "2-digit", month: "short", year: "numeric" },
              )}
            />
            <InfoCard
              icon={<UserIcon className="h-5 w-5 text-emerald-600" />}
              label="Sexo biológico"
              value={patient.biological_sex ?? "—"}
            />
            <InfoCard
              icon={<HeartIcon className="h-5 w-5 text-emerald-600" />}
              label="Estado civil"
              value={
                MARITAL_STATUS_LABELS[patient.marital_status ?? ""] ??
                patient.marital_status ??
                "—"
              }
            />
          </div>

          {/* Fila 2 — Contacto */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <InfoCard
              icon={<PhoneIcon className="h-5 w-5 text-emerald-600" />}
              label="Celular"
              value={patient.cellphone || "—"}
            />
            <InfoCard
              icon={<PhoneIcon className="h-5 w-5 text-emerald-600" />}
              label="Teléfono fijo"
              value={patient.phone || "—"}
            />
            <InfoCard
              icon={<BuildingOfficeIcon className="h-5 w-5 text-emerald-600" />}
              label="EPS"
              value={patient.eps ?? "—"}
            />
            <InfoCard
              icon={<BriefcaseIcon className="h-5 w-5 text-emerald-600" />}
              label="Ocupación"
              value={patient.occupation ?? "—"}
            />
          </div>

          {/* Fila 3 — Dirección ocupa 2 columnas */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <InfoCard
              icon={<MapPinIcon className="h-5 w-5 text-emerald-600" />}
              label="Dirección"
              value={patient.address ?? "—"}
              colSpan={2}
            />
          </div>
        </div>
      </section>

      {/* ── Modal de edición ─────────────────────────────────────────────────── */}
      {showEdit &&
        ReactDOM.createPortal(
          <div
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
            onClick={(e) => e.target === e.currentTarget && setShowEdit(false)}
          >
            <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
              {/* Header */}
              <div className="bg-gradient-to-r from-emerald-600 to-teal-500 px-6 py-4 flex items-center justify-between shrink-0">
                <h2 className="text-base font-bold text-white">
                  Editar datos del paciente
                </h2>
                <button
                  onClick={() => setShowEdit(false)}
                  className="rounded-full p-1.5 hover:bg-white/20 transition"
                >
                  <XMarkIcon className="h-5 w-5 text-white" />
                </button>
              </div>

              {/* Body — scrollable */}
              <div className="px-6 py-5 space-y-4 overflow-y-auto">
                {/* Nombre y Apellido */}
                <div className="grid grid-cols-2 gap-4">
                  <ValidatedInput
                    id="first_name"
                    label="Nombre(s)"
                    placeholder="Nombre(s) del paciente"
                    value={form.first_name ?? ""}
                    onChange={setField("first_name")}
                    required
                    maxLength={100}
                  />
                  <ValidatedInput
                    id="last_name"
                    label="Apellido(s)"
                    placeholder="Apellido(s) del paciente"
                    value={form.last_name ?? ""}
                    onChange={setField("last_name")}
                    required
                    maxLength={100}
                  />
                </div>

                {/* Fecha de nacimiento */}
                <DatePickerSelect
                  label="Fecha de nacimiento"
                  value={form.date_of_birth ?? ""}
                  onChange={setField("date_of_birth")}
                  onDirty={() => {}}
                />

                {/* Tipo y N° de documento */}
                <div className="grid grid-cols-2 gap-4">
                  <SelectField
                    id="document_type"
                    label="Tipo de documento"
                    value={form.document_type ?? ""}
                    onChange={(val) =>
                      setForm((f) => ({
                        ...f,
                        document_type: val as DocumentType,
                      }))
                    }
                    required
                  >
                    <option value="">Seleccionar</option>
                    {(Object.keys(DOCUMENT_TYPE_LABELS) as DocumentType[]).map(
                      (key) => (
                        <option key={key} value={key}>
                          {DOCUMENT_TYPE_LABELS[key]}
                        </option>
                      ),
                    )}
                  </SelectField>
                  <ValidatedInput
                    id="cedula"
                    label="N° de documento"
                    placeholder="Número de documento"
                    value={form.cedula ?? ""}
                    onChange={setField("cedula")}
                    required
                    maxLength={15}
                  />
                </div>

                {/* Sexo biológico + Celular */}
                <div className="grid grid-cols-2 gap-4">
                  <SelectField
                    id="biological_sex"
                    label="Sexo biológico"
                    value={form.biological_sex ?? ""}
                    onChange={setField("biological_sex")}
                    required
                  >
                    <option value="">Seleccionar</option>
                    <option value="Femenino">Femenino</option>
                    <option value="Masculino">Masculino</option>
                    <option value="Otro">Otro</option>
                  </SelectField>
                  <SelectField
                    id="marital_status"
                    label="Estado civil"
                    value={form.marital_status ?? ""}
                    onChange={setField("marital_status")}
                    required
                  >
                    <option value="">Seleccionar</option>
                    {Object.entries(MARITAL_STATUS_LABELS).map(
                      ([val, label]) => (
                        <option key={val} value={val}>
                          {label}
                        </option>
                      ),
                    )}
                  </SelectField>
                </div>

                {/* Celular + Teléfono fijo */}
                <div className="grid grid-cols-2 gap-4">
                  <PhoneInputField
                    label="Celular"
                    variant="modal"
                    value={form.cellphone ?? ""}
                    onChange={(val) =>
                      setForm((f) => ({ ...f, cellphone: val }))
                    }
                  />
                  <div>
                    <label
                      htmlFor="phone"
                      className="flex items-center gap-1.5 text-sm font-medium text-gray-700"
                    >
                      Teléfono fijo
                      <span className="text-gray-400 font-normal">
                        (opcional)
                      </span>
                    </label>
                    <ValidatedInput
                      id="phone"
                      label=""
                      placeholder="Teléfono fijo"
                      value={form.phone ?? ""}
                      onChange={setField("phone")}
                      maxLength={20}
                    />
                  </div>
                </div>

                {/* EPS + Ocupación */}
                <div className="grid grid-cols-2 gap-4">
                  <ValidatedInput
                    id="eps"
                    label="EPS"
                    placeholder="Entidad promotora de salud"
                    value={form.eps ?? ""}
                    onChange={setField("eps")}
                    required
                    maxLength={100}
                  />
                  <ValidatedInput
                    id="occupation"
                    label="Ocupación"
                    placeholder="Ocupación del paciente"
                    value={form.occupation ?? ""}
                    onChange={setField("occupation")}
                    required
                    maxLength={100}
                  />
                </div>

                {/* Dirección */}
                <ValidatedInput
                  id="address"
                  label="Dirección"
                  placeholder="Dirección de residencia"
                  value={form.address ?? ""}
                  onChange={setField("address")}
                  required
                  maxLength={100}
                />
              </div>

              {/* Footer */}
              <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3 shrink-0">
                <button
                  onClick={() => setShowEdit(false)}
                  className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-xl transition font-medium"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="px-5 py-2 text-sm font-semibold text-white rounded-xl transition disabled:opacity-50 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-700 hover:to-teal-600 shadow-sm shadow-emerald-200"
                >
                  {isSaving ? "Guardando..." : "Guardar cambios"}
                </button>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
