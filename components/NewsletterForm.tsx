'use client';

import { useState, FormEvent } from 'react';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error('failed');
      setStatus('success');
      setEmail('');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return <p className="form-msg success">✓ You're on the list. Welcome to the ranks.</p>;
  }

  return (
    <>
      <form className="signup-form" onSubmit={handleSubmit}>
        <input
          type="email"
          required
          placeholder="you@email.com"
          aria-label="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit" className="btn btn-primary" disabled={status === 'loading'}>
          {status === 'loading' ? 'Signing Up…' : 'Sign Up'}
        </button>
      </form>
      {status === 'error' && <p className="form-msg error">Something went wrong — try again in a moment.</p>}
    </>
  );
}
