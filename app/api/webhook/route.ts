import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getStripe } from '@/lib/stripe';
import { supabaseAdmin } from '@/lib/supabase';

// Stripe requires the raw request body (unparsed) to verify the webhook signature.
export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature');
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !webhookSecret) {
    return NextResponse.json({ error: 'Missing signature or webhook secret' }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  const db = supabaseAdmin();

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;

        if (session.mode === 'payment') {
          const lineItems = await getStripe().checkout.sessions.listLineItems(session.id, {
            expand: ['data.price.product'],
          });

          await db.from('orders').insert({
            stripe_session_id: session.id,
            customer_email: session.customer_details?.email || 'unknown',
            customer_name: session.customer_details?.name || null,
            amount_total: session.amount_total || 0,
            currency: session.currency || 'usd',
            status: 'paid',
            shipping_address: session.shipping_details || null,
            line_items: lineItems.data,
          });
        }

        if (session.mode === 'subscription' && session.subscription) {
          const subscription = await getStripe().subscriptions.retrieve(session.subscription as string);
          await db.from('subscriptions').upsert(
            {
              stripe_subscription_id: subscription.id,
              stripe_customer_id: subscription.customer as string,
              customer_email: session.customer_details?.email || 'unknown',
              plan_name: session.metadata?.slug || 'subscription',
              status: subscription.status,
              current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
            },
            { onConflict: 'stripe_subscription_id' }
          );
        }
        break;
      }

      case 'customer.subscription.updated':
      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        await db
          .from('subscriptions')
          .update({
            status: subscription.status,
            current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
            updated_at: new Date().toISOString(),
          })
          .eq('stripe_subscription_id', subscription.id);
        break;
      }

      default:
        // Unhandled event types are fine to ignore
        break;
    }

    return NextResponse.json({ received: true });
  } catch (err: any) {
    console.error('Webhook handler error:', err);
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 });
  }
}
