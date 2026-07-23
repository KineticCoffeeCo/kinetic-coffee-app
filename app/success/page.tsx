import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function SuccessPage() {
  return (
    <>
      <Header />
      <section>
        <div className="wrap" style={{ textAlign: 'center', padding: '5rem 0' }}>
          <p className="eyebrow" style={{ justifyContent: 'center', display: 'flex' }}>
            Order Confirmed
          </p>
          <h1 style={{ fontFamily: 'var(--display)', textTransform: 'none', fontSize: '2.4rem', marginTop: '0.8rem' }}>
            You're locked and loaded.
          </h1>
          <p style={{ color: 'var(--paper-dim)', marginTop: '1rem', maxWidth: 480, marginInline: 'auto' }}>
            Thanks for the order — a confirmation email is on its way from Stripe, and we'll get your coffee roasted
            and shipped fast.
          </p>
          <a href="/" className="btn btn-primary" style={{ marginTop: '2rem', display: 'inline-flex' }}>
            Back to Home
          </a>
        </div>
      </section>
      <Footer />
    </>
  );
}
