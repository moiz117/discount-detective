document.addEventListener('DOMContentLoaded', () => {
  const calculateBtn = document.getElementById('calculate-btn');
  const resultDiv = document.getElementById('result');
  const finalPriceSpan = document.getElementById('final-price');
  const savedAmountSpan = document.getElementById('saved-amount');
  const realDiscountSpan = document.getElementById('real-discount');
  const capWarningSpan = document.getElementById('cap-warning');

  calculateBtn.addEventListener('click', () => {
    // 1. Get Inputs & Handle Zero/Negative Cases
    const originalPrice = Math.max(0, parseFloat(document.getElementById('original-price').value));
    const discountPercent = Math.max(0, parseFloat(document.getElementById('discount-percent').value));
    const maxCapVal = document.getElementById('max-cap').value;
    const maxCap = maxCapVal === '' ? Infinity : Math.max(0, parseFloat(maxCapVal));
    
    // Optional Extras
    const extraCharges = Math.max(0, parseFloat(document.getElementById('extra-charges').value) || 0);
    const couponDiscount = Math.max(0, parseFloat(document.getElementById('coupon-discount').value) || 0);

    // Validation
    if (isNaN(originalPrice) || isNaN(discountPercent)) {
      alert('Please enter valid numbers for Original Price and Discount %.');
      return;
    }

    // 2. Calculate Base Discount
    let baseDiscountAmount = (originalPrice * discountPercent) / 100;

    // 3. Apply Max Cap Logic
    let actualDiscount = baseDiscountAmount;
    let isCapped = false;

    if (baseDiscountAmount > maxCap) {
      actualDiscount = maxCap;
      isCapped = true;
    }

    // 4. Calculate Intermediate Price (after primary discount)
    let priceAfterBaseDiscount = originalPrice - actualDiscount;

    // 5. Apply Additional Coupon (Flat Amount)
    // Ensure we don't go below zero from coupon alone (though technically possible with gift cards, usually not for "discounts")
    // Let's allow it to go to zero, but not negative for the item price itself before extras? 
    // Usually coupons reduce item price.
    let priceAfterCoupon = priceAfterBaseDiscount - couponDiscount;
    if (priceAfterCoupon < 0) priceAfterCoupon = 0;

    // 6. Add Extra Charges (Shipping, Tax, etc.) - these are added TO the price
    let finalPrice = priceAfterCoupon + extraCharges;

    // 7. Calculate "Effective" Savings & Discount %
    // Total Saved = Original - Final. 
    // Note: If Extra Charges > Discounts, this could be negative (you pay more than original).
    let totalSaved = originalPrice - finalPrice;
    
    // Effective Discount %
    let effectiveDiscountPercent = 0;
    if (originalPrice > 0) {
      effectiveDiscountPercent = (totalSaved / originalPrice) * 100;
    }

    // Formatting Output
    finalPriceSpan.textContent = '$' + finalPrice.toFixed(2);
    
    // Handle Saved Amount Display
    if (totalSaved >= 0) {
      savedAmountSpan.textContent = '$' + totalSaved.toFixed(2);
      savedAmountSpan.style.color = 'var(--success-color)';
    } else {
      savedAmountSpan.textContent = '-$' + Math.abs(totalSaved).toFixed(2) + ' (Extra Cost)';
      savedAmountSpan.style.color = 'var(--accent-color)';
    }

    realDiscountSpan.textContent = effectiveDiscountPercent.toFixed(2);

    // Handle Warning Icon
    if (isCapped) {
      capWarningSpan.classList.remove('hidden');
      capWarningSpan.title = `Discount capped at $${maxCap}! Original discount was $${baseDiscountAmount.toFixed(2)}`;
    } else {
      capWarningSpan.classList.add('hidden');
    }

    resultDiv.classList.remove('hidden');
  });
});
