'use client';
import { motion } from 'framer-motion';
import { useRef, useState } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface DraggableReelProps {
  projects: any[];
}

export function DraggableReel({ projects }: DraggableReelProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const initialCats = projects ? ['All', ...Array.from(new Set(projects.map(p => p.category).filter(Boolean)))] : ['All'];
  const [categories] = useState<string[]>(initialCats);
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProjects = projects?.filter(p => activeCategory === 'All' || p.category === activeCategory) || [];
  
  // Use mock projects if none are passed (since Sanity fetch currently returns empty due to mock auth)
  const displayProjects = filteredProjects.length > 0 ? filteredProjects : [
    { _id: '1', title: 'Summer in Italy', category: 'Travel', videoUrl: '' },
    { _id: '2', title: 'Skincare Routine', category: 'Beauty', videoUrl: '' },
    { _id: '3', title: 'NYC Vlog', category: 'Lifestyle', videoUrl: '' },
    { _id: '4', title: 'OOTD', category: 'Fashion', videoUrl: '' },
    { _id: '5', title: 'Morning Coffee', category: 'Lifestyle', videoUrl: '' },
  ];

  return (
    <section id="work" className="w-full py-24 bg-cream overflow-hidden">
      <div className="container mx-auto px-6 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <h2 className="font-display text-5xl text-foreground mb-4">Selected Work</h2>
          <p className="font-sans text-text-muted max-w-md">Drag horizontally to explore my recent campaigns and personal projects.</p>
        </div>
        
        {/* Animated Category Filter */}
        <div className="flex gap-2 flex-wrap">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full font-sans text-xs uppercase tracking-widest transition-all ${
                activeCategory === cat 
                  ? 'bg-foreground text-background shadow-md' 
                  : 'bg-surface border border-border text-foreground hover:border-foreground/30'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div ref={containerRef} className="w-full pl-6 md:pl-20 py-8 cursor-grab active:cursor-grabbing">
        <motion.div 
          ref={scrollRef}
          drag="x"
          dragConstraints={containerRef}
          className="flex gap-8 w-max"
        >
          {displayProjects.map((project, idx) => (
            <motion.div 
              key={project._id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1, ease: "easeOut" }}
              className="w-[280px] md:w-[320px] shrink-0"
            >
              <div className="relative aspect-[9/16] bg-white border-2 border-surface shadow-lg rounded-[2rem] overflow-hidden group">
                <div className="absolute inset-0 bg-light-gray flex items-center justify-center">
                  <span className="font-sans text-xs uppercase tracking-widest text-text-muted">Video Asset</span>
                </div>
                {/* Simulated Glassmorphism Overlay */}
                <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-espresso/80 via-espresso/40 to-transparent translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-white text-[10px] uppercase tracking-widest mb-2 border border-white/10">
                    {project.category || 'UGC'}
                  </span>
                  <h3 className="font-display text-white text-2xl leading-tight">
                    {project.title}
                  </h3>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
