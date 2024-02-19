export function sameDay(d1: Date, d2: Date) {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
}

export function inBetween(dateStart: Date, date: Date, dateEnd?: Date) {
  return dateEnd
    ? (sameDay(dateStart, date) || dateStart < date) &&
        (sameDay(date, dateEnd) || date < dateEnd)
    : sameDay(dateStart, date);
}

export function toddMonYYYY(date: Date) {
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function toddMMYYYY(date: Date) {
  return date
    .toLocaleDateString("en-GB", {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
    })
    .replace(/\//g, ".");
}
