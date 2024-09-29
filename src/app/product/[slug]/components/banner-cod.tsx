import Image from 'next/image'
import React from 'react'

const BannerCOD = () => {
   return (
      <div className='flex gap-2 items-center'>
         <Image
            src={'/cod.png'}
            alt='banner-cod'
            width={86}
            height={26}
         />
         <p className='font-semibold text-base italic'>COD (cash on delivery)</p>
      </div>
   )
}

export default BannerCOD