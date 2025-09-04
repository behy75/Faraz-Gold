import React from "react";
import styles from "./UserInfo.module.css";
import { formatNumberFa } from "../../utils/format";

export default function UserInfo({
  username = "نام کاربر",
  balance = 0,
  verificationStatus = "verified",
  totalProfitLoss = 0,
  openTransactionsCount = 0,
}) {
  const statusText =
    verificationStatus === "verified"
      ? { label: "احراز شده", klass: "text-success" }
      : verificationStatus === "in_review"
      ? { label: "در حال بررسی", klass: "text-warning" }
      : { label: "احراز نشده", klass: "text-danger" };

  return (
    <div className="row g-lg-4 mt-1 mb-2">
      {/* بخش پروفایل و وضعیت احراز */}
      <div className="col-12 col-lg-6">
        <div className="row g-lg-3 m-0">
          {/* پروفایل */}
          <div className="col-12 col-lg-7">
            <div
              className={`${styles.userProfile} d-flex justify-content-between align-items-center`}
            >
              <div className="d-flex align-items-center">
                <div
                  className={`${styles.userImg} rounded-circle me-3 d-none d-sm-block`}
                >
                  <i className="bi bi-person-circle fs-2"></i>
                </div>
                <div className="d-flex flex-column justify-content-between">
                  <span className="fs-19 lh-26 text-title">{username}</span>
                  <div className={styles.infoRow}>
                    <span className="fs-12 lh-16">
                      موجودی :
                      <span className="ltr ms-1 fw-bold">
                        {formatNumberFa(balance)}
                      </span>
                      <span className="ms-2 fw-normal">تومان</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* وضعیت احراز هویت */}
          <div className="col-12 col-lg-5">
            <div
              className={`${styles.userLevel} d-flex flex-column justify-content-between`}
            >
              <div className="d-flex justify-content-between align-items-center mb-3">
                <span className={styles.levelLabel}>سطح کابری</span>
                <a
                  href="/dashboard/authentication/"
                  className="d-flex align-items-center"
                  title="احراز هویت"
                >
                  <span className={styles.levelLink}>احراز هویت</span>
                  <i className="bi bi-chevron-left"></i>
                </a>
              </div>

              <div
                className={`${styles.levelContainer} d-flex justify-content-between align-items-center w-100 mb-3`}
              >
                <div className={statusText.klass}>
                  {statusText.label}
                  <a
                    href="/dashboard/authentication/"
                    className="d-inline-flex align-items-center ms-2"
                    aria-label="اطلاعات بیشتر"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      aria-hidden="true"
                    >
                      <path
                        d="M10 2.6875C8.55373 2.6875 7.13993 3.11637 5.9374 3.91988C4.73486 4.72339 3.7976 5.86544 3.24413 7.20163C2.69067 8.53781 2.54586 10.0081 2.82801 11.4266C3.11017 12.8451 3.80661 14.148 4.82928 15.1707C5.85196 16.1934 7.15492 16.8898 8.57341 17.172C9.99189 17.4541 11.4622 17.3093 12.7984 16.7559C14.1346 16.2024 15.2766 15.2651 16.0801 14.0626C16.8836 12.8601 17.3125 11.4463 17.3125 10C17.3105 8.06123 16.5394 6.20246 15.1685 4.83154C13.7975 3.46063 11.9388 2.68955 10 2.6875ZM9.71875 6.0625C9.88563 6.0625 10.0488 6.11198 10.1875 6.2047C10.3263 6.29741 10.4344 6.42919 10.4983 6.58336C10.5621 6.73754 10.5788 6.90719 10.5463 7.07086C10.5137 7.23453 10.4334 7.38487 10.3154 7.50287C10.1974 7.62087 10.047 7.70123 9.88336 7.73379C9.71969 7.76634 9.55004 7.74963 9.39586 7.68577C9.24169 7.62191 9.10991 7.51377 9.0172 7.37501C8.92449 7.23626 8.875 7.07313 8.875 6.90625C8.875 6.68247 8.9639 6.46786 9.12213 6.30963C9.28037 6.15139 9.49498 6.0625 9.71875 6.0625ZM10.5625 13.9375C10.2641 13.9375 9.97799 13.819 9.76701 13.608C9.55603 13.397 9.4375 13.1109 9.4375 12.8125V10C9.28832 10 9.14525 9.94074 9.03976 9.83525C8.93427 9.72976 8.875 9.58668 8.875 9.4375C8.875 9.28832 8.93427 9.14524 9.03976 9.03975C9.14525 8.93426 9.28832 8.875 9.4375 8.875C9.73587 8.875 10.022 8.99353 10.233 9.2045C10.444 9.41548 10.5625 9.70163 10.5625 10V12.8125C10.7117 12.8125 10.8548 12.8718 10.9603 12.9773C11.0657 13.0827 11.125 13.2258 11.125 13.375C11.125 13.5242 11.0657 13.6673 10.9603 13.7727C10.8548 13.8782 10.7117 13.9375 10.5625 13.9375Z"
                        fill="currentColor"
                      />
                    </svg>
                  </a>
                </div>

                {/* تیک‌های مراحل */}
                <div className={`${styles.levelTicks} d-flex`}>
                  <div
                    className={`${styles.levelSelector} ${
                      ["in_review", "verified"].includes(verificationStatus)
                        ? styles.active
                        : ""
                    }`}
                  >
                    <span className={styles.center}></span>
                  </div>
                  <div
                    className={`${styles.levelSelector} ${
                      verificationStatus === "verified" ? styles.active : ""
                    }`}
                  >
                    <span className={styles.center}></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* دو کارت آماری سمت راست */}
      <div className="col-12 col-lg-6">
        <div className={styles.statCard}>
          <div className="row g-3 m-0">
            <div className="col-6">
              <div className="p-3 d-flex flex-column justify-content-between">
                <p className={styles.statLabel}>سود و ضرر لحظه ای :</p>
                <h5
                  className={`${
                    totalProfitLoss >= 0 ? "text-success" : "text-danger"
                  } text-center`}
                >
                  {formatNumberFa(totalProfitLoss)}{" "}
                  <span className="fw-normal">تومان</span>
                </h5>
              </div>
            </div>

            <div className="col-6">
              <div className="p-3 d-flex flex-column justify-content-between">
                <p className={styles.statLabel}>تعداد معاملات باز :</p>
                <h5 className="fw-bold text-white text-center">
                  {formatNumberFa(openTransactionsCount)}
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
