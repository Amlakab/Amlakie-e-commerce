// components/google-signup-button.tsx
'use client'
import { Button } from '@/components/ui/button'
import { SignInWithGoogle } from '@/lib/actions/user.actions'
import { useFormStatus } from 'react-dom'

export function GoogleSignUpButton() {
  const { pending } = useFormStatus()
  
  const handleClick = async () => {
    await SignInWithGoogle()
  }

  return (
    <Button 
      onClick={handleClick}
      disabled={pending} 
      className='w-full' 
      variant='outline'
    >
      {pending ? 'Redirecting to Google...' : 'Sign Up with Google'}
    </Button>
  )
}