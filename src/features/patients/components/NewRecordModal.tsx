"use client";

import { useState } from "react";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { XMarkIcon } from "@heroicons/react/24/outline";
import ProceduresSelector from "../../post-login/components/ProceduresSelector";
import NotesField from "../../post-login/components/NotesField";
import ClinicalInfoFields, { type ClinicalData } from "../../post-login/components/ClinicalInfoFields";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/+$/, "");

interface ProcedureItem {
  item_name: string;
  price: string;
}

interface Props {
  patientId: number;
  onClose: () => void;
  onSuccess: () => void;
}

export default function NewRecordModal({ patientId, onClose, onSuccess }: Props) {
  const [step, setStep] = useState<1 | 2>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Step 1 — Historia clínica
  const [clinicalData, setClinicalData] = useState<ClinicalData>({
    antecedentesPatologicos: "",
    antecedentesQuirurgicos: "",
    antecedentesFarmacologicos: "",
    antecedentesAlergicos: "",
    antecedentesToxicos: "",
    antecedentesGinecoObstetricos: "",
    antecedentesOtros: "",
    anticoagulado: false,
    enDialisis: false,
    vihSida: false,
    enEmbarazo: false,
    enTratamientoCA: false,
    otrosRiesgo: false,
    motivoConsulta: "",
    onicomicosis: false,
    onicogrifosis: false,
    onicocriptosis: false,
    resequedad: false,
    exostosis: false,
    edemas: false,
    hiperqueratosis: false,
    verruga: false,
    talla: "",
    tipoPie: "",
    tratamientoIndicado: "",
    seguimiento: "",
  });

  // Step 2 — Procedimientos
  const [notes, setNotes] = useState("");
  const [items, setItems] = useState<ProcedureItem[]>([]);

  const clearSubmitError = () => {};

  async function handleSubmit() {
    // Validar que todos los campos estén completos
    if (!notes.trim()) {
      toast.error("Las notas clínicas son obligatorias");
      return;
    }
    
    if (items.length === 0) {
      toast.error("Debes agregar al menos un procedimiento");
      return;
    }

    if (items.some((it) => !it.item_name.trim() || !it.price)) {
      toast.error("Completa el precio de todos los procedimientos seleccionados");
      return;
    }

    setIsSubmitting(true);
    const token = Cookies.get("XSRF-TOKEN") ?? "";

    try {
      const res = await fetch(
        `${apiBaseUrl}/api/v1/patients/${patientId}/clinical-records`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "X-XSRF-TOKEN": token,
          },
          body: JSON.stringify({
            evaluation: {
              antecedentes_patologicos: clinicalData.antecedentesPatologicos,
              antecedentes_quirurgicos: clinicalData.antecedentesQuirurgicos,
              antecedentes_farmacologicos: clinicalData.antecedentesFarmacologicos,
              antecedentes_alergicos: clinicalData.antecedentesAlergicos,
              antecedentes_toxicos: clinicalData.antecedentesToxicos,
              antecedentes_gineco_obstetricos: clinicalData.antecedentesGinecoObstetricos,
              antecedentes_otros: clinicalData.antecedentesOtros,
              anticoagulado: clinicalData.anticoagulado,
              en_dialisis: clinicalData.enDialisis,
              vih_sida: clinicalData.vihSida,
              en_embarazo: clinicalData.enEmbarazo,
              en_tratamiento_ca: clinicalData.enTratamientoCA,
              otros_riesgo: clinicalData.otrosRiesgo,
              motivo_consulta: clinicalData.motivoConsulta,
              onicomicosis: clinicalData.onicomicosis,
              onicogrifosis: clinicalData.onicogrifosis,
              onicocriptosis: clinicalData.onicocriptosis,
              resequedad: clinicalData.resequedad,
              exostosis: clinicalData.exostosis,
              edemas: clinicalData.edemas,
              hiperqueratosis: clinicalData.hiperqueratosis,
              verruga: clinicalData.verruga,
              talla: clinicalData.talla,
              tipo_pie: clinicalData.tipoPie,
              tratamiento_indicado: clinicalData.tratamientoIndicado,
              seguimiento: clinicalData.seguimiento,
            },
            procedure: {
              notes,
              items: items.map((it) => ({
                item_name: it.item_name.trim(),
                price: parseFloat(it.price.replace(/\./g, "").replace(",", ".")) || 0,
              })),
            },
          }),
        }
      );

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        const errorMsg = err.data?.message || err.message || "Error al crear registro clínico";
        throw new Error(errorMsg);
      }

      toast.success("Registro clínico creado correctamente");
      onSuccess();
      onClose();
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : "Error inesperado");
    } finally {
      setIsSubmitting(false);
    }
  }

  const progressPercent = step === 1 ? "50%" : "100%";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div>
            <h2 className="text-lg font-bold text-gray-900">
              Nuevo registro clínico
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Paso {step} de 2 —{" "}
              {step === 1 ? "Evaluación clínica" : "Procedimiento y precios"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 hover:bg-gray-100 transition"
          >
            <XMarkIcon className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Progress bar */}
        <div className="h-1 bg-gray-100">
          <div
            className="h-1 bg-emerald-500 transition-all duration-300"
            style={{ width: progressPercent }}
          />
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-4 overflow-y-auto flex-1">
          {step === 1 && (
            <ClinicalInfoFields
              data={clinicalData}
              onChange={(field, value) => setClinicalData((prev) => ({ ...prev, [field]: value }))}
              onDirty={() => {}}
            />
          )}

          {step === 2 && (
            <div className="space-y-5">
              <ProceduresSelector
                procedureItems={items}
                setProcedureItems={setItems}
                procedureNotes={notes}
                setProcedureNotes={setNotes}
                clearSubmitError={clearSubmitError}
              />
              
              <NotesField
                value={notes}
                onChange={setNotes}
                onDirty={clearSubmitError}
              />

              {items.length > 0 && (
                <div className="rounded-lg bg-emerald-50 border border-emerald-100 px-4 py-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-emerald-700">
                      Procedimientos seleccionados:
                    </span>
                    <span className="text-sm font-bold text-emerald-800">
                      {items.length}
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 flex justify-between gap-3 bg-white">
          {step === 1 && (
            <>
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition"
              >
                Cancelar
              </button>
              <button
                onClick={() => setStep(2)}
                className="px-5 py-2 text-sm bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition font-medium"
              >
                Siguiente →
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <button
                onClick={() => setStep(1)}
                disabled={isSubmitting}
                className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition disabled:opacity-50"
              >
                ← Atrás
              </button>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="px-5 py-2 text-sm bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition font-medium disabled:opacity-50"
              >
                {isSubmitting ? "Guardando..." : "Crear registro"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
