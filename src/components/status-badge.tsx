import { ComponentHealth, formatStatus } from "@/lib/status-data";

const toneStyles: Record<ComponentHealth, { background: string; border: string; text: string }> = {
  operational: {
    background: "rgba(34,197,94,0.16)",
    border: "rgba(34,197,94,0.4)",
    text: "#22c55e",
  },
  degraded: {
    background: "rgba(250,204,21,0.16)",
    border: "rgba(250,204,21,0.4)",
    text: "#facc15",
  },
  partial_outage: {
    background: "rgba(249,115,22,0.16)",
    border: "rgba(249,115,22,0.4)",
    text: "#f97316",
  },
  major_outage: {
    background: "rgba(248,113,113,0.16)",
    border: "rgba(248,113,113,0.4)",
    text: "#f87171",
  },
  maintenance: {
    background: "rgba(96,165,250,0.16)",
    border: "rgba(96,165,250,0.4)",
    text: "#60a5fa",
  },
};

interface StatusBadgeProps {
  health: ComponentHealth;
}

export function StatusBadge({ health }: StatusBadgeProps) {
  const palette = toneStyles[health];
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.35rem",
        padding: "0.25rem 0.65rem",
        borderRadius: "999px",
        border: `1px solid ${palette.border}`,
        backgroundColor: palette.background,
        color: palette.text,
        fontSize: "0.75rem",
        fontWeight: 600,
        letterSpacing: "0.02em",
        textTransform: "uppercase",
      }}
    >
      <span
        style={{
          width: "0.5rem",
          height: "0.5rem",
          borderRadius: "50%",
          backgroundColor: palette.text,
          boxShadow: `0 0 12px ${palette.text}`,
        }}
      />
      {formatStatus(health)}
    </span>
  );
}
