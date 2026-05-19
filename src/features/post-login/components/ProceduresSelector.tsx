import { PROCEDURE_GROUPS, PROCEDURES } from "../data/procedures";

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
};

export default function ProceduresSelector({
  procedureItems,
  setProcedureItems,
  clearSubmitError,
}: ProceduresSelectorProps) {
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
    } else {
      setProcedureItems((prev) => [...prev, { item_name: label, price: "" }]);
    }
  };

  const getGroupCount = (groupProcedureIds: string[]) => {
    return groupProcedureIds.reduce((count, procedureId) => {
      const procedure = PROCEDURES.find((p) => p.id === procedureId);
      if (!procedure) return count;
      return procedureItems.some((item) => item.item_name === procedure.label)
        ? count + 1
        : count;
    }, 0);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4">
        {PROCEDURE_GROUPS.map((group) => (
          <details
            key={group.id}
            open={group.defaultOpen}
            className="rounded-2xl bg-white shadow-sm ring-1 ring-gray-100"
          >
            <summary className="cursor-pointer list-none px-4 py-3 bg-[#BF2496]/10 hover:bg-[#BF2496]/20 rounded-t-2xl transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-[#BF2496]">
                  {group.label}
                </span>

                {getGroupCount(group.procedureIds) > 0 && (
                  <span className="flex items-center justify-center min-w-[24px] h-6 px-2 rounded-full bg-[#BF2496] text-white text-xs font-bold shadow-sm">
                    {getGroupCount(group.procedureIds)}
                  </span>
                )}
              </div>
            </summary>

            <div className="px-4 pb-4">
              <div className="hidden sm:grid sm:grid-cols-[28px_1fr_200px] gap-3 border-y border-gray-100 py-2 text-xs font-semibold text-gray-500">
                <div />
                <div>Procedimiento / Producto</div>
                <div>Precio (COP)</div>
              </div>

              <div className="divide-y divide-gray-100">
                {group.procedureIds.map((procedureId) => {
                  const procedure = PROCEDURES.find(
                    (p) => p.id === procedureId,
                  );
                  if (!procedure) return null;

                  const checked = isSelected(procedure.label);
                  const priceValue = getPrice(procedure.label);
                  const pricePlaceholder = procedure.defaultPrice
                    ? `$ ${procedure.defaultPrice.toLocaleString("es-CO")}`
                    : "Precio en COP";

                  return (
                    <div
                      key={procedure.id}
                      className="grid grid-cols-1 sm:grid-cols-[28px_1fr_200px] gap-3 py-3 items-start"
                    >
                      <div className="pt-1">
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleItem(procedure.label)}
                          className="h-4 w-4 rounded border-gray-300 text-[#BF2496] focus:ring-[#BF2496]/30"
                        />
                      </div>

                      <div>
                        <label
                          className={`text-sm font-medium ${
                            checked ? "text-gray-900" : "text-gray-700"
                          }`}
                        >
                          {procedure.label}
                        </label>
                        {checked && procedure.additionalNote && (
                          <p className="text-[11px] text-amber-600 mt-1 leading-snug">
                            ⚠ {procedure.additionalNote}
                          </p>
                        )}
                      </div>

                      {checked ? (
                        <input
                          type="text"
                          value={priceValue}
                          onChange={handlePriceChange(procedure.label)}
                          className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-300"
                          placeholder={pricePlaceholder}
                        />
                      ) : (
                        <div className="text-sm text-gray-400">—</div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}
