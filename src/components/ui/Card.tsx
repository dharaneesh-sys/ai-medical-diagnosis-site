import type { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "highlight";
}

export default function Card({ variant = "default", className = "", children, ...props }: Props) {
  return (
    <div
      className={`rounded-lg border p-5 ${
        variant === "highlight" ? "border-[var(--color-primary)]/40 bg-[var(--color-surface)]" : "border-white/10 bg-[var(--color-surface)]"
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
