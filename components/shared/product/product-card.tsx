'use client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { IProduct } from '@/lib/db/models/product.model';
import Rating from './rating';
import { formatNumber, generateId, round2 } from '@/lib/utils';
import ProductPrice from './product-price';
import ImageHover from './image-hover';
import { motion } from 'framer-motion';
import AddToCart from './add-to-cart';

interface ProductCardProps {
  product: IProduct;
  hideDetails?: boolean;
  hideBorder?: boolean;
  hideAddToCart?: boolean;
}
 
const fadeInUp = {
  initial: { opacity: 0, y: 25, rotate: 5, scale: 0.9 },
  animate: { opacity: 1, y: 0, rotate: 0, scale: 1 },
};

const ProductCard = ({
  product,
  hideBorder = false,
  hideDetails = false,
  hideAddToCart = false,
}: ProductCardProps) => {
  const ProductImage = () => (
    <Link href={`/product/${product.slug}`}>
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
    <div className="flex flex-col justify-between h-full space-y-2">
      <div className="flex flex-col gap-1">
        <p className="font-bold">{product.brand}</p>
        <Link
          href={`/product/${product.slug}`}
          className="overflow-hidden text-ellipsis text-sm font-medium"
          style={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {product.name}
        </Link>
      </div>

      <div className="mt-auto">
        <div className="flex gap-2 justify-center text-sm">
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
    </div>
  );

  const AddButton = () => (
    <div className='w-full text-center'>
      <AddToCart
        minimal
        item={{
          clientId: generateId(),
          product: product._id,
          size: product.sizes[0],
          color: product.colors[0],
          countInStock: product.countInStock,
          name: product.name,
          slug: product.slug,
          category: product.category,
          price: round2(product.price),
          quantity: 1,
          image: product.images[0],
        }}
      />
    </div>
  )
  
  const Wrapper = hideBorder ? motion.div : motion(Card);

  return (
    <Wrapper
      initial="initial"
      whileInView="animate"
      viewport={{ once: false }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      variants={fadeInUp}
      className={`flex flex-col ${hideBorder ? 'bg-neutral-100' : ''} h-[440px] max-h-[435px]`}
    >
      {hideBorder ? (
        <>
          <ProductImage />
          {!hideDetails && (
            <>
            <div className="p-3 flex-1 text-center flex flex-col">
              <ProductDetails />
            </div>
            {!hideAddToCart && <AddButton />}</>
           
          )}
        </> 
      ) : (
        <>
          <CardHeader className="p-3 bg-neutral-100">
            <ProductImage />
          </CardHeader>
          {!hideDetails && (
            <>
            <CardContent className="p-3 flex-1 text-center bg-neutral-100 flex flex-col">
              <ProductDetails />
            </CardContent>
            <CardFooter className=" p-3 flex 1 text-center">
            {!hideAddToCart && <AddButton />}
            </CardFooter>
            </>

          )}
        </>
      )}
    </Wrapper>
  );
};

export default ProductCard;
