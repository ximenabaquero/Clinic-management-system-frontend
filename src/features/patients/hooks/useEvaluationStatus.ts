"use client";

import { useState } from "react";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/+$/, "");

type StatusAction = "confirmar" | "cancelar";

interface UseEvaluationStatusReturn {
  isChangingStatus: boolean;
  changeStatus: (action: StatusAction) => Promise<void>;
}

/**
 * Encapsulates the logic for confirming/canceling a medical evaluation,
 * including API call, optimistic feedback, and error handling.
 */
export function useEvaluationStatus(
  evaluationId: number,
  onSuccess: () => void,
): UseEvaluationStatusReturn {
  const [isChangingStatus, setIsChangingStatus] = useState(false);

  const changeStatus = async (action: StatusAction): Promise<void> => {
    setIsChangingStatus(true);
    const token = Cookies.get("XSRF-TOKEN") ?? "";

    try {
      const res = await fetch(
        `${apiBaseUrl}/api/v1/medical-evaluations/${evaluationId}/${action}`,
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            "X-XSRF-TOKEN": token,
            Accept: "application/json",
          },
        },
      );

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(
          (err as { message?: string }).message ?? "Error al cambiar estado",
        );
      }

      toast.success(
        action === "confirmar"
          ? "Valoración confirmada"
          : "Valoración cancelada",
      );
      onSuccess();
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : "Error inesperado");
    } finally {
      setIsChangingStatus(false);
    }
  };

  return { isChangingStatus, changeStatus };
}
