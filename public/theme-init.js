(function () {
  var root = document.documentElement;
  var theme = null;
  var lang = null;
  try {
    theme = localStorage.getItem("theme");
    lang = localStorage.getItem("lang");
  } catch (e) {}
  if (theme !== "light" && theme !== "dark") {
    theme = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  if (lang !== "ar" && lang !== "en") {
    lang = (navigator.language || "en").toLowerCase().indexOf("ar") === 0 ? "ar" : "en";
  }
  root.classList.toggle("dark", theme === "dark");
  root.lang = lang;
  root.dir = lang === "ar" ? "rtl" : "ltr";
})();
