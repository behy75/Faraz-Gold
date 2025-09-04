export const getCsrfToken = () => {
  const name = "csrftoken=";
  const cookie = document.cookie.split(";").map(c => c.trim()).find(c => c.startsWith(name));
  return cookie ? decodeURIComponent(cookie.slice(name.length)) : "";
};
