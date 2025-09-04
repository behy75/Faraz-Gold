import React, { useRef, useState } from "react";
import styles from "./ProfileMenu.module.css";
import useOutsideClick from "../../hooks/useOutsideClick";
import { formatToman, toFaDigits } from "../../utils/format";

export default function ProfileMenu({ urls, user }) {
  const [open, setOpen] = useState(false);
  const btnRef = useRef(null);
  const menuRef = useRef(null);
  useOutsideClick([btnRef, menuRef], () => setOpen(false));

  return (
    <div className="position-relative">
      <button ref={btnRef} className="btn btn-dark" onClick={() => setOpen(s => !s)} aria-expanded={open}>
        <i className="bi bi-person-circle"></i>
      </button>

      <div ref={menuRef} className={`${styles.menu} ${open ? styles.open : ""}`} role="menu" aria-label="منوی حساب">
        <a className={styles.item} href={urls?.profile || "/profile/"}><i className="bi bi-grid" style={{ marginLeft: 10 }}></i> داشبورد</a>

        <div className={styles.item}>
          <div className={styles.text}>
            <div className={styles.row}><strong>شماره کاربری:</strong><span>{toFaDigits(user?.phoneNumber || "")}</span></div>
            <div className={styles.row}><strong>موجودی: <span style={{ fontSize: "small" }}>(تومان)</span></strong><span>{formatToman(user?.balance)}</span></div>
          </div>
        </div>

        <a className={`${styles.item} ${styles.danger}`} href={urls?.logout || "/logout/"}><i className="bi bi-box-arrow-right" style={{ marginLeft: 10 }}></i> خروج</a>
      </div>
    </div>
  );
}
