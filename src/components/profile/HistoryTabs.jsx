// src/components/profile/HistoryTabs.jsx
import React from "react";
import styles from "./HistoryTabs.module.css";
import { formatNumberFa } from "../../utils/format";
import { formatTehranDateTimeJalali } from "../../utils/time";

export default function HistoryTabs({
  activeTab,
  onSwitchTab,
  transactionsPage,
  portfoliosPage,
  gotoTransactionsPage,
  gotoPortfoliosPage,
}) {
  return (
    <div className={`card ${styles.card}`}>
      {/* هدر تب‌ها */}
      <div
        className={`card-header d-flex justify-content-start ${styles.cardHeader}`}
      >
        <button
          className={`${styles.tabBtn} ${
            activeTab === "transactions" ? styles.active : ""
          }`}
          onClick={() => onSwitchTab("transactions")}
        >
          تاریخچه معاملات
        </button>
        <button
          className={`${styles.tabBtn} ${
            activeTab === "portfolios" ? styles.active : ""
          }`}
          onClick={() => onSwitchTab("portfolios")}
        >
          تاریخچه پرتفو‌ها
        </button>
      </div>

      <div className={`card-body ${styles.cardBody}`}>
        {/* معاملات */}
        <div
          className={`${styles.tabContent} ${
            activeTab === "transactions" ? styles.show : ""
          }`}
        >
          <div className={styles.desktopOnly}>
            {transactionsPage.object_list.length > 0 ? (
              <>
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
                    {transactionsPage.object_list.map(
                      (tx) =>
                        tx.units > 0 && (
                          <tr key={tx.id}>
                            <td>{formatNumberFa(tx.units)}</td>
                            <td>{formatNumberFa(tx.order?.price)}</td>
                            <td>
                              {tx.order?.action === "buy" ? (
                                <span className="text-success">خرید</span>
                              ) : (
                                <span className="text-danger">فروش</span>
                              )}
                            </td>
                            <td>
                              {tx.status === "liquidated" ? (
                                <span className="text-warning">حراجی</span>
                              ) : (
                                formatNumberFa(tx.closing_order?.price)
                              )}
                            </td>
                            <td
                              className={
                                tx.pnl >= 0 ? "text-success" : "text-danger"
                              }
                            >
                              {formatNumberFa(tx.pnl)} تومان
                            </td>
                            <td>{formatTehranDateTimeJalali(tx.created_at)}</td>
                            <td>
                              {tx.end_time ? (
                                formatTehranDateTimeJalali(tx.end_time)
                              ) : (
                                <span className="text-warning">
                                  هنوز بسته نشده
                                </span>
                              )}
                            </td>
                          </tr>
                        )
                    )}
                  </tbody>
                </table>

                <div className={styles.pagerWrap}>
                  <span className={styles.pageInfo}>
                    صفحه {formatNumberFa(transactionsPage.number)} از{" "}
                    {formatNumberFa(transactionsPage.paginator.num_pages)}
                  </span>
                </div>
                <div className="d-flex justify-content-center">
                  <div className={styles.customPagination}>
                    <button
                      className={`${styles.paginationBtn} ${
                        !transactionsPage.has_previous ? styles.disabled : ""
                      }`}
                      onClick={() =>
                        gotoTransactionsPage(transactionsPage.number - 1)
                      }
                      disabled={!transactionsPage.has_previous}
                    >
                      قبلی
                    </button>
                    <button
                      className={`${styles.paginationBtn} ${
                        !transactionsPage.has_next ? styles.disabled : ""
                      }`}
                      onClick={() =>
                        gotoTransactionsPage(transactionsPage.number + 1)
                      }
                      disabled={!transactionsPage.has_next}
                    >
                      بعدی
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <EmptyList text="هیچ معامله‌ای موجود نیست" />
            )}
          </div>

          {/* موبایل: کارت معاملات */}
          <div className={styles.mobileOnly}>
            {transactionsPage.object_list.length > 0 ? (
              <>
                {transactionsPage.object_list.map(
                  (tx) =>
                    tx.units > 0 && (
                      <div key={tx.id} className={`card ${styles.mobileCard}`}>
                        <div className="card-body">
                          <h5 className="card-title">
                            {tx.order?.action === "buy" ? (
                              <span className="text-success">خرید</span>
                            ) : (
                              <span className="text-danger">فروش</span>
                            )}{" "}
                            – {formatNumberFa(tx.units)} واحد
                          </h5>
                          <p className={styles.cardTextRow}>
                            <span>مبلغ ورودی:</span>
                            <span>{formatNumberFa(tx.order?.price)}</span>
                          </p>
                          <p className={styles.cardTextRow}>
                            <span>مبلغ خروجی:</span>
                            <span>
                              {tx.status === "liquidated" ? (
                                <span className="text-warning">حراجی</span>
                              ) : (
                                formatNumberFa(tx.closing_order?.price)
                              )}
                            </span>
                          </p>
                          <p className={styles.cardTextRow}>
                            <span>سود/ضرر:</span>
                            <span
                              className={
                                tx.pnl >= 0 ? "text-success" : "text-danger"
                              }
                            >
                              {formatNumberFa(tx.pnl)} تومان
                            </span>
                          </p>
                          <p className={styles.cardTextRow}>
                            <span>زمان باز شدن:</span>
                            <span>
                              {formatTehranDateTimeJalali(tx.created_at)}
                            </span>
                          </p>
                          <p className={styles.cardTextRow}>
                            <span>زمان بسته شدن:</span>
                            <span>
                              {tx.end_time ? (
                                formatTehranDateTimeJalali(tx.end_time)
                              ) : (
                                <span className="text-warning">
                                  هنوز بسته نشده
                                </span>
                              )}
                            </span>
                          </p>
                        </div>
                      </div>
                    )
                )}

                <div className={styles.pagerWrap}>
                  <span className={styles.pageInfo}>
                    صفحه {formatNumberFa(transactionsPage.number)} از{" "}
                    {formatNumberFa(transactionsPage.paginator.num_pages)}
                  </span>
                </div>
                <div className="d-flex justify-content-center">
                  <div className={styles.customPagination}>
                    <button
                      className={`${styles.paginationBtn} ${
                        !transactionsPage.has_previous ? styles.disabled : ""
                      }`}
                      onClick={() =>
                        gotoTransactionsPage(transactionsPage.number - 1)
                      }
                      disabled={!transactionsPage.has_previous}
                    >
                      قبلی
                    </button>
                    <button
                      className={`${styles.paginationBtn} ${
                        !transactionsPage.has_next ? styles.disabled : ""
                      }`}
                      onClick={() =>
                        gotoTransactionsPage(transactionsPage.number + 1)
                      }
                      disabled={!transactionsPage.has_next}
                    >
                      بعدی
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <EmptyList text="هیچ معامله‌ای موجود نیست" />
            )}
          </div>
        </div>

        {/* پرتفوها */}
        <div
          className={`${styles.tabContent} ${
            activeTab === "portfolios" ? styles.show : ""
          }`}
        >
          <div className={styles.desktopOnly}>
            {portfoliosPage.object_list.length > 0 ? (
              <>
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
                    {portfoliosPage.object_list.map((item) => (
                      <tr key={item.portfolio.id}>
                        <td>
                          {item.portfolio.portfolio_type === "isolated"
                            ? "معمولی"
                            : "پیشرفته"}
                        </td>
                        <td>
                          {formatNumberFa(item.portfolio.initial_balance)} تومان
                        </td>
                        <td>
                          {formatNumberFa(item.portfolio.total_balance)} تومان
                        </td>
                        <td
                          className={
                            item.profit_loss < 0
                              ? "text-danger"
                              : "text-success"
                          }
                        >
                          {formatNumberFa(item.profit_loss)} تومان
                        </td>
                        <td>
                          {item.portfolio.status === "closed" ? (
                            "بسته"
                          ) : (
                            <span className="text-warning">حراجی</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className={styles.pagerWrap}>
                  <span className={styles.pageInfo}>
                    صفحه {formatNumberFa(portfoliosPage.number)} از{" "}
                    {formatNumberFa(portfoliosPage.paginator.num_pages)}
                  </span>
                </div>
                <div className="d-flex justify-content-center">
                  <div className={styles.customPagination}>
                    <button
                      className={`${styles.paginationBtn} ${
                        !portfoliosPage.has_previous ? styles.disabled : ""
                      }`}
                      onClick={() =>
                        gotoPortfoliosPage(portfoliosPage.number - 1)
                      }
                      disabled={!portfoliosPage.has_previous}
                    >
                      قبلی
                    </button>
                    <button
                      className={`${styles.paginationBtn} ${
                        !portfoliosPage.has_next ? styles.disabled : ""
                      }`}
                      onClick={() =>
                        gotoPortfoliosPage(portfoliosPage.number + 1)
                      }
                      disabled={!portfoliosPage.has_next}
                    >
                      بعدی
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <EmptyList text="هیچ پرتفوئی موجود نیست" />
            )}
          </div>

          {/* موبایل: کارت پرتفو */}
          <div className={styles.mobileOnly}>
            {portfoliosPage.object_list.length > 0 ? (
              <>
                {portfoliosPage.object_list.map((item) => (
                  <div
                    key={item.portfolio.id}
                    className={`card ${styles.mobileCard}`}
                  >
                    <div className="card-body">
                      <h5 className="card-title">
                        {item.portfolio.portfolio_type === "isolated"
                          ? "معمولی"
                          : "پیشرفته"}
                      </h5>
                      <p className={styles.cardTextRow}>
                        <span>مبلغ ورودی:</span>
                        <span>
                          {formatNumberFa(item.portfolio.initial_balance)} تومان
                        </span>
                      </p>
                      <p className={styles.cardTextRow}>
                        <span>مبلغ خروجی:</span>
                        <span>
                          {formatNumberFa(item.portfolio.total_balance)} تومان
                        </span>
                      </p>
                      <p className={styles.cardTextRow}>
                        <span>سود/ضرر:</span>
                        <span
                          className={
                            item.profit_loss < 0
                              ? "text-danger"
                              : "text-success"
                          }
                        >
                          {formatNumberFa(item.profit_loss)} تومان
                        </span>
                      </p>
                      <p className={styles.cardTextRow}>
                        <span>وضعیت:</span>
                        <span>
                          {item.portfolio.status === "closed" ? (
                            "بسته"
                          ) : (
                            <span className="text-warning">حراجی</span>
                          )}
                        </span>
                      </p>
                    </div>
                  </div>
                ))}

                <div className={styles.pagerWrap}>
                  <span className={styles.pageInfo}>
                    صفحه {formatNumberFa(portfoliosPage.number)} از{" "}
                    {formatNumberFa(portfoliosPage.paginator.num_pages)}
                  </span>
                </div>
                <div className="d-flex justify-content-center">
                  <div className={styles.customPagination}>
                    <button
                      className={`${styles.paginationBtn} ${
                        !portfoliosPage.has_previous ? styles.disabled : ""
                      }`}
                      onClick={() =>
                        gotoPortfoliosPage(portfoliosPage.number - 1)
                      }
                      disabled={!portfoliosPage.has_previous}
                    >
                      قبلی
                    </button>
                    <button
                      className={`${styles.paginationBtn} ${
                        !portfoliosPage.has_next ? styles.disabled : ""
                      }`}
                      onClick={() =>
                        gotoPortfoliosPage(portfoliosPage.number + 1)
                      }
                      disabled={!portfoliosPage.has_next}
                    >
                      بعدی
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <EmptyList text="هیچ پرتفوئی موجود نیست" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function EmptyList({ text }) {
  return (
    <div className="text-center" style={{ color: "#a3a5a8" }}>
      {/* همان SVG تمپلیت برای empty state (اختیاری) */}
      <p className="mt-2">{text}</p>
    </div>
  );
}
