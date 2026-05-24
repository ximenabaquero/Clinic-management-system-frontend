import {
  ClipboardDocumentListIcon,
  UserIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";

const STEP_ICONS = [
  <UserIcon key="0" className="h-4 w-4" />,
  <ClipboardDocumentListIcon key="1" className="h-4 w-4" />,
  <PlusCircleIcon key="2" className="h-4 w-4" />,
];

interface SidebarStepsProps {
  steps: { label: string; completed: boolean }[];
  currentStep: number;
  onStepClick?: (index: number) => void;
}

export default function SidebarSteps({
  steps,
  currentStep,
  onStepClick,
}: SidebarStepsProps) {
  return (
    <aside className="sticky top-10 rounded-3xl bg-white shadow-md border border-gray-100 p-6 min-h-[520px]">
      <div className="mb-6">
        <h3 className="text-2xl font-semibold text-gray-900 tracking-wide">
          Registro clínico
        </h3>
        <p className="text-sm text-gray-500 mt-1">
          Completa los pasos del formulario médico.
        </p>
      </div>

      <ol className="relative space-y-0">
        {steps.map((step, index) => {
          const isActive = index === currentStep;
          const isCompleted = step.completed;
          const showConnector = index < steps.length - 1;

          return (
            <li key={step.label} className="relative flex gap-4">
              {/* Columna izquierda: círculo + línea */}
              <div className="flex flex-col items-center">
                <span
                  className={[
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 text-sm font-semibold z-10",
                    isCompleted
                      ? "border-emerald-500 bg-emerald-500 text-white"
                      : isActive
                        ? "border-emerald-500 bg-white text-emerald-600"
                        : "border-gray-300 bg-white text-gray-400",
                  ].join(" ")}
                >
                  {isCompleted ? (
                    <svg
                      viewBox="0 0 20 20"
                      className="h-4 w-4"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    index + 1
                  )}
                </span>
                {showConnector && (
                  <span
                    className={[
                      "w-0.5 my-2",
                      isCompleted ? "bg-emerald-400" : "bg-gray-200",
                    ].join(" ")}
                    style={{ minHeight: "6rem" }}
                  />
                )}
              </div>

              {/* Columna derecha: etiqueta + botón */}
              <div className="pb-8 flex-1">
                <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400 mb-2">
                  Paso {index + 1}
                </p>
                <button
                  type="button"
                  onClick={() => onStepClick?.(index)}
                  className={[
                    "w-full text-left flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition",
                    isActive
                      ? "bg-emerald-50 text-emerald-700"
                      : "text-gray-600 hover:bg-gray-50",
                  ].join(" ")}
                >
                  <span
                    className={isActive ? "text-emerald-500" : "text-gray-400"}
                  >
                    {STEP_ICONS[index]}
                  </span>
                  {step.label}
                </button>
              </div>
            </li>
          );
        })}
      </ol>
    </aside>
  );
}
