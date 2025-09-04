// src/components/profile/NotificationsPanel.jsx
import React from 'react'
import styles from './NotificationsPanel.module.css'
import { formatNumberFa } from '../../utils/format'
import { formatJalaliDate } from '../../utils/time'

export default function NotificationsPanel({ page, onPrev, onNext }) {
  return (
    <div className={`card ${styles.card}`}>
      <div className={`card-header ${styles.header}`}>اطلاعیه‌ها</div>

      <div className={`card-body ${styles.body}`}>
        {page.object_list.length > 0 ? (
          <ul className={styles.list}>
            {page.object_list.map(n => (
              <li key={n.id} className={styles.item}>
                <div className={`${styles.itemHeader} d-flex justify-content-between`}>
                  {n.title ? <span className={styles.title}>{n.title}</span> : <p className="text-light m-0">بدون موضوع</p>}
                  <span className={styles.date}>{formatJalaliDate(n.created_at)}</span>
                </div>
                <div className={styles.content}>{n.message}</div>
                <hr className={styles.divider} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-light m-0">هیچ اطلاعیه‌ای موجود نیست</p>
        )}
      </div>

      <div className={`card-footer ${styles.footer}`}>
        <ul className={styles.pagination}>
          <li>
            <button onClick={onPrev} disabled={!page.has_previous}>قبلی</button>
          </li>
          <li>
            <button onClick={onNext} disabled={!page.has_next}>بعدی</button>
          </li>
        </ul>
        <span className={styles.pageInfo}>
          صفحه {formatNumberFa(page.number)} از {formatNumberFa(page.paginator.num_pages)}
        </span>
      </div>
    </div>
  )
}
