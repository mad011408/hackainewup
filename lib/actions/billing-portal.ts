// Minimal placeholder for the billing portal action so the open-source
// / local version can build without Stripe / billing configured.
// The UI will simply do nothing when this returns null.

"use server";

export default async function redirectToBillingPortalAction(): Promise<string | null> {
  return null;
}

