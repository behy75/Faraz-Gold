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
      <div className={`${styles.cardFooter} card-footer notification-footer`}>
        <div className={`${styles.paginationContainer} pagination-container`}>
          <ul className="pagination">
            <li className={`page-item ${currentPage <= 1 ? "disabled" : ""}`}>
              <a
                className="page-link"
                href="#"
                tabIndex="-1"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage > 1) {
                    onPageChange(currentPage - 1);
                  }
                }}
              >
                قبلی
              </a>
            </li>
            <li
              className={`page-item ${
                currentPage >= totalPages ? "disabled" : ""
              }`}
            >
              <a
                className="page-link"
                href={`?notifications_page=${currentPage + 1}`}
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage < totalPages) {
                    onPageChange(currentPage + 1);
                  }
                }}
              >
                بعدی
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
