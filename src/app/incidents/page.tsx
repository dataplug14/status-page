import { IncidentTimeline } from "@/components/incident-timeline";
import { incidents } from "@/lib/status-data";

export const metadata = {
  title: "Incident History — Usenubis Status",
  description: "Browse current and past incidents affecting Usenubis services.",
};

export default function IncidentsPage() {
  return (
    <main
      style={{
        padding: "4rem 1.5rem 5rem",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div style={{ width: "min(900px, 100%)", display: "grid", gap: "2rem" }}>
        <header style={{ display: "grid", gap: "0.75rem" }}>
          <h1 style={{ margin: 0, fontSize: "2.5rem", color: "#f8fafc" }}>Incident history</h1>
          <p style={{ margin: 0, color: "#cbd5f5", fontSize: "1.05rem", lineHeight: 1.7 }}>
            Every incident we run into is documented here with precise timestamps and remediation details. Transparency keeps us
            accountable and helps your teams plan around disruptions.
          </p>
        </header>
        <IncidentTimeline incidents={incidents} />
      </div>
    </main>
  );
}
