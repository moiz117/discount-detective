# Testing Guide: Discount Detective (Manual Speed Edition)

Follow these steps to load and verify the "Discount Detective" Chrome Extension.

## 1. Load the Extension
1.  Open Chrome and navigate to `chrome://extensions`.
2.  Enable **Developer mode** (toggle in the top right corner).
3.  Click **Load unpacked**.
4.  Select the **discount-detective** folder: `/Users/moizc/Desktop/Project/discount-detective`.

## 2. Verify Side Panel
1.  Open any website (e.g., `google.com` or `amazon.in`).
2.  Click the **Extensions** (puzzle piece) icon in the Chrome toolbar.
3.  Find **Discount Detective**.
4.  If the side panel does not open by default when clicking the action icon, try:
    - Right-click the extension icon -> select **Open side panel**.
    - Or open the Chrome Side Panel (square icon next to your profile picture), and select **Discount Detective** from the dropdown menu.

## 3. Test Functionality

### Test Case A: Basic Discount
1.  **Original Price**: `1000`
2.  **Discount %**: `10`
3.  **Check**:
    - Final Price: `₹900.00`
    - Effective Discount: `10.00%` (Orange Badge, as 10 is not > 10)

### Test Case B: Higher Discount (Green Badge)
1.  **Original Price**: `1000`
2.  **Discount %**: `20`
3.  **Check**:
    - Final Price: `₹800.00`
    - Effective Discount: `20.00%` (Green Badge)

### Test Case C: Max Cap Limit
1.  **Original Price**: `1000`
2.  **Discount %**: `50` (Would normally be 500 discount)
3.  **Max Cap**: `100`
4.  **Check**:
    - Discount is capped at `100`.
    - Final Price: `900`.
    - Effective Discount: `10.00%`.

### Test Case D: Extra Charges & Quick Fees
1.  **Original Price**: `500`
2.  Click `+₹49` button.
3.  **Check**:
    - Extra Charges field shows `49.00`.
    - Final Price: `549.00`.
    - Effective Discount: `-9.80%` (Negative, Orange).

## 4. UI Layout Check
- Click in **Original Price** field.
- Press `Tab`. Focus should move to **Discount %**.
- Press `Tab`. Focus should move to **Max Cap**.
- Press `Tab`. Focus should move to **Extra Charges**.
