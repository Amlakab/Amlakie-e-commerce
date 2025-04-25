'use client';
import Image from 'next/image';
import { useState, useRef } from 'react';

interface ImageHoverProps {
  src: string;
  hoverSrc: string;
  alt: string;
  className?: string;
}

const ImageHover = ({ src, hoverSrc, alt, className }: ImageHoverProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const hoverTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    hoverTimeout.current = setTimeout(() => setIsHovered(true), 1000);
  };

  const handleMouseLeave = () => {
    if (hoverTimeout.current) {
      clearTimeout(hoverTimeout.current);
    }
    setIsHovered(false);
  };

  return (
    <div
      className={`relative h-52 ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Base Image */}
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className={`object-contain transition-opacity duration-500 ${
          isHovered ? 'opacity-0' : 'opacity-100'
        }`}
      />

      {/* Hover Image */}
      <Image
        src={hoverSrc}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className={`absolute inset-0 object-contain transition-opacity duration-500 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
};

export default ImageHover;