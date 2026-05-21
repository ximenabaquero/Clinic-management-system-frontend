import ValidatedInput from "../../../components/ValidatedInput";
import PhoneInputField from "../../../components/PhoneInputField";
import SelectField from "./SelectField";
import DateOfBirthPicker from "./DateOfBirthPicker";
import "react-phone-input-2/lib/style.css";
import {
  DOCUMENT_TYPE_OPTIONS,
  MARITAL_STATUS_OPTIONS,
} from "../services/patientRegistrationService";
import type {
  DocumentType,
  MaritalStatus,
} from "../services/patientRegistrationService";

// ─── Types ────────────────────────────────────────────────────────────────────

export type PatientBasicData = {
  // Identidad
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  documentType: DocumentType | "";
  cedula: string;
  biologicalSex: string;
  // Contacto
  cellphone: string;
  phone: string;
  // Administrativo
  address: string;
  maritalStatus: MaritalStatus | "";
  eps: string;
  occupation: string;
  // Acompañante (snapshot)
  companionName: string;
  companionRelationship: string;
  companionCellphone: string;
};

type PatientBasicsFieldsProps = {
  data: PatientBasicData;
  onChange: (field: keyof PatientBasicData, value: string) => void;
  onDirty: () => void;
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function PatientBasicsFields({
  data,
  onChange,
  onDirty,
}: PatientBasicsFieldsProps) {
  const set = (field: keyof PatientBasicData) => (value: string) => {
    onChange(field, value);
    onDirty();
  };

  return (
    <>
      {/* ── Aviso campos obligatorios ───────────────────────────── */}
      <p className="text-[10px] uppercase tracking-wider text-gray-400 -mb-2">
        TODOS LOS CAMPOS SON OBLIGATORIOS **
      </p>

      {/* ── Nombre y Apellido ───────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        <ValidatedInput
          id="first_name"
          label="Nombre(s)"
          placeholder="Nombre(s) del paciente"
          value={data.firstName}
          onChange={set("firstName")}
          required
          maxLength={100}
        />
        <ValidatedInput
          id="last_name"
          label="Apellido(s)"
          placeholder="Apellido(s) del paciente"
          value={data.lastName}
          onChange={set("lastName")}
          required
          maxLength={100}
        />
      </div>

      {/* ── Fecha de nacimiento ─────────────────────────────────── */}
      <div className="mt-4">
        <DateOfBirthPicker
          value={data.dateOfBirth}
          onChange={set("dateOfBirth")}
          onDirty={onDirty}
        />
      </div>

      {/* ── Documento ───────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        <SelectField
          id="document_type"
          label="Tipo de documento"
          value={data.documentType}
          onChange={set("documentType")}
          required
        >
          <option value="">Seleccione un tipo</option>
          {DOCUMENT_TYPE_OPTIONS.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </SelectField>

        <ValidatedInput
          id="cedula"
          label="Número de documento"
          placeholder="Número de documento"
          value={data.cedula}
          onChange={set("cedula")}
          required
          maxLength={15}
        />
      </div>

      {/* ── Sexo biológico + Celular ─────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        <SelectField
          id="biological_sex"
          label="Sexo biológico"
          value={data.biologicalSex}
          onChange={set("biologicalSex")}
          required
        >
          <option value="">Seleccione una opción</option>
          <option value="Femenino">Femenino</option>
          <option value="Masculino">Masculino</option>
          <option value="Otro">Otro</option>
        </SelectField>

        <PhoneInputField
          value={data.cellphone}
          onChange={set("cellphone")}
          onDirty={onDirty}
        />
      </div>

      {/* ── Teléfono fijo (opcional) + Estado civil ──────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        <ValidatedInput
          id="phone"
          label="Teléfono fijo"
          placeholder="Teléfono fijo (opcional)"
          value={data.phone}
          onChange={set("phone")}
          maxLength={20}
        />

        <SelectField
          id="marital_status"
          label="Estado civil"
          value={data.maritalStatus}
          onChange={set("maritalStatus")}
          required
        >
          <option value="">Seleccione una opción</option>
          {MARITAL_STATUS_OPTIONS.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </SelectField>
      </div>

      {/* ── Dirección + EPS ─────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        <ValidatedInput
          id="address"
          label="Dirección"
          placeholder="Dirección de residencia"
          value={data.address}
          onChange={set("address")}
          required
          maxLength={100}
        />

        <ValidatedInput
          id="eps"
          label="EPS"
          placeholder="Entidad promotora de salud"
          value={data.eps}
          onChange={set("eps")}
          required
          maxLength={100}
        />
      </div>

      {/* ── Ocupación ───────────────────────────────────────────── */}
      <div className="mt-4">
        <ValidatedInput
          id="occupation"
          label="Ocupación"
          placeholder="Ocupación del paciente"
          value={data.occupation}
          onChange={set("occupation")}
          required
          maxLength={100}
        />
      </div>

      {/* ══ Sección acompañante (snapshot) ══════════════════════════════ */}
      <div className="mt-6">
        <p className="text-[10px] uppercase tracking-wider text-gray-400 mb-3">
          Datos del acompañante
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <ValidatedInput
            id="companion_name"
            label="Nombre del acompañante"
            placeholder="Nombre completo"
            value={data.companionName}
            onChange={set("companionName")}
            required
            maxLength={100}
          />

          <ValidatedInput
            id="companion_relationship"
            label="Parentesco"
            placeholder="Ej: Madre, Esposo, Amigo..."
            value={data.companionRelationship}
            onChange={set("companionRelationship")}
            required
            maxLength={50}
          />
        </div>

        <div className="mt-4">
          <PhoneInputField
            value={data.companionCellphone}
            onChange={set("companionCellphone")}
            onDirty={onDirty}
            label="Celular del acompañante"
          />
        </div>
      </div>
    </>
  );
}
