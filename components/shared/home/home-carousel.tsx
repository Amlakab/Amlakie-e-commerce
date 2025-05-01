'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export function HomeCarousel({ items }: {
  items: {
    title: string;
    buttonCaption: string;
    image: string;
    url: string;
    isPublished: boolean;
  }[];
}) {
  const plugin = React.useRef(Autoplay({ delay: 5000, stopOnInteraction: true }));

  return (
    <Carousel
      dir="ltr"
      plugins={[plugin.current]}
      className="w-full mx-auto"
    >
      <CarouselContent className="transition-transform ease-in-out duration-1000">
        {items.map((item) => (
          <CarouselItem key={item.title}>
            <Link href={item.url}>
              <div className="grid grid-cols-1 md:grid-cols-2 items-center aspect-[16/6] p-6 -m-1 gap-6">
                {/* Left Column: Text and Button */}
                <motion.div
                  className="z-10 px-4 md:px-16"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className={cn('text-3xl md:text-6xl font-bold mb-4 text-primary')}>
                    {item.title}
                  </h2>
                  <Button className="hidden md:inline-block">
                    {item.buttonCaption}
                  </Button>
                </motion.div>

                {/* Right Column: Image */}
                <motion.div
                  className="relative w-full h-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover rounded-lg"
                    priority
                  />
                </motion.div>
              </div>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>

      {/* Carousel Controls */}
      <CarouselPrevious className="left-0 md:left-12" />
      <CarouselNext className="right-0 md:right-12" />
    </Carousel>
  );
}
