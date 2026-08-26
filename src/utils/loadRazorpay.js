// Lazily injects the Razorpay Checkout script once and caches the load promise
// so repeated bookings reuse the already-loaded SDK instead of re-appending it.
const RAZORPAY_CHECKOUT_SRC = "https://checkout.razorpay.com/v1/checkout.js";

let loadPromise = null;

/**
 * Ensures the Razorpay Checkout SDK is available on `window.Razorpay`.
 * @returns {Promise<boolean>} resolves true once loaded, false if the script fails.
 */
export function loadRazorpayScript() {
  if (typeof window !== "undefined" && window.Razorpay) {
    return Promise.resolve(true);
  }
  if (loadPromise) return loadPromise;

  loadPromise = new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = RAZORPAY_CHECKOUT_SRC;
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => {
      // Allow a later retry by clearing the cached (failed) promise.
      loadPromise = null;
      resolve(false);
    };
    document.body.appendChild(script);
  });

  return loadPromise;
}
