'use client';
import { useState } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function Contact({ data }: { data: any }) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  if (!data) return null;
  const { title, description, email, formLayout } = data;

  return (
    <section id="contact" className="w-full py-24 bg-cream">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="font-display text-5xl text-foreground mb-4">{title || "Let's Work Together"}</h2>
          {description && <p className="font-sans text-text-muted max-w-2xl mx-auto">{description}</p>}
          {email && (
            <a href={`mailto:${email}`} className="inline-block mt-4 font-sans text-sm font-bold uppercase tracking-widest text-accent hover:underline">
              {email}
            </a>
          )}
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6 max-w-2xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <label className="flex flex-col gap-2 font-sans text-sm font-bold uppercase tracking-widest">
              Name
              <input type="text" name="name" required className="p-4 bg-white border border-border rounded-lg focus:outline-none focus:border-accent" placeholder="Jane Doe" />
            </label>
            <label className="flex flex-col gap-2 font-sans text-sm font-bold uppercase tracking-widest">
              Email
              <input type="email" name="email" required className="p-4 bg-white border border-border rounded-lg focus:outline-none focus:border-accent" placeholder="jane@example.com" />
            </label>
          </div>
          
          <label className="flex flex-col gap-2 font-sans text-sm font-bold uppercase tracking-widest">
            Message
            <textarea name="message" required rows={5} className="p-4 bg-white border border-border rounded-lg focus:outline-none focus:border-accent" placeholder="Tell me about your project..."></textarea>
          </label>

          <button 
            type="submit" 
            disabled={status === 'loading' || status === 'success'}
            className="w-full md:w-auto md:self-center px-12 py-4 bg-foreground text-background font-sans text-sm font-bold uppercase tracking-widest rounded-full hover:bg-accent transition-colors disabled:opacity-50"
          >
            {status === 'loading' ? 'Sending...' : status === 'success' ? 'Message Sent!' : 'Send Inquiry'}
          </button>

          {status === 'success' && (
            <p className="text-center font-sans text-sm text-green-600 mt-4" role="alert">
              Thank you! Your message has been securely sent.
            </p>
          )}
          {status === 'error' && (
            <p className="text-center font-sans text-sm text-red-600 mt-4" role="alert">
              Email delivery is currently unavailable. Please try again later.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
