'use server'
import { connectToDatabase } from '@/lib/db'
import Product, { IProduct } from '@/lib/db/models/product.model'

export async function getAllCategories() {
  await connectToDatabase()
  const categories = await Product.find({ isPublished: true }).distinct('category')
  return categories
}

export async function getProductsForCard({
  tag,
  limit = 4
}: {
  tag: string
  limit?: number
}) {
  await connectToDatabase()
  
  const products = await Product.find(
    { 
      tags: { $in: [tag] }, 
      isPublished: true 
    },
    {
      slug: 1,
      href: { $concat: ['/product/', '$slug'] },
      image: { $arrayElemAt: ['$images', 0] }
    }
  )
  .sort({ createdAt: 'desc' })
  .limit(limit)
  .lean()

  return JSON.parse(JSON.stringify(products)) as Array<{
    name: string
    href: string
    image: string
  }>
}

// Get products by tag with sorting and pagination
export async function getProductsByTag({ tag,
  limit = 10 }: {
    tag: string
    limit?: number 
  }) {
  await connectToDatabase();
  
  const products = await Product.find({
    tags: { $in: [tag] },
    isPublished: true
  })
  .sort({ createdAt: 'desc' })
  .limit(limit)
  .lean();

  return JSON.parse(JSON.stringify(products)) as [IProduct];
}

// Product type interface
