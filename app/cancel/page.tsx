import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function CancelPage() {
  return (
    <>
      <Header />
      <section>
        <div className="wrap" style={{ textAlign: 'center', padding: '5rem 0' }}>
          <p className="eyebrow" style={{ justifyContent: 'center', display: 'flex' }}>
            Checkout Cancelled
          </p>
          <h1 style={{ fontFamily: 'var(--display)', textTransform: 'none', fontSize: '2.2rem', marginTop: '0.8rem' }}>
            No charge made.
          </h1>
          <p style={{ color: 'var(--paper-dim)', marginTop: '1rem' }}>
            Your order was cancelled and nothing was charged. Head back whenever you're ready.
          </p>
          <a href="/#shop" className="btn btn-primary" style={{ marginTop: '2rem', display: 'inline-flex' }}>
            Back to Shop
          </a>
        </div>
      </section>
      <Footer />
    </>
  );
}
