import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, email, message } = data;

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    // TODO: Connect to an actual email provider like Resend or SendGrid here.
    // Until the email provider is configured, return an explicit unavailable response.
    console.log(`[Contact Form] Received message from ${name} (${email}): ${message}`);

    return NextResponse.json(
      { error: 'Email delivery is currently unavailable. The provider has not been configured yet.' },
      { status: 503 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
