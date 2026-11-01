(function () {
  var root = document.documentElement;
  try {
    var saved = localStorage.getItem("theme");
    if (saved === "dark" || saved === "light") root.dataset.theme = saved;
  } catch (e) {}
  function isDark() {
    if (root.dataset.theme) return root.dataset.theme === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  }
  function sync(t) {
    t.textContent = isDark() ? "☀" : "☾";
    t.setAttribute("aria-label", isDark() ? "Switch to light mode" : "Switch to dark mode");
  }
  document.addEventListener("DOMContentLoaded", function () {
    var t = document.querySelector(".theme-toggle");
    if (!t) return;
    sync(t);
    t.addEventListener("click", function () {
      var next = isDark() ? "light" : "dark";
      root.dataset.theme = next;
      try { localStorage.setItem("theme", next); } catch (e) {}
      sync(t);
    });
  });
}());
