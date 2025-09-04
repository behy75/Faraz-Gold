import React from "react";
import UserInfo from "../components/UserProfilePage/UserInfo";
import NotificationsCard from "../components/UserProfilePage/NotificationsCard";
import TransactionHistoryCard from "../components/UserProfilePage/TransactionHistoryCard";
import ProfitLossChart from "../components/UserProfilePage/ProfitLossChart";
import styles from "../components/UserProfilePage/UserProfilePage.module.css";
import { useState } from "react";

export default function UserProfilePage() {
  const [activeTab, setActiveTab] = useState("transactions");
  const [notificationsPage, setNotificationsPage] = useState(1);
  const [transactionsPage, setTransactionsPage] = useState(1);
  const [portfoliosPage, setPortfoliosPage] = useState(1);

  // Mock data - in real app this would come from API or props
  const userData = {
    username: "09030523154",
    balance: 15000000,
    verificationStatus: "verified",
    totalProfitLoss: 0,
    openTransactionsCount: 0,
  };

  // Mock notifications data
  const notificationsData = [
    {
      id: 1,
      title: "شیفت شب",
      content: "اطلاعیه مربوط به شیفت شب و تغییرات ساعات کاری",
      date: "۱۴۰۴/۰۲/۱۲",
    },
    {
      id: 2,
      title: "بازگشایی",
      content: "اطلاعیه بازگشایی سیستم و شروع فعالیت‌های جدید",
      date: "۱۴۰۴/۰۲/۱۲",
    },
    {
      id: 3,
      title: "به‌روزرسانی سیستم",
      content: "به‌روزرسانی سیستم و اضافه شدن قابلیت‌های جدید",
      date: "۱۴۰۴/۰۲/۱۱",
    },
  ];

  // Mock transactions data
  const transactionsData = [
    {
      id: 1,
      unit: "5",
      inputAmount: "۲۸,۴۰۲",
      type: "خرید",
      outputAmount: "۲۸,۳۹۴",
      profitLoss: "-۱۸۴,۰۰۰ تومان",
      openTime: "۰۳:۳۳ ۱۴۰۴/۰۶/۱۳",
      closeTime: "۰۳:۳۴ ۱۴۰۴/۰۶/۱۳",
    },
  ];

  // Mock portfolios data
  const portfoliosData = [
    {
      id: 1,
      type: "معمولی",
      inputAmount: "۲۷,۵۹۵,۸۸۰ تومان",
      outputAmount: "۲۵,۱۲۷,۸۸۰ تومان",
      profitLoss: "۰ تومان",
      status: "بسته",
    },
  ];

  // Mock chart data for last 10 portfolios
  const chartData = [
    { portfolio: 1, profitLoss: -2500000 },
    { portfolio: 2, profitLoss: -500000 },
    { portfolio: 3, profitLoss: -2700000 },
    { portfolio: 4, profitLoss: 0 },
    { portfolio: 5, profitLoss: 0 },
    { portfolio: 6, profitLoss: 0 },
    { portfolio: 7, profitLoss: 0 },
    { portfolio: 8, profitLoss: -700000 },
    { portfolio: 9, profitLoss: -1000000 },
    { portfolio: 10, profitLoss: -2000000 },
  ];

  const handleNotificationsPageChange = (newPage) => {
    setNotificationsPage(newPage);
    console.log(`Loading notifications page ${newPage}`);
  };

  const handleTransactionsPageChange = (newPage) => {
    setTransactionsPage(newPage);
    console.log(`Loading transactions page ${newPage}`);
  };

  const handlePortfoliosPageChange = (newPage) => {
    setPortfoliosPage(newPage);
    console.log(`Loading portfolios page ${newPage}`);
  };

  return (
    <div className="container">
      {/* ردیف بالا: اطلاعات کاربر + دو کارت آمار */}
      <UserInfo
        username={userData.username}
        balance={userData.balance}
        verificationStatus={userData.verificationStatus}
        totalProfitLoss={userData.totalProfitLoss}
        openTransactionsCount={userData.openTransactionsCount}
      />

      <div className="row equal-height-row mt-4">
        {/* موبایل: پنل اطلاعیه‌ها بالای جدول‌ها */}
        <div className="col-12 d-block d-md-none order-1 mb-3">
          <NotificationsCard
            notifications={notificationsData}
            currentPage={notificationsPage}
            totalPages={3}
            onPageChange={handleNotificationsPageChange}
          />
        </div>

        {/* جدول‌ها و تب‌ها */}
        <div className="col-12 col-md-8 equal-height-col">
          <TransactionHistoryCard
            activeTab={activeTab}
            onTabChange={setActiveTab}
            transactionsData={transactionsData}
            portfoliosData={portfoliosData}
            transactionsPage={transactionsPage}
            portfoliosPage={portfoliosPage}
            totalTransactionsPages={26}
            totalPortfoliosPages={10}
            onTransactionsPageChange={handleTransactionsPageChange}
            onPortfoliosPageChange={handlePortfoliosPageChange}
          />
        </div>

        {/* دسکتاپ: پنل اطلاعیه‌ها سمت راست */}
        <div className="col-md-4 equal-height-col d-none d-md-block order-1">
          <NotificationsCard
            notifications={notificationsData}
            currentPage={notificationsPage}
            totalPages={3}
            onPageChange={handleNotificationsPageChange}
          />
        </div>
      </div>

      {/* نمودار سود و ضرر 10 پرتفو اخیر */}
      <div className="row mt-4">
        <div className="col-12">
          <ProfitLossChart data={chartData} />
        </div>
      </div>
    </div>
  );
}
