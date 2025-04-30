import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardFooter } from '@/components/ui/card'

type CardItem = {
  title: string
  link: { text: string; href: string }
  items: {
    name: string
    image: string
    href: string
  }[]
}

export function HomeCard({ cards }: { cards: CardItem[] }) {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 md:gap-4'>
      {cards.map((card) => (
        <Card key={card.title} className='rounded-none flex flex-col'>
          <CardContent className='p-4 flex-1'>
            <h3 className='text-xl font-bold mb-4'>{card.title}</h3>
            <div className='grid grid-cols-2 gap-4'>
              {/* Only take the first 4 items */}
              {card.items.slice(0, 4).map((item, index) => {
                // Create a unique key using available properties
                const uniqueKey = `${card.title}-${item.name || item.href || index}`
                
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
                )
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
      ))}
    </div>
  )
}