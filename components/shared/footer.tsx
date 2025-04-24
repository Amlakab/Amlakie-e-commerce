'use client'
import { ChevronUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { APP_NAME } from '@/lib/constants'

export default function Footer() {
  return (
    <footer className="bg-black text-white underline-link">
      <div className="w-full">
        <Button
          variant="ghost"
          className="bg-gray-800 w-full rounded-none hover:bg-gray-700"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <ChevronUp className="w-6 h-6" />
          Back to Top
        </Button>

        <div className="p-4">
          <div className="flex justify-center gap-3 text-sm mb-4">
            <Link href="/page/conditions-of-use">Conditions of Use</Link>
            <Link href="/page/privacy-policy">Privacy Notice</Link>
            <Link href="/page/help">Help</Link>
          </div>

          <div className="flex justify-center text-sm">
            <div className="mt-2 text-gray-400 text-center">
              <p>123, Main Street, Anytown, CA, Zip 12345</p>
              <p>+1 (123) 456-7890</p>
              <p className="mt-2">&copy; {new Date().getFullYear()} {APP_NAME}</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}