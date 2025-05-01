'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { motion } from 'framer-motion';

type CardItem = {
  title: string;
  link: { text: string; href: string };
  items: {
    name: string;
    image: string;
    href: string;
  }[]; 
};

// Subtle fade-in animation with small vertical movement on scroll
const fadeInUp = {
  initial: { opacity: 0, y: 10 }, // Subtle vertical movement and opacity fade
  animate: { opacity: 1, y: 0 }, // No vertical movement in the animated state
};

export function HomeCard({ cards }: { cards: CardItem[] }) {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 md:gap-4'>
      {cards.map((card) => (
        <motion.div
          key={card.title}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          whileHover={{ scale: 1.02 }} // Subtle scale effect on hover
          transition={{ duration: 0.5, ease: 'easeInOut' }} // Smooth transition for scroll animation
          variants={fadeInUp}
        >
          <Card className='rounded-none flex flex-col'>
            <CardContent className='p-4 flex-1'>
              <h3 className='text-xl font-bold mb-4'>{card.title}</h3>
              <div className='grid grid-cols-2 gap-4'>
                {card.items.slice(0, 4).map((item, index) => {
                  const uniqueKey = `${card.title}-${item.name || item.href || index}`;

                  return (
                    <Link
                      key={uniqueKey}
                      href={item.href}
                      className='flex flex-col group'
                    >
                      <div className='relative aspect-square w-full'>
                        <Image
                          src={item.image}
                          alt={item.name || 'Product image'}
                          className='object-contain group-hover:opacity-90 transition-opacity'
                          fill
                          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw'
                        />
                      </div>
                      <p className='text-center text-sm mt-2 whitespace-nowrap overflow-hidden text-ellipsis'>
                        {item.name || 'Unnamed Product'}
                      </p>
                    </Link>
                  );
                })}
              </div>
            </CardContent>
            {card.link && (
              <CardFooter className='border-t p-4'>
                <Link
                  href={card.link.href}
                  className='text-sm font-medium text-primary hover:underline w-full text-center'
                >
                  {card.link.text}
                </Link>
              </CardFooter>
            )}
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
