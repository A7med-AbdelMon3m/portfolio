(function () {
  var root = document.documentElement;
  var theme = null;
  var lang = null;
  try {
    theme = localStorage.getItem("theme");
    lang = localStorage.getItem("lang");
  } catch (e) {}
  // First visit: start with the lights off (dark). A saved choice always wins.
  if (theme !== "light" && theme !== "dark") theme = "dark";
  if (lang !== "ar" && lang !== "en") {
    lang = (navigator.language || "en").toLowerCase().indexOf("ar") === 0 ? "ar" : "en";
  }
  root.classList.add("js");
  root.classList.toggle("dark", theme === "dark");
  root.lang = lang;
  root.dir = lang === "ar" ? "rtl" : "ltr";
})();
