/**
 * Calculates the final price and effective discount.
 * @param {number} originalPrice - The original price of the item.
 * @param {number} discountPercent - The discount percentage.
 * @param {number} maxCap - The maximum discount amount (optional).
 * @param {number} extraCharges - Additional charges.
 * @returns {object} - An object containing finalPrice, effectiveDiscount, isCapped, and isDiscountNegative.
 */
export function calculateDiscountLogic(originalPrice, discountPercent, maxCap, extraCharges) {
    originalPrice = parseFloat(originalPrice) || 0;
    discountPercent = parseFloat(discountPercent) || 0;
    maxCap = parseFloat(maxCap) || Infinity;
    extraCharges = parseFloat(extraCharges) || 0;

    if (originalPrice <= 0) {
        return null;
    }

    // 1. Calculate Discount Amount
    let discountAmount = (originalPrice * discountPercent) / 100;

    // 2. Apply Max Cap
    let actualDiscount = discountAmount;
    let isCapped = false;
    if (maxCap !== Infinity && discountAmount > maxCap) {
        actualDiscount = maxCap;
        isCapped = true;
    }

    // 3. Final Price Calculation
    // Final Price = Original - ActualDiscount + ExtraCharges
    const finalPrice = originalPrice - actualDiscount + extraCharges;

    // 4. Effective Discount Calculation
    // Logic: ((OriginalPrice - FinalPrice) / OriginalPrice) * 100
    let effectiveDiscount = 0;
    if (originalPrice > 0) {
        effectiveDiscount = ((originalPrice - finalPrice) / originalPrice) * 100;
    }

    return {
        finalPrice,
        effectiveDiscount,
        isCapped,
        isDiscountNegative: effectiveDiscount < 0
    };
}
