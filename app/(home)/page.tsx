
import {HomeCarousel} from '@/components/shared/home/home-carousel'
import {HomeCard} from '@/components/shared/home/home-card'
import  data  from '@/lib/data'
import { toSlug } from '@/lib/utils'
import { getAllCategories, getProductsByTag, getProductsForCard } from '@/lib/actions/product.actions'
import { Card, CardContent } from '@/components/ui/card'
import ProductSlider from '@/components/shared/product/product-slider'
import BrowsingHistoryList from '@/components/shared/browsing-history-list'

export default async function Page() {
  // Fetch necessary data
  const categories = (await getAllCategories()).slice(0, 4)
  const newArrivals = await getProductsForCard({ tag: 'new-arrival',limit: 4 })
  const bestSellers = await getProductsForCard({ tag: 'best-seller' ,limit: 4 })
  const featureds = await getProductsForCard({ tag: 'featured' ,limit: 4 })
  
  const cards = [
      {
        title: 'Categories to explore',
        link: {
          text: 'See More',
          href: '/search',
        },
        items: categories.map((category) => ({
          name: category,
          image: `/images/${toSlug(category)}.jpg`,
          href: `/search?category=${category}`,
        })),
      },
      {
        title: 'Explore New Arrivals',
        items: newArrivals,
        link: {
          text: 'View All',
          href: '/search?tag=new-arrival',
        },
      },
      {
        title: 'Discover Best Sellers',
        items: bestSellers,
        link: {
          text: 'View All',
          href: '/search?tag=new-arrival',
        },
      },
      {
        title: 'Featured Products',
        items: featureds,
        link: {
          text: 'Shop Now',
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
       <div className='mt-10'>
          <BrowsingHistoryList  className='bg-background' />
        </div>
    </div>
  );
}