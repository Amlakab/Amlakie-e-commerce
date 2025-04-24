'use client'
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

export function HomeCarousel({ items }: {
  items: {
    title: string;
    buttonCaption: string;
    image: string;
    url: string;
    isPublished: boolean;
  }[]
}) {
  const plugin = React.useRef(Autoplay({ delay: 3000, stopOnInteraction: true }));

  return (
    <Carousel
      dir="ltr"
      plugins={[plugin.current]}
      className="w-full mx-auto"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {items.map((item) => (
          <CarouselItem key={item.title}>
            <Link href={item.url}>
              <div className="grid grid-cols-1 md:grid-cols-2 items-center aspect-[16/6] p-6 -m-1 gap-6">
                {/* Left Column: Text and Button */}
                <div className="z-10 px-4 md:px-16">
                  <h2 className={cn(
                    'text-3xl md:text-6xl font-bold mb-4 text-primary'
                  )}>
                    {item.title}
                  </h2>
                  <Button className="hidden md:inline-block">
                    {item.buttonCaption}
                  </Button>
                </div>

                {/* Right Column: Image */}
                <div className="relative w-full h-full">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover rounded-lg"
                    priority
                  />
                </div>
              </div>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-0 md:left-12" />
      <CarouselNext className="right-0 md:right-12" />
    </Carousel>
  );
}
