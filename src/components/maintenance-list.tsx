import { formatDateTime } from "@/lib/date";
import { getComponentById, type MaintenanceWindow } from "@/lib/status-data";

interface MaintenanceListProps {
  windows: MaintenanceWindow[];
}

export function MaintenanceList({ windows }: MaintenanceListProps) {
  if (windows.length === 0) {
    return <p style={{ color: "#94a3b8", margin: 0 }}>No planned maintenance.</p>;
  }

  return (
    <ul
      style={{
        listStyle: "none",
        margin: 0,
        padding: 0,
        display: "grid",
        gap: "1rem",
      }}
    >
      {windows.map((window) => (
        <li
          key={window.id}
          style={{
            padding: "1.25rem",
            borderRadius: "18px",
            border: "1px solid rgba(96, 165, 250, 0.3)",
            background: "linear-gradient(135deg, rgba(96, 165, 250, 0.1), rgba(37, 99, 235, 0.04))",
            backdropFilter: "blur(18px)",
            display: "grid",
            gap: "0.5rem",
          }}
        >
          <header style={{ display: "flex", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
            <h3 style={{ margin: 0, color: "#dbeafe", fontSize: "1rem", fontWeight: 600 }}>{window.title}</h3>
            <span style={{ color: "#bfdbfe", fontSize: "0.85rem", fontWeight: 500 }}>
              {formatDateTime(window.windowStart)} – {formatDateTime(window.windowEnd, { hour: "2-digit", minute: "2-digit" })}
            </span>
          </header>
          <p style={{ margin: 0, color: "#e0f2fe", lineHeight: 1.6 }}>{window.description}</p>
          <footer style={{ color: "#bfdbfe", fontSize: "0.85rem" }}>
            Component: {getComponentById(window.componentId)?.name ?? window.componentId}
          </footer>
        </li>
      ))}
    </ul>
  );
}
