export function toFaDigits(input) {
  const s = (input ?? "").toString();
  const fa = ["۰","۱","۲","۳","۴","۵","۶","۷","۸","۹"];
  return s.replace(/\d/g, d => fa[d]);
}

export function formatNumber(n) {
  if (n === null || n === undefined || Number.isNaN(n)) return "۰";
  return new Intl.NumberFormat("fa-IR").format(Number(n));
}

export function formatToman(n) {
  return `${toFaDigits(formatNumber(n))} تومان`;
}

// src/utils/format.js
export function toPersianDigits(input) {
  const map = ['۰','۱','۲','۳','۴','۵','۶','۷','۸','۹']
  return String(input).replace(/\d/g, d => map[d])
}
export function intComma(x) {
  if (x === null || x === undefined || isNaN(Number(x))) return '0'
  const s = String(Math.trunc(Number(x)))
  return s.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
export function formatNumberFa(x) {
  return toPersianDigits(intComma(x))
}
