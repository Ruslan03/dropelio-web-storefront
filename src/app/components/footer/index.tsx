import { ExternalLink } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface BaseFooter {
}

const BaseFooter: React.FC<BaseFooter> = () => {

   const t = useTranslations('General')

   return (
      <div className='flex flex-col items-center justify-center h-32 border-t border-opacity-0'>
         
         <p className='text-xs'>Powered By:</p>
         <Link href={'https://dropelio.shop'} target='_blank'>
            <Image
               src={'/dropelio-logo.png'}
               alt='logo'
               priority
               width={140}
               height={28}
               sizes='140px'
               style={{
                  height: 'auto',
               }}
            />
         </Link>

         <ul className='flex gap-2 sm:gap-8 items-center text-sm mt-3'>
            <li className='whitespace-nowrap line-clamp-1 hover:underline'><Link href={'/term-of-service'}>{t('TermOfService')}</Link></li>
            <li className='whitespace-nowrap line-clamp-1 hover:underline'><Link href={'/privacy-policy'}>{t('PrivacyPolicy')}</Link></li>
            <li className='whitespace-nowrap line-clamp-1 hover:underline'><Link href={'/refund-policy'}>{t('PrivacyPolicy')}</Link></li>
         </ul>
      </div>
   )
}

export default BaseFooter