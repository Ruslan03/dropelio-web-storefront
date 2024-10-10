import { useTranslations } from 'next-intl';
import Link from 'next/link'
import React from 'react'

const StaticButtonCheckout = () => {
   const t = useTranslations('ProductReview');
   return (
      <Link href={'#checkout-form'} className='active:opacity-75 transition-all ease-in-out duration-75 bg-gradient-to-t from-blue-600  to-blue-500 text-white text-center  shadow-sm mx-auto  w-full sm:w-96 text-base font-bold p-3 rounded-md'>{t('CTAButtonCheckout')}</Link>
   )
}

export default StaticButtonCheckout