"use client";

import React, { useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { Play, Pause } from 'lucide-react';
import Image from 'next/image';

interface VideoCardProps {
  title: string;
  brand: string;
  category: string;
  thumbnailUrl?: string;
  videoUrl?: string;
  className?: string;
}

export function VideoCard({
  title,
  brand,
  category,
  thumbnailUrl,
  videoUrl,
  className
}: VideoCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    if (typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches) return;
    if (videoRef.current) {
      videoRef.current.play().catch(e => console.error("Video play failed", e));
      setIsPlaying(true);
    }
  };

  const handleMouseLeave = () => {
    if (typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches) return;
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(e => console.error("Video play failed", e));
      setIsPlaying(true);
    }
  };

  return (
    <div 
      className={cn(
        "group relative flex-shrink-0 w-[300px] sm:w-[350px] aspect-[9/16] rounded-md overflow-hidden cursor-pointer",
        "border border-border bg-surface transition-transform duration-500 ease-out md:hover:scale-[1.02]",
        className
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={togglePlay}
    >
      {/* Media Layer */}
      <div className="absolute inset-0 bg-light-gray z-0 flex items-center justify-center">
        {videoUrl ? (
          <video
            ref={videoRef}
            src={videoUrl}
            poster={thumbnailUrl}
            muted
            loop
            playsInline
            preload="metadata"
            className={cn(
              "absolute inset-0 w-full h-full object-cover transition-opacity duration-500",
              isPlaying ? "opacity-100" : "opacity-0"
            )}
          />
        ) : (
          <span className="text-text-muted font-sans text-xs uppercase">No Media</span>
        )}
        
        {/* Thumbnail Fallback/Poster */}
        {thumbnailUrl && (
          <Image 
            src={thumbnailUrl} 
            alt={title}
            fill
            sizes="(max-width: 640px) 300px, 350px"
            className={cn(
              "object-cover transition-opacity duration-500",
              isPlaying && videoUrl ? "opacity-0" : "opacity-100"
            )}
          />
        )}
      </div>

      {/* Play/Pause Button for Mobile (Always visible if no hover capability, or visible on hover desktop) */}
      {videoUrl && (
        <div className={cn(
          "absolute top-4 right-4 z-30 p-2 rounded-full bg-black/40 text-white backdrop-blur-sm transition-opacity duration-300",
          isPlaying ? "opacity-0 group-hover:opacity-100" : "opacity-100"
        )}>
          {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-0.5" />}
        </div>
      )}

      {/* Overlay Layer */}
      <div className={cn(
        "absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent z-10 transition-opacity duration-300",
        isPlaying ? "opacity-0 group-hover:opacity-100" : "opacity-100 md:opacity-0 md:group-hover:opacity-100"
      )} />

      {/* Content Layer */}
      <div className={cn(
        "absolute inset-0 p-6 flex flex-col justify-end z-20 transition-all duration-300",
        isPlaying ? "translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100" : "translate-y-0 opacity-100 md:translate-y-4 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100"
      )}>
        <span className="font-sans text-xs font-semibold uppercase tracking-wider text-accent mb-2">
          {category}
        </span>
        <h3 className="font-display text-2xl text-foreground leading-tight mb-1 drop-shadow-md">
          {brand}
        </h3>
        <p className="font-sans text-sm text-text-muted drop-shadow-md">
          {title}
        </p>
      </div>
    </div>
  );
}
