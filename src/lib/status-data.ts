export type ComponentHealth = "operational" | "degraded" | "partial_outage" | "major_outage" | "maintenance";

export interface ServiceComponent {
  id: string;
  name: string;
  description: string;
  health: ComponentHealth;
  updatedAt: string;
  uptime90d: number;
}

export type IncidentState = "investigating" | "identified" | "monitoring" | "resolved";

export interface IncidentUpdate {
  at: string;
  state: IncidentState;
  body: string;
}

export interface Incident {
  id: string;
  title: string;
  severity: "minor" | "major";
  affectedComponentIds: string[];
  startedAt: string;
  resolvedAt?: string;
  updates: IncidentUpdate[];
}

export interface MaintenanceWindow {
  id: string;
  componentId: string;
  title: string;
  windowStart: string;
  windowEnd: string;
  description: string;
}

export const components: ServiceComponent[] = [
  {
    id: "main-site",
    name: "Usenubis Web",
    description: "Public marketing site available at usenubis.com",
    health: "operational",
    updatedAt: "2025-05-09T08:30:00Z",
    uptime90d: 99.98,
  },
  {
    id: "console",
    name: "Usenubis Console",
    description: "Customer control plane hosted at console.usenubis.com",
    health: "degraded",
    updatedAt: "2025-05-09T08:45:00Z",
    uptime90d: 99.72,
  },
  {
    id: "api",
    name: "Core API",
    description: "REST and GraphQL APIs used by integrations",
    health: "partial_outage",
    updatedAt: "2025-05-09T08:35:00Z",
    uptime90d: 99.83,
  },
  {
    id: "integrations",
    name: "Integrations Hub",
    description: "Partner connectors syncing data to third-party platforms",
    health: "operational",
    updatedAt: "2025-05-09T08:50:00Z",
    uptime90d: 99.91,
  },
];

export const incidents: Incident[] = [
  {
    id: "inc-2025-05-09",
    title: "Elevated error rates in Core API",
    severity: "major",
    affectedComponentIds: ["api", "console"],
    startedAt: "2025-05-09T07:58:00Z",
    updates: [
      {
        at: "2025-05-09T07:58:00Z",
        state: "investigating",
        body: "Automated monitors detected a spike in 5xx responses from the Core API.",
      },
      {
        at: "2025-05-09T08:20:00Z",
        state: "identified",
        body: "Engineers traced the issue to a misconfigured deployment of the rate-limiter service.",
      },
      {
        at: "2025-05-09T09:05:00Z",
        state: "monitoring",
        body: "A fix has been deployed and error rates are declining. We are monitoring before resolving.",
      },
    ],
  },
  {
    id: "inc-2025-04-22",
    title: "Console login latency",
    severity: "minor",
    affectedComponentIds: ["console"],
    startedAt: "2025-04-22T12:14:00Z",
    resolvedAt: "2025-04-22T13:05:00Z",
    updates: [
      {
        at: "2025-04-22T12:14:00Z",
        state: "investigating",
        body: "Users reported increased latency when loading the console dashboard.",
      },
      {
        at: "2025-04-22T12:41:00Z",
        state: "identified",
        body: "Identified elevated load on our authentication service due to a regional traffic shift.",
      },
      {
        at: "2025-04-22T13:05:00Z",
        state: "resolved",
        body: "Scaled additional instances in the affected region. Latency metrics have returned to normal.",
      },
    ],
  },
];

export const maintenanceWindows: MaintenanceWindow[] = [
  {
    id: "maint-2025-05-15",
    componentId: "integrations",
    title: "Database index optimization",
    windowStart: "2025-05-15T01:00:00Z",
    windowEnd: "2025-05-15T02:30:00Z",
    description:
      "We will reindex the integrations metadata store. Synchronizations may experience elevated latency for up to 15 minutes during the window.",
  },
  {
    id: "maint-2025-05-18",
    componentId: "main-site",
    title: "Content delivery network refresh",
    windowStart: "2025-05-18T04:00:00Z",
    windowEnd: "2025-05-18T04:30:00Z",
    description:
      "Rolling updates to our CDN configuration. No downtime expected, but brief asset cache misses may occur.",
  },
];

export function formatStatus(health: ComponentHealth): string {
  switch (health) {
    case "operational":
      return "Operational";
    case "degraded":
      return "Degraded Performance";
    case "partial_outage":
      return "Partial Outage";
    case "major_outage":
      return "Major Outage";
    case "maintenance":
      return "Under Maintenance";
    default:
      return "Unknown";
  }
}

export function overallPlatformStatus(): { label: string; tone: "good" | "warning" | "critical" } {
  if (components.some((component) => component.health === "major_outage")) {
    return { label: "Major Service Outage", tone: "critical" };
  }

  if (
    components.some((component) => component.health === "partial_outage") ||
    components.some((component) => component.health === "degraded")
  ) {
    return { label: "Service Disruption", tone: "warning" };
  }

  return { label: "All Systems Operational", tone: "good" };
}

export function getComponentById(id: string): ServiceComponent | undefined {
  return components.find((component) => component.id === id);
}
