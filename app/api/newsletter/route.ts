import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 });
    }

    const db = supabaseAdmin();
    const { error } = await db
      .from('newsletter_subscribers')
      .upsert({ email: email.toLowerCase().trim() }, { onConflict: 'email' });

    if (error) {
      console.error('Newsletter insert error:', error);
      return NextResponse.json({ error: 'Could not save signup' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('Newsletter route error:', err);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
