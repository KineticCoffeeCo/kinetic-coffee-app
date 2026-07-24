'use client';

import { useEffect, useRef, useState } from 'react';

type StepData = {
  id: string;
  step: string;
  title: string;
  desc: string;
  posClass: string;
  style: { left: string; top: string };
};

const STEPS: StepData[] = [
  {
    id: 'sourced',
    step: '01 / SOURCED',
    title: 'Sourced',
    desc: 'Green beans bought through trusted import partners.',
    posClass: 'star-node--top',
    style: { left: '50%', top: '8%' },
  },
  {
    id: 'roasted',
    step: '02 / ROASTED',
    title: 'Roasted To Order',
    desc: 'Nothing sits on a shelf. Your beans are roasted by our partners at Wagon Coffee Roasters in Denver only once you place your order, on an all-electric roaster.',
    posClass: 'star-node--right-upper',
    style: { left: '89.95%', top: '37.02%' },
  },
  {
    id: 'cupped',
    step: '03 / CUPPED',
    title: 'Cupped',
    desc: "Wagon only sells beans that score 85 or higher on the specialty coffee scale. Every lot is cupped and evaluated before it's cleared to roast.",
    posClass: 'star-node--right-lower',
    style: { left: '74.69%', top: '83.98%' },
  },
  {
    id: 'packed',
    step: '04 / PACKED',
    title: 'Packed',
    desc: "Straight from the roaster into our own bags, sealed while it's still at its freshest.",
    posClass: 'star-node--left-lower',
    style: { left: '25.31%', top: '83.98%' },
  },
  {
    id: 'shipped',
    step: '05 / SHIPPED',
    title: 'Shipped',
    desc: 'Out the door fast, so what arrives at your place is some of the freshest coffee you can buy.',
    posClass: 'star-node--left-upper',
    style: { left: '10.05%', top: '37.02%' },
  },
];

export default function ProcessStar() {
  const [activeId, setActiveId] = useState(STEPS[0].id);
  const [inView, setInView] = useState(false);
  const [canHover, setCanHover] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCanHover(window.matchMedia('(hover: hover)').matches);

    const el = wrapRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const active = STEPS.find((s) => s.id === activeId) || STEPS[0];

  return (
    <div ref={wrapRef} className={`process-star ${inView ? 'in-view' : ''}`}>
      <svg className="star-svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
        <path className="star-outline" d="M50,8 L74.69,83.98 L10.05,37.02 L89.95,37.02 L25.31,83.98 Z" />
      </svg>

      {STEPS.map((s) => (
        <button
          key={s.id}
          type="button"
          className={`star-node ${s.posClass} ${activeId === s.id ? 'active' : ''}`}
          style={s.style}
          aria-label={`${s.step}: ${s.title}`}
          onClick={() => setActiveId(s.id)}
          onFocus={() => setActiveId(s.id)}
          onMouseEnter={() => canHover && setActiveId(s.id)}
        >
          <span className="star-dot" />
          <span className="star-label">{s.title}</span>
        </button>
      ))}

      <div className="star-center" aria-live="polite">
        <span className="star-center-step">{active.step}</span>
        <h3>{active.title}</h3>
        <p>{active.desc}</p>
      </div>
    </div>
  );
}
