import React from "react";
import styles from "./NotificationsCard.module.css";

export default function NotificationsCard({
  notifications = [],
  currentPage = 1,
  totalPages = 1,
  onPageChange = () => {},
}) {
  // Mock data if no notifications provided
  const defaultNotifications = [
    {
      id: 1,
      title: "۵۴",
      content: "۵۴۵",
      date: "۱۴۰۴/۰۶/۰۱",
    },
    {
      id: 2,
      title: "۴",
      content: "۴",
      date: "۱۴۰۴/۰۶/۰۱",
    },
    {
      id: 3,
      title: "۵",
      content: "۶",
      date: "۱۴۰۴/۰۶/۰۱",
    },
  ];

  const displayNotifications =
    notifications.length > 0 ? notifications : defaultNotifications;

  return (
    <div className={`${styles.notificationsCard} card`}>
      {/* هدر کارت اطلاعیه‌ها */}
      <div className={`${styles.cardHeader} card-header text-light`}>
        اطلاعیه‌ها
      </div>

      {/* بدنه اطلاعیه‌ها با قابلیت اسکرول */}
      <div className={`${styles.cardBody} card-body`}>
        <ul className={styles.notificationsList}>
          {displayNotifications.map((notification, index) => (
            <li key={notification.id} className={styles.notificationItem}>
              <div
                className={`${styles.notificationHeader} d-flex justify-content-between`}
              >
                <span className={styles.notificationTitle}>
                  {notification.title}
                </span>
                <span className={styles.notificationDate}>
                  {notification.date}
                </span>
              </div>
              <div className={styles.notificationContent}>
                {notification.content}
              </div>
              {/* Only show divider if it's not the last item */}
              {index < displayNotifications.length - 1 && (
                <hr className={styles.notificationDivider} />
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* دکمه‌های پیمایش */}
      <div className={`${styles.cardFooter} card-footer`}>
        <div className={styles.paginationContainer}>
          <ul className="pagination">
            <li className={`page-item ${currentPage <= 1 ? "disabled" : ""}`}>
              <button
                className="page-link"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage <= 1}
              >
                قبلی
              </button>
            </li>
            <li
              className={`page-item ${
                currentPage >= totalPages ? "disabled" : ""
              }`}
            >
              <button
                className="page-link"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage >= totalPages}
              >
                بعدی
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
