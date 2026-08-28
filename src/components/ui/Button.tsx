import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "ghost" | "chip";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  pressed?: boolean;
  loading?: boolean;
}

const base =
  "inline-flex items-center justify-center rounded-lg border text-sm font-semibold transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)] disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98] active:-translate-y-[1px] min-h-11";

const variants: Record<Variant, string> = {
  primary: "bg-[var(--color-primary)] text-[var(--color-bg)] border-transparent hover:opacity-90",
  ghost: "bg-transparent text-[var(--color-text)] border-white/20 hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]",
  chip: "rounded-full border px-4 font-mono",
};

export default function Button({
  variant = "primary",
  pressed,
  loading,
  className = "",
  children,
  disabled,
  ...props
}: Props) {
  const chipState = variant === "chip" ? (pressed ? "border-[var(--color-primary)] bg-[var(--color-primary)]/20 text-[var(--color-primary)]" : "border-white/20 text-[var(--color-muted)]") : "";
  return (
    <button
      className={`${base} ${variants[variant]} ${variant === "chip" ? chipState : ""} px-4 py-2.5 ${className}`}
      aria-pressed={variant === "chip" ? pressed : undefined}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? "Loading…" : children}
    </button>
  );
}
