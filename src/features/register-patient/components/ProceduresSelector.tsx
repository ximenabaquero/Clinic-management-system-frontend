import { PROCEDURE_GROUPS, PROCEDURES } from "../data/procedures";
import SectionDetails from "./SectionDetails";
import ValidatedInput from "../../../components/ValidatedInput";

type ProcedureItem = {
  item_name: string;
  price: string;
};

type ProceduresSelectorProps = {
  procedureItems: ProcedureItem[];
  setProcedureItems: React.Dispatch<React.SetStateAction<ProcedureItem[]>>;
  procedureNotes: string;
  setProcedureNotes: React.Dispatch<React.SetStateAction<string>>;
  clearSubmitError: () => void;
  compact?: boolean; // ← nueva prop, false por defecto
};

export default function ProceduresSelector({
  procedureItems,
  setProcedureItems,
  procedureNotes,
  setProcedureNotes,
  clearSubmitError,
  compact = false,
}: ProceduresSelectorProps) {
  const gridCols = compact
    ? "grid-cols-[20px_1fr_180px]"
    : "sm:grid-cols-[28px_1fr_260px_220px]";

  const isSelected = (label: string) =>
    procedureItems.some((item) => item.item_name === label);

  const getPrice = (label: string) =>
    procedureItems.find((item) => item.item_name === label)?.price ?? "";

  const handlePriceChange =
    (itemName: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      let value = e.target.value;
      value = value.replace(/[^\d]/g, "");
      if (!value) {
        setProcedureItems((prev) =>
          prev.map((item) =>
            item.item_name === itemName ? { ...item, price: "" } : item,
          ),
        );
        return;
      }
      const numeric = Number(value);
      if (numeric < 0) return;
      const formatted = numeric.toLocaleString("es-CO");
      setProcedureItems((prev) =>
        prev.map((item) =>
          item.item_name === itemName ? { ...item, price: formatted } : item,
        ),
      );
    };

  const toggleItem = (label: string) => {
    clearSubmitError();

    if (isSelected(label)) {
      setProcedureItems((prev) =>
        prev.filter((item) => item.item_name !== label),
      );
      if (label.includes("Faja")) {
        setProcedureNotes((prev) => prev.replace(/Faja talla:.*(\n\n)?/, ""));
      }
      if (label.includes("Pierna")) {
        setProcedureNotes((prev) => prev.replace(/Pierna:.*(\n\n)?/, ""));
      }
    } else {
      setProcedureItems((prev) => [...prev, { item_name: label, price: "" }]);
    }
  };

  const handleFajaChange = (value: string) => {
    setProcedureNotes((prev) => {
      const clean = prev.replace(/Faja talla:.*(\n\n)?/, "");
      if (!clean) return `Faja talla: ${value}`;
      return `Faja talla: ${value}\n\n${clean}`;
    });
  };

  const handlePiernaChange = (interna: boolean, externa: boolean) => {
    let note = "";
    if (interna && externa) note = "Pierna: interna y externa";
    else if (interna) note = "Pierna: interna";
    else if (externa) note = "Pierna: externa";

    setProcedureNotes((prev) => {
      const clean = prev.replace(/Pierna:.*(\n\n)?/, "");
      if (!note) return clean;
      if (!clean) return note;
      return `${note}\n\n${clean}`;
    });
  };

  const getGroupCount = (groupProcedureIds: string[]) =>
    groupProcedureIds.reduce((count, procedureId) => {
      const procedure = PROCEDURES.find((p) => p.id === procedureId);
      if (!procedure) return count;
      return procedureItems.some((item) => item.item_name === procedure.label)
        ? count + 1
        : count;
    }, 0);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4">
        {PROCEDURE_GROUPS.map((group) => (
          <SectionDetails
            key={group.id}
            label={group.label}
            count={getGroupCount(group.procedureIds)}
          >
            <div
              className={`grid gap-3 border-y border-gray-100 py-2 text-xs font-semibold text-gray-500 ${
                compact
                  ? "grid-cols-[20px_1fr_160px_130px]"
                  : "hidden sm:grid sm:grid-cols-[28px_1fr_260px_220px]"
              }`}
            >
              <div />
              <div>Procedimiento</div>
              <div>Detalles</div>
              <div>Precio (COP)</div>
            </div>

            <div className="divide-y divide-gray-100">
              {group.procedureIds.map((procedureId) => {
                const procedure = PROCEDURES.find((p) => p.id === procedureId);
                if (!procedure) return null;

                const checked = isSelected(procedure.label);
                const priceValue = getPrice(procedure.label);

                const isFaja = procedure.id === "faja_postoperatoria";
                const isPierna = procedure.id === "pierna";

                const fajaDetalle = procedureNotes.includes("Faja talla:");
                const piernaInterna =
                  procedureNotes.includes("Pierna: interna");
                const piernaExterna =
                  procedureNotes.includes("Pierna: externa");
                const piernaAmbas =
                  procedureNotes.includes("interna y externa");
                const piernaDetalle =
                  piernaInterna || piernaExterna || piernaAmbas;

                const disablePrice =
                  (isFaja && !fajaDetalle) || (isPierna && !piernaDetalle);

                return (
                  <div
                    key={procedure.id}
                    className={`grid gap-3 py-3 items-center ${
                      compact
                        ? "grid-cols-[20px_1fr_160px_130px]"
                        : "grid-cols-1 sm:grid-cols-[28px_1fr_260px_220px]"
                    }`}
                  >
                    <div className="pt-1">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleItem(procedure.label)}
                        className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500/30"
                      />
                    </div>

                    <label
                      className={`text-sm font-medium ${
                        checked ? "text-gray-900" : "text-gray-700"
                      }`}
                    >
                      {procedure.label}
                    </label>

                    <>
                      {checked ? (
                        <>
                          {isFaja ? (
                            <input
                              type="text"
                              onChange={(e) => handleFajaChange(e.target.value)}
                              className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900"
                              placeholder="Talla (Ej. S / M / L)"
                            />
                          ) : isPierna ? (
                            <div className="flex gap-4">
                              <label className="flex items-center gap-2 text-sm text-gray-700">
                                <input
                                  type="checkbox"
                                  checked={piernaInterna || piernaAmbas}
                                  onChange={(e) =>
                                    handlePiernaChange(
                                      e.target.checked,
                                      piernaExterna,
                                    )
                                  }
                                  className="h-4 w-4 rounded border-gray-300"
                                />
                                Interna
                              </label>
                              <label className="flex items-center gap-2 text-sm text-gray-700">
                                <input
                                  type="checkbox"
                                  checked={piernaExterna || piernaAmbas}
                                  onChange={(e) =>
                                    handlePiernaChange(
                                      piernaInterna,
                                      e.target.checked,
                                    )
                                  }
                                  className="h-4 w-4 rounded border-gray-300"
                                />
                                Externa
                              </label>
                            </div>
                          ) : (
                            <div className="text-sm text-gray-500">—</div>
                          )}
                        </>
                      ) : (
                        <div className="text-sm text-gray-400">—</div>
                      )}
                    </>

                    {checked ? (
                      <input
                        type="text"
                        value={priceValue}
                        onChange={handlePriceChange(procedure.label)}
                        disabled={disablePrice}
                        className={`rounded-xl border px-3 py-2 text-sm min-w-0 w-full ${
                          disablePrice
                            ? "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
                            : "bg-white border-gray-200 text-gray-900"
                        }`}
                        placeholder="Precio en COP"
                      />
                    ) : (
                      <div className="text-sm text-gray-400">—</div>
                    )}
                  </div>
                );
              })}
            </div>
          </SectionDetails>
        ))}
        <div className="mt-6">
          <ValidatedInput
            id="procedure_notes"
            label="Notas clínicas del procedimiento"
            as="textarea"
            rows={4}
            required
            value={procedureNotes}
            onChange={(val) => {
              setProcedureNotes(val);
              clearSubmitError();
            }}
            maxLength={500}
            placeholder="Notas relevantes sobre el procedimiento, como recomendaciones o cualquier información adicional que el profesional deba tener en cuenta."
          />
          <p className="text-[11px] text-gray-400 mt-1.5 pl-0.5">
            Máximo 500 caracteres · {procedureNotes.length}/500
          </p>
        </div>
      </div>
    </div>
  );
}
