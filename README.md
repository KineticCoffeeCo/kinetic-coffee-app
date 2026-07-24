# Kinetic Coffee Co. — Full E-Commerce App

Next.js + Stripe (payments & subscriptions) + Supabase (orders/subscribers database),
deployed on Vercel.

## 1. Add your logo

Drop your real logo file into `/public/kinetic-logo.jpg` (same filename referenced in
`components/Header.tsx` and `components/Footer.tsx`). Swap `/public/products/*.png`
for real product photos whenever you have them — same filenames, no code changes needed.

## 2. Install dependencies

```bash
npm install
```

## 3. Set up environment variables

```bash
cp .env.example .env.local
```

Fill in `.env.local` with:

- **Stripe**: Dashboard → Developers → API keys → copy the Publishable key and Secret key
  (use the Test mode keys while building).
- **Supabase**: Project Settings → API → copy the Project URL, `anon public` key, and
  `service_role` key (keep the service_role key secret — never commit it or expose it to
  the browser).
- **STRIPE_WEBHOOK_SECRET**: see step 5 below.
- **NEXT_PUBLIC_SITE_URL**: `http://localhost:3000` while developing locally.

## 4. Set up the database

In your Supabase project: SQL Editor → New query → paste the contents of
`supabase/schema.sql` → Run. This creates the `orders`, `subscriptions`, and
`newsletter_subscribers` tables.

## 5. Run Stripe webhooks locally (for testing)

Install the Stripe CLI (`brew install stripe/stripe-cli/stripe` on Mac, or see
stripe.com/docs/stripe-cli), then:

```bash
stripe login
stripe listen --forward-to localhost:3000/api/webhook
```

This prints a `whsec_...` value — paste that into `STRIPE_WEBHOOK_SECRET` in `.env.local`.

## 6. Run it locally

```bash
npm run dev
```

Visit `http://localhost:3000`. Try buying a product — Stripe Checkout opens, use test
card `4242 4242 4242 4242`, any future expiry, any CVC. After payment you'll land on
`/success`, and a row should appear in your Supabase `orders` table.

## 7. Deploy to Vercel

1. Push this project to a new GitHub repo (e.g. `kinetic-coffee-app`).
2. In Vercel: New Project → import that repo.
3. In the Vercel project's Settings → Environment Variables, add every variable from
   `.env.local` (use your **live** Stripe keys once you're ready to accept real payments —
   keep test keys for a staging/preview deployment if you want one).
4. Set `NEXT_PUBLIC_SITE_URL` to your real deployed domain (e.g. `https://kineticcoffeeco.com`
   or the `.vercel.app` URL Vercel gives you).
5. Deploy.
6. Back in Stripe: Developers → Webhooks → Add endpoint → URL =
   `https://yourdomain.com/api/webhook` → select event types
   `checkout.session.completed`, `customer.subscription.updated`,
   `customer.subscription.deleted` → Add endpoint. Copy the new signing secret into
   Vercel's `STRIPE_WEBHOOK_SECRET` environment variable and redeploy.

## Notes

- All checkout sessions collect a US shipping address automatically.
- Subscriptions bill monthly and apply the discount set per-product in `lib/products.ts`.
- The newsletter form writes straight to the `newsletter_subscribers` Supabase table —
  query it anytime in the Supabase Table Editor, or export it as CSV.
- The homepage here is a functional first pass focused on getting checkout, subscriptions,
  and the newsletter working end-to-end. The interactive 5-pointed star process diagram
  and a few other visual flourishes from the GitHub version aren't ported over yet — once
  this is confirmed working, we can layer that polish back in.
