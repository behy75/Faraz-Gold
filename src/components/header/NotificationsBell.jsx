import React from "react";
import styles from "./NotificationsBell.module.css";
import useLayoutBoot from "../../hooks/useLayoutBoot";
import { formatJalali } from "../../utils/date";
import { toFaDigits } from "../../utils/format";

export default function NotificationsBell() {
  const { boot, gotoNotifPage } = useLayoutBoot();
  const notif = boot?.notifications || {};
  const items = notif.items || [];
  const count = notif.count || 0;

  return (
    <div className="dropdown me-3 position-relative">
      <button className="btn btn-dark position-relative" type="button" id="notificationDropdown" data-bs-toggle="dropdown" aria-expanded="false">
        <i className="bi bi-bell"></i>
        {count > 0 && <span className={styles.dot} aria-hidden="true" />}
      </button>

      <ul className={`dropdown-menu dropdown-menu-end ${styles.menu}`} aria-labelledby="notificationDropdown">
        {items.length ? (
          <>
            {items.map((n, i) => (
              <li key={n.id ?? i} style={{ padding: 10 }}>
                <p className={`fw-bold mb-1 ${styles.title}`}>{n.title || "بدون موضوع"}</p>
                <p className={`mb-1 ${styles.muted}`} style={{ fontSize: "0.875rem" }}>{toFaDigits(formatJalali(n.created_at))}</p>
                <p className={`mb-1 ${styles.body}`} style={{ fontSize: "0.9375rem", lineHeight: 1.5, textAlign: "justify" }}>{n.message}</p>
                {i !== items.length - 1 && <hr className={`my-2 ${styles.hr}`} />}
              </li>
            ))}
            <li>
              <div className="d-flex justify-content-center mt-2">
                <ul className="pagination pagination-sm">
                  {notif.has_prev ? (
                    <li className="page-item">
                      <button className="page-link bg-dark text-light border-0" onClick={() => gotoNotifPage(notif.prev_page)}>قبلی</button>
                    </li>
                  ) : (
                    <li className="page-item disabled"><span className="page-link bg-dark text-muted border-0">قبلی</span></li>
                  )}

                  {notif.has_next ? (
                    <li className="page-item">
                      <button className="page-link bg-dark text-light border-0" onClick={() => gotoNotifPage(notif.next_page)}>بعدی</button>
                    </li>
                  ) : (
                    <li className="page-item disabled"><span className="page-link bg-dark text-muted border-0">بعدی</span></li>
                  )}
                </ul>
              </div>
            </li>
          </>
        ) : (
          <li className="dropdown-item text-light" style={{ backgroundColor: "var(--dropdown-bg)" }}>
            هیچ اطلاعیه‌ای موجود نیست
          </li>
        )}
      </ul>
    </div>
  );
}
