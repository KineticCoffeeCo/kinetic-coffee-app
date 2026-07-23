import { NextRequest, NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe';
import { getProductBySlug } from '@/lib/products';

// POST /api/checkout
// body: { slug: string, grindOptionId?: string, quantity?: number, mode: 'payment' | 'subscription' }
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { slug, grindOptionId, quantity = 1, mode = 'payment' } = body;

    const product = getProductBySlug(slug);
    if (!product) {
      return NextResponse.json({ error: 'Unknown product' }, { status: 400 });
    }

    let unitAmount = product.priceCents;
    let variantLabel = '';
    if (grindOptionId && product.grindOptions) {
      const grind = product.grindOptions.find((g) => g.id === grindOptionId);
      if (grind) {
        unitAmount += grind.priceDeltaCents;
        variantLabel = ` (${grind.label})`;
      }
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

    if (mode === 'subscription') {
      if (!product.subscribable) {
        return NextResponse.json(
          { error: 'This product is not available as a subscription' },
          { status: 400 }
        );
      }
      const discountPct = product.subscriptionDiscountPct || 0;
      const subscriptionAmount = Math.round(unitAmount * (1 - discountPct / 100));

      const session = await getStripe().checkout.sessions.create({
        mode: 'subscription',
        line_items: [
          {
            price_data: {
              currency: 'usd',
              unit_amount: subscriptionAmount,
              recurring: { interval: 'month' },
              product_data: {
                name: `${product.name}${variantLabel} — Monthly Subscription`,
                description: product.origin,
              },
            },
            quantity,
          },
        ],
        shipping_address_collection: { allowed_countries: ['US'] },
        success_url: `${siteUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${siteUrl}/cancel`,
        metadata: { slug, grindOptionId: grindOptionId || '', kind: 'subscription' },
      });

      return NextResponse.json({ url: session.url });
    }

    // One-time payment
    const session = await getStripe().checkout.sessions.create({
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            unit_amount: unitAmount,
            product_data: {
              name: `${product.name}${variantLabel}`,
              description: product.origin,
            },
          },
          quantity,
        },
      ],
      shipping_address_collection: { allowed_countries: ['US'] },
      success_url: `${siteUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/cancel`,
      metadata: { slug, grindOptionId: grindOptionId || '', kind: 'one_time' },
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error('Checkout error:', err);
    return NextResponse.json({ error: 'Something went wrong creating checkout' }, { status: 500 });
  }
}
