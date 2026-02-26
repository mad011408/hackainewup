import Stripe from "stripe";

// Lazy-initialize Stripe to avoid build-time crash when STRIPE_SECRET_KEY is not set
let _stripe: Stripe | null = null;

function getStripe(): Stripe {
  if (!_stripe) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) {
      throw new Error("STRIPE_SECRET_KEY environment variable is not set");
    }
    _stripe = new Stripe(key, {
      apiVersion: "2026-01-28.clover",
    });
  }
  return _stripe;
}

// Export as a getter so Stripe is only initialized at runtime, not at build time
export const stripe = new Proxy({} as Stripe, {
  get(_target, prop, receiver) {
    return Reflect.get(getStripe(), prop, receiver);
  },
});
