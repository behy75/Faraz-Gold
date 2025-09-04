import React from "react";
import styles from "./TransactionHistoryCard.module.css";

// تابع برای جدا کردن عدد و واحد از رشته سود/ضرر
const formatProfitLoss = (profitLossString) => {
  // اگر رشته شامل "تومان" باشد، آن را جدا می‌کنیم
  if (profitLossString.includes("تومان")) {
    let number = profitLossString.replace("تومان", "").trim();
    // حذف علامت + از ابتدای عدد مثبت
    if (number.startsWith("+")) {
      number = number.substring(1);
    }
    return { number, unit: "تومان" };
  }
  return { number: profitLossString, unit: "" };
};

// تابع برای تشخیص مثبت یا منفی بودن و اعمال استایل مناسب
const getProfitLossStyle = (profitLossString) => {
  const isNegative = profitLossString.startsWith("-");
  const isPositive = profitLossString.startsWith("+");

  if (isNegative) {
    return { className: styles.textDanger }; // قرمز
  } else if (isPositive) {
    return { className: styles.textSuccess }; // سبز
  } else {
    return { className: "" }; // بدون کلاس خاص
  }
};

export default function TransactionHistoryCard({
  activeTab = "transactions",
  onTabChange = () => {},
  transactionsData = [],
  portfoliosData = [],
  transactionsPage = 1,
  portfoliosPage = 1,
  totalTransactionsPages = 1,
  totalPortfoliosPages = 1,
  onTransactionsPageChange = () => {},
  onPortfoliosPageChange = () => {},
}) {
  // Mock data if no data provided
  const defaultTransactions = [
    {
      id: 1,
      unit: "2",
      inputAmount: "۳۸,۴۸۵",
      type: "خرید",
      outputAmount: "۳۸,۳۰۱",
      profitLoss: "-۱۸۴,۰۰۰ تومان",
      openTime: "۱۴:۱۲ ۱۴۰۴/۰۶/۱۲",
      closeTime: "۱۴:۱۲ ۱۴۰۴/۰۶/۱۲",
    },
    {
      id: 2,
      unit: "2",
      inputAmount: "۳۸,۴۸۵",
      type: "خرید",
      outputAmount: "۳۹,۳۲۵",
      profitLoss: "+۱,۶۴۰,۰۰۰ تومان",
      openTime: "۱۴:۱۳ ۱۴۰۴/۰۶/۱۲",
      closeTime: "۱۴:۱۴ ۱۴۰۴/۰۶/۱۲",
    },
    {
      id: 3,
      unit: "2",
      inputAmount: "۳۸,۴۸۵",
      type: "خرید",
      outputAmount: "۳۸,۶۶۳",
      profitLoss: "+۳۷۶,۰۰۰ تومان",
      openTime: "۱۴:۱۵ ۱۴۰۴/۰۶/۱۲",
      closeTime: "۱۴:۱۵ ۱۴۰۴/۰۶/۱۲",
    },
    {
      id: 4,
      unit: "2",
      inputAmount: "۳۸,۴۸۵",
      type: "خرید",
      outputAmount: "۳۸,۶۳۴",
      profitLoss: "+۲۹۸,۰۰۰ تومان",
      openTime: "۲۰:۰۲ ۱۴۰۴/۰۶/۱۰",
      closeTime: "۲۰:۰۳ ۱۴۰۴/۰۶/۱۰",
    },
    {
      id: 5,
      unit: "2",
      inputAmount: "۳۸,۴۸۵",
      type: "خرید",
      outputAmount: "۳۸,۶۳۳",
      profitLoss: "+۲۹۶,۰۰۰ تومان",
      openTime: "۲۰:۰۸ ۱۴۰۴/۰۶/۱۰",
      closeTime: "۲۰:۰۹ ۱۴۰۴/۰۶/۱۰",
    },
    {
      id: 6,
      unit: "2",
      inputAmount: "۳۸,۴۸۵",
      type: "فروش",
      outputAmount: "۳۸,۸۶۱",
      profitLoss: "+۷۵۲,۰۰۰ تومان",
      openTime: "۱۰:۱۳ ۱۴۰۴/۰۶/۰۹",
      closeTime: "۱۰:۱۴ ۱۴۰۴/۰۶/۰۹",
    },
    {
      id: 7,
      unit: "2",
      inputAmount: "۳۸,۴۸۵",
      type: "خرید",
      outputAmount: "۳۷,۹۲۲",
      profitLoss: "-۹۲۶,۰۰۰ تومان",
      openTime: "۱۰:۱۰ ۱۴۰۴/۰۶/۰۹",
      closeTime: "۱۰:۱۱ ۱۴۰۴/۰۶/۰۹",
    },
  ];

  const defaultPortfolios = [
    {
      id: 1,
      type: "معمولی",
      inputAmount: "۲۷,۵۹۵,۸۸۰ تومان",
      outputAmount: "۲۵,۱۲۷,۸۸۰ تومان",
      profitLoss: "۰ تومان",
      status: "بسته",
    },
  ];

  const displayTransactions =
    transactionsData.length > 0 ? transactionsData : defaultTransactions;
  const displayPortfolios =
    portfoliosData.length > 0 ? portfoliosData : defaultPortfolios;

  return (
    <div className={`${styles.transactionCard} card`}>
      {/* هدر تب‌ها */}
      <div
        className={`${styles.cardHeader} card-header d-flex justify-content-start`}
      >
        <button
          className={`${styles.tabButton} ${
            activeTab === "transactions" ? styles.active : ""
          }`}
          onClick={() => onTabChange("transactions")}
        >
          تاریخچه معاملات
        </button>
        <button
          className={`${styles.tabButton} ${
            activeTab === "portfolios" ? styles.active : ""
          }`}
          onClick={() => onTabChange("portfolios")}
        >
          تاریخچه پرتفو‌ها
        </button>
      </div>

      {/* بدنه کارت */}
      <div className={`${styles.cardBody} card-body`}>
        {/* جدول معاملات */}
        {activeTab === "transactions" && (
          <div className={styles.tabContent}>
            {/* دسکتاپ: جدول معاملات */}
            <div className={`${styles.desktopTable} d-none d-md-block`}>
              <table
                className={`table table-bordered table-striped text-light ${styles.customTable}`}
              >
                <thead>
                  <tr>
                    <th>واحد</th>
                    <th>مبلغ ورودی</th>
                    <th>نوع</th>
                    <th>مبلغ خروجی</th>
                    <th>سود/ضرر</th>
                    <th>زمان باز شدن</th>
                    <th>زمان بسته شدن</th>
                  </tr>
                </thead>
                <tbody>
                  {displayTransactions.map((transaction) => (
                    <tr key={transaction.id}>
                      <td>{transaction.unit}</td>
                      <td>{transaction.inputAmount}</td>
                      <td>
                        <span
                          className={
                            transaction.type === "خرید"
                              ? styles.textSuccess
                              : styles.textDanger
                          }
                          style={{ fontWeight: "normal" }}
                        >
                          {transaction.type}
                        </span>
                      </td>
                      <td>{transaction.outputAmount}</td>
                      <td
                        className={
                          getProfitLossStyle(transaction.profitLoss).className
                        }
                      >
                        <span className="fw-bold">
                          {formatProfitLoss(transaction.profitLoss).number}
                        </span>
                        {formatProfitLoss(transaction.profitLoss).unit && (
                          <span className="fw-normal ms-1">
                            {formatProfitLoss(transaction.profitLoss).unit}
                          </span>
                        )}
                      </td>
                      <td>{transaction.openTime}</td>
                      <td>{transaction.closeTime}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className={styles.paginationSection}>
                <span className={styles.pageInfo}>
                  صفحه {transactionsPage} از {totalTransactionsPages}
                </span>
              </div>
              <div className="d-flex justify-content-center">
                <div className={styles.customPagination}>
                  <button
                    className={`${styles.paginationBtn} ${
                      transactionsPage <= 1 ? styles.disabled : ""
                    }`}
                    onClick={() =>
                      onTransactionsPageChange(transactionsPage - 1)
                    }
                    disabled={transactionsPage <= 1}
                  >
                    قبلی
                  </button>
                  <button
                    className={`${styles.paginationBtn} ${
                      transactionsPage >= totalTransactionsPages
                        ? styles.disabled
                        : ""
                    }`}
                    onClick={() =>
                      onTransactionsPageChange(transactionsPage + 1)
                    }
                    disabled={transactionsPage >= totalTransactionsPages}
                  >
                    بعدی
                  </button>
                </div>
              </div>
            </div>

            {/* موبایل: کارت‌های معاملات */}
            <div className={`${styles.mobileCards} d-block d-md-none`}>
              {displayTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className={`${styles.mobileCard} card`}
                >
                  <div className="card-body">
                    <h5 className="card-title">
                      <span
                        className={
                          transaction.type === "خرید"
                            ? styles.textSuccess
                            : styles.textDanger
                        }
                        style={{ fontWeight: "normal" }}
                      >
                        {transaction.type}
                      </span>{" "}
                      - {transaction.unit} واحد
                    </h5>
                    <div className={styles.cardText}>
                      <span>مبلغ ورودی:</span>
                      <span>{transaction.inputAmount}</span>
                    </div>
                    <div className={styles.cardText}>
                      <span>مبلغ خروجی:</span>
                      <span>{transaction.outputAmount}</span>
                    </div>
                    <div className={styles.cardText}>
                      <span>سود/ضرر:</span>
                      <span
                        style={{
                          color: transaction.profitLoss.startsWith("-")
                            ? "#dc3545"
                            : transaction.profitLoss.startsWith("+")
                            ? "#28a745"
                            : "#ffffff",
                          fontWeight: "bold",
                        }}
                      >
                        <span className="fw-bold">
                          {formatProfitLoss(transaction.profitLoss).number}
                        </span>
                        {formatProfitLoss(transaction.profitLoss).unit && (
                          <span className="fw-normal ms-1">
                            {formatProfitLoss(transaction.profitLoss).unit}
                          </span>
                        )}
                      </span>
                    </div>
                    <div className={styles.cardText}>
                      <span>زمان باز شدن:</span>
                      <span>{transaction.openTime}</span>
                    </div>
                    <div className={styles.cardText}>
                      <span>زمان بسته شدن:</span>
                      <span>{transaction.closeTime}</span>
                    </div>
                  </div>
                </div>
              ))}
              <div className={styles.paginationSection}>
                <span className={styles.pageInfo}>
                  صفحه {transactionsPage} از {totalTransactionsPages}
                </span>
                <div className="d-flex justify-content-center">
                  <div className={styles.customPagination}>
                    <button
                      className={`${styles.paginationBtn} ${
                        transactionsPage <= 1 ? styles.disabled : ""
                      }`}
                      onClick={() =>
                        onTransactionsPageChange(transactionsPage - 1)
                      }
                      disabled={transactionsPage <= 1}
                    >
                      قبلی
                    </button>
                    <button
                      className={`${styles.paginationBtn} ${
                        transactionsPage >= totalTransactionsPages
                          ? styles.disabled
                          : ""
                      }`}
                      onClick={() =>
                        onTransactionsPageChange(transactionsPage + 1)
                      }
                      disabled={transactionsPage >= totalTransactionsPages}
                    >
                      بعدی
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* جدول پرتفوها */}
        {activeTab === "portfolios" && (
          <div className={styles.tabContent}>
            {/* دسکتاپ: جدول پرتفوها */}
            <div className={`${styles.desktopTable} d-none d-md-block`}>
              <table
                className={`table table-bordered table-striped text-light ${styles.customTable}`}
              >
                <thead>
                  <tr>
                    <th>نوع</th>
                    <th>مبلغ ورودی</th>
                    <th>مبلغ خروجی</th>
                    <th>سود/ضرر</th>
                    <th>وضعیت</th>
                  </tr>
                </thead>
                <tbody>
                  {displayPortfolios.map((portfolio) => (
                    <tr key={portfolio.id}>
                      <td>{portfolio.type}</td>
                      <td>{portfolio.inputAmount}</td>
                      <td>{portfolio.outputAmount}</td>
                      <td
                        className={
                          getProfitLossStyle(portfolio.profitLoss).className
                        }
                      >
                        <span className="fw-bold">
                          {formatProfitLoss(portfolio.profitLoss).number}
                        </span>
                        {formatProfitLoss(portfolio.profitLoss).unit && (
                          <span className="fw-normal ms-1">
                            {formatProfitLoss(portfolio.profitLoss).unit}
                          </span>
                        )}
                      </td>
                      <td>{portfolio.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className={styles.paginationSection}>
                <span className={styles.pageInfo}>
                  صفحه {portfoliosPage} از {totalPortfoliosPages}
                </span>
              </div>
              <div className="d-flex justify-content-center">
                <div className={styles.customPagination}>
                  <button
                    className={`${styles.paginationBtn} ${
                      portfoliosPage <= 1 ? styles.disabled : ""
                    }`}
                    onClick={() => onPortfoliosPageChange(portfoliosPage - 1)}
                    disabled={portfoliosPage <= 1}
                  >
                    قبلی
                  </button>
                  <button
                    className={`${styles.paginationBtn} ${
                      portfoliosPage >= totalPortfoliosPages
                        ? styles.disabled
                        : ""
                    }`}
                    onClick={() => onPortfoliosPageChange(portfoliosPage + 1)}
                    disabled={portfoliosPage >= totalPortfoliosPages}
                  >
                    بعدی
                  </button>
                </div>
              </div>
            </div>

            {/* موبایل: کارت‌های پرتفو */}
            <div className={`${styles.mobileCards} d-block d-md-none`}>
              {displayPortfolios.map((portfolio) => (
                <div key={portfolio.id} className={`${styles.mobileCard} card`}>
                  <div className="card-body">
                    <h5 className="card-title">
                      <span className="text-white">{portfolio.type}</span>
                    </h5>
                    <div className={styles.cardText}>
                      <span>مبلغ ورودی:</span>
                      <span>{portfolio.inputAmount}</span>
                    </div>
                    <div className={styles.cardText}>
                      <span>مبلغ خروجی:</span>
                      <span>{portfolio.outputAmount}</span>
                    </div>
                    <div className={styles.cardText}>
                      <span>سود/ضرر:</span>
                      <span
                        style={{
                          color: portfolio.profitLoss.startsWith("-")
                            ? "#dc3545"
                            : portfolio.profitLoss.startsWith("+")
                            ? "#28a745"
                            : "#ffffff",
                          fontWeight: "bold",
                        }}
                      >
                        <span className="fw-bold">
                          {formatProfitLoss(portfolio.profitLoss).number}
                        </span>
                        {formatProfitLoss(portfolio.profitLoss).unit && (
                          <span className="fw-normal ms-1">
                            {formatProfitLoss(portfolio.profitLoss).unit}
                          </span>
                        )}
                      </span>
                    </div>
                    <div className={styles.cardText}>
                      <span>وضعیت:</span>
                      <span>{portfolio.status}</span>
                    </div>
                  </div>
                </div>
              ))}
              <div className={styles.paginationSection}>
                <span className={styles.pageInfo}>
                  صفحه {portfoliosPage} از {totalPortfoliosPages}
                </span>
              </div>
              <div className="d-flex justify-content-center">
                <div className={styles.customPagination}>
                  <button
                    className={`${styles.paginationBtn} ${
                      portfoliosPage <= 1 ? styles.disabled : ""
                    }`}
                    onClick={() => onPortfoliosPageChange(portfoliosPage - 1)}
                    disabled={portfoliosPage <= 1}
                  >
                    قبلی
                  </button>
                  <button
                    className={`${styles.paginationBtn} ${
                      portfoliosPage >= totalPortfoliosPages
                        ? styles.disabled
                        : ""
                    }`}
                    onClick={() => onPortfoliosPageChange(portfoliosPage + 1)}
                    disabled={portfoliosPage >= totalPortfoliosPages}
                  >
                    بعدی
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
