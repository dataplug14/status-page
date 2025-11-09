import { formatDateTime } from "@/lib/date";
import { getComponentById, type Incident } from "@/lib/status-data";

const severityPalette = {
  minor: {
    border: "1px solid rgba(250, 204, 21, 0.4)",
    background: "linear-gradient(135deg, rgba(250, 204, 21, 0.12), rgba(250, 204, 21, 0.04))",
  },
  major: {
    border: "1px solid rgba(248, 113, 113, 0.4)",
    background: "linear-gradient(135deg, rgba(248, 113, 113, 0.12), rgba(248, 113, 113, 0.04))",
  },
};

interface IncidentTimelineProps {
  incidents: Incident[];
}

export function IncidentTimeline({ incidents }: IncidentTimelineProps) {
  if (incidents.length === 0) {
    return (
      <p style={{ color: "#94a3b8", margin: 0 }}>No active or historical incidents to display.</p>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      {incidents.map((incident) => {
        const palette = severityPalette[incident.severity];
        return (
          <article
            key={incident.id}
            style={{
              borderRadius: "18px",
              padding: "1.5rem",
              border: palette.border,
              background: palette.background,
              backdropFilter: "blur(18px)",
            }}
          >
            <header
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
                marginBottom: "1rem",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "0.75rem" }}>
                <h3
                  style={{
                    margin: 0,
                    color: "#f8fafc",
                    fontSize: "1.1rem",
                    fontWeight: 600,
                  }}
                >
                  {incident.title}
                </h3>
                <span
                  style={{
                    color: "#f1f5f9",
                    fontSize: "0.85rem",
                    fontWeight: 500,
                    opacity: 0.8,
                  }}
                >
                  Started {formatDateTime(incident.startedAt)}
                </span>
              </div>
              <p style={{ margin: 0, color: "#cbd5f5", fontSize: "0.9rem", lineHeight: 1.5 }}>
                Affecting: {incident.affectedComponentIds.map((id) => getComponentById(id)?.name ?? id).join(", ")}
              </p>
            </header>

            <ol
              style={{
                listStyle: "none",
                margin: 0,
                padding: 0,
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              {incident.updates.map((update) => (
                <li key={update.at} style={{ display: "grid", gap: "0.25rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                    <span
                      style={{
                        fontSize: "0.75rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        color: "#f8fafc",
                        fontWeight: 600,
                      }}
                    >
                      {update.state}
                    </span>
                    <span style={{ color: "#cbd5f5", fontSize: "0.8rem" }}>
                      {formatDateTime(update.at)}
                    </span>
                  </div>
                  <p style={{ margin: 0, color: "#e2e8f0", lineHeight: 1.6 }}>{update.body}</p>
                </li>
              ))}
            </ol>
          </article>
        );
      })}
    </div>
  );
}
