import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

type ValidatedInputProps = {
  id: string;
  label: string;
  placeholder?: string;
  type?: string;
  maxLength?: number;
  min?: number;
  max?: number;
  required?: boolean;
  value: string | number;
  onChange: (val: string) => void;
  maxErrorMessage?: string;
  clampToMin?: boolean;
  onBlur?: () => void;
  as?: "input" | "textarea";
  rows?: number;
  showToggle?: boolean;
  autoFocus?: boolean;
};

export default function ValidatedInput({
  id,
  label,
  placeholder,
  type = "text",
  maxLength,
  min,
  max,
  required = false,
  value,
  onChange,
  maxErrorMessage,
  clampToMin = false,
  onBlur,
  as = "input",
  rows = 3,
  showToggle = false,
  autoFocus = false,
}: ValidatedInputProps) {
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const effectiveType =
    showToggle && type === "password"
      ? showPassword
        ? "text"
        : "password"
      : type;

  const baseClassName = `mt-1 w-full rounded-xl border bg-white px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 ${
    error
      ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
      : "border-gray-200 focus:border-emerald-400 focus:ring-emerald-500/20"
  }`;

  const validate = (val: string) => {
    if (maxLength && val.length > maxLength) {
      setError(`Máximo ${maxLength} caracteres.`);
      return;
    }

    if (type === "number" && val !== "") {
      const num = Number(val.replace(",", "."));
      const unidades: Record<string, string> = {
        age: "años",
        weight: "kg",
        height: "m",
      };
      const unidad = unidades[id] ?? "";
      const range = `Rango permitido: ${min} a ${max} ${unidad}`.trim() + ".";

      if (min !== undefined && num < min) {
        setError(range);
      } else if (max !== undefined && num > max) {
        setError(maxErrorMessage ?? range);
      } else {
        setError("");
      }
      return;
    }

    setError("");
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    // Bloquea valores negativos en inputs numéricos
    if (type === "number" && val.startsWith("-")) return;
    validate(val);
    onChange(val);
    // ─── clamp eliminado de aquí ───────────────────────────
  };

  const handleChangeTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    validate(val);
    onChange(val);
  };

  // Clamp solo al salir del campo — no interrumpe la escritura
  const handleBlur = () => {
    if (clampToMin && type === "number" && min !== undefined) {
      const str = String(value).replace(",", ".");
      // ✅ Solo clampear si el campo tiene algo escrito
      if (str === "" || str === "-") {
        onBlur?.();
        return;
      }
      const num = Number(str);
      if (!isNaN(num) && num < min) {
        onChange(String(min));
        setError("");
      }
      if (max !== undefined && !isNaN(num) && num > max) {
        onChange(String(max));
        setError("");
      }
    }
    onBlur?.();
  };

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>

      {as === "textarea" ? (
        <textarea
          id={id}
          required={required}
          value={value}
          onChange={handleChangeTextarea}
          onBlur={onBlur}
          placeholder={placeholder}
          rows={rows}
          autoFocus={autoFocus}
          className={`${baseClassName} resize-none`}
        />
      ) : showToggle ? (
        <div className="relative">
          <input
            id={id}
            required={required}
            type={effectiveType}
            value={value}
            onChange={handleChangeInput}
            onBlur={handleBlur}
            placeholder={placeholder}
            autoFocus={autoFocus}
            min={type === "number" ? (min ?? 0) : undefined}
            className={`${baseClassName} pr-10`}
          />
          <button
            type="button"
            onClick={() => setShowPassword((p) => !p)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            tabIndex={-1}
          >
            {showPassword ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </button>
        </div>
      ) : (
        <input
          id={id}
          required={required}
          type={type}
          value={value}
          onChange={handleChangeInput}
          onBlur={handleBlur}
          placeholder={placeholder}
          autoFocus={autoFocus}
          min={type === "number" ? (min ?? 0) : undefined}
          className={baseClassName}
        />
      )}

      {error && (
        <p className="text-[10px] uppercase font-semibold tracking-wider text-red-500 mt-1">
          {error}
        </p>
      )}
    </div>
  );
}
