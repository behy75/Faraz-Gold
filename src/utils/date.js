export function toTehranJalali(isoLike) {
  if (!isoLike) return "";
  const d = new Date(isoLike);
  // HH:MM YYYY/MM/DD تقویم جلالی و منطقه تهران
  const time = new Intl.DateTimeFormat("fa-IR", {
    hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "Asia/Tehran"
  }).format(d);

  const date = new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
    year: "numeric", month: "2-digit", day: "2-digit", timeZone: "Asia/Tehran"
  }).format(d).replace(/-/g,"/");

  return `${toFaDigits(time)} ${toFaDigits(date)}`;
}

export const formatJalali = (iso) => {
  if (!iso) return "";
  try {
    const dt = new Date(iso);
    return new Intl.DateTimeFormat("fa-IR-u-ca-persian", { year:"numeric", month:"2-digit", day:"2-digit" }).format(dt);
  } catch { return iso; }
};

// src/utils/date.js
export function formatJalaliTehran(iso) {
  if (!iso) return "";
  const dt = new Date(iso);
  const fmtDate = new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
    timeZone: "Asia/Tehran",
    year: "numeric", month: "2-digit", day: "2-digit",
  }).format(dt);
  const fmtTime = new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
    timeZone: "Asia/Tehran",
    hour: "2-digit", minute: "2-digit",
  }).format(dt);
  return `${fmtTime} ${fmtDate}`;
}
