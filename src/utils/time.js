// src/utils/time.js
import { toJalali } from './jalali'
import { toPersianDigits } from './format'

export function formatTehranDateTimeJalali(iso) {
  if (!iso) return ''
  const d = new Date(iso)
  // تاریخ/زمان برای تهران
  const tehran = new Date(d.toLocaleString('en-US', { timeZone: 'Asia/Tehran' }))
  const gy = tehran.getFullYear()
  const gm = tehran.getMonth() + 1
  const gd = tehran.getDate()
  const { jy, jm, jd } = toJalali(gy, gm, gd)
  const hh = String(tehran.getHours()).padStart(2, '0')
  const mm = String(tehran.getMinutes()).padStart(2, '0')
  const str = `${jy}/${String(jm).padStart(2,'0')}/${String(jd).padStart(2,'0')} ${hh}:${mm}`
  return toPersianDigits(str)
}

export function formatJalaliDate(iso) {
  if (!iso) return ''
  const d = new Date(iso)
  const tehran = new Date(d.toLocaleString('en-US', { timeZone: 'Asia/Tehran' }))
  const { jy, jm, jd } = toJalali(tehran.getFullYear(), tehran.getMonth()+1, tehran.getDate())
  const str = `${jy}/${String(jm).padStart(2,'0')}/${String(jd).padStart(2,'0')}`
  return toPersianDigits(str)
}
