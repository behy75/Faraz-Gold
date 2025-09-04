// src/pages/ProfilePage.jsx
import React from 'react'
import UserHeader from '../components/profile/UserHeader'
import HistoryTabs from '../components/profile/HistoryTabs'
import NotificationsPanel from '../components/profile/NotificationsPanel'
import PortfolioChart from '../components/profile/PortfolioChart'
import { useProfilePage } from '../hooks/useProfilePage'

export default function ProfilePage() {
  const {
    loading,
    error,
    username,
    balance,
    verificationStatus,
    totalProfitLoss,
    openTransactionsCount,
    notificationsPage,
    transactionsPage,
    portfoliosPage,
    portfoliosChartData,
    activeTab,
    setActiveTab,
    gotoTransactionsPage,
    gotoPortfoliosPage,
    gotoNotificationsPage,
    notificationsCount
  } = useProfilePage()

  if (loading) {
    return <div className="container py-4">در حال بارگذاری…</div>
  }

  if (error) {
    return <div className="container py-4 text-danger">خطا در دریافت داده‌ها: {error}</div>
  }

  return (
    <div className="container">
      {/* ردیف بالا: اطلاعات کاربر + دو کارت آمار */}
      <UserHeader
        username={username}
        balance={balance}
        verificationStatus={verificationStatus}
        totalProfitLoss={totalProfitLoss}
        openTransactionsCount={openTransactionsCount}
      />

      <div className="row equal-height-row">
        {/* موبایل: پنل اطلاعیه‌ها بالای جدول‌ها */}
        <div className="col-12 d-block d-md-none mt-4 order-1 mb-3">
          <NotificationsPanel
            page={notificationsPage}
            onPrev={() => gotoNotificationsPage(notificationsPage.number - 1)}
            onNext={() => gotoNotificationsPage(notificationsPage.number + 1)}
          />
        </div>

        {/* جدول‌ها و تب‌ها */}
        <div className="col-12 col-md-8 equal-height-col">
          <HistoryTabs
            activeTab={activeTab}
            onSwitchTab={setActiveTab}
            transactionsPage={transactionsPage}
            portfoliosPage={portfoliosPage}
            gotoTransactionsPage={gotoTransactionsPage}
            gotoPortfoliosPage={gotoPortfoliosPage}
          />
        </div>

        {/* دسکتاپ: پنل اطلاعیه‌ها سمت راست */}
        <div className="col-md-4 equal-height-col d-none d-md-block order-1">
          <NotificationsPanel
            page={notificationsPage}
            onPrev={() => gotoNotificationsPage(notificationsPage.number - 1)}
            onNext={() => gotoNotificationsPage(notificationsPage.number + 1)}
          />
        </div>
      </div>

      {/* نمودار سود/زیان ۱۰ پرتفو اخیر (بر اساس صفحه فعلی پرتفوها، مشابه تمپلیت) */}
      <div className="row mt-4">
        <div className="col-12">
          <PortfolioChart data={portfoliosChartData} />
        </div>
      </div>
    </div>
  )
}
