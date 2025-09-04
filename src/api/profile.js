// src/api/profile.js
export async function fetchProfile({ transactions_page=1, portfolios_page=1, notifications_page=1, active_tab }) {
  const params = new URLSearchParams()
  params.set('transactions_page', String(transactions_page))
  params.set('portfolios_page', String(portfolios_page))
  params.set('notifications_page', String(notifications_page))
  if (active_tab) params.set('active_tab', active_tab)

  const res = await fetch(`dashboard/api/profile/?${params.toString()}`, {
    method: 'GET',
    credentials: 'include',
    headers: { 'Accept': 'application/json' }
  })
  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(text || `HTTP ${res.status}`)
  }
  return res.json()
}
