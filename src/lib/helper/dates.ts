import { intervalToDuration } from "date-fns";

export const DatesToDurationString = ({
  startedAt,
  completedAt,
}: {
  startedAt: Date | null | undefined;
  completedAt: Date | null | undefined;
}): string | null => {
  if (!startedAt || !completedAt) return null;
  const diff = Math.abs(completedAt.getTime() - startedAt.getTime());
  if (diff < 1000) return `${diff}ms`;
  const duration = intervalToDuration({ start: 0, end: diff });
  return `${duration.minutes || 0}m ${duration.seconds || 0}s`;
};
