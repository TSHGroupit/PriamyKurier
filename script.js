const distanceInput = document.getElementById("distance");
const rateInput = document.getElementById("rate");
const rateNote = document.getElementById("rate-note");
const jobValueOutput = document.getElementById("job-value");
const successFeeOutput = document.getElementById("success-fee");
const courierPayoutOutput = document.getElementById("courier-payout");
const companyTotalOutput = document.getElementById("company-total");

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

const updateCalculator = () => {
  if (!distanceInput || !rateInput) {
    return;
  }

  const distance = Math.max(0, sanitizeNumber(distanceInput.value));
  let rate = sanitizeNumber(rateInput.value);

  if (rate < MIN_RATE) {
    rate = MIN_RATE;
    rateInput.value = MIN_RATE.toFixed(2);
    if (rateNote) {
      rateNote.style.display = "inline-flex";
    }
  } else if (rateNote) {
    rateNote.style.display = "none";
  }

  const jobValue = distance * rate;
  const successFee = jobValue * SUCCESS_FEE;
  const courierPayout = jobValue - successFee;
  const companyTotal = jobValue + successFee;

  if (jobValueOutput) {
    jobValueOutput.textContent = formatCurrency(jobValue);
  }
  if (successFeeOutput) {
    successFeeOutput.textContent = formatCurrency(successFee);
  }
  if (courierPayoutOutput) {
    courierPayoutOutput.textContent = formatCurrency(courierPayout);
  }
  if (companyTotalOutput) {
    companyTotalOutput.textContent = formatCurrency(companyTotal);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  updateCalculator();
  if (distanceInput) {
    distanceInput.addEventListener("input", updateCalculator);
  }
  if (rateInput) {
    rateInput.addEventListener("input", updateCalculator);
  }
});
