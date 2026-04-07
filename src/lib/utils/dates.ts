function toValidDate(value: Date | string) {
  const date = value instanceof Date ? new Date(value) : new Date(value);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  date.setHours(0, 0, 0, 0);

  return date;
}

export function calculateDeadline(arrivalDate: string, deadlineDays: number) {
  const baseDate = toValidDate(arrivalDate);

  if (!baseDate || Number.isNaN(deadlineDays)) {
    return null;
  }

  const deadline = new Date(baseDate);
  deadline.setDate(deadline.getDate() + deadlineDays);

  return deadline.toISOString();
}

export function daysUntil(dateInput: Date | string) {
  const targetDate = toValidDate(dateInput);

  if (!targetDate) {
    return null;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const difference = targetDate.getTime() - today.getTime();

  return Math.round(difference / 86_400_000);
}

export function isOverdue(dateInput: Date | string) {
  const difference = daysUntil(dateInput);

  return difference !== null && difference < 0;
}

export function formatDate(
  dateInput: Date | string,
  locale = "en-GB",
  options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
  },
) {
  const date = toValidDate(dateInput);

  if (!date) {
    return "";
  }

  return new Intl.DateTimeFormat(locale, options).format(date);
}
