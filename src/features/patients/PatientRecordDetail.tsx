"use client";

import { useRef, useState } from "react";
import useSWR from "swr";
import { useRouter } from "next/navigation";
import MainLayout from "@/layouts/MainLayout";
import {
  CheckCircleIcon,
  XCircleIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";

import RegisterHeaderBar from "../register-patient/components/RegisterHeaderBar";
import BackButton from "../../components/BackButton";
import AuthGuard from "@/components/AuthGuard";
import ClinicalRecordView from "./components/clinical-record/ClinicalRecordView";
import ConfirmacionModal from "./components/modals/ConfirmacionModal";
import EditarEvaluacionModal from "./components/modals/EditarEvaluacionModal";
import EditarProcedimientoModal from "./components/modals/EditarProcedimientoModal";
import PatientPhotosSection from "./components/PatientPhotosSection";
import UsageForm from "@/features/inventory/components/usage/UsageForm";
import InvoicePdf from "./components/pdf/InvoicePdf";
import HistoriaClinicaPdf from "./components/pdf/HistoriaClinicaPdf";
import ExportDropdown from "@/components/ExportDropdown";
import CancelRecordModal from "./components/modals/CancelRecordModal";

import { useEvaluationStatus } from "./hooks/useEvaluationStatus";
import { exportElementToPDF } from "@/utils/exportPDF";
import { STATUS_CONFIG } from "./services/constants";
import type { InventoryProduct } from "@/features/inventory/types";
import type { Procedure, FullRecord } from "./types";
import { RecordAuditBanner } from "./components/clinical-record/ui";
import { ROUTES } from "@/lib/routes";

// ─── Constants ────────────────────────────────────────────────────────────────

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/+$/, "");
const CURRENT_YEAR = new Date().getFullYear();

const fetcher = (url: string) =>
  fetch(url, {
    credentials: "include",
    headers: { Accept: "application/json" },
  }).then((res) => res.json());

// ─── Types ────────────────────────────────────────────────────────────────────

interface Props {
  patientId: number;
  evaluationId: number;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function PatientRecordDetail({
  patientId,
  evaluationId,
}: Props) {
  const router = useRouter();

  // ── Refs for PDF export ────────────────────────────────────────────────────
  const historiaRef = useRef<HTMLDivElement>(null);
  const invoiceRef = useRef<HTMLDivElement>(null);

  // ── Modal state ────────────────────────────────────────────────────────────
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showEditEval, setShowEditEval] = useState(false);
  const [editingProc, setEditingProc] = useState<Procedure | null>(null);
  const [showUsageForm, setShowUsageForm] = useState(false);

  // ── Data fetching ──────────────────────────────────────────────────────────
  const { data, error, isLoading, mutate } = useSWR<{ data: FullRecord }>(
    evaluationId
      ? `${apiBaseUrl}/api/v1/patients/${patientId}/clinical-records/${evaluationId}`
      : null,
    fetcher,
  );

  const { data: productsData } = useSWR<{ data: InventoryProduct[] }>(
    `${apiBaseUrl}/api/v1/inventory/products`,
    fetcher,
  );

  // ── Business logic ─────────────────────────────────────────────────────────
  const { isChangingStatus, changeStatus } = useEvaluationStatus(
    evaluationId,
    mutate,
  );

  // ── Loading / error states ─────────────────────────────────────────────────
  if (isLoading || (!error && !data?.data?.evaluation)) {
    return (
      <MainLayout>
        <p className="text-center py-10">Cargando historial...</p>
      </MainLayout>
    );
  }

  if (error || !data?.data?.evaluation) {
    return (
      <MainLayout>
        <div className="p-4 bg-red-50 text-red-600 rounded-lg">
          Error al cargar datos del paciente.
        </div>
      </MainLayout>
    );
  }

  const record: FullRecord = data.data;
  const { status } = record.evaluation;
  const isConfirmed = status === "CONFIRMADO";
  const isCanceled = status === "CANCELADO";
  const products: InventoryProduct[] = productsData?.data ?? [];

  // ── Helpers ────────────────────────────────────────────────────────────────
  const exportItems = [
    {
      label: "Imprimir factura",
      onClick: () => {
        if (invoiceRef.current)
          exportElementToPDF(
            invoiceRef.current,
            `factura-paciente-${patientId}.pdf`,
          );
      },
    },
    {
      label: "Exportar historia clínica",
      onClick: () => {
        if (historiaRef.current)
          exportElementToPDF(
            historiaRef.current,
            `historia-clinica-paciente-${patientId}.pdf`,
          );
      },
    },
  ];

  return (
    <AuthGuard>
      <MainLayout>
        <div className="bg-gradient-to-b from-emerald-50 via-white to-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="max-w-5xl mx-auto">
              <RegisterHeaderBar
                onStatsClick={() => router.push(ROUTES.stats)}
                onImagesClick={() => router.push(ROUTES.controlImages)}
                onPatientsClick={() => router.push(ROUTES.patients)}
                onBackToRegisterClick={() =>
                  router.push(ROUTES.registerPatient)
                }
                onRemitentesClick={() => router.push(ROUTES.adminRemitentes)}
                onInventoryClick={() => router.push(ROUTES.inventory)}
                active="patients"
              />

              <h1 className="mt-3 text-2xl sm:text-3xl font-bold text-gray-900">
                Registro clínico del paciente
              </h1>
              <p className="mt-2 text-sm text-gray-600">
                Historial médico con procedimientos, notas clínicas y costos
                asociados.
              </p>

              {/* ── Toolbar ──────────────────────────────────────────── */}
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 mb-6">
                <BackButton />
                <div className="flex flex-wrap items-center gap-2">
                  <StatusSegmentedControl
                    status={status}
                    isChangingStatus={isChangingStatus}
                    onConfirm={() => setShowConfirmModal(true)}
                    onCancel={() => setShowCancelModal(true)}
                  />
                  <ExportDropdown items={exportItems} />
                </div>
              </div>

              {/*Banner + boton registro consumo */}
              <div className="flex items-center justify-between gap-4 mb-3 w-full">
                <div className="flex-1 min-w-0">
                  <RecordAuditBanner record={record} />
                </div>

                <button
                  onClick={() => isConfirmed && setShowUsageForm(true)}
                  disabled={!isConfirmed}
                  title={
                    !isConfirmed
                      ? "Solo disponible cuando el registro está confirmado"
                      : undefined
                  }
                  className={`-mt-2 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-xl transition-all duration-200 shrink-0 ${
                    isConfirmed
                      ? "text-white bg-gradient-to-r from-indigo-600 to-teal-500 shadow-md shadow-indigo-200 hover:from-indigo-700 hover:to-teal-600 cursor-pointer"
                      : "text-white bg-gradient-to-r from-indigo-600/30 to-teal-500/30 opacity-50 border border-indigo-200/30 cursor-not-allowed pointer-events-auto"
                  }`}
                >
                  <PlusIcon className="w-4 h-4" />
                  <span>Registrar consumo</span>
                </button>
              </div>

              {/* ── Main record view ─────────────────────────────────── */}
              <ClinicalRecordView
                record={record}
                currentYear={CURRENT_YEAR}
                onEditEval={() => setShowEditEval(true)}
                onEditProc={(proc) => setEditingProc(proc)}
              />

              <div className="mt-6">
                <PatientPhotosSection evaluationId={evaluationId} />
              </div>
            </div>
          </div>
        </div>

        {/* ── Modals ────────────────────────────────────────────────────────── */}

        {showUsageForm && (
          <UsageForm
            products={products}
            mode="CON_PACIENTE"
            medicalEvaluationId={evaluationId}
            onClose={() => setShowUsageForm(false)}
            onSaved={mutate}
          />
        )}

        {showCancelModal && (
          <CancelRecordModal
            isLoading={isChangingStatus}
            onClose={() => setShowCancelModal(false)}
            onConfirm={() => {
              setShowCancelModal(false);
              changeStatus("cancelar");
            }}
          />
        )}

        {showConfirmModal && (
          <ConfirmacionModal
            evaluationId={evaluationId}
            patientName={`${record.snapshot.first_name} ${record.snapshot.last_name}`}
            patientCedula={record.snapshot.cedula}
            onClose={() => setShowConfirmModal(false)}
            onConfirmed={mutate}
          />
        )}

        {showEditEval && (
          <EditarEvaluacionModal
            evaluationId={evaluationId}
            initialData={{
              weight: String(record.evaluation.weight ?? ""),
              height: String(record.evaluation.height ?? ""),
              medical_background: record.evaluation.medical_background ?? "",
            }}
            onClose={() => setShowEditEval(false)}
            onSaved={mutate}
          />
        )}

        {editingProc !== null && (
          <EditarProcedimientoModal
            procedureId={editingProc.id}
            initialData={{
              notes: editingProc.notes ?? "",
              items: editingProc.items.map((i) => ({
                id: i.id,
                item_name: i.item_name,
                price: Math.round(parseFloat(String(i.price))).toLocaleString(
                  "es-CO",
                ),
              })),
            }}
            onClose={() => setEditingProc(null)}
            onSaved={mutate}
          />
        )}

        {/* ── Hidden PDF targets ─────────────────────────────────────────────── */}
        <InvoicePdf
          ref={invoiceRef}
          record={record}
          evaluationId={evaluationId}
          currentYear={CURRENT_YEAR}
        />
        <HistoriaClinicaPdf
          ref={historiaRef}
          record={record}
          evaluationId={evaluationId}
          currentYear={CURRENT_YEAR}
        />
      </MainLayout>
    </AuthGuard>
  );
}

// ─── StatusSegmentedControl ───────────────────────────────────────────────────
// Component for confirming or canceling the evaluation, with visual feedback on the current status.

type SegmentedControlProps = {
  status: FullRecord["evaluation"]["status"];
  isChangingStatus: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

function StatusSegmentedControl({
  status,
  isChangingStatus,
  onConfirm,
  onCancel,
}: SegmentedControlProps) {
  const isConfirmed = status === "CONFIRMADO";
  const isCanceled = status === "CANCELADO";

  return (
    <div className="flex items-center rounded-xl border border-gray-200 bg-white shadow-sm p-1 gap-1">
      {/* En espera — display only */}
      <div
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
          status === "EN_ESPERA"
            ? STATUS_CONFIG.EN_ESPERA.segmented
            : "text-gray-400 opacity-50"
        }`}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
        En espera
      </div>

      <div className="w-px h-4 bg-gray-200" />

      <button
        onClick={() => !isConfirmed && onConfirm()}
        disabled={isChangingStatus || isConfirmed}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
          isConfirmed
            ? STATUS_CONFIG.CONFIRMADO.segmented
            : "text-gray-400 hover:bg-emerald-50 hover:text-emerald-600 disabled:opacity-50"
        }`}
      >
        <CheckCircleIcon className="h-3.5 w-3.5" />
        Confirmar
      </button>

      <div className="w-px h-4 bg-gray-200" />

      <button
        onClick={() => !isCanceled && onCancel()}
        disabled={isChangingStatus || isCanceled}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
          isCanceled
            ? STATUS_CONFIG.CANCELADO.segmented
            : "text-gray-400 hover:bg-red-50 hover:text-red-500 disabled:opacity-50"
        }`}
      >
        <XCircleIcon className="h-3.5 w-3.5" />
        Cancelar
      </button>
    </div>
  );
}
