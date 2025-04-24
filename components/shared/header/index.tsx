import { APP_NAME } from '@/lib/constants'
import Image from 'next/image'
import Link from 'next/link'
import Menu from './menu'
import { Button } from '@/components/ui/button'
import { MenuIcon } from 'lucide-react'
import data from '@/lib/data'
import Search from './search'

export default function Header() {
  return (
    <header className="bg-black text-white">
      <div className="px-2">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link
              href="/"
              className="flex items-center header-button font-extrabold text-2xl m-1"
            >
              <Image
                src="/icons/logo.svg"
                width={40}
                height={40}
                alt={`${APP_NAME} logo`}
              />
              <span className="ml-2">{APP_NAME}</span>
            </Link>
          </div>

          {/* Desktop Search */}
          <div className="hidden md:block flex-1 max-w-xl">
            <Search />
          </div>

          {/* Menu Icons */}
          <Menu />
        </div>

        {/* Mobile Search */}
        <div className="md:hidden block py-2">
          <Search />
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="flex items-center px-3 pb-[1px] bg-gray-800">
        <Button
          variant="ghost"
          className="dark header-button flex items-center gap-1 text-base [&_svg]:size-6"
        >
          <MenuIcon />
          <span>All</span>
        </Button>

        <div className="flex items-center flex-wrap gap-3 overflow-hidden max-h-[42px]">
          {data.headerMenus.map((menu) => (
            <Link
              href={menu.href}
              key={menu.href}
              className="header-button px-2"
            >
              {menu.name}
            </Link>
          ))}
        </div>
      </div>
    </header>
  )
}