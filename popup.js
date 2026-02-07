import { calculateDiscountLogic } from './logic.js';

document.addEventListener('DOMContentLoaded', () => {
  // Get Elements
  const originalPriceInput = document.getElementById('original-price');
  const discountPercentInput = document.getElementById('discount-percent');
  const maxCapInput = document.getElementById('max-cap');
  const extraChargesInput = document.getElementById('extra-charges');

  const quickFeeButtons = document.querySelectorAll('.quick-fee-btn');

  const resultDisplay = document.getElementById('result-display');
  const finalPriceSpan = document.getElementById('final-price');
  const effectiveDiscountBadge = document.getElementById('effective-discount-badge');


  // Function to calculate and update UI
  function calculate() {
    const originalPrice = originalPriceInput.value;
    const discountPercent = discountPercentInput.value;
    const maxCap = maxCapInput.value;
    const extraCharges = extraChargesInput.value;

    const result = calculateDiscountLogic(originalPrice, discountPercent, maxCap, extraCharges);

    if (!result) {
      // Clear/Reset if no price
      resultDisplay.classList.remove('active');
      return;
    }

    const { finalPrice, effectiveDiscount } = result;

    // Update UI
    resultDisplay.classList.add('active');
    finalPriceSpan.textContent = '₹' + finalPrice.toFixed(2);

    // Update Badge
    effectiveDiscountBadge.textContent = effectiveDiscount.toFixed(2) + '%';
    effectiveDiscountBadge.className = 'badge'; // Reset classes
    if (effectiveDiscount > 10) {
      effectiveDiscountBadge.classList.add('success'); // Green
      effectiveDiscountBadge.style.backgroundColor = '#4caf50'; // Ensure style applied
    } else {
      effectiveDiscountBadge.classList.add('warning'); // Orange
      effectiveDiscountBadge.style.backgroundColor = '#ff9800'; // Ensure style applied
    }
  }

  // Event Listeners for Inputs
  const inputs = [originalPriceInput, discountPercentInput, maxCapInput, extraChargesInput];
  inputs.forEach(input => {
    input.addEventListener('input', calculate);
  });

  // Event Listeners for Quick Fees
  quickFeeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const feeToAdd = parseFloat(btn.getAttribute('data-value'));
      const currentCharges = parseFloat(extraChargesInput.value) || 0;
      extraChargesInput.value = (currentCharges + feeToAdd).toFixed(2);
      calculate(); // Recalculate immediately
    });
  });

  // Optional: Auto-select text on focus for easier editing
  inputs.forEach(input => {
    input.addEventListener('focus', function () {
      this.select();
    });
  });

});
