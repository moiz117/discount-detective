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
    const originalPrice = parseFloat(originalPriceInput.value) || 0;
    const discountPercent = parseFloat(discountPercentInput.value) || 0;
    const maxCap = parseFloat(maxCapInput.value) || Infinity; // If empty, no cap i.e. Infinity
    const extraCharges = parseFloat(extraChargesInput.value) || 0;

    if (originalPrice <= 0) {
      // Clear/Reset if no price
      resultDisplay.classList.remove('active');
      return;
    }

    // 1. Calculate Discount Amount
    let discountAmount = (originalPrice * discountPercent) / 100;

    // 2. Apply Max Cap
    let actualDiscount = discountAmount;
    let capped = false;
    if (maxCap !== Infinity && discountAmount > maxCap) {
      actualDiscount = maxCap;
      capped = true;
    }

    // 3. Final Price Calculation
    // Final Price = Original - ActualDiscount + ExtraCharges
    const finalPrice = originalPrice - actualDiscount + extraCharges;

    // 4. Effective Discount Calculation
    // Logic: ((OriginalPrice - FinalPrice) / OriginalPrice) * 100
    // Note: If FinalPrice > OriginalPrice (due to high extra charges), discount is negative.
    let effectiveDiscount = 0;
    if (originalPrice > 0) {
      effectiveDiscount = ((originalPrice - finalPrice) / originalPrice) * 100;
    }

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
