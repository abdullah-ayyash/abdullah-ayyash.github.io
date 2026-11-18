/* Contact form: progressive enhancement over a normal Formspree POST.
   Without JavaScript the form still submits through its action URL. */
(() => {
  "use strict";

  const form = document.getElementById("contact-form");
  if (!form) return;

  const sendBtn = document.getElementById("send-btn");
  const label = sendBtn.querySelector(".btn-label");
  const success = document.getElementById("form-success");
  const failure = document.getElementById("form-error");
  const failureText = failure.querySelector(".status-text");

  // Spam protection (no third-party service needed):
  //  1. Honeypot fields: people never see them, bots fill them in.
  //  2. Time trap: a human needs a few seconds to fill in the form, a bot does not.
  const MIN_FILL_MS = 3000;
  const loadedAt = Date.now();
  const honeypots = form.querySelectorAll('input[name="_gotcha"], input[name="homepage"]');

  const DEFAULT_ERROR =
    "The message could not be sent. Try again, or message me on LinkedIn.";

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!form.reportValidity()) return;

    // Honeypot filled in: pretend it worked so the bot moves on, but send nothing.
    if (Array.from(honeypots).some((field) => field.value.trim() !== "")) {
      form.reset();
      failure.hidden = true;
      success.hidden = false;
      return;
    }

    // Submitted faster than a person could fill it in: ask them to try again.
    if (Date.now() - loadedAt < MIN_FILL_MS) {
      failureText.textContent = "That was quick! Please wait a moment and press send again.";
      failure.hidden = false;
      success.hidden = true;
      return;
    }

    success.hidden = true;
    failure.hidden = true;
    sendBtn.disabled = true;
    label.textContent = "Sending…";

    try {
      const res = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        form.reset();
        success.hidden = false;
      } else {
        let message = DEFAULT_ERROR;
        try {
          const data = await res.json();
          if (Array.isArray(data.errors) && data.errors.length) {
            message = data.errors.map((err) => err.message).join(" ");
          }
        } catch (_) {
          /* keep the default message */
        }
        failureText.textContent = message;
        failure.hidden = false;
      }
    } catch (_) {
      failureText.textContent = "Network error. Check your connection and try again.";
      failure.hidden = false;
    } finally {
      sendBtn.disabled = false;
      label.textContent = "Send message";
    }
  });
})();
