import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Both clients below are created lazily (only when actually called), the
// same pattern used in lib/stripe.ts. This means simply importing this file
// — which happens automatically whenever Next.js analyzes a route during
// build — never crashes just because Supabase env vars aren't set yet.

let _supabasePublic: SupabaseClient | null = null;

// Public client (safe to use in the browser). Has NO access to the
// orders/subscriptions/newsletter tables because of Row Level Security.
export function getSupabasePublic(): SupabaseClient {
  if (!_supabasePublic) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!supabaseUrl || !anonKey) {
      throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY');
    }
    _supabasePublic = createClient(supabaseUrl, anonKey);
  }
  return _supabasePublic;
}

let _supabaseAdmin: SupabaseClient | null = null;

// Admin client (SERVER-SIDE ONLY — never import this into a client component
// or expose SUPABASE_SERVICE_ROLE_KEY to the browser). Bypasses Row Level
// Security, used by API routes to read/write orders, subscriptions, and
// newsletter signups.
export function supabaseAdmin(): SupabaseClient {
  if (!_supabaseAdmin) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!supabaseUrl || !serviceRoleKey) {
      throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
    }
    _supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
      auth: { persistSession: false },
    });
  }
  return _supabaseAdmin;
}
