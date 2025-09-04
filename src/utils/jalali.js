// src/utils/jalali.js
// تبدیل تاریخ میلادی به جلالی (الگوریتم شناخته‌شده)
function div(a, b) { return ~~(a / b) }

export function toJalali(gy, gm, gd) {
  const g_d_m = [0,31, (gy%4==0 && gy%100!=0) || (gy%400==0) ? 29:28,31,30,31,30,31,31,30,31,30,31]
  let gy2 = gy - 1600
  let gm2 = gm - 1
  let gd2 = gd - 1
  let g_day_no = 365*gy2 + div(gy2+3,4) - div(gy2+99,100) + div(gy2+399,400)
  for (let i=0; i<gm2; ++i) g_day_no += g_d_m[i+1]
  g_day_no += gd2
  let j_day_no = g_day_no - 79
  const j_np = div(j_day_no, 12053)
  j_day_no %= 12053
  let jy = 979 + 33*j_np + 4*div(j_day_no,1461)
  j_day_no %= 1461
  if (j_day_no >= 366) {
    jy += div(j_day_no-1, 365)
    j_day_no = (j_day_no-1)%365
  }
  const jm_list = [31,31,31,31,31,31,30,30,30,30,30,29]
  let jm = 0
  for (; jm<11 && j_day_no >= jm_list[jm]; ++jm) j_day_no -= jm_list[jm]
  const jd = j_day_no + 1
  return { jy, jm: jm+1, jd }
}
