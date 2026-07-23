import Stripe from 'stripe';

// Lazily create the Stripe client the first time it's actually needed,
// instead of at module load time. This means the app (and Vercel's build
// step, which loads every route to analyze it) won't crash just because
// STRIPE_SECRET_KEY isn't set yet — the error only surfaces if someone
// actually hits an endpoint that needs Stripe before the key is configured.
let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (!_stripe) {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error('Missing STRIPE_SECRET_KEY environment variable');
    }
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2024-06-20',
    });
  }
  return _stripe;
}
