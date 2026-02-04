const roleButtons = document.querySelectorAll(".role-button");
const roleViews = document.querySelectorAll(".role-view");

const courierDistanceInput = document.getElementById("courier-distance");
const courierRateInput = document.getElementById("courier-rate");
const courierRateNote = document.getElementById("courier-rate-note");
const courierJobValue = document.getElementById("courier-job-value");
const courierSuccessFee = document.getElementById("courier-success-fee");
const courierPayout = document.getElementById("courier-payout");

const MIN_RATE = 0.35;
const SUCCESS_FEE = 0.06;

const formatCurrency = (value) =>
  value.toLocaleString("en-IE", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
  });

const sanitizeNumber = (value) => {
  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) ? parsed : 0;
};

const updateCourierQuote = () => {
  if (!courierDistanceInput || !courierRateInput) {
    return;
  }

  const distance = Math.max(0, sanitizeNumber(courierDistanceInput.value));
  let rate = sanitizeNumber(courierRateInput.value);

  if (rate < MIN_RATE) {
    rate = MIN_RATE;
    courierRateInput.value = MIN_RATE.toFixed(2);
    if (courierRateNote) {
      courierRateNote.style.display = "inline-flex";
    }
  } else if (courierRateNote) {
    courierRateNote.style.display = "none";
  }

  const jobValue = distance * rate;
  const successFee = jobValue * SUCCESS_FEE;
  const payout = jobValue - successFee;

  if (courierJobValue) {
    courierJobValue.textContent = formatCurrency(jobValue);
  }
  if (courierSuccessFee) {
    courierSuccessFee.textContent = formatCurrency(successFee);
  }
  if (courierPayout) {
    courierPayout.textContent = formatCurrency(payout);
  }
};

const setRoleView = (role) => {
  roleViews.forEach((view) => {
    const isActive = view.dataset.view === role;
    view.classList.toggle("active", isActive);
  });

  roleButtons.forEach((button) => {
    const isActive = button.dataset.role === role;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-selected", isActive ? "true" : "false");
  });
};

roleButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setRoleView(button.dataset.role);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const initialButton = document.querySelector(".role-button.active") || roleButtons[0];
  if (initialButton) {
    setRoleView(initialButton.dataset.role);
  }

  updateCourierQuote();
  if (courierDistanceInput) {
    courierDistanceInput.addEventListener("input", updateCourierQuote);
  }
  if (courierRateInput) {
    courierRateInput.addEventListener("input", updateCourierQuote);
  }
});
