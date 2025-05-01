'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import Menu from './menu';
import Search from './search';
import { Button } from '@/components/ui/button';
import { MenuIcon } from 'lucide-react';
import data from '@/lib/data';
import { APP_NAME } from '@/lib/constants';

export default function Header() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const fadeIn = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  };

  const HeaderContent = (
    <>
      <div className="px-2">
        <div className="flex items-center justify-between">
          <div>
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
          <div className="hidden md:block flex-1 max-w-xl">
            <Search />
          </div>
          <Menu />
        </div>

        <div className="md:hidden block py-2">
          <Search />
        </div>
      </div>

      <div className="flex items-center px-3 pb-[1px] bg-green-800">
        <Button
          variant="ghost"
          className="dark header-button flex items-center gap-1 text-base [&_svg]:size-6 border-b-2 border-transparent hover:border-white"
        >
          <MenuIcon />
          <span>All</span>
        </Button>
        <div className="flex items-center flex-wrap gap-3 overflow-hidden max-h-[42px]">
          {data.headerMenus.map((menu) => (
            <Link
              key={menu.href}
              href={menu.href}
              className="header-button px-2 border-b-2 border-transparent hover:border-white"
            >
              {menu.name}
            </Link>
          ))}
        </div>
      </div>
    </>
  );

  return (
    <>
      {isClient ? (
        <motion.header
          className="bg-green-600 text-white fixed w-full top-0 left-0 z-50 border-b-2 border-green-700"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.8 }}
        >
          {HeaderContent}
        </motion.header>
      ) : (
        <header className="bg-green-600 text-white fixed w-full top-0 left-0 z-50 border-b-2 border-green-700">
          {HeaderContent}
        </header>
      )}
      <div className="h-24"></div>
    </>
  );
}
