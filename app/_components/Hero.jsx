import Image from 'next/image'
import React from 'react'

function Hero() {
  return (
   <section className="bg-white flex items-center flex-col">
  <div className="mx-auto w-screen max-w-screen-xl px-4 py-32 lg:flex">
    <div className="mx-auto max-w-prose text-center">
      <h1 className="text-3xl font-bold text-gray-900 sm:text-5xl">
        Manage Your Expense
       
      </h1>
       <h1><strong className="text-3xl font-bold text-primary"> Control Your Money </strong></h1>
        

      <p className="mt-4 text-base text-pretty text-gray-700 sm:text-lg/relaxed">
       Start Creating your budget andsave ton of money
      </p>

      <div className="mt-4 flex justify-center gap-4 sm:mt-6">
        <a
          className="inline-block rounded border border-indigo-600 bg-indigo-600 px-5 py-3 font-medium text-white shadow-sm transition-colors hover:bg-indigo-700"
          href="/sign-in"
        >
          Get Started
        </a>

        
      </div>
    </div>
  </div>
  <Image src='/dashboard.png'
  width={1000}
  height={700} 
  className='mt-5 rounded-xl borde-2'/>
</section>
  )
}

export default Hero
