import { XCircleIcon } from "@heroicons/react/24/outline";

interface Props {
  isLoading: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

/**
 * Confirmation modal for canceling a clinical record.
 * Extracted from PatientRecordDetail to keep the parent lean.
 */
export default function CancelRecordModal({
  isLoading,
  onClose,
  onConfirm,
}: Props) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900">Cancelar registro</h2>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 hover:bg-gray-100 transition"
            aria-label="Cerrar"
          >
            <XCircleIcon className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <div className="px-6 py-5">
          <p className="text-sm text-gray-600">
            ¿Está seguro que desea cancelar este registro clínico? Esta acción
            no se puede deshacer.
          </p>
        </div>

        <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition"
          >
            Volver
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="flex items-center gap-2 px-5 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium disabled:opacity-50"
          >
            <XCircleIcon className="h-4 w-4" />
            {isLoading ? "Cancelando..." : "Sí, cancelar"}
          </button>
        </div>
      </div>
    </div>
  );
}
