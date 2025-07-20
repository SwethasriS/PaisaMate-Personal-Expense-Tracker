"use client"
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'
import { UserButton, useUser } from '@clerk/nextjs'
import Link from 'next/link'




function Header() {
  const {user,isSignedIn}=useUser();
  return (
    <div className='p-5 flex justify-between items-center border shadow-sm'>
     <Image src={'./logo.svg'}
      alt='logo'
      width={160}
      height={100}/>
      {isSignedIn ? (
        <>
          <Link href="/dashboard/budgets" passHref>
            <Button className="mr-4 flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3c-1.657 0-3 1.343-3 3v1H6a2 2 0 00-2 2v3a2 2 0 002 2h1v1a3 3 0 006 0v-1h1a2 2 0 002-2v-3a2 2 0 00-2-2h-3V6c0-1.657-1.343-3-3-3z"
                />
              </svg>
              Manage Money
            </Button>
          </Link>
          <UserButton />
        </>
      ) : (
        <Link href="/sign-in">
          <Button>Get Started</Button>
        </Link>
      )}

      
      
    </div>
  )
}

export default Header
