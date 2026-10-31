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

  const DEFAULT_ERROR =
    "The message could not be sent. Try again, or message me on LinkedIn.";

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!form.reportValidity()) return;

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
