import React from 'react'
import real from '@/images/realestate.jpg'
import { Button } from './ui/button'
import Image from 'next/image'

function BannerSecond() {
  return (
    <div className='flex items-center justify-between mt-10 max-w-5xl mx-auto mb-14 pb-10'>
        <div className='mt-20'>
            <h1 className={`  font-extrabold text-5xl leading-tight`}>Useful rewards,<br /> easy banking,<br /> designed for you.</h1>
            <p className={`  text-xl mt-4 leading-snug`}>Safe secure banking for creative<br /> professionals has arrived. We are<br /> here to help.</p>
            <div className='flex space-x-3 mt-7'>
                <Button className="">Get Started</Button>
            </div>
        </div>
        <div className='border w-1/2'>
          <Image alt='' src={real} className=''  objectFit='cover'   />
        </div>
    </div>
  )
}

export default BannerSecond