import { calculateDiscountLogic } from '../logic.js';

const tests = [
    {
        name: "Basic Discount (1000, 10%)",
        input: { original: 1000, discount: 10, cap: "", extra: "" },
        expected: { finalPrice: 900, effectiveDiscount: 10, isCapped: false, isNegative: false }
    },
    {
        name: "High Discount (1000, 20%)",
        input: { original: 1000, discount: 20, cap: "", extra: "" },
        expected: { finalPrice: 800, effectiveDiscount: 20, isCapped: false, isNegative: false }
    },
    {
        name: "Max Cap Applied (1000, 50%, Cap 100)",
        input: { original: 1000, discount: 50, cap: 100, extra: "" },
        expected: { finalPrice: 900, effectiveDiscount: 10, isCapped: true, isNegative: false }
    },
    {
        name: "Extra Charges (500, 0%, Extra 49)",
        input: { original: 500, discount: 0, cap: "", extra: 49 },
        expected: { finalPrice: 549, effectiveDiscount: -9.8, isCapped: false, isNegative: true }
    },
    {
        name: "Complex Case (1000, 10%, Cap 50, Extra 20)",
        input: { original: 1000, discount: 10, cap: 50, extra: 20 },
        // Discount 100 -> Capped at 50.
        // Final = 1000 - 50 + 20 = 970.
        // Effective = ((1000 - 970)/1000)*100 = 3%
        expected: { finalPrice: 970, effectiveDiscount: 3, isCapped: true, isNegative: false }
    },
    {
        name: "Zero Original Price",
        input: { original: 0, discount: 10, cap: "", extra: "" },
        expected: null
    },
    {
        name: "Negative Original Price",
        input: { original: -100, discount: 10, cap: "", extra: "" },
        expected: null
    },
    {
        name: "Empty Inputs Treated as Zero/Infinity",
        input: { original: 100, discount: "", cap: "", extra: "" },
        expected: { finalPrice: 100, effectiveDiscount: 0, isCapped: false, isNegative: false }
    }
];

const resultsDiv = document.getElementById('results');
const summaryDiv = document.getElementById('summary');
let passed = 0;
let failed = 0;

tests.forEach(test => {
    const result = calculateDiscountLogic(test.input.original, test.input.discount, test.input.cap, test.input.extra);

    let isPass = false;
    if (test.expected === null) {
        isPass = result === null;
    } else {
        // Compare with tolerance for floating point
        const priceMatch = Math.abs(result.finalPrice - test.expected.finalPrice) < 0.01;
        const discountMatch = Math.abs(result.effectiveDiscount - test.expected.effectiveDiscount) < 0.01;
        const cappedMatch = result.isCapped === test.expected.isCapped;
        const negativeMatch = result.isDiscountNegative === test.expected.isNegative;

        isPass = priceMatch && discountMatch && cappedMatch && negativeMatch;
    }

    const testDiv = document.createElement('div');
    testDiv.className = `test-case ${isPass ? 'pass' : 'fail'}`;

    if (isPass) {
        testDiv.innerHTML = `<strong>✔ ${test.name}</strong><br>Passed`;
        passed++;
    } else {
        testDiv.innerHTML = `<strong>✘ ${test.name}</strong><br>
            Expected: ${JSON.stringify(test.expected)}<br>
            Got: ${JSON.stringify(result)}`;
        failed++;
    }
    resultsDiv.appendChild(testDiv);
});

summaryDiv.textContent = `Tests Completed: ${passed} Passed, ${failed} Failed`;
summaryDiv.style.color = failed === 0 ? 'green' : 'red';
