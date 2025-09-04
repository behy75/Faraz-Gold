import React, { useEffect } from "react";
import useLayoutBoot from "../../hooks/useLayoutBoot";
import Header from "../header/Header";
import Sidebar from "../sidebar/Sidebar";

export default function DashboardLayout({ children }) {
  const { boot, loading, error } = useLayoutBoot();

  useEffect(() => {
    if (boot?.theme) {
      document.documentElement.setAttribute("data-theme", boot.theme);
      document.documentElement.setAttribute("dir", "rtl");
      document.documentElement.setAttribute("lang", "fa");
    }
  }, [boot?.theme]);

  if (loading || !boot) {
    return <div className="container py-5 text-center text-muted">در حال بارگذاری…</div>;
  }
  if (error) {
    return <div className="container py-5 text-center text-danger">خطا: {error}</div>;
  }

  const { user, urls, assets } = boot;

  return (
    <>
      <Header logo={assets?.logo} urls={urls} user={user} />
      <Sidebar urls={urls} isTeacher={user?.isTeacher} activePath={window.location.pathname} />

      <main style={{ padding: 16 }}>
        <div className="row">
          <div className="col-12">{children}</div>
        </div>
      </main>
    </>
  );
}
