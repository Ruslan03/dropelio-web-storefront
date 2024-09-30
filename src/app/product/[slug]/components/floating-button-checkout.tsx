'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

interface IFloatingButtonCheckout {
   coMode: string
   coLink: string
   slug: string
}

const FloatingButtonCheckout = ({ slug, coMode, coLink }: IFloatingButtonCheckout) => {

   const t = useTranslations('ProductReview');
  
   const [isVisible, setIsVisible] = useState(true);

   useEffect(() => {
      const toggleVisibility = () => {

         const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
         const body = document.body;
         const html = document.documentElement;
         const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
         const windowBottom = windowHeight + window.scrollY + 120;

         if (windowBottom >= docHeight) {
            setIsVisible(false);
         } else {
            setIsVisible(true);
         }
      };

      window.addEventListener("scroll", toggleVisibility);

      return () => window.removeEventListener("scroll", toggleVisibility);
   }, [isVisible]);

   const href = coLink || `${slug}/checkout`

   return (
      <div className={`fixed ${isVisible ? 'translate-y-0' : 'translate-y-full'} transition-all ease-in-out duration-500 py-4 left-0 bottom-0 w-full flex items-center justify-center z-50`}>
         <Link href={href} target={coMode !== 'internal' ? '_blank': '_self'} className='bg-gradient-to-t from-blue-600  to-blue-500 text-white text-center transition-all ease-linear duration-150 shadow-sm  w-[calc(100%-24px)] md:w-96 text-base font-bold p-3 rounded-md'>{t('CTAButtonCheckout')}</Link>
      </div>
   )
}

export default FloatingButtonCheckout