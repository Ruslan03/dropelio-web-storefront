import Image from 'next/image'
import React from 'react'

interface BaseFooter {
}

const BaseFooter: React.FC<BaseFooter> = () => {
   return (
      <div className='flex flex-col items-center justify-center h-32'>
         <p className='text-sm'>Powered By</p>
         <Image
            src={'/dropelio-logo.png'}
            alt='logo'
            width={140}
            height={28}
            sizes='140px'
            style={{
               height: 'auto',
            }}
         />
      </div>
   )
}

export default BaseFooter