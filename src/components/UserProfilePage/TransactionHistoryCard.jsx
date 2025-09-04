import React from "react";
import styles from "./TransactionHistoryCard.module.css";

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
                        <span className="text-success">{transaction.type}</span>
                      </td>
                      <td>{transaction.outputAmount}</td>
                      <td className="text-danger">{transaction.profitLoss}</td>
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
                      <span className="text-success">{transaction.type}</span> -{" "}
                      {transaction.unit} واحد
                    </h5>
                    <p className="card-text">
                      مبلغ ورودی: <span>{transaction.inputAmount}</span>
                    </p>
                    <p className="card-text">
                      مبلغ خروجی: <span>{transaction.outputAmount}</span>
                    </p>
                    <p className="card-text">
                      سود/ضرر:{" "}
                      <span className="text-danger">
                        {transaction.profitLoss}
                      </span>
                    </p>
                    <p className="card-text">
                      زمان باز شدن: <span>{transaction.openTime}</span>
                    </p>
                    <p className="card-text">
                      زمان بسته شدن: <span>{transaction.closeTime}</span>
                    </p>
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
                      <td className="text-danger">{portfolio.profitLoss}</td>
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
                      <span>{portfolio.type}</span>
                    </h5>
                    <p className="card-text">
                      مبلغ ورودی: <span>{portfolio.inputAmount}</span>
                    </p>
                    <p className="card-text">
                      مبلغ خروجی: <span>{portfolio.outputAmount}</span>
                    </p>
                    <p className="card-text">
                      سود/ضرر:{" "}
                      <span className="text-danger">
                        {portfolio.profitLoss}
                      </span>
                    </p>
                    <p className="card-text">
                      وضعیت: <span>{portfolio.status}</span>
                    </p>
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
