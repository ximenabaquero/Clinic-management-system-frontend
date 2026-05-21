"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import MainLayout from "@/layouts/MainLayout";
import RegisterCard from "./components/RegisterCard";
import RegisterHeaderBar from "./components/RegisterHeaderBar";
import PatientBasicsFields, {
  type PatientBasicData,
} from "./components/PatientBasicsFields";
import ClinicalInfoFields, {
  type ClinicalData,
  INITIAL_CLINICAL,
} from "./components/ClinicalInfoFields";
import ProceduresSelector from "./components/ProceduresSelector";
import NotesField from "./components/NotesField";
import StickySubmitBar from "./components/StickySubmitBar";
import FormAlert from "./components/FormAlert";
import SidebarSteps from "./components/SideBarSteps";
import ConfirmModal from "@/components/ConfirmModal";
import { toast } from "react-hot-toast";
import {
  registerClinicalRecord,
  PatientExistsError,
  type ProcedureItem,
  type DocumentType,
  type MaritalStatus,
} from "./services/patientRegistrationService";
import AuthGuard from "@/components/AuthGuard";

// ─── Estado inicial ───────────────────────────────────────────────────────────

const INITIAL_PATIENT: PatientBasicData = {
  firstName: "",
  lastName: "",
  dateOfBirth: "",
  documentType: "",
  cedula: "",
  cellphone: "",
  phone: "",
  biologicalSex: "",
  address: "",
  maritalStatus: "",
  eps: "",
  occupation: "",
  companionName: "",
  companionRelationship: "",
  companionCellphone: "",
};

// ─── Helpers de mapeo form → payload ─────────────────────────────────────────

function parseOptionalFloat(value: string): number | undefined {
  const n = parseFloat(value);
  return isNaN(n) ? undefined : n;
}

function parseOptionalInt(value: string): number | undefined {
  const n = parseInt(value, 10);
  return isNaN(n) ? undefined : n;
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function RegisterPatientPage() {
  const router = useRouter();

  const [currentStep, setCurrentStep] = useState(0);
  const [stepCompleted, setStepCompleted] = useState<
    [boolean, boolean, boolean]
  >([false, false, false]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  const [patientData, setPatientData] =
    useState<PatientBasicData>(INITIAL_PATIENT);
  const [clinicalData, setClinicalData] =
    useState<ClinicalData>(INITIAL_CLINICAL);
  const [procedureItems, setProcedureItems] = useState<ProcedureItem[]>([]);
  const [procedureNotes, setProcedureNotes] = useState("");

  // ─── Handlers ──────────────────────────────────────────────────────────────

  const updatePatient = (field: keyof PatientBasicData, value: string) =>
    setPatientData((prev) => ({ ...prev, [field]: value }));

  // unknown porque los sub-objetos (clinicalAlteration, labResult) no son string
  const updateClinical = (field: keyof ClinicalData, value: unknown) =>
    setClinicalData((prev) => ({ ...prev, [field]: value }));

  const handleDirty = () => setSubmitError(null);

  // ─── Validación de pasos ────────────────────────────────────────────────────

  useEffect(() => {
    // Paso 1: todos los campos del paciente completos excepto phone (opcional)
    const { phone, ...requiredPatientFields } = patientData;
    const p1 = Object.values(requiredPatientFields).every(
      (v) => v.trim() !== "",
    );

    // Paso 2: solo peso, altura y antecedentes son obligatorios
    const w = parseFloat(clinicalData.weightKg) > 0;
    const h = parseFloat(clinicalData.heightM) > 0;
    const p2 = w && h && clinicalData.medicalBackground.trim() !== "";

    // Paso 3: al menos un procedimiento y notas
    const p3 = procedureItems.length > 0 && procedureNotes.trim() !== "";

    setStepCompleted([p1, p2, p3]);
  }, [patientData, clinicalData, procedureItems, procedureNotes]);

  useEffect(() => {
    if (currentStep === 2) {
      const valid =
        procedureItems.length > 0 && procedureNotes.trim().length > 0;
      setValidationError(
        valid
          ? null
          : "⚠️ Complete todos los pasos antes de guardar el registro.",
      );
    } else {
      setValidationError(null);
    }
  }, [currentStep, procedureItems, procedureNotes]);

  // ─── Submit ─────────────────────────────────────────────────────────────────

  const handleSaveClick = () => {
    const valid = procedureItems.length > 0 && procedureNotes.trim() !== "";
    if (!valid) {
      setValidationError(
        "⚠️ Complete todos los pasos antes de guardar el registro.",
      );
      return;
    }
    setShowConfirmModal(true);
  };

  const handleConfirmedSubmit = async () => {
    setShowConfirmModal(false);
    setIsSubmitting(true);

    try {
      const { patient_id, evaluation_id } = await registerClinicalRecord({
        patient: {
          first_name: patientData.firstName,
          last_name: patientData.lastName,
          date_of_birth: patientData.dateOfBirth,
          document_type: patientData.documentType as DocumentType,
          cedula: patientData.cedula,
          cellphone: patientData.cellphone,
          phone: patientData.phone || undefined,
          address: patientData.address,
          marital_status: patientData.maritalStatus as MaritalStatus,
          eps: patientData.eps,
          occupation: patientData.occupation,
          biological_sex: patientData.biologicalSex,
        },
        snapshot: {
          companion_name: patientData.companionName,
          companion_relationship: patientData.companionRelationship,
          companion_cellphone: patientData.companionCellphone,
        },
        evaluation: {
          weight: parseFloat(clinicalData.weightKg),
          height: parseFloat(clinicalData.heightM),
          medical_background: clinicalData.medicalBackground,
        },
        clinical_alteration: {
          ...clinicalData.clinicalAlteration,
          // Conversión string → number en el límite form → payload
          sleep_hours: parseOptionalInt(
            clinicalData.clinicalAlteration.sleep_hours,
          ),
          num_children: parseOptionalInt(
            clinicalData.clinicalAlteration.num_children,
          ),
          last_period: clinicalData.clinicalAlteration.last_period || undefined,
        },
        lab_result: {
          has_exams: clinicalData.labResult.has_exams,
          hemoglobin_done: clinicalData.labResult.hemoglobin_done,
          inr_value: parseOptionalFloat(clinicalData.labResult.inr_value),
          glucose_value: parseOptionalFloat(
            clinicalData.labResult.glucose_value,
          ),
          hematocrit_value: parseOptionalFloat(
            clinicalData.labResult.hematocrit_value,
          ),
        },
        procedure: {
          notes: procedureNotes,
          items: procedureItems,
        },
      });

      toast.success("Registro guardado correctamente");
      router.push(`/patients/${patient_id}/records/${evaluation_id}`);
    } catch (err) {
      if (err instanceof PatientExistsError) {
        toast.error(
          `El paciente ${err.patient.full_name} ya existe. Redirigiendo...`,
        );
        router.push(`/patients/${err.patient.id}/records`);
        return;
      }
      const message =
        err instanceof Error ? err.message : "No se pudo guardar el registro.";
      setSubmitError(message);
      toast.error("Hubo un error al guardar el registro");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ─── Derived ────────────────────────────────────────────────────────────────

  const selectedCount = procedureItems.length;
  const stickyTotalCop = procedureItems
    .reduce(
      (total, item) => total + (Number(item.price?.replace(/\D/g, "")) || 0),
      0,
    )
    .toLocaleString("es-CO");

  const allStepsCompleted =
    stepCompleted[0] && stepCompleted[1] && stepCompleted[2];

  // ─── Render ─────────────────────────────────────────────────────────────────

  return (
    <AuthGuard>
      <MainLayout>
        <div className="bg-gradient-to-b from-emerald-50 via-white to-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="grid grid-cols-12 gap-6">
              {/* ── Sidebar ──────────────────────────────────────── */}
              <aside className="col-span-12 lg:col-span-4">
                <SidebarSteps
                  steps={[
                    {
                      label: "Datos del paciente",
                      completed: stepCompleted[0],
                    },
                    {
                      label: "Evaluación clínica",
                      completed: stepCompleted[1],
                    },
                    { label: "Procedimientos", completed: stepCompleted[2] },
                  ]}
                  currentStep={currentStep}
                  onStepClick={setCurrentStep}
                />
              </aside>

              {/* ── Main ─────────────────────────────────────────── */}
              <main className="col-span-12 lg:col-span-8">
                <RegisterHeaderBar
                  onStatsClick={() => router.push("/stats")}
                  onImagesClick={() => router.push("/control-images")}
                  onPatientsClick={() => router.push("/patients")}
                  onBackToRegisterClick={() => router.push("/register-patient")}
                  onRemitentesClick={() => router.push("/admin/remitentes")}
                  onInventoryClick={() => router.push("/inventory")}
                  active="register"
                />

                <h1 className="mt-3 text-2xl sm:text-3xl font-bold text-gray-900">
                  Registro clínico del paciente
                </h1>
                <p className="mt-2 text-sm text-gray-600">
                  Complete y verifique la información antes de guardarla. El
                  índice de masa corporal (IMC) se registrará automáticamente.
                </p>

                <form
                  className="space-y-5 mt-6"
                  onSubmit={(e) => e.preventDefault()}
                >
                  {validationError && (
                    <FormAlert variant="warning" message={validationError} />
                  )}
                  {submitError && (
                    <FormAlert variant="error" message={submitError} />
                  )}

                  {/* ── Paso 0: Datos del paciente ──────────────── */}
                  {currentStep === 0 && (
                    <RegisterCard
                      title="Datos del paciente"
                      subtitle="Información básica del paciente para registro clínico."
                    >
                      <PatientBasicsFields
                        data={patientData}
                        onChange={updatePatient}
                        onDirty={handleDirty}
                      />
                    </RegisterCard>
                  )}

                  {/* ── Paso 1: Evaluación clínica ──────────────── */}
                  {currentStep === 1 && (
                    <RegisterCard
                      title="Evaluación clínica"
                      subtitle="Peso, estatura, IMC, antecedentes y alteraciones clínicas."
                    >
                      <ClinicalInfoFields
                        data={clinicalData}
                        onChange={updateClinical}
                        onDirty={handleDirty}
                      />
                    </RegisterCard>
                  )}

                  {/* ── Paso 2: Procedimientos ───────────────────── */}
                  {currentStep === 2 && (
                    <RegisterCard
                      title="Procedimientos"
                      subtitle="Selecciona los procedimientos y asigna un precio en COP."
                    >
                      <ProceduresSelector
                        procedureItems={procedureItems}
                        setProcedureItems={setProcedureItems}
                        procedureNotes={procedureNotes}
                        setProcedureNotes={setProcedureNotes}
                        clearSubmitError={handleDirty}
                      />
                      <div className="mt-6">
                        <NotesField
                          value={procedureNotes}
                          onChange={setProcedureNotes}
                          onDirty={handleDirty}
                        />
                      </div>
                      <StickySubmitBar
                        selectedCount={selectedCount}
                        stickyTotalCop={stickyTotalCop}
                        isSubmitting={false}
                      />
                    </RegisterCard>
                  )}

                  {/* ── Navegación ───────────────────────────────── */}
                  <div className="flex items-center justify-between pt-2">
                    <button
                      type="button"
                      onClick={() => setCurrentStep((s) => Math.max(0, s - 1))}
                      disabled={currentStep === 0 || isSubmitting}
                      className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 disabled:opacity-60"
                    >
                      Anterior
                    </button>

                    {currentStep < 2 ? (
                      <button
                        type="button"
                        onClick={() =>
                          setCurrentStep((s) => Math.min(2, s + 1))
                        }
                        disabled={isSubmitting}
                        className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 disabled:opacity-60"
                      >
                        Siguiente
                      </button>
                    ) : (
                      <button
                        type="button"
                        disabled={isSubmitting || !allStepsCompleted}
                        onClick={handleSaveClick}
                        className={`rounded-xl px-4 py-2 text-sm font-semibold text-white transition-all duration-200 ${
                          allStepsCompleted
                            ? "bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-700 hover:to-teal-600 shadow-sm cursor-pointer"
                            : "bg-emerald-200 cursor-not-allowed"
                        }`}
                      >
                        {isSubmitting ? "Guardando..." : "Guardar registro"}
                      </button>
                    )}
                  </div>
                </form>
              </main>
            </div>
          </div>
        </div>
      </MainLayout>

      <ConfirmModal
        isOpen={showConfirmModal}
        title="¿Guardar registro clínico?"
        message="Estás a punto de guardar el registro del paciente con todos sus datos clínicos y procedimientos. Una vez guardado, serás redirigido al historial del paciente."
        confirmLabel="Sí, guardar"
        variant="default"
        onConfirm={handleConfirmedSubmit}
        onCancel={() => setShowConfirmModal(false)}
      />
    </AuthGuard>
  );
}
