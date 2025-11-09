import { ComponentCard } from "@/components/component-card";
import { IncidentTimeline } from "@/components/incident-timeline";
import { MaintenanceList } from "@/components/maintenance-list";
import { StatusBadge } from "@/components/status-badge";
import { maintenanceWindows, components, incidents, overallPlatformStatus } from "@/lib/status-data";

const heroTonePalette = {
  good: {
    border: "1px solid rgba(34,197,94,0.35)",
    background: "linear-gradient(135deg, rgba(34,197,94,0.2), rgba(34,197,94,0.05))",
    glow: "0 0 45px rgba(34,197,94,0.35)",
  },
  warning: {
    border: "1px solid rgba(249,115,22,0.35)",
    background: "linear-gradient(135deg, rgba(249,115,22,0.2), rgba(249,115,22,0.05))",
    glow: "0 0 45px rgba(249,115,22,0.35)",
  },
  critical: {
    border: "1px solid rgba(248,113,113,0.35)",
    background: "linear-gradient(135deg, rgba(248,113,113,0.2), rgba(248,113,113,0.05))",
    glow: "0 0 45px rgba(248,113,113,0.35)",
  },
};

export default function HomePage() {
  const overall = overallPlatformStatus();

  return (
    <main
      style={{
        padding: "4rem 1.5rem 5rem",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div style={{ width: "min(1100px, 100%)", display: "grid", gap: "2.75rem" }}>
        <section
          style={{
            position: "relative",
            borderRadius: "28px",
            padding: "2.75rem",
            border: heroTonePalette[overall.tone].border,
            background: heroTonePalette[overall.tone].background,
            boxShadow: heroTonePalette[overall.tone].glow,
            overflow: "hidden",
            backdropFilter: "blur(20px)",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(circle at top right, rgba(59,130,246,0.35), transparent 60%), radial-gradient(circle at bottom left, rgba(15,118,110,0.4), transparent 55%)",
              opacity: 0.6,
              pointerEvents: "none",
            }}
          />
          <header style={{ position: "relative", display: "grid", gap: "1.5rem", zIndex: 1 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <span
                style={{
                  color: "#cbd5f5",
                  fontSize: "0.9rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  fontWeight: 600,
                }}
              >
                Usenubis platform status
              </span>
              <h1
                style={{
                  margin: 0,
                  fontSize: "3rem",
                  lineHeight: 1.1,
                  color: "#f8fafc",
                  fontWeight: 700,
                }}
              >
                {overall.label}
              </h1>
              <p style={{ margin: 0, color: "#e2e8f0", fontSize: "1.1rem", lineHeight: 1.7 }}>
                Real-time availability for usenubis.com, console.usenubis.com, and integrations. Subscribe via RSS or embed this
                widget directly in your internal tools to keep teams informed.
              </p>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: "1rem",
              }}
            >
              {components.slice(0, 3).map((component) => (
                <div
                  key={component.id}
                  style={{
                    borderRadius: "16px",
                    padding: "1rem",
                    background: "rgba(15,23,42,0.55)",
                    border: "1px solid rgba(148,163,184,0.18)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.5rem" }}>
                    <h2 style={{ margin: 0, color: "#e2e8f0", fontSize: "1rem" }}>{component.name}</h2>
                    <StatusBadge health={component.health} />
                  </div>
                  <p style={{ margin: 0, color: "#94a3b8", fontSize: "0.85rem" }}>{component.description}</p>
                </div>
              ))}
            </div>
          </header>
        </section>

        <section style={{ display: "grid", gap: "1.5rem" }}>
          <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem" }}>
            <h2 style={{ margin: 0, color: "#f8fafc", fontSize: "1.75rem" }}>Component status</h2>
            <span style={{ color: "#94a3b8", fontSize: "0.95rem" }}>
              Updated every 60 seconds from automated monitors across three regions.
            </span>
          </header>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {components.map((component) => (
              <ComponentCard key={component.id} component={component} />
            ))}
          </div>
        </section>

        <section style={{ display: "grid", gap: "1.5rem" }}>
          <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem" }}>
            <h2 style={{ margin: 0, color: "#f8fafc", fontSize: "1.75rem" }}>Active & recent incidents</h2>
            <span style={{ color: "#94a3b8", fontSize: "0.95rem" }}>
              Transparent communication timeline with minute-by-minute updates.
            </span>
          </header>
          <IncidentTimeline incidents={incidents} />
        </section>

        <section style={{ display: "grid", gap: "1.5rem" }}>
          <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem" }}>
            <h2 style={{ margin: 0, color: "#f8fafc", fontSize: "1.75rem" }}>Scheduled maintenance</h2>
            <span style={{ color: "#94a3b8", fontSize: "0.95rem" }}>
              Upcoming work communicated at least 72 hours in advance.
            </span>
          </header>
          <MaintenanceList windows={maintenanceWindows} />
        </section>
      </div>
    </main>
  );
}
