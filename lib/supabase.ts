import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Public client (safe to use in the browser). Has NO access to the
// orders/subscriptions/newsletter tables because of Row Level Security.
export const supabasePublic = createClient(supabaseUrl, anonKey);

// Admin client (SERVER-SIDE ONLY — never import this into a client component
// or expose SUPABASE_SERVICE_ROLE_KEY to the browser). Bypasses Row Level
// Security, used by API routes to read/write orders, subscriptions, and
// newsletter signups.
export function supabaseAdmin() {
  if (!serviceRoleKey) {
    throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY environment variable');
  }
  return createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false },
  });
}
