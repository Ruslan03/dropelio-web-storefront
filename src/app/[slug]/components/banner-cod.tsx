import { useTranslations } from 'next-intl'
import Image from 'next/image'
import React from 'react'

const BannerCOD = () => {
   const t = useTranslations('General')
   return (
      <div className='flex gap-2 items-center'>
         <Image
            src={'/cod.png'}
            alt='banner-cod'
            width={86}
            height={26}
            style={{
               width: 'auto'
            }}
         />
         <p className='font-semibold text-base italic'>COD ({t('CashOnDelivery')})</p>
      </div>
   )
}

export default BannerCOD