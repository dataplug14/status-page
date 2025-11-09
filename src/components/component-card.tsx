import { StatusBadge } from "@/components/status-badge";
import { formatRelative } from "@/lib/date";
import type { ServiceComponent } from "@/lib/status-data";

interface ComponentCardProps {
  component: ServiceComponent;
}

export function ComponentCard({ component }: ComponentCardProps) {
  return (
    <article
      style={{
        background: "rgba(15, 23, 42, 0.85)",
        border: "1px solid rgba(148, 163, 184, 0.12)",
        borderRadius: "18px",
        padding: "1.25rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
        backdropFilter: "blur(18px)",
        boxShadow: "0 20px 40px rgba(15, 23, 42, 0.4)",
      }}
    >
      <header style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.75rem" }}>
          <h3
            style={{
              margin: 0,
              color: "#e2e8f0",
              fontSize: "1.1rem",
              fontWeight: 600,
              letterSpacing: "0.01em",
            }}
          >
            {component.name}
          </h3>
          <StatusBadge health={component.health} />
        </div>
        <p
          style={{
            margin: 0,
            color: "#94a3b8",
            fontSize: "0.95rem",
            lineHeight: 1.5,
          }}
        >
          {component.description}
        </p>
      </header>

      <dl
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          gap: "0.75rem",
          margin: 0,
        }}
      >
        <div>
          <dt
            style={{
              color: "#64748b",
              fontSize: "0.75rem",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            Last updated
          </dt>
          <dd
            style={{
              margin: 0,
              color: "#cbd5f5",
              fontWeight: 500,
            }}
          >
            {formatRelative(component.updatedAt)}
          </dd>
        </div>
        <div>
          <dt
            style={{
              color: "#64748b",
              fontSize: "0.75rem",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            90 day uptime
          </dt>
          <dd
            style={{
              margin: 0,
              color: "#cbd5f5",
              fontWeight: 500,
            }}
          >
            {component.uptime90d.toFixed(2)}%
          </dd>
        </div>
      </dl>
    </article>
  );
}
