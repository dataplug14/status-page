export function formatDateTime(iso: string, options?: Intl.DateTimeFormatOptions) {
  const formatter = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
    ...options,
  });
  return formatter.format(new Date(iso));
}

export function formatRelative(iso: string) {
  const date = new Date(iso);
  const now = new Date();
  const diffMinutes = (now.getTime() - date.getTime()) / (1000 * 60);
  const absolute = Math.abs(diffMinutes);

  if (absolute < 60) {
    const minutes = Math.max(1, Math.round(absolute));
    return diffMinutes >= 0 ? `${minutes} min ago` : `in ${minutes} min`;
  }

  if (absolute < 60 * 24) {
    const hours = Math.round(absolute / 60);
    return diffMinutes >= 0 ? `${hours} hr ago` : `in ${hours} hr`;
  }

  const days = Math.round(absolute / (60 * 24));
  return diffMinutes >= 0 ? `${days} days ago` : `in ${days} days`;
}
