'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Plane, Camera, Send } from 'lucide-react';
import { useRef } from 'react';

interface HeroProps {
  variant?: string;
  headline?: string;
  subheadline?: string;
}

export function Hero({ variant, headline, subheadline }: HeroProps) {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const rotate1 = useTransform(scrollYProgress, [0, 1], [-6, -20]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [4, 15]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const defaultHeadline = headline || "Dahlia\nRenae";
  const defaultSubheadline = subheadline || "Travel & Lifestyle Creator\nUGC - Social Media - Travel Content";

  return (
    <section ref={containerRef} className="relative min-h-[95vh] w-full flex flex-col items-center justify-center overflow-hidden bg-background">
      {/* Decorative Blob */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.5, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent-soft/20 blur-[100px]" 
      />
      
      {/* Hand-drawn Stickers (Animated) */}
      <motion.div 
        className="absolute top-[20%] left-[15%] text-accent opacity-80 hidden md:block"
        animate={{ y: [0, -15, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <Plane size={64} strokeWidth={1.5} className="drop-shadow-sm" />
      </motion.div>
      <motion.div 
        className="absolute bottom-[25%] right-[20%] text-foreground opacity-80 hidden md:block"
        animate={{ y: [0, 10, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        <Camera size={56} strokeWidth={1.5} className="drop-shadow-sm" />
      </motion.div>
      
      <motion.div style={{ opacity }} className="relative z-10 container mx-auto px-6 h-full flex flex-col justify-between pt-12 pb-12">
        <header className="flex justify-between items-center w-full mb-12">
          <span className="font-sans font-medium tracking-[0.2em] text-xs uppercase text-text-muted">
            Creator · Storyteller
          </span>
          <nav className="hidden md:flex gap-10 font-sans text-xs font-semibold tracking-widest uppercase text-foreground">
            <a href="#work" className="hover:text-accent transition-colors">Work</a>
            <a href="#about" className="hover:text-accent transition-colors">About</a>
            <a href="#services" className="hover:text-accent transition-colors">Services</a>
          </nav>
        </header>

        <div className="flex-1 flex flex-col items-center justify-center text-center mt-10 md:mt-0">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="font-display text-[16vw] md:text-[10vw] leading-[0.85] tracking-tight text-foreground whitespace-pre-line mix-blend-multiply">
              {defaultHeadline}
            </h1>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="mt-8 font-sans text-base md:text-lg text-text-muted max-w-sm mx-auto leading-relaxed whitespace-pre-line tracking-wide">
              {defaultSubheadline}
            </p>
          </motion.div>

          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="mt-12 flex flex-col sm:flex-row gap-4 items-center"
          >
            <a href="#work" className="group flex items-center gap-3 px-8 py-4 bg-foreground text-background font-sans text-xs uppercase tracking-[0.2em] hover:bg-accent transition-all rounded-full hover:shadow-xl hover:-translate-y-1">
              <span>View My Work</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#contact" className="group flex items-center gap-3 px-8 py-4 bg-surface border border-border text-foreground font-sans text-xs uppercase tracking-[0.2em] hover:border-foreground transition-all rounded-full hover:bg-light-gray">
              <span>Contact Me</span>
              <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </div>
      </motion.div>

      {/* Floating Polaroids (Interactive Video Placeholders) */}
      <motion.div 
        style={{ y: y1, rotate: rotate1 }}
        className="absolute top-[10%] -left-10 md:left-[10%] w-[200px] md:w-[280px] h-[300px] md:h-[400px] bg-white border border-border shadow-2xl p-4 hidden sm:flex flex-col gap-2 rounded-xl"
      >
        <div className="w-full h-full bg-light-gray rounded-md flex items-center justify-center overflow-hidden relative">
          <div className="absolute inset-0 bg-accent/10" />
          <span className="font-sans text-xs uppercase tracking-widest text-text-muted">Travel.mp4</span>
        </div>
        <div className="h-8 flex items-center justify-center font-display text-lg text-foreground italic">
          Bora Bora
        </div>
      </motion.div>
      
      <motion.div 
        style={{ y: y2, rotate: rotate2 }}
        className="absolute bottom-[5%] -right-10 md:right-[5%] w-[220px] md:w-[320px] h-[320px] md:h-[460px] bg-white border border-border shadow-2xl p-4 hidden sm:flex flex-col gap-2 rounded-xl"
      >
        <div className="w-full h-full bg-accent-soft/20 rounded-md flex items-center justify-center overflow-hidden relative">
           <span className="font-sans text-xs uppercase tracking-widest text-text-muted">Lifestyle.mp4</span>
        </div>
        <div className="h-8 flex items-center justify-center font-display text-lg text-foreground italic">
          Morning Routine
        </div>
      </motion.div>
    </section>
  );
}
