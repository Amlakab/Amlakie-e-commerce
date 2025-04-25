
import {HomeCarousel} from '@/components/shared/home/home-carousel'
import {HomeCard} from '@/components/shared/home/home-card'
import  data  from '@/lib/data'
import { toSlug } from '@/lib/utils'
import { getProductsByTag, getProductsForCard } from '@/lib/actions/product.actions'
import { Card, CardContent } from '@/components/ui/card'
import ProductSlider from '@/components/shared/product/product-slider'

export default async function Page() {
  // Fetch necessary data
  const categories = ['T-Shirts', 'Jeans', 'Wrist Watches', 'Shoes']
  const newArrivals = await getProductsForCard({ tag: 'new-arrival' })
  const bestSellers = await getProductsForCard({ tag: 'best-seller' })
  const featureds = await getProductsForCard({ tag: 'featured' })
  
  const cards = [
    {
      title: toSlug('Categories to explore'),
      link: {
        text: toSlug('See More'),
        href: '/search',
      },
      items: categories.map((category) => ({
        name: category,
        image: `/images/${toSlug(category)}.jpg`,
        href: `/search?category=${category}`,
      })),
    },
    {
      title: toSlug('Explore New Arrivals'),
      items: newArrivals,
      link: {
        text: toSlug('View All'),
        href: '/search?tag=new-arrival',
      },
    },
    {
      title: toSlug('Discover Best Sellers'),
      items: bestSellers,
      link: {
        text: toSlug('View All'),
        href: '/search?tag=new-arrival',
      },
    },
    {
      title: toSlug('Featured Products'),
      items: featureds,
      link: {
        text: toSlug('Shop Now'),
        href: '/search?tag=new-arrival',
      },
    },
  ]

  const todaysDeals = await getProductsByTag({ tag: 'todays-deal'});
  const bestSellerProducts = await getProductsByTag({ tag: 'best-seller'});

  return (
    <div className="space-y-8">
      <HomeCarousel items={data.carousels} />
      
      <div className="mt-4 md:p-4 space-y-4 bg-border">
        <HomeCard cards={cards} />
        
        <Card className="w-full rounded-none">
          <CardContent className="p-4 flex items-center gap-3">
            <ProductSlider 
              title="Today's Deals"
              products={todaysDeals}
            />
          </CardContent>
        </Card>
        <Card className="w-full rounded-none">
          <CardContent className="p-4 flex items-center gap-3">
            <ProductSlider 
              title="Best Seller Products"
              products={bestSellerProducts}
              hideDetails
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}