"use client";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useAuth } from "@/features/auth/AuthContext";
import ValidatedInput from "@/components/ValidatedInput";
import PasswordFields from "@/components/PasswordFields";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/+$/, "");

interface Props {
  onClose: () => void;
}

interface AdminProfile {
  first_name: string;
  last_name: string;
  email: string;
}

export default function EditarPerfilAdminModal({ onClose }: Props) {
  const { user, checkSession } = useAuth();

  const [form, setForm] = useState<AdminProfile>({
    first_name: "",
    last_name: "",
    email: "",
  });
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await fetch(`${apiBaseUrl}/api/v1/me`, {
          credentials: "include",
          headers: { Accept: "application/json" },
        });
        if (!res.ok) throw new Error();
        const data = await res.json();
        setForm({
          first_name: data.first_name ?? "",
          last_name: data.last_name ?? "",
          email: data.email ?? "",
        });
      } catch {
        toast.error("No se pudo cargar el perfil");
      } finally {
        setLoadingProfile(false);
      }
    }
    fetchProfile();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!form.first_name.trim() || !form.last_name.trim()) {
      toast.error("El nombre y apellidos son obligatorios");
      return;
    }
    if (!form.email.trim()) {
      toast.error("El correo es obligatorio");
      return;
    }
    if (password && password !== passwordConfirmation) {
      toast.error("Las contraseñas no coinciden");
      return;
    }
    if (password && password.length < 8) {
      toast.error("La contraseña debe tener al menos 8 caracteres");
      return;
    }

    setIsSubmitting(true);
    const token = Cookies.get("XSRF-TOKEN") ?? "";

    const payload: Record<string, string> = {
      first_name: form.first_name.trim(),
      last_name: form.last_name.trim(),
      email: form.email.trim(),
    };
    if (password) {
      payload.password = password;
      payload.password_confirmation = passwordConfirmation;
    }

    try {
      const res = await fetch(`${apiBaseUrl}/api/v1/admin/${user!.id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-XSRF-TOKEN": token,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        const msg =
          err.data?.message ||
          (err.errors && Object.values(err.errors).flat().join(". ")) ||
          err.message ||
          "Error al actualizar el perfil";
        throw new Error(msg);
      }

      toast.success("Perfil actualizado correctamente");
      await checkSession();
      onClose();
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : "Error inesperado");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div>
            <h2 className="text-base font-bold text-gray-900">Editar perfil</h2>
            <p className="text-xs text-gray-500 mt-0.5">
              {loadingProfile
                ? (user?.name ?? "Administrador")
                : `${form.first_name} ${form.last_name}`.trim() || (user?.name ?? "Administrador")}
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 hover:bg-gray-100 transition"
          >
            <XMarkIcon className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Body */}
        {loadingProfile ? (
          <div className="px-6 py-10 flex justify-center">
            <div className="h-6 w-6 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin" />
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
            <ValidatedInput
              id="first_name"
              label="Nombre *"
              type="text"
              value={form.first_name}
              onChange={(val) => setForm((f) => ({ ...f, first_name: val }))}
              maxLength={50}
              required
              placeholder="Nombre"
            />

            <ValidatedInput
              id="last_name"
              label="Apellidos *"
              type="text"
              value={form.last_name}
              onChange={(val) => setForm((f) => ({ ...f, last_name: val }))}
              maxLength={50}
              required
              placeholder="Apellidos"
            />

            <ValidatedInput
              id="email"
              label="Correo electrónico *"
              type="email"
              value={form.email}
              onChange={(val) => setForm((f) => ({ ...f, email: val }))}
              maxLength={100}
              required
              placeholder="correo@ejemplo.com"
            />

            {/* Contraseña */}
            <PasswordFields
              password={password}
              passwordConfirmation={passwordConfirmation}
              onPasswordChange={setPassword}
              onConfirmChange={setPasswordConfirmation}
            />

            {/* Footer */}
            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                disabled={isSubmitting}
                className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition disabled:opacity-50"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-5 py-2 text-sm bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition font-medium disabled:opacity-50"
              >
                {isSubmitting ? "Guardando..." : "Guardar cambios"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
