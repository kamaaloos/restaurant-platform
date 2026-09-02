"use client";

import { FruitsBackdrop } from "@/components/fruits-backdrop";
import { cn } from "@/lib/utils";

/** Cream-toned backdrop for finance reports (ledger, product sales). */
export function ReportPageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative -mx-5 -my-5 min-h-[calc(100%+2.5rem)] md:-mx-8 md:-my-8">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <FruitsBackdrop />
        <div className="absolute inset-0 bg-gradient-to-br from-[#fdf8e3]/92 via-[#faf6eb]/88 to-[#f3edd8]/90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_15%_0%,rgba(239,230,168,0.35),transparent_55%)]" />
      </div>
      <div className="relative z-10 space-y-6 p-5 md:p-8">{children}</div>
    </div>
  );
}

export const reportPanelClass =
  "rounded-lg border border-[#e8dfc4] bg-[#fffcf5]/95 shadow-sm backdrop-blur-sm";

export type ReportMetricTone =
  | "emerald"
  | "amber"
  | "rose"
  | "sky"
  | "slate"
  | "gold"
  | "olive";

const TONE_STYLES: Record<
  ReportMetricTone,
  { card: string; value: string; label: string }
> = {
  emerald: {
    card: "border-emerald-200/90 bg-gradient-to-br from-emerald-50 to-teal-50/80",
    value: "text-emerald-900",
    label: "text-emerald-800/70",
  },
  amber: {
    card: "border-amber-200/90 bg-gradient-to-br from-amber-50 to-orange-50/70",
    value: "text-amber-950",
    label: "text-amber-900/70",
  },
  rose: {
    card: "border-rose-200/90 bg-gradient-to-br from-rose-50 to-red-50/70",
    value: "text-rose-800",
    label: "text-rose-800/70",
  },
  sky: {
    card: "border-sky-200/90 bg-gradient-to-br from-sky-50 to-cyan-50/70",
    value: "text-sky-950",
    label: "text-sky-900/70",
  },
  slate: {
    card: "border-slate-200/90 bg-gradient-to-br from-slate-50 to-stone-100/80",
    value: "text-slate-900",
    label: "text-slate-700/75",
  },
  gold: {
    card: "border-[#e8dfc4] bg-gradient-to-br from-[#fff9e8] to-[#f5edd4]/90",
    value: "text-[#3d3420]",
    label: "text-[#6b5e3a]/80",
  },
  olive: {
    card: "border-[#d5dfc4] bg-gradient-to-br from-[#f4f7e8] to-[#e8efd4]/85",
    value: "text-[#2f3a1f]",
    label: "text-[#4f5c35]/80",
  },
};

const hoverRiseClass =
  "transition duration-200 ease-out hover:-translate-y-1 hover:shadow-md";

export function ReportMetricCard({
  label,
  value,
  hint,
  tone = "gold",
  align = "left",
  secondaryValue,
  secondaryTone,
}: {
  label: string;
  value: string;
  hint?: string;
  tone?: ReportMetricTone;
  align?: "left" | "center";
  secondaryValue?: string;
  secondaryTone?: ReportMetricTone;
}) {
  const styles = TONE_STYLES[tone];
  const secondaryStyles = secondaryTone
    ? TONE_STYLES[secondaryTone]
    : styles;
  return (
    <div
      className={cn(
        "rounded-xl border p-4 shadow-sm backdrop-blur-sm",
        hoverRiseClass,
        styles.card,
        align === "center" && "text-center",
      )}
    >
      <div
        className={cn(
          "text-xs font-semibold uppercase tracking-[0.12em]",
          styles.label,
        )}
      >
        {label}
      </div>
      <div
        className={cn(
          "mt-1 text-xl font-semibold tabular-nums",
          styles.value,
        )}
      >
        {value}
      </div>
      {secondaryValue ? (
        <div
          className={cn(
            "mt-0.5 text-sm font-semibold tabular-nums",
            secondaryStyles.value,
          )}
        >
          {secondaryValue}
        </div>
      ) : null}
      {hint ? (
        <div className={cn("mt-1 text-xs", styles.label)}>{hint}</div>
      ) : null}
    </div>
  );
}

export function reportCategoryTone(category: string): ReportMetricTone {
  switch (category) {
    case "REVENUE":
      return "emerald";
    case "TIPS":
      return "amber";
    case "REFUND":
      return "rose";
    case "TAX":
      return "sky";
    case "ADJUSTMENT":
      return "slate";
    default:
      return "gold";
  }
}

export { hoverRiseClass };
