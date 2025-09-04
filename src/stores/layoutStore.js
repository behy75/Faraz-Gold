import { create } from "zustand";
import { fetchLayoutBoot } from "../api/layout";

export const useLayoutStore = create((set, get) => ({
  boot: null,
  loading: false,
  error: null,
  loadBoot: async (opts = {}) => {
    try {
      set({ loading: true, error: null });
      // const data = await fetchLayoutBoot(opts);
      set({ boot: {}, loading: false });
      return {};
    } catch (e) {
      set({ error: e.message || "خطا در دریافت اطلاعات", loading: false });
      throw e;
    }
  },
  gotoNotifPage: async (page) => {
    const data = await get().loadBoot({ notifications_page: page });
    const url = new URL(window.location.href);
    url.searchParams.set("notifications_page", String(page));
    window.history.replaceState({}, "", url.toString());
    return data;
  },
}));
