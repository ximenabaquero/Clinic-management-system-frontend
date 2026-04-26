"use client";

import { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import ClinicalInfoFields, { type ClinicalData } from "../../post-login/components/ClinicalInfoFields";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/+$/, "");

type Props = {
  evaluationId: number;
  initialData: ClinicalData;
  onClose: () => void;
  onSaved: () => void;
};

export default function EditarEvaluacionModal({ evaluationId, initialData, onClose, onSaved }: Props) {
  const [form, setForm] = useState<ClinicalData>(initialData);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    const token = Cookies.get("XSRF-TOKEN") ?? "";
    try {
      const res = await fetch(
        `${apiBaseUrl}/api/v1/medical-evaluations/${evaluationId}`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "X-XSRF-TOKEN": token,
          },
          body: JSON.stringify({
            antecedentes_patologicos: form.antecedentesPatologicos,
            antecedentes_quirurgicos: form.antecedentesQuirurgicos,
            antecedentes_farmacologicos: form.antecedentesFarmacologicos,
            antecedentes_alergicos: form.antecedentesAlergicos,
            antecedentes_toxicos: form.antecedentesToxicos,
            antecedentes_gineco_obstetricos: form.antecedentesGinecoObstetricos,
            antecedentes_otros: form.antecedentesOtros,
            anticoagulado: form.anticoagulado,
            en_dialisis: form.enDialisis,
            vih_sida: form.vihSida,
            en_embarazo: form.enEmbarazo,
            en_tratamiento_ca: form.enTratamientoCA,
            otros_riesgo: form.otrosRiesgo,
            motivo_consulta: form.motivoConsulta,
            onicomicosis: form.onicomicosis,
            onicogrifosis: form.onicogrifosis,
            onicocriptosis: form.onicocriptosis,
            resequedad: form.resequedad,
            exostosis: form.exostosis,
            edemas: form.edemas,
            hiperqueratosis: form.hiperqueratosis,
            verruga: form.verruga,
            talla: form.talla,
            tipo_pie: form.tipoPie,
            tratamiento_indicado: form.tratamientoIndicado,
            seguimiento: form.seguimiento,
          }),
        },
      );
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error((err as { message?: string }).message ?? "Error al guardar");
      }
      toast.success("Historia clínica actualizada");
      onClose();
      onSaved();
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : "Error inesperado");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900">Editar historia clínica</h2>
          <button onClick={onClose} className="rounded-full p-1.5 hover:bg-gray-100 transition">
            <XMarkIcon className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <div className="px-6 py-5 overflow-y-auto flex-1">
          <ClinicalInfoFields
            data={form}
            onChange={(field, value) => setForm((f) => ({ ...f, [field]: value }))}
            onDirty={() => {}}
          />
        </div>

        <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3 bg-white">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="px-5 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium disabled:opacity-50"
          >
            {isSaving ? "Guardando..." : "Guardar cambios"}
          </button>
        </div>
      </div>
    </div>
  );
}
