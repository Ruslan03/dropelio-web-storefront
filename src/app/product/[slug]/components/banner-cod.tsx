import Image from 'next/image'
import React from 'react'

const BannerCOD = () => {
  return (
    <div className='flex gap-2 items-center'>
      <Image
         src={'/cod.png'}
         alt='banner-cod'
         width={96}
         height={36}
      />
      <p className='font-semibold text-xl italic'>COD (cash on delivery)</p>
    </div>
  )
}

export default BannerCOD