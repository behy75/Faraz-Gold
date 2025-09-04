// src/hooks/useProfilePage.js
import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { fetchProfile } from '../api/profile'

export function useProfilePage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [data, setData] = useState(null)

  const params = useMemo(() => {
    const tp = Number(searchParams.get('transactions_page') || 1)
    const pp = Number(searchParams.get('portfolios_page') || 1)
    const np = Number(searchParams.get('notifications_page') || 1)
    const tab = searchParams.get('active_tab') || (searchParams.get('portfolios_page') ? 'portfolios' : 'transactions')
    return { transactions_page: tp, portfolios_page: pp, notifications_page: np, active_tab: tab }
  }, [searchParams])

  useEffect(() => {
    let alive = true
    setLoading(true)
    setError(null)
    fetchProfile(params)
      .then(json => { if (alive) setData(json) })
      .catch(e => { if (alive) setError(e.message || 'خطا') })
      .finally(() => { if (alive) setLoading(false) })
    return () => { alive = false }
  }, [params])

  const setActiveTab = (tab) => {
    const next = new URLSearchParams(searchParams)
    next.set('active_tab', tab)
    setSearchParams(next, { replace: true })
  }

  const gotoTransactionsPage = (page) => {
    const next = new URLSearchParams(searchParams)
    next.set('transactions_page', String(page))
    next.set('active_tab', 'transactions')
    setSearchParams(next)
  }
  const gotoPortfoliosPage = (page) => {
    const next = new URLSearchParams(searchParams)
    next.set('portfolios_page', String(page))
    next.set('active_tab', 'portfolios')
    setSearchParams(next)
  }
  const gotoNotificationsPage = (page) => {
    const next = new URLSearchParams(searchParams)
    next.set('notifications_page', String(page))
    setSearchParams(next)
  }

  return {
    loading, error,
    username: data?.username ?? '',
    balance: data?.balance ?? 0,
    verificationStatus: data?.verification_status ?? 'not_verified',
    totalProfitLoss: data?.total_profit_loss ?? 0,
    openTransactionsCount: data?.open_transactions_count ?? 0,
    transactionsPage: data?.transactions_page ?? { object_list: [], number: 1, has_next: false, has_previous: false, paginator: { num_pages: 1 } },
    portfoliosPage: data?.portfolios_page ?? { object_list: [], number: 1, has_next: false, has_previous: false, paginator: { num_pages: 1 } },
    notificationsPage: data?.notifications_page ?? { object_list: [], number: 1, has_next: false, has_previous: false, paginator: { num_pages: 1 } },
    portfoliosChartData: data?.portfolios_chart_data ?? [],
    notificationsCount: data?.notifications_count ?? 0,
    activeTab: params.active_tab,
    setActiveTab,
    gotoTransactionsPage,
    gotoPortfoliosPage,
    gotoNotificationsPage
  }
}
