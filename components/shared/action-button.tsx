'use client'

import { useTransition } from 'react'
import { toast } from 'sonner' // Sonner's toast import

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export default function ActionButton({
  caption,
  action,
  className = 'w-full',
  variant = 'default',
  size = 'default',
}: {
  caption: string
  action: () => Promise<{ success: boolean; message: string }>
  className?: string
  variant?: 'default' | 'outline' | 'destructive'
  size?: 'default' | 'sm' | 'lg'
}) {
  const [isPending, startTransition] = useTransition()

  return (
    <Button
      type='button'
      className={cn('rounded-full', className)}
      variant={variant}
      size={size}
      disabled={isPending}
      onClick={() =>
        startTransition(async () => {
          const res = await action()
          toast(res.message, {
            style: {
              backgroundColor: res.success ? undefined : '#f87171', // red-400
              color: res.success ? undefined : '#fff',
            },
            duration: 3000,
          })
        })
      }
    >
      {isPending ? 'Processing...' : caption}
    </Button>
  )
}
