import ValidatedInput from "@/components/ValidatedInput";
import PhoneInputField from "@/components/PhoneInputField";

export type CompanionData = {
  companionName: string;
  companionRelationship: string;
  companionCellphone: string;
};

export const INITIAL_COMPANION: CompanionData = {
  companionName: "",
  companionRelationship: "",
  companionCellphone: "",
};

interface Props {
  data: CompanionData;
  onChange: (field: keyof CompanionData, value: string) => void;
  onDirty?: () => void;
  /** Variante visual: 'modal' aplica estilos más compactos */
  variant?: "default" | "modal";
}

export default function CompanionFields({
  data,
  onChange,
  onDirty,
  variant = "default",
}: Props) {
  const set = (field: keyof CompanionData) => (value: string) => {
    onChange(field, value);
    onDirty?.();
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <ValidatedInput
          id="companionRelationship"
          label="Parentesco"
          placeholder="Ej. Madre, Esposo/a, Amigo/a"
          value={data.companionRelationship}
          onChange={set("companionRelationship")}
          required
          maxLength={80}
        />
        <PhoneInputField
          label="Celular del acompañante"
          variant={variant === "modal" ? "modal" : undefined}
          value={data.companionCellphone}
          onChange={set("companionCellphone")}
        />
      </div>
      <ValidatedInput
        id="companionName"
        label="Nombre del acompañante"
        placeholder="Nombre completo"
        value={data.companionName}
        onChange={set("companionName")}
        required
        maxLength={100}
      />
    </div>
  );
}
