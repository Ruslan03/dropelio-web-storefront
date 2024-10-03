import { ExternalLink } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface BaseFooter {
}

const BaseFooter: React.FC<BaseFooter> = () => {
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

         <ul className='flex gap-4 sm:gap-8 items-center text-sm mt-3'>
            <li className='hover:underline'><Link href={'/term-of-service'}>Term of Services</Link></li>
            <li className='hover:underline'><Link href={'/privacy-policy'}>Privacy Policy</Link></li>
            <li className='hover:underline'><Link href={'/refund-policy'}>Refund Policy</Link></li>
         </ul>
      </div>
   )
}

export default BaseFooter