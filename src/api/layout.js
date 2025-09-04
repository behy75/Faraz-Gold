import { httpGet } from "./http";
export const fetchLayoutBoot = (params) => httpGet("/dashboard/boot/", { params });
