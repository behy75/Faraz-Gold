import React, { useRef } from "react";
import styles from "./Sidebar.module.css";
import { useUiStore } from "../../stores/uiStore";
import useOutsideClick from "../../hooks/useOutsideClick";

export default function Sidebar({ urls, isTeacher, activePath }) {
  const { sidebarOpen, closeSidebar } = useUiStore();
  const ref = useRef(null);

  useOutsideClick(ref, () => {
    if (window.innerWidth <= 768) closeSidebar();
  });

  const isActive = (href) => !!(href && activePath?.startsWith(href));

  return (
    <aside
      ref={ref}
      className={`${styles.sidebar} ${sidebarOpen ? styles.open : ""}`}
      aria-label="سایدبار"
    >
      <nav className="nav flex-column mt-3" role="navigation">
        <a
          className={`nav-link ${styles.navLink} ${isActive(urls?.profile) ? styles.active : ""}`}
          href={urls?.profile || "/profile/"}
          aria-current={isActive(urls?.profile) ? "page" : undefined}
        >
          <i className="bi bi-house-door"></i>
          <span className={styles.navLinkText}>داشبورد</span>
        </a>

        <a
          className={`nav-link ${styles.navLink} ${isActive(urls?.auth) ? styles.active : ""}`}
          href={urls?.auth || "/authentication/"}
          aria-current={isActive(urls?.auth) ? "page" : undefined}
        >
          <i className="bi bi-person"></i>
          <span className={styles.navLinkText}>اطلاعات شخصی</span>
        </a>

        <a
          className={`nav-link ${styles.navLink} ${isActive(urls?.deposit) ? styles.active : ""}`}
          href={urls?.deposit || "/dashboard/deposit_shetabi/"}
          aria-current={isActive(urls?.deposit) ? "page" : undefined}
        >
          <i className="bi bi-arrow-up-circle"></i>
          <span className={styles.navLinkText}>واریز</span>
        </a>

        <a
          className={`nav-link ${styles.navLink} ${isActive(urls?.withdrawal) ? styles.active : ""}`}
          href={urls?.withdrawal || "/dashboard/rial_withdraw/"}
          aria-current={isActive(urls?.withdrawal) ? "page" : undefined}
        >
          <i className="bi bi-arrow-down-circle"></i>
          <span className={styles.navLinkText}>برداشت</span>
        </a>

        <hr className={styles.divider} />

        <a className={`nav-link ${styles.navLink}`} href={urls?.marketBase || "/trade/"}>
          <i className="bi bi-currency-exchange"></i>
          <span className={styles.navLinkText}>بازار</span>
        </a>

        <a
          className={`nav-link ${styles.navLink} ${isActive(urls?.copyTrade) ? styles.active : ""}`}
          href={urls?.copyTrade || "/copy-trade/"}
          aria-current={isActive(urls?.copyTrade) ? "page" : undefined}
        >
          <i className="bi bi-clipboard-check"></i>
          <span className={styles.navLinkText}>کپی ترید</span>
        </a>

        <a
          className={`nav-link ${styles.navLink} ${isActive(urls?.contests) ? styles.active : ""}`}
          href={urls?.contests || "/contest/"}
          aria-current={isActive(urls?.contests) ? "page" : undefined}
        >
          <i className="bi bi-trophy"></i>
          <span className={styles.navLinkText}>مسابقات</span>
        </a>

        <hr className={styles.divider} />

        <a
          className={`nav-link ${styles.navLink} ${isActive(urls?.ticketCreate) ? styles.active : ""}`}
          href={urls?.ticketCreate || "/ticket/create/"}
          aria-current={isActive(urls?.ticketCreate) ? "page" : undefined}
        >
          <i className="bi bi-chat-dots"></i>
          <span className={styles.navLinkText}>پیام به پشتیبانی</span>
        </a>

        <a
          className={`nav-link ${styles.navLink} ${isActive(urls?.guides) ? styles.active : ""}`}
          href={urls?.guides || "/guides/"}
          aria-current={isActive(urls?.guides) ? "page" : undefined}
        >
          <i className="bi bi-question-circle"></i>
          <span className={styles.navLinkText}>راهنمای استفاده</span>
        </a>

        <a
          className={`nav-link ${styles.navLink} ${isActive(urls?.referral) ? styles.active : ""}`}
          href={urls?.referral || "/referral/"}
          aria-current={isActive(urls?.referral) ? "page" : undefined}
        >
          <i className="bi bi-people"></i>
          <span className={styles.navLinkText}>دعوت از دوستان</span>
        </a>

        <hr className={styles.divider} />

        {isTeacher && (
          <>
            <a className={`nav-link ${styles.navLink} ${styles.teacher}`} href={urls?.teacherPanel || "/teacher_panel/"}>
              <i className="bi bi-mortarboard"></i>
              <span className={styles.navLinkText}>پنل اساتید</span>
            </a>
            <a className={`nav-link ${styles.navLink} ${styles.teacher}`} href={urls?.teacherContests || "/contest/my/"}>
              <i className="bi bi-ui-checks-grid"></i>
              <span className={styles.navLinkText}>مسابقات من</span>
            </a>
          </>
        )}

        <a className={`nav-link ${styles.navLink} ${styles.logout}`} href={urls?.logout || "/logout/"}>
          <i className="bi bi-box-arrow-right"></i>
          <span className={styles.navLinkText}>خروج</span>
        </a>
      </nav>
    </aside>
  );
}
