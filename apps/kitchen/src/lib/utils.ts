export { cn, shortId, formatMoney } from "@org/shared";

/** Format server-computed ticket age (minutes). */
export function ageMinutesLabel(ageMinutes: number) {
  const minutes = Math.max(0, Math.floor(ageMinutes));
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (hours > 0) {
    return `${hours}h ${remainingMinutes}m`;
  }

  return `${minutes}m`;
}

export function elapsedLabel(value: string | Date, now = Date.now()) {
  const timestamp = new Date(value).getTime();
  if (Number.isNaN(timestamp)) {
    return "--";
  }

  const minutes = Math.max(0, Math.floor((now - timestamp) / 60_000));
  return ageMinutesLabel(minutes);
}
