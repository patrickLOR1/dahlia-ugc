"use client";

import React, { useRef, useState } from 'react';
import { cn } from '@/lib/utils';

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
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.play().catch(e => console.error("Video play failed", e));
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div 
      className={cn(
        "group relative flex-shrink-0 w-[300px] sm:w-[350px] aspect-[9/16] rounded-md overflow-hidden cursor-pointer",
        "border border-border bg-surface transition-transform duration-500 ease-out hover:scale-[1.02]",
        className
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
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
            className={cn(
              "absolute inset-0 w-full h-full object-cover transition-opacity duration-500",
              isHovered ? "opacity-100" : "opacity-0"
            )}
          />
        ) : (
          <span className="text-text-muted font-sans text-xs uppercase">No Media</span>
        )}
        
        {/* Thumbnail Fallback/Poster */}
        {thumbnailUrl && (
          <img 
            src={thumbnailUrl} 
            alt={title} 
            className={cn(
              "absolute inset-0 w-full h-full object-cover transition-opacity duration-500",
              isHovered && videoUrl ? "opacity-0" : "opacity-100"
            )}
          />
        )}
      </div>

      {/* Overlay Layer */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Content Layer */}
      <div className="absolute inset-0 p-6 flex flex-col justify-end z-20 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
        <span className="font-sans text-xs font-semibold uppercase tracking-wider text-accent mb-2">
          {category}
        </span>
        <h3 className="font-display text-2xl text-foreground leading-tight mb-1">
          {brand}
        </h3>
        <p className="font-sans text-sm text-text-muted">
          {title}
        </p>
      </div>
    </div>
  );
}
