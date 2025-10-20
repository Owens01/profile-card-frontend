(function () {
  // Elements
  const timeEl = document.querySelector('[data-testid="test-user-time"]');
  const avatarImg = document.querySelector('[data-testid="test-user-avatar"]');
  const fileInput = document.getElementById("avatarFileInput");
  const urlInput = document.getElementById("avatarUrlInput");
  const applyUrlButton = document.getElementById("avatarApplyUrl");

  if (!timeEl || !avatarImg) {
    console.warn("Essential elements missing. Make sure data-testids match.");
    return;
  }

  // Set initial time (Date.now()) and update every 1s.
  function renderTime() {
    const now = Date.now();
    timeEl.textContent = String(now);
  }

  renderTime();
  setInterval(renderTime, 1000);

  // Avatar file upload: read file and set as data URL
  fileInput.addEventListener("change", (ev) => {
    const file = ev.target.files && ev.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file.");
      return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
      avatarImg.src = e.target.result;
      avatarImg.alt = "User avatar (uploaded)";
    };
    reader.readAsDataURL(file);

    // Clear the URL input
    urlInput.value = "";
  });

  // Avatar URL apply
  applyUrlButton.addEventListener("click", () => {
    const url = (urlInput.value || "").trim();
    if (!url) {
      alert("Please provide an image URL.");
      return;
    }

    try {
      const parsed = new URL(url);
      if (!/^https?:$/.test(parsed.protocol)) {
        alert("Please use a http or https image URL.");
        return;
      }
    } catch (e) {
      alert("Invalid URL.");
      return;
    }

    // Set the image src.
    avatarImg.src = url;
    avatarImg.alt = "User avatar (from URL)";

    //  clear file input
    fileInput.value = "";
  });

  // If avatar image fails to load,
  avatarImg.addEventListener("error", () => {
    avatarImg.src = "assets/default-avatar.svg";
    avatarImg.alt = "Default avatar";
  });

  //  allow pressing Enter on URL input to apply
  urlInput.addEventListener("keydown", (ev) => {
    if (ev.key === "Enter") {
      ev.preventDefault();
      applyUrlButton.click();
    }
  });
})();

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  if (!form) return;

  const getById = (id) => document.getElementById(id);

  const fields = {
    name: getById("contact-name"),
    email: getById("contact-email"),
    subject: getById("contact-subject"),
    message: getById("contact-message"),
  };

  const errorEls = {
    name: getById("test-contact-error-name"),
    email: getById("test-contact-error-email"),
    subject: getById("test-contact-error-subject"),
    message: getById("test-contact-error-message"),
  };

  const successEl = getById("test-contact-success");
  const submitBtn =
    form.querySelector('[data-testid="test-contact-submit"]') ||
    form.querySelector("button[type='submit']");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function clearErrors() {
    Object.values(errorEls).forEach((el) => {
      el.textContent = "";
    });
  }

  function validate() {
    const errs = {};
    if (!fields.name.value.trim()) errs.name = "Full name is required.";
    if (!fields.email.value.trim()) errs.email = "Email is required.";
    else if (!emailRegex.test(fields.email.value.trim()))
      errs.email = "Enter a valid email (name@example.com).";
    if (!fields.subject.value.trim()) errs.subject = "Subject is required.";
    const msg = fields.message.value.trim();
    if (!msg) errs.message = "Message is required.";
    else if (msg.length < 10)
      errs.message = "Message must be at least 10 characters.";
    return errs;
  }

  form.addEventListener("submit", (evt) => {
    evt.preventDefault();
    clearErrors();
    successEl.hidden = true;

    const errors = validate();
    const errorKeys = Object.keys(errors);

    if (errorKeys.length > 0) {
      // show errors and focus first invalid field
      errorKeys.forEach((key) => {
        const el = errorEls[key];
        if (el) el.textContent = errors[key];
      });
      const first = fields[errorKeys[0]];
      if (first) first.focus();
      return;
    }

    successEl.hidden = false;
    form.reset();
    successEl.setAttribute("tabindex", "-1");
    successEl.focus();
  });

  // Live clear error on input
  Object.keys(fields).forEach((key) => {
    fields[key].addEventListener("input", () => {
      if (errorEls[key].textContent) {
        errorEls[key].textContent = "";
      }
      if (!successEl.hidden) successEl.hidden = true;
    });
  });
});
