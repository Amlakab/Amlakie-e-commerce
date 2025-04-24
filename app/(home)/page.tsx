import { HomeCarousel } from '@/components/shared/home/home-carousel'
import data from '@/lib/data'

export default async function Page() {
  return (
    <main>
      <HomeCarousel items={data.carousels} />
      {/* Rest of your page content */}
    </main>
  )
}