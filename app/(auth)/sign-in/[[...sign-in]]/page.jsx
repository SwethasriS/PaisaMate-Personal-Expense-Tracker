"use client"
import { SignIn, useSignIn } from '@clerk/nextjs'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Page() {
  const { isSignedIn } = useSignIn()
  const router = useRouter()

  useEffect(() => {
    if (isSignedIn) {
      router.push('/dashboard')
    }
  }, [isSignedIn, router])

  return (
    <div className="relative min-h-screen bg-white flex">
      <div className="w-1/2 relative">
        <Image
          src="/si.jpeg"
          alt="Sign In Image"
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
      </div>
      <div className="w-1/2 flex flex-col justify-center px-12 relative">
        <div className="absolute top-4 left-4">
          <Image src="/logo.svg" alt="Logo" width={160} height={100} />
        </div>
        <h1 className="text-white text-3xl font-bold mb-8 mt-4 text-center w-full">Sign In</h1>
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
          <SignIn routing="path" path="/sign-in" />
        </div>
      </div>
    </div>
  )
}
