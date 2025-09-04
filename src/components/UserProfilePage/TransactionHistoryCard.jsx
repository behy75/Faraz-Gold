import React from "react";
import styles from "./TransactionHistoryCard.module.css";

// تابع برای جدا کردن عدد و واحد از رشته سود/ضرر
const formatProfitLoss = (profitLossString) => {
  // اگر رشته شامل "تومان" باشد، آن را جدا می‌کنیم
  if (profitLossString.includes("تومان")) {
    const number = profitLossString.replace("تومان", "").trim();
    return { number, unit: "تومان" };
  }
  return { number: profitLossString, unit: "" };
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
      unit: "5",
      inputAmount: "۲۸,۴۰۲",
      type: "خرید",
      outputAmount: "۲۸,۳۹۴",
      profitLoss: "۰ تومان",
      openTime: "۰۳:۳۳ ۱۴۰۴/۰۶/۱۳",
      closeTime: "۰۳:۳۴ ۱۴۰۴/۰۶/۱۳",
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
              <table className="table table-bordered table-striped text-light">
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
                        <span className="text-success fw-normal">
                          {transaction.type}
                        </span>
                      </td>
                      <td>{transaction.outputAmount}</td>
                      <td className="text-danger">
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
              <div>
                <ul className="pagination">
                  <li
                    className={`page-item ${
                      transactionsPage <= 1 ? "disabled" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() =>
                        onTransactionsPageChange(transactionsPage - 1)
                      }
                      disabled={transactionsPage <= 1}
                    >
                      قبلی
                    </button>
                  </li>
                  <li
                    className={`page-item ${
                      transactionsPage >= totalTransactionsPages
                        ? "disabled"
                        : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() =>
                        onTransactionsPageChange(transactionsPage + 1)
                      }
                      disabled={transactionsPage >= totalTransactionsPages}
                    >
                      بعدی
                    </button>
                  </li>
                </ul>
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
                      <span className="text-success fw-normal">
                        {transaction.type}
                      </span>{" "}
                      - {transaction.unit} واحد
                    </h5>
                    <div className="card-text">
                      <span>مبلغ ورودی:</span>
                      <span>{transaction.inputAmount}</span>
                    </div>
                    <div className="card-text">
                      <span>مبلغ خروجی:</span>
                      <span>{transaction.outputAmount}</span>
                    </div>
                    <div className="card-text">
                      <span>سود/ضرر:</span>
                      <span className="text-danger">
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
                    <div className="card-text">
                      <span>زمان باز شدن:</span>
                      <span>{transaction.openTime}</span>
                    </div>
                    <div className="card-text">
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
                <ul className="pagination">
                  <li
                    className={`page-item ${
                      transactionsPage <= 1 ? "disabled" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() =>
                        onTransactionsPageChange(transactionsPage - 1)
                      }
                      disabled={transactionsPage <= 1}
                    >
                      قبلی
                    </button>
                  </li>
                  <li
                    className={`page-item ${
                      transactionsPage >= totalTransactionsPages
                        ? "disabled"
                        : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() =>
                        onTransactionsPageChange(transactionsPage + 1)
                      }
                      disabled={transactionsPage >= totalTransactionsPages}
                    >
                      بعدی
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* جدول پرتفوها */}
        {activeTab === "portfolios" && (
          <div className={styles.tabContent}>
            {/* دسکتاپ: جدول پرتفوها */}
            <div className={`${styles.desktopTable} d-none d-md-block`}>
              <table className="table table-bordered table-striped text-light">
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
                      <td className="text-danger">
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
                <ul className="pagination">
                  <li
                    className={`page-item ${
                      portfoliosPage <= 1 ? "disabled" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => onPortfoliosPageChange(portfoliosPage - 1)}
                      disabled={portfoliosPage <= 1}
                    >
                      قبلی
                    </button>
                  </li>
                  <li
                    className={`page-item ${
                      portfoliosPage >= totalPortfoliosPages ? "disabled" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => onPortfoliosPageChange(portfoliosPage + 1)}
                      disabled={portfoliosPage >= totalPortfoliosPages}
                    >
                      بعدی
                    </button>
                  </li>
                </ul>
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
                    <div className="card-text">
                      <span>مبلغ ورودی:</span>
                      <span>{portfolio.inputAmount}</span>
                    </div>
                    <div className="card-text">
                      <span>مبلغ خروجی:</span>
                      <span>{portfolio.outputAmount}</span>
                    </div>
                    <div className="card-text">
                      <span>سود/ضرر:</span>
                      <span className="text-danger">
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
                    <div className="card-text">
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
                <ul className="pagination">
                  <li
                    className={`page-item ${
                      portfoliosPage <= 1 ? "disabled" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => onPortfoliosPageChange(portfoliosPage - 1)}
                      disabled={portfoliosPage <= 1}
                    >
                      قبلی
                    </button>
                  </li>
                  <li
                    className={`page-item ${
                      portfoliosPage >= totalPortfoliosPages ? "disabled" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => onPortfoliosPageChange(portfoliosPage + 1)}
                      disabled={portfoliosPage >= totalPortfoliosPages}
                    >
                      بعدی
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
