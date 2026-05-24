import { ChevronDownIcon } from "@heroicons/react/24/outline";

type Props = {
  label: string;
  count?: number;
  children: React.ReactNode;
};

export default function SectionDetails({ label, count, children }: Props) {
  return (
    <details className="rounded-2xl bg-white shadow-[0_4px_14px_-2px_rgba(5,150,105,0.25)] hover:shadow-[0_4px_18px_-2px_rgba(5,150,105,0.45)] transition-shadow duration-200 ring-1 ring-green-100 group">
      <summary className="cursor-pointer list-none px-4 py-3 rounded-t-2xl transition-colors">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-emerald-900">
            {label}
          </span>
          <div className="flex items-center gap-2">
            {count !== undefined && count > 0 && (
              <span className="flex items-center justify-center min-w-[24px] h-6 px-2 rounded-full bg-emerald-600 text-white text-xs font-bold shadow-sm">
                {count}
              </span>
            )}
            <ChevronDownIcon className="w-4 h-4 text-emerald-700 transition-transform duration-200 group-open:rotate-180" />
          </div>
        </div>
      </summary>
      <div className="px-4 pb-4 pt-2">{children}</div>
    </details>
  );
}
