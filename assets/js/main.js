// Theme: persist and toggle
(function initTheme() {
  try {
    var saved = localStorage.getItem("theme");
    if (saved === "light") document.documentElement.classList.add("light");
  } catch (e) {}
  var toggle = document.getElementById("theme-toggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      document.documentElement.classList.toggle("light");
      try {
        var isLight = document.documentElement.classList.contains("light");
        localStorage.setItem("theme", isLight ? "light" : "dark");
      } catch (e) {}
    });
  }
})();

// Mobile nav toggle
(function initNav() {
  var toggle = document.getElementById("nav-toggle");
  var menu = document.getElementById("nav-menu");
  if (!toggle || !menu) return;
  toggle.addEventListener("click", function () {
    var open = menu.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });
  menu.addEventListener("click", function (e) {
    if (e.target.tagName === "A") {
      menu.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });
})();

// Smooth scroll
(function initSmoothScroll() {
  document.addEventListener("click", function (e) {
    if (!(e.target instanceof Element)) return;
    var anchor = e.target.closest('a[href^="#"]');
    if (!anchor) return;
    var id = anchor.getAttribute("href");
    if (!id || id.length < 2) return;
    var target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    var headerHeight = 70; // Account for sticky header height
    var targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
    window.scrollTo({ top: targetPosition, behavior: "smooth" });
    history.pushState(null, "", id);
  });
})();

// Contact form (mock) validation and feedback
(function initContactForm() {
  var form = document.getElementById("contact-form");
  var status = document.getElementById("form-status");
  if (!form || !status) return;
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var data = new FormData(form);
    var name = String(data.get("name") || "").trim();
    var email = String(data.get("email") || "").trim();
    var message = String(data.get("message") || "").trim();
    if (!name || !email || !message) {
      status.textContent = "Please fill out all fields.";
      return;
    }
    status.textContent = "Sending...";
    setTimeout(function () {
      status.textContent = "Thanks! I will get back to you soon.";
      form.reset();
    }, 800);
  });
})();

// Year in footer
(function setYear() {
  var el = document.getElementById("year");
  if (el) el.textContent = String(new Date().getFullYear());
})();
