'use client';
import { motion } from 'framer-motion';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function Services({ data }: { data: any }) {
  if (!data) return null;
  const { title, services, layoutVariant } = data;

  return (
    <section id="services" className="w-full py-24 bg-background">
      <div className="container mx-auto px-6">
        <h2 className="font-display text-5xl text-foreground mb-12">{title || 'Services'}</h2>
        
        <div className={`grid gap-8 ${layoutVariant === 'grid' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {services?.map((service: any, i: number) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-8 border border-border rounded-2xl bg-surface"
            >
              <h3 className="font-sans text-xl font-bold mb-4">{service.title}</h3>
              <p className="font-sans text-text-muted mb-6">{service.description}</p>
              {service.price && (
                <div className="font-sans text-sm font-semibold tracking-widest uppercase text-accent">
                  Starting at {service.price}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
