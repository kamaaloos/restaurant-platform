export {
  cn,
  shortId,
  formatMoney,
  formatWalkInQueueCode,
} from "@org/shared";

export function elapsedLabel(value: string | Date, now = Date.now()) {
  const timestamp = new Date(value).getTime();
  if (Number.isNaN(timestamp)) {
    return "--";
  }

  const minutes = Math.max(0, Math.floor((now - timestamp) / 60_000));
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (hours > 0) {
    return `${hours}h ${remainingMinutes}m`;
  }

  return `${minutes}m`;
}
