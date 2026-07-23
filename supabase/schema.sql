-- Run this once in Supabase: Project -> SQL Editor -> New query -> paste this -> Run

-- Orders placed through Stripe Checkout (one-time purchases)
create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  stripe_session_id text unique not null,
  customer_email text not null,
  customer_name text,
  amount_total integer not null,        -- amount in cents
  currency text not null default 'usd',
  status text not null default 'paid',  -- paid, refunded, cancelled
  shipping_address jsonb,
  line_items jsonb not null,            -- snapshot of what was purchased
  created_at timestamptz not null default now()
);

-- Active/past subscriptions (recurring coffee delivery)
create table if not exists subscriptions (
  id uuid primary key default gen_random_uuid(),
  stripe_subscription_id text unique not null,
  stripe_customer_id text not null,
  customer_email text not null,
  plan_name text not null,              -- e.g. "Standard Issue - Monthly"
  status text not null,                 -- active, past_due, canceled, trialing
  current_period_end timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Newsletter signups
create table if not exists newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  subscribed_at timestamptz not null default now(),
  source text default 'website'
);

-- Helpful indexes
create index if not exists idx_orders_email on orders(customer_email);
create index if not exists idx_subscriptions_email on subscriptions(customer_email);

-- Row Level Security: lock these tables down so only server-side code
-- (using the service_role key) can read/write. The public/anon key
-- used in the browser gets NO access to these tables by default.
alter table orders enable row level security;
alter table subscriptions enable row level security;
alter table newsletter_subscribers enable row level security;

-- No policies are created for the anon role on purpose --
-- all reads/writes happen through Next.js API routes using the service_role key.
