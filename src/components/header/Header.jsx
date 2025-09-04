import React from "react";
import styles from "./Header.module.css";
import { useUiStore } from "../../stores/uiStore";
import NotificationsBell from "./NotificationsBell";
import ProfileMenu from "./ProfileMenu";
import { formatToman, toFaDigits } from "../../utils/format";

export default function Header({ logo, urls, user }) {
  const toggleSidebar = useUiStore((s) => s.toggleSidebar);

  return (
    <div className={styles.header}>
      <nav className={styles.navbar}>
        {/* راست: همبرگری + لوگوی موبایل */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <a href={urls?.home || "/"} className={styles.brandAlt}>
            <img src={logo} alt="لوگو" />
          </a>
          <span className={styles.buttonsDivider} />
          <div className={styles.hamburger}>
            <button className={`btn btn-dark ${styles.iconBtn}`} onClick={toggleSidebar} aria-label="منوی کناری">
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 16 16" fill="currentColor">
                <path fillRule="evenodd" d="M1.5 3.5h13a.5.5 0 010 1h-13a.5.5 0 010-1zm0 4h13a.5.5 0 010 1h-13a.5.5 0 010-1zm0 4h13a.5.5 0 010 1h-13a.5.5 0 010-1z"/>
              </svg>
            </button>
          </div>
        </div>

        {/* لوگوی دسکتاپ */}
        <a href={urls?.home || "/"} className={styles.brand} style={{ textDecoration: 'none' }}>
          <img src={logo} alt="لوگو" />
          <span className={styles.brandText}>FARAZGOLD</span>
        </a>

        {/* لینک‌های بالا */}
        <div className={styles.topNav}>
          <ul className={styles.navList}>
            <li><a className={styles.link} href={urls?.marketBase || "/trade/"}>بازار</a></li>
            <li><a className={styles.link} href={urls?.referral || "/referral/"}>دعوت از دوستان</a></li>
            <li><a className={styles.link} href={urls?.guides || "/guides/"}>راهنمای استفاده</a></li>
            <li><a className={styles.link} href={urls?.ticketCreate || "/ticket/create/"}>سوال دارید؟</a></li>
          </ul>
        </div>

        {/* اکشن‌های سمت چپ */}
        <div className={styles.actions}>
          <NotificationsBell />
          <ProfileMenu urls={urls} user={user} />
        </div>
      </nav>

      {/* اطلاعات کاربر در موبایل (مثل تمپلیت) */}
      <div className={styles.mobileUserInfo}>
        <div><strong>شماره کاربری:</strong> {toFaDigits(user?.phoneNumber || "")}</div>
        <div><strong>موجودی (تومان):</strong> {formatToman(user?.balance)}</div>
      </div>
    </div>
  );
}
