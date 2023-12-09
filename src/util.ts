export function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${month}/${day}/${year} ${hours}:${minutes}`;
}

export function ageInYears(dob: Date): number {
  const now = new Date();
  const years = now.getFullYear() - dob.getFullYear();
  const months = now.getMonth() - dob.getMonth();
  const days = now.getDate() - dob.getDate();

  return months < 0 || (months === 0 && days < 0) ? years - 1 : years;
}
