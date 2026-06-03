"use client";

import ValidatedInput from "@/components/ValidatedInput";

interface Props {
  password: string;
  passwordConfirmation: string;
  onPasswordChange: (val: string) => void;
  onConfirmChange: (val: string) => void;
}

export default function PasswordFields({
  password,
  passwordConfirmation,
  onPasswordChange,
  onConfirmChange,
}: Props) {
  return (
    <div className="border-t border-gray-100 pt-4 space-y-3">
      <p className="text-xs text-gray-400">
        Deja la contraseña en blanco si no deseas cambiarla.
      </p>

      <ValidatedInput
        id="password"
        label="Nueva contraseña"
        type="password"
        showToggle
        value={password}
        onChange={onPasswordChange}
        placeholder="Nueva contraseña"
      />

      {password && (
        <ul className="space-y-1 text-xs mt-1">
          <li
            className={`flex items-center gap-1.5 font-medium ${
              password.length >= 8 ? "text-emerald-600" : "text-red-500"
            }`}
          >
            <span>{password.length >= 8 ? "✓" : "✗"}</span>
            Mínimo 8 caracteres
          </li>
        </ul>
      )}

      <ValidatedInput
        id="password_confirmation"
        label="Confirmar contraseña"
        type="password"
        showToggle
        value={passwordConfirmation}
        onChange={onConfirmChange}
        placeholder="Repite la contraseña"
      />

      {password && passwordConfirmation && (
        <p
          className={`text-xs font-medium flex items-center gap-1.5 ${
            password === passwordConfirmation
              ? "text-emerald-600"
              : "text-red-500"
          }`}
        >
          <span>{password === passwordConfirmation ? "✓" : "✗"}</span>
          {password === passwordConfirmation
            ? "Las contraseñas coinciden"
            : "Las contraseñas no coinciden"}
        </p>
      )}
    </div>
  );
}
