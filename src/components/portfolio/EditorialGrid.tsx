'use client';
import { useState } from 'react';
import { VideoCard } from './VideoCard';
import { motion } from 'framer-motion';

interface Project {
  _id: string;
  title: string;
  brand: string;
  category: string;
  thumbnailUrl?: string;
  videoUrl?: string;
}

interface EditorialGridProps {
  projects: Project[];
}

export function EditorialGrid({ projects }: EditorialGridProps) {
  const initialCats = projects ? ['All', ...Array.from(new Set(projects.map(p => p.category).filter(Boolean)))] : ['All'];
  const [categories] = useState<string[]>(initialCats);
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProjects = projects?.filter(p => activeCategory === 'All' || p.category === activeCategory) || [];
  const displayProjects = filteredProjects;

  return (
    <section id="work" className="w-full py-24 bg-cream overflow-hidden">
      <div className="container mx-auto px-6 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <h2 className="font-display text-5xl text-foreground mb-4">Selected Work</h2>
          <p className="font-sans text-text-muted max-w-md">Explore my recent campaigns and personal projects.</p>
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

      {displayProjects.length === 0 ? (
        <div className="w-full py-24 bg-surface flex justify-center items-center">
          <p className="font-sans text-text-muted">No projects available in this category.</p>
        </div>
      ) : (
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 place-items-center md:place-items-start">
            {displayProjects.map((project, idx) => (
              <motion.div 
                key={project._id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, ease: "easeOut" }}
                className="w-[300px] sm:w-full max-w-[350px]"
              >
                <VideoCard 
                  title={project.title}
                  brand={project.brand}
                  category={project.category}
                  thumbnailUrl={project.thumbnailUrl}
                  videoUrl={project.videoUrl}
                  className="w-full"
                />
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
