/**
 * GreenDew Botanicals - inquiry Form Integration
 * Handles validation, AJAX POST request, loading, and accessible Toast alerts.
 * Uses capturing click interception to bypass Next.js React client-side handling.
 */

(function () {
  "use strict";

  // RFC-compliant email regex
  const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  // Accessibility friendly Toast Notification creator
  function showToast(message, isError = false) {
    let container = document.getElementById("toast-container");
    if (!container) {
      container = document.createElement("div");
      container.id = "toast-container";
      container.style.position = "fixed";
      container.style.bottom = "20px";
      container.style.right = "20px";
      container.style.zIndex = "9999";
      container.style.display = "flex";
      container.style.flexDirection = "column";
      container.style.gap = "10px";
      document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    toast.setAttribute("role", "alert");
    toast.setAttribute("aria-live", "assertive");
    toast.style.padding = "16px 24px";
    toast.style.borderRadius = "8px";
    toast.style.color = "#ffffff";
    toast.style.fontSize = "14px";
    toast.style.fontWeight = "600";
    toast.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.15)";
    toast.style.transition = "all 0.3s ease";
    toast.style.opacity = "0";
    toast.style.transform = "translateY(20px)";

    if (isError) {
      toast.style.backgroundColor = "#ef4444"; // Red
    } else {
      toast.style.backgroundColor = "#10b981"; // Green (GreenDew brand Leaf matching)
    }

    toast.innerText = message;
    container.appendChild(toast);

    // Fade-in animation
    setTimeout(() => {
      toast.style.opacity = "1";
      toast.style.transform = "translateY(0)";
    }, 10);

    // Fade-out and delete after 5 seconds
    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateY(-20px)";
      setTimeout(() => {
        toast.remove();
      }, 300);
    }, 5000);
  }

  function handleFormSubmit(form, submitBtn) {
    // Select form inputs by placeholder / type
    const nameInput = form.querySelector('input[placeholder*="Name"]');
    const companyInput = form.querySelector('input[placeholder*="Company"]');
    const countryInput = form.querySelector('input[placeholder*="Country"]');
    const emailInput = form.querySelector('input[type="email"]') || form.querySelector('input[placeholder*="Email"]');
    const phoneInput = form.querySelector('input[placeholder*="Phone"]');
    const productSelect = form.querySelector('select');
    const quantityInput = form.querySelector('input[placeholder*="Quantity"]');
    const messageTextarea = form.querySelector('textarea');

    // Extract values and trim whitespace
    const data = {
      name: nameInput ? nameInput.value.trim() : "",
      company: companyInput ? companyInput.value.trim() : "",
      country: countryInput ? countryInput.value.trim() : "",
      email: emailInput ? emailInput.value.trim() : "",
      phone: phoneInput ? phoneInput.value.trim() : "",
      product: productSelect ? productSelect.value.trim() : "",
      quantity: quantityInput ? quantityInput.value.trim() : "",
      message: messageTextarea ? messageTextarea.value.trim() : ""
    };

    // Client-side validations
    if (!data.name) {
      showToast("Name is required.", true);
      nameInput && nameInput.focus();
      return;
    }
    if (!data.country) {
      showToast("Country is required.", true);
      countryInput && countryInput.focus();
      return;
    }
    if (!data.email || !EMAIL_REGEX.test(data.email)) {
      showToast("Please enter a valid email address.", true);
      emailInput && emailInput.focus();
      return;
    }
    if (!data.phone) {
      showToast("Phone number is required.", true);
      phoneInput && phoneInput.focus();
      return;
    }
    // Basic phone pattern check
    if (!/^\+?[0-9\s\-()]{7,20}$/.test(data.phone)) {
      showToast("Please enter a valid phone number.", true);
      phoneInput && phoneInput.focus();
      return;
    }
    if (!data.product) {
      showToast("Product selection is required.", true);
      productSelect && productSelect.focus();
      return;
    }
    if (!data.message) {
      showToast("Message is required.", true);
      messageTextarea && messageTextarea.focus();
      return;
    }

    // Set loading state
    submitBtn.disabled = true;
    const originalContent = submitBtn.innerHTML;
    submitBtn.innerHTML = '<svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Sending...';

    const endpoint = window.GOOGLE_SCRIPT_ENDPOINT || "https://script.google.com/macros/s/AKfycbq/exec";

    // Submit via POST using no-cors mode to bypass Google Apps Script redirect CORS blocks,
    // and text/plain to bypass browser OPTIONS preflight requests.
    fetch(endpoint, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "text/plain"
      },
      body: JSON.stringify(data)
    })
      .then((response) => {
        // GAS may return redirect/opaque response. Opaque resolves with status 0.
        if (response.ok || response.type === "opaque" || response.status === 200) {
          showToast("Thank you for contacting us. Our sales team will reach out shortly.");
          form.reset();
        } else {
          throw new Error("Server returned error status: " + response.status);
        }
      })
      .catch((err) => {
        showToast("Something went wrong. Please try again.", true);
      })
      .finally(() => {
        // Restore button state
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalContent;
      });
  }

  // Intercept button click during Capturing phase
  document.addEventListener("click", (e) => {
    const btn = e.target.closest('form[id="inquiry"] button');
    if (btn) {
      e.preventDefault();
      e.stopPropagation();
      
      if (btn.disabled) return;
      
      const form = btn.closest("form");
      if (form) {
        handleFormSubmit(form, btn);
      }
    }
  }, true); // true sets capture mode!
})();
