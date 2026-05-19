import ValidatedInput from "../../../components/ValidatedInput";
import PhoneInputField from "../../../components/PhoneInputField";
import SelectField from "./SelectField";
import DateOfBirthPicker from "./DateOfBirthPicker";
import "react-phone-input-2/lib/style.css";

const DOCUMENT_TYPES = [
  "Cédula de Ciudadanía",
  "Cédula de Extranjería",
  "Pasaporte",
  "Tarjeta de Identidad",
  "Registro Civil",
];

const CIVIL_STATUS_OPTIONS = [
  "Soltero/a",
  "Casado/a",
  "Unión libre",
  "Divorciado/a",
  "Viudo/a",
  "Separado/a",
];

export type PatientBasicData = {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  documentType: string;
  cedula: string;
  cellphone: string;
  biologicalSex: string;
  // Opcionales
  phone: string;
  address: string;
  civilStatus: string;
  eps: string;
  occupation: string;
  companionName: string;
  companionRelationship: string;
  companionCellphone: string;
};

type PatientBasicsFieldsProps = {
  data: PatientBasicData;
  onChange: (field: keyof PatientBasicData, value: string) => void;
  onDirty: () => void;
};

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
      {/* Nombre y Apellido */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="col-span-2 -mb-2">
          <p className="text-[10px] uppercase tracking-wider text-gray-400">
            LOS CAMPOS CON * SON OBLIGATORIOS
          </p>
        </div>

        <ValidatedInput
          id="first_name"
          label="Nombre(s) *"
          placeholder="Nombre(s) del paciente"
          value={data.firstName}
          onChange={set("firstName")}
          required
          maxLength={100}
        />

        <ValidatedInput
          id="last_name"
          label="Apellido(s) *"
          placeholder="Apellido(s) del paciente"
          value={data.lastName}
          onChange={set("lastName")}
          required
          maxLength={100}
        />
      </div>

      {/* Fecha de nacimiento y Edad */}
      <div className="mt-4">
        <DateOfBirthPicker
          value={data.dateOfBirth}
          onChange={set("dateOfBirth")}
          onDirty={onDirty}
        />
      </div>

      {/* Tipo de documento y Cédula */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        <SelectField
          id="document_type"
          label="Tipo de documento *"
          value={data.documentType}
          onChange={set("documentType")}
          required
        >
          <option value="">Seleccione un tipo</option>
          {DOCUMENT_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </SelectField>

        <ValidatedInput
          id="cedula"
          label="Número de documento *"
          placeholder="Número de documento"
          value={data.cedula}
          onChange={set("cedula")}
          required
          maxLength={15}
        />
      </div>

      {/* Celular y Sexo biológico */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        <SelectField
          id="biological_sex"
          label="Sexo biológico *"
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

      {/* ── Datos de contacto adicionales ─────────────────────────────────── */}
      <div className="mt-8">
        <div className="flex items-center gap-2 mb-4">
          <span className="h-4 w-0.5 bg-emerald-400 rounded-full" />
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Datos de contacto adicionales
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <ValidatedInput
            id="phone"
            label="Teléfono"
            placeholder="Teléfono fijo"
            value={data.phone}
            onChange={set("phone")}
            maxLength={25}
          />

          <ValidatedInput
            id="address"
            label="Dirección"
            placeholder="Dirección de residencia"
            value={data.address}
            onChange={set("address")}
            maxLength={200}
          />

          <SelectField
            id="civil_status"
            label="Estado Civil"
            value={data.civilStatus}
            onChange={set("civilStatus")}
          >
            <option value="">Seleccione una opción</option>
            {CIVIL_STATUS_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </SelectField>

          <ValidatedInput
            id="eps"
            label="EPS"
            placeholder="Entidad prestadora de salud"
            value={data.eps}
            onChange={set("eps")}
            maxLength={100}
          />

          <ValidatedInput
            id="occupation"
            label="Ocupación"
            placeholder="Ocupación del paciente"
            value={data.occupation}
            onChange={set("occupation")}
            maxLength={100}
          />
        </div>
      </div>

      {/* ── Datos del acompañante ──────────────────────────────────────────── */}
      <div className="mt-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="h-4 w-0.5 bg-teal-400 rounded-full" />
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Datos del acompañante
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <ValidatedInput
            id="companion_name"
            label="Acompañante"
            placeholder="Nombre del acompañante"
            value={data.companionName}
            onChange={set("companionName")}
            maxLength={100}
          />

          <ValidatedInput
            id="companion_relationship"
            label="Parentesco"
            placeholder="Ej. Madre, Esposo, Amigo..."
            value={data.companionRelationship}
            onChange={set("companionRelationship")}
            maxLength={100}
          />

          <ValidatedInput
            id="companion_cellphone"
            label="Celular del acompañante"
            placeholder="Número de celular"
            value={data.companionCellphone}
            onChange={set("companionCellphone")}
            maxLength={25}
          />
        </div>
      </div>
    </>
  );
}
