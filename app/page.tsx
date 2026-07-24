import Header from '@/components/Header';
import Footer from '@/components/Footer';
import NewsletterForm from '@/components/NewsletterForm';
import ProcessStar from '@/components/ProcessStar';
import Reveal from '@/components/Reveal';
import { PRODUCTS } from '@/lib/products';

export default function HomePage() {
  const coffees = PRODUCTS.filter((p) => p.category === 'coffee');
  const refreshers = PRODUCTS.filter((p) => p.category === 'refresher');

  return (
    <>
      <Header />

      <section className="hero">
        <div className="hero-noise" />
        <svg className="trajectory-svg" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
          <path className="trajectory-path dim" d="M -50 650 Q 300 150 650 350 T 1250 200" />
          <path className="trajectory-path" d="M -50 700 Q 350 250 700 420 T 1250 150" />
        </svg>
        <div className="hero-badge">
          <img
            src="/kinetic-logo.png"
            alt="Kinetic Coffee Co. logo"
            className="badge-spin"
            style={{ width: '100%', height: '100%' }}
          />
        </div>

        <div className="wrap hero-content">
          <p className="eyebrow">Veteran-Owned &amp; Operated · Small-Batch Coffee Co.</p>
          <h1>
            Momentum,
            <br />
            Roasted <em>In.</em>
          </h1>
          <p className="sub">
            Kinetic Coffee Co. is a veteran-owned coffee company serving small-batch bagged coffee, lattes, drip
            coffee, and Lotus Energy refreshers — for anyone who moves before sunrise.
          </p>
          <div className="hero-actions">
            <a href="#shop" className="btn btn-primary">
              Shop the Lineup
            </a>
            <a href="#story" className="btn btn-ghost">
              Read Our Story
            </a>
          </div>
        </div>
      </section>

      <div className="strip">
        <div className="strip-track">
          <span>Est. 2024</span>
          <span>Veteran-Owned &amp; Operated</span>
          <span>2.2% of Every Order to Mission 22</span>
          <span>Roasted to Order — Never Sits on a Shelf</span>
          <span>Est. 2024</span>
          <span>Veteran-Owned &amp; Operated</span>
          <span>2.2% of Every Order to Mission 22</span>
          <span>Roasted to Order — Never Sits on a Shelf</span>
        </div>
      </div>

      <section className="story" id="story">
        <div className="wrap story-grid">
          <Reveal>
            <p className="eyebrow">Our Story</p>
            <h2 style={{ marginTop: '0.5rem' }}>Built On Discipline, Poured With Purpose</h2>
          </Reveal>
          <Reveal>
            <p>
              Kinetic Coffee Co. was founded by an Air Force veteran who spent his service keeping radio and
              satellite communications equipment running. Gear that has to work, every time, with zero room for
              error.
            </p>
            <p>
              When he got out, he brought that same standard home. Beans sourced deliberately, roasted to order by a
              trusted partner, and evaluated batch by batch.
            </p>
            <blockquote className="pull-quote">
              "We don't roast coffee to relax. We roast it to move."
              <cite>— Founder, Kinetic Coffee Co.</cite>
            </blockquote>
          </Reveal>
        </div>
      </section>

      <section className="roaster" id="roaster">
        <div className="wrap roaster-grid">
          <Reveal>
            <p className="eyebrow">Our Roasting Partner</p>
            <h2 style={{ marginTop: '0.5rem' }}>Roasted By Wagon Coffee</h2>
            <p>
              Every bag from Kinetic Coffee Co. is roasted by Wagon Coffee Roasters, a Denver based women-owned coffee
              roastery founded in 2020. Wagon employs and supports women in recovery from addiction.
            </p>
            <p>
              Their beans are roasted on an all-electric, zero-emission roaster that cuts the carbon footprint of
              every batch by roughly 90% compared to a traditional gas roaster.
            </p>
          </Reveal>
          <Reveal>
            <div className="fact-card">
              <span className="tag">WOMEN-OWNED &amp; OPERATED</span>
              <p>Founded and run by women, employing women in recovery across every stage of the roasting process.</p>
            </div>
            <div className="fact-card">
              <span className="tag">100% ELECTRIC ROASTING</span>
              <p>Roasted on a Bellwether roaster — zero emissions, ~90% lower carbon footprint per batch.</p>
            </div>
            <div className="fact-card">
              <span className="tag">SUPPORT SMALL FARMS</span>
              <p>Green coffee bought through trusted import partners at equitable prices.</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="process" id="process">
        <div className="wrap">
          <Reveal className="section-head">
            <p className="eyebrow">The Process</p>
            <h2>From Farm to Field-Ready</h2>
          </Reveal>
          <ProcessStar />
          <p className="star-hint">Hover or tap a point to see each step</p>
        </div>
      </section>

      <section id="shop">
        <div className="wrap">
          <Reveal className="section-head">
            <p className="eyebrow">The Lineup</p>
            <h2>Shop Coffee</h2>
          </Reveal>
          <div className="product-grid">
            {coffees.map((product) => (
              <Reveal key={product.slug} className="reveal-card">
                <a href={`/products/${product.slug}`} className="product-card">
                  <img src={product.image} alt={product.name} />
                  <h3>{product.name}</h3>
                  <p className="origin">{product.origin}</p>
                  <p className="desc">{product.description}</p>
                  <div className="price-row">
                    <span className="price">${(product.priceCents / 100).toFixed(2)}</span>
                    <span className="btn btn-ghost" style={{ padding: '0.5rem 0.85rem', fontSize: '0.72rem' }}>
                      View
                    </span>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="refreshers" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <Reveal className="section-head">
            <p className="eyebrow">Beyond the Bag</p>
            <h2>Refreshers</h2>
            <p style={{ color: 'var(--paper-dim)', marginTop: '1rem', maxWidth: 600 }}>
              Made with Lotus Energy — a plant-based concentrate built on Plant Power 7 (PP7): coffee fruit, natural
              caffeine, KSM-66 ashwagandha, elderberry, EGCG green tea, guayusa leaf extract, and prebiotics.
            </p>
          </Reveal>
          <div className="product-grid">
            {refreshers.map((product) => (
              <Reveal key={product.slug} className="reveal-card">
                <a href={`/products/${product.slug}`} className="product-card">
                  <img src={product.image} alt={product.name} />
                  <h3>{product.name}</h3>
                  <p className="origin">{product.origin}</p>
                  <p className="desc">{product.description}</p>
                  <div className="price-row">
                    <span className="price">${(product.priceCents / 100).toFixed(2)}</span>
                    <span className="btn btn-ghost" style={{ padding: '0.5rem 0.85rem', fontSize: '0.72rem' }}>
                      View
                    </span>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="giving" id="giving">
        <div className="wrap">
          <Reveal>
            <p className="eyebrow" style={{ color: 'var(--mint)' }}>
              Giving Back
            </p>
            <h2>2.2% of every order goes to Mission 22.</h2>
            <p>
              The number isn't random. It's tied to the estimated number of veterans lost to suicide every day.
              Every order puts real dollars behind their suicide prevention work.
            </p>
          </Reveal>
          <a href="https://www.mission22.com" className="btn btn-ghost">
            Learn About Mission 22
          </a>
        </div>
      </section>

      <section className="newsletter" id="join">
        <Reveal className="wrap">
          <p className="eyebrow">Stay Connected</p>
          <h2 style={{ marginTop: '0.5rem' }}>Join the Ranks</h2>
          <p>Get new roast drops, restock alerts, and stories from the roastery.</p>
          <NewsletterForm />
        </Reveal>
      </section>

      <Footer />
    </>
  );
}
