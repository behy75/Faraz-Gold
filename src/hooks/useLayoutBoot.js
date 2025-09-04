import { useEffect } from "react";
import { useLayoutStore } from "../stores/layoutStore";

export default function useLayoutBoot() {
  const { boot, loading, error, loadBoot, gotoNotifPage } = useLayoutStore();

  useEffect(() => {
    if (!boot && !loading) {
      const p = new URL(window.location.href).searchParams.get("notifications_page");
      loadBoot({ notifications_page: p || undefined });
    }
  }, [boot, loading, loadBoot]);

  return { boot, loading, error, gotoNotifPage };
}
