// HorizontalSteps.tsx
// Stepper horizontal reutilizable — equivalente al SidebarSteps pero en fila.
// Responsabilidad única: presentación del progreso. Sin lógica de negocio.

import { CheckIcon } from "@heroicons/react/24/solid";

export interface Step {
  label: string;
  completed: boolean;
}

interface HorizontalStepsProps {
  steps: Step[];
  currentStep: number;
  onStepClick?: (index: number) => void;
}

export default function HorizontalSteps({
  steps,
  currentStep,
  onStepClick,
}: HorizontalStepsProps) {
  return (
    <nav aria-label="Pasos del formulario">
      <ol className="flex items-center w-full">
        {steps.map((step, index) => {
          const isActive = index === currentStep;
          const isCompleted = step.completed;
          const isLast = index === steps.length - 1;

          return (
            <li
              key={step.label}
              className={`flex items-center ${isLast ? "flex-none" : "flex-1"}`}
            >
              {/* ── Nodo ────────────────────────────────────────── */}
              <button
                type="button"
                onClick={() => onStepClick?.(index)}
                className="flex flex-col items-center gap-1.5 group focus:outline-none"
              >
                <span
                  className={[
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 text-xs font-bold transition-all duration-200",
                    isCompleted
                      ? "border-emerald-500 bg-emerald-500 text-white"
                      : isActive
                        ? "border-emerald-500 bg-white text-emerald-600 shadow-sm shadow-emerald-100"
                        : "border-gray-200 bg-white text-gray-400 group-hover:border-gray-300",
                  ].join(" ")}
                >
                  {isCompleted ? (
                    <CheckIcon className="h-4 w-4" />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </span>

                <span
                  className={[
                    "text-[10px] font-semibold uppercase tracking-wider whitespace-nowrap transition-colors duration-200",
                    isActive
                      ? "text-emerald-600"
                      : isCompleted
                        ? "text-emerald-500"
                        : "text-gray-400",
                  ].join(" ")}
                >
                  {step.label}
                </span>
              </button>

              {/* ── Conector ────────────────────────────────────── */}
              {!isLast && (
                <div className="flex-1 mx-3 mb-5">
                  <div
                    className={[
                      "h-0.5 w-full rounded-full transition-colors duration-300",
                      isCompleted ? "bg-emerald-400" : "bg-gray-100",
                    ].join(" ")}
                  />
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
