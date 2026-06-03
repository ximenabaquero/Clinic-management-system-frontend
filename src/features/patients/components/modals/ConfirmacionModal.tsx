"use client";

import { useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import { XMarkIcon, CheckCircleIcon, ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/+$/, "");

const RECOMENDACIONES = [
  "Los resultados del procedimiento menor varía de acuerdo a los cuidados post-operatorios y a la actitud en el procedimiento, por lo tanto es posible que queden algunas zonas con depósitos de grasa.",
  "Las asimetría, inflamación, endurecimiento, ardor, molestias, hematomas, mareo, salida de líquidos por los abordajes son normales en el proceso post-operatorio.",
  "En caso de no consumir azúcar en la alimentación diaria se debe informar antes del procedimiento.",
  "El uso de medicamentos post-operatorios son obligatorios.",
  "El día del procedimiento y los días de los manejos post-operatorios se debe asistir con un solo acompañante.",
  "Los resultados se verán en su totalidad en tres meses.",
  "En caso de requerir una segunda sesión tendrá un costo adicional.",
  "Para la asistencia al procedimiento y a las sesiones post-operatorios se requiere un riguroso aseo personal: tórax, axilas, zona inguinal y genital, zona glútea, pies, cabello y limpieza bucal.",
  "Es obligatorio el uso de la faja por 3 meses para optimizar el resultado.",
  "El manejo de los drenajes post-operatorios debe realizarse con personal preparado y recomendado por nuestro grupo de trabajo, para el seguimiento y buen resultado del procedimiento.",
  "No fumar ni consumir bebidas alcohólicas por 3 meses.",
  "No exponer la piel al sol de forma directa por 3 meses.",
  "Los resultados del procedimiento no se pueden generalizar por las diferencias de piel y estructura de cada paciente.",
  "El mareo y aun desmayo es un episodio normal en los primeros tres días post-procedimiento, por lo tanto se recomienda una excelente nutrición a las horas indicadas antes y después del procedimiento.",
  "Recuerde que la actitud y los aspectos psico-emocionales tienen una importante repercusión en los efectos post-procedimiento.",
  "Este es un procedimiento menor por lo que no cuenta con póliza de seguro.",
  "Riesgos y complicaciones: hematomas, fibrosis, flacidez, adiposidad, queloides, seromas, infecciones y asimetrías.",
];

type Props = {
  evaluationId: number;
  patientName: string;
  patientCedula: string;
  onClose: () => void;
  onConfirmed: () => void;
};

function DocHeader() {
  return (
    <div className="text-center mb-5 pb-4 border-b border-emerald-100">
      <p className="text-base font-extrabold text-emerald-700 tracking-tight">
        Cold Esthetic Reform
      </p>
      <p className="text-xs text-gray-400 italic mt-0.5">
        Realiza tus sueños de una forma segura
      </p>
    </div>
  );
}

export default function ConfirmacionModal({
  evaluationId,
  patientName,
  patientCedula,
  onClose,
  onConfirmed,
}: Props) {
  const [step, setStep] = useState<1 | 2>(1);
  const [isConfirming, setIsConfirming] = useState(false);
  const sigCanvasRef = useRef<SignatureCanvas | null>(null);

  const today = new Date();
  const fechaStr = today.toLocaleDateString("es-CO", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const handleClose = () => {
    setStep(1);
    sigCanvasRef.current?.clear();
    onClose();
  };

  const handleConfirmar = async () => {
    if (!sigCanvasRef.current || sigCanvasRef.current.isEmpty()) {
      toast.error("La firma es obligatoria");
      return;
    }

    const signature = sigCanvasRef.current.toDataURL("image/png");
    setIsConfirming(true);
    const token = Cookies.get("XSRF-TOKEN") ?? "";

    try {
      const res = await fetch(
        `${apiBaseUrl}/api/v1/medical-evaluations/${evaluationId}/confirmar`,
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "X-XSRF-TOKEN": token,
          },
          body: JSON.stringify({
            terms_accepted: true,
            patient_signature: signature,
          }),
        },
      );
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error((err as { message?: string }).message ?? "Error al confirmar");
      }
      toast.success("Valoración confirmada");
      handleClose();
      onConfirmed();
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : "Error inesperado");
    } finally {
      setIsConfirming(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && handleClose()}
    >
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">

        {/* ── Header ──────────────────────────────────────────────────────── */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 shrink-0">
          <div>
            <h2 className="text-base font-bold text-gray-900">
              Confirmar valoración
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">
              Paso {step} de 2 — {step === 1 ? "Recomendaciones" : "Consentimiento informado"}
            </p>
          </div>
          <button onClick={handleClose} className="rounded-full p-1.5 hover:bg-gray-100 transition">
            <XMarkIcon className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* ── Barra de progreso ────────────────────────────────────────────── */}
        <div className="h-1 bg-gray-100 shrink-0">
          <div
            className="h-1 bg-emerald-500 transition-all duration-300"
            style={{ width: step === 1 ? "50%" : "100%" }}
          />
        </div>

        {/* ── Cuerpo ──────────────────────────────────────────────────────── */}
        <div className="overflow-y-auto flex-1 px-6 py-5">

          {/* ══ PASO 1: RECOMENDACIONES ══════════════════════════════════════ */}
          {step === 1 && (
            <div className="space-y-4">
              <DocHeader />

              <h3 className="text-sm font-extrabold text-gray-800 uppercase tracking-wide text-center">
                Recomendaciones
              </h3>

              <ol className="space-y-2.5">
                {RECOMENDACIONES.map((rec, i) => (
                  <li key={i} className="flex gap-2.5 text-sm text-gray-700 leading-relaxed">
                    <span className="shrink-0 font-bold text-emerald-600 w-5 text-right">
                      {i + 1})
                    </span>
                    <span>{rec}</span>
                  </li>
                ))}
              </ol>

              {/* Declaración */}
              <div className="mt-6 pt-5 border-t border-gray-200 space-y-3 text-sm text-gray-700">
                <p>
                  <span className="font-semibold">Yo</span>{" "}
                  <span className="inline-block border-b border-gray-400 min-w-[160px] font-medium text-gray-900">
                    {patientName}
                  </span>{" "}
                  <span className="font-semibold">con C.C.</span>{" "}
                  <span className="inline-block border-b border-gray-400 min-w-[120px] font-medium text-gray-900">
                    {patientCedula}
                  </span>
                </p>
                <p className="leading-relaxed text-gray-600">
                  Declaro que toda la información suministrada es verdadera por
                  lo tanto renuncio mediante este documento, a cualquier acción
                  legal o jurídica, me comprometo a seguir las recomendaciones
                  del procedimiento realizado condiciones, riesgos y
                  complicaciones que están inscritas en este documento.
                </p>
              </div>
            </div>
          )}

          {/* ══ PASO 2: CONSENTIMIENTO INFORMADO ════════════════════════════ */}
          {step === 2 && (
            <div className="space-y-4">
              <DocHeader />

              <h3 className="text-sm font-extrabold text-gray-800 uppercase tracking-wide text-center leading-snug">
                Consentimiento Informado y Declaración sobre el<br />
                Procedimiento de Lipólisis Láser
              </h3>

              <div className="text-sm text-gray-700 space-y-3 leading-relaxed">
                <p>
                  Yo,{" "}
                  <span className="font-semibold text-gray-900">{patientName}</span>
                  , identificado(a) con ID No.{" "}
                  <span className="font-semibold text-gray-900">{patientCedula}</span>
                  , declaro haber sido informado(a) de manera clara y detallada
                  sobre el procedimiento de Lipólisis Láser realizado en Cold
                  Esthetic Reform.
                </p>
                <p>
                  Entiendo que este es un procedimiento único, es decir, su
                  valor incluye únicamente una sesión. En caso de requerir una
                  segunda sesión, ya sea por indicación profesional o por
                  decisión personal, esta tendrá un costo adicional, que será
                  informado y acordado previamente.
                </p>
                <p>
                  Reconozco que los resultados pueden variar según las
                  condiciones individuales, y que la repetición del
                  procedimiento no está incluida en el valor inicial. Acepto
                  seguir las recomendaciones dadas por el profesional tratante.
                </p>
                <p>
                  Con mi firma, acepto y autorizo que este documento se anexe a
                  mi historia clínica.
                </p>
              </div>

              {/* Firma */}
              <div className="pt-2">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-bold uppercase tracking-wide text-gray-400">
                    Firma del Paciente
                  </p>
                  <button
                    type="button"
                    onClick={() => sigCanvasRef.current?.clear()}
                    className="text-xs text-gray-400 hover:text-red-500 transition"
                  >
                    Limpiar
                  </button>
                </div>
                <div className="border-2 border-dashed border-gray-300 rounded-xl overflow-hidden bg-gray-50">
                  <SignatureCanvas
                    ref={sigCanvasRef}
                    penColor="#1f2937"
                    canvasProps={{
                      className: "w-full",
                      style: { height: "160px", width: "100%" },
                    }}
                    backgroundColor="rgb(249,250,251)"
                  />
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  Firme dentro del recuadro con el ratón o el dedo.
                </p>
              </div>

              {/* Fecha */}
              <div className="flex items-center gap-2 text-sm text-gray-600 pt-1">
                <span className="font-semibold">Fecha:</span>
                <span className="font-medium text-gray-800">{fechaStr}</span>
              </div>
            </div>
          )}
        </div>

        {/* ── Footer ──────────────────────────────────────────────────────── */}
        <div className="px-6 py-4 border-t border-gray-100 flex justify-between gap-3 shrink-0">
          {step === 1 ? (
            <>
              <button
                onClick={handleClose}
                className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition"
              >
                Cancelar
              </button>
              <button
                onClick={() => setStep(2)}
                className="flex items-center gap-2 px-5 py-2 text-sm bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition font-medium"
              >
                Siguiente
                <ChevronRightIcon className="h-4 w-4" />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setStep(1)}
                disabled={isConfirming}
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition disabled:opacity-50"
              >
                <ChevronLeftIcon className="h-4 w-4" />
                Atrás
              </button>
              <button
                onClick={handleConfirmar}
                disabled={isConfirming}
                className="flex items-center gap-2 px-5 py-2 text-sm bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition font-medium disabled:opacity-50"
              >
                <CheckCircleIcon className="h-4 w-4" />
                {isConfirming ? "Confirmando..." : "Confirmar valoración"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
