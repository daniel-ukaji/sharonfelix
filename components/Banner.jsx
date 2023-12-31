import React from 'react'
import Image from "next/image"
import banner from "@/images/banner.jpg"
import { Button } from './ui/button'
import Link from 'next/link'

function Banner() {
  return (
    <div className='relative h-[300px] sm:h-[500px] lg:h-[500px] xl:h-[500px] 2xl:h-[500px]'>
        <Image 
            src={banner}
            layout="fill"
            objectFit="cover"
            alt=''
        />
        <div className='absolute top-2/4 w-full text-center'>
            <p className='text-sm xl:text-4xl flex items-center justify-center font-extrabold text-white'>Your Trusted Partner in<br /> Real Estate, Recruitment, Cleaning, and Laundry Solutions.</p>
        
            <Link href="/jobs">
              <Button className='mt-5 w-48 p-6'>Go to Jobs</Button>
            </Link>
        </div>
    </div>
  )
}

export default Banner