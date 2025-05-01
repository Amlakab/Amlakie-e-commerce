'use client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { IProduct } from '@/lib/db/models/product.model';
import Rating from './rating';
import { formatNumber } from '@/lib/utils';
import ProductPrice from './product-price';
import ImageHover from './image-hover';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: IProduct;
  hideDetails?: boolean;
  hideBorder?: boolean;
  hiddenAddToCart?: boolean;
}

// Adjusted Animation variant for less smooth scroll effect
const fadeInUp = {
  initial: { opacity: 0, y: 25, rotate: 5, scale: 0.9 },  // Slight vertical movement and scale reduction
  animate: { opacity: 1, y: 0, rotate: 0, scale: 1 }, // Reset to normal state
};

const ProductCard = ({
  product,
  hideBorder = false,
  hideDetails = false,
}: ProductCardProps) => {
  const ProductImage = () => (
    <Link href={`/${product.slug}`}>
      <div className="relative h-52">
        {product.images.length > 1 ? (
          <ImageHover
            src={product.images[0]}
            hoverSrc={product.images[1]}
            alt={product.name}
          />
        ) : (
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-contain"
          />
        )}
      </div>
    </Link>
  );

  const ProductDetails = () => (
    <div className="flex-1 space-y-2">
      <p className="font-bold">{product.brand}</p>
      <Link
        href={`/product/${product.slug}`}
        className="overflow-hidden text-ellipsis"
        style={{
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
        }}
      >
        {product.name}
      </Link>
      <div className="flex gap-2 justify-center">
        <Rating rating={product.avgRating} />
        <span>{formatNumber(product.numReviews)} reviews</span>
      </div>
      <ProductPrice
        isDeal={product.tags.includes('todays-deal')}
        price={product.price}
        listPrice={product.listPrice}
        forListing
      />
    </div>
  );

  const Wrapper = hideBorder ? motion.div : motion(Card);

  return (
    <Wrapper
      initial="initial"
      whileInView="animate"
      viewport={{ once: false }} // This allows the animation to trigger multiple times on scroll
      whileHover={{ scale: 1.1 }}
      transition={{ duration: 0.25, ease: 'easeOut' }} // Shortened duration and faster easing for less smoothness
      variants={fadeInUp}
      className="flex flex-col"
    >
      {hideBorder ? (
        <>
          <ProductImage />
          {!hideDetails && (
            <div className="p-3 flex-1 text-center">
              <ProductDetails />
            </div>
          )}
        </>
      ) : (
        <>
          <CardHeader className="p-3">
            <ProductImage />
          </CardHeader>
          {!hideDetails && (
            <CardContent className="p-3 flex-1 text-center">
              <ProductDetails />
            </CardContent>
          )}
        </>
      )}
    </Wrapper>
  );
};

export default ProductCard;