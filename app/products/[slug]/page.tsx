'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getProductBySlug } from '@/lib/products';

export default function ProductPage() {
  const params = useParams();
  const slug = params.slug as string;
  const product = getProductBySlug(slug);

  const [grindOptionId, setGrindOptionId] = useState(product?.grindOptions?.[0]?.id || '');
  const [loading, setLoading] = useState<'payment' | 'subscription' | null>(null);
  const [error, setError] = useState('');

  if (!product) {
    return (
      <>
        <Header />
        <div className="wrap" style={{ padding: '6rem 0' }}>
          <h1>Product not found</h1>
        </div>
        <Footer />
      </>
    );
  }

  const grind = product.grindOptions?.find((g) => g.id === grindOptionId);
  const unitPriceCents = product.priceCents + (grind?.priceDeltaCents || 0);
  const subUnitPriceCents = product.subscriptionDiscountPct
    ? Math.round(unitPriceCents * (1 - product.subscriptionDiscountPct / 100))
    : unitPriceCents;

  async function buy(mode: 'payment' | 'subscription') {
    setLoading(mode);
    setError('');
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug: product!.slug, grindOptionId, mode }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) throw new Error(data.error || 'Checkout failed');
      window.location.href = data.url;
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
      setLoading(null);
    }
  }

  return (
    <>
      <Header />
      <section>
        <div className="wrap product-detail">
          <img src={product.image} alt={product.name} />
          <div>
            <p className="eyebrow">{product.origin}</p>
            <h1 style={{ fontFamily: 'var(--heading)', fontSize: '2.2rem', marginTop: '0.5rem' }}>
              {product.name}
            </h1>
            <p style={{ color: 'var(--paper-dim)', marginTop: '1rem' }}>{product.description}</p>
            <p className="price" style={{ fontSize: '1.4rem', marginTop: '1.4rem' }}>
              ${(unitPriceCents / 100).toFixed(2)}
            </p>

            {product.grindOptions && (
              <div className="grind-select">
                <label htmlFor="grind">Grinding Option</label>
                <select id="grind" value={grindOptionId} onChange={(e) => setGrindOptionId(e.target.value)}>
                  {product.grindOptions.map((g) => (
                    <option key={g.id} value={g.id}>
                      {g.label} {g.priceDeltaCents > 0 ? `(+$${(g.priceDeltaCents / 100).toFixed(2)})` : ''}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="buy-actions">
              <button className="btn btn-primary" disabled={loading !== null} onClick={() => buy('payment')}>
                {loading === 'payment' ? 'Redirecting…' : `Buy Now — $${(unitPriceCents / 100).toFixed(2)}`}
              </button>

              {product.subscribable && (
                <button className="btn btn-ghost" disabled={loading !== null} onClick={() => buy('subscription')}>
                  {loading === 'subscription'
                    ? 'Redirecting…'
                    : `Subscribe & Save ${product.subscriptionDiscountPct}% — $${(subUnitPriceCents / 100).toFixed(2)}/mo`}
                </button>
              )}
            </div>

            {error && <p className="form-msg error" style={{ marginTop: '1rem' }}>{error}</p>}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
