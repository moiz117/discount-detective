# Privacy Policy for Discount Detective

**Last Updated:** February 7, 2026

Discount Detective ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how our Chrome Extension handles your information.

## 1. No Data Collection
We operate under a strict "Privacy is Paramount" principle.
* **No Tracking:** We do not track your browsing history or search queries.
* **No Identifiers:** We do not collect your IP address, location, or device identifiers.
* **No Analytics:** We do not use Google Analytics, Mixpanel, or any third-party tracking scripts.

## 2. No Webpage Access (Sandboxed Environment)
**The extension does not access the webpage's DOM or read webpage content automatically.**
* **Manual Input Only:** The extension functions purely as a manual calculator. It relies entirely on the data you physically type into the input fields (e.g., Price, Discount %, Max Cap).
* **Technical Isolation:** All DOM (Document Object Model) access is strictly limited to the **extension's own interface** (the popup or side panel) to manage form inputs and display results. The extension does not have permission to read, modify, or interact with the content of the websites you visit.

## 3. Local Data Usage
The extension runs 100% locally on your device.
* **Storage:** We use your browser's local storage (`chrome.storage.local`) solely to save your *calculator preferences* (e.g., the last values you typed in) so you don't have to re-enter them. This data never leaves your computer.
* **Calculations:** All mathematical calculations happen instantly in your browser's memory. No data is sent to any external server.

## 4. Contact Us
This project is open-source. You can verify our code transparency or report issues directly on our GitHub repository:
https://github.com/moiz117/discount-detective/issues