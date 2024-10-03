import { Store } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const BadgeStore = ({ storeName }: { storeName: string }) => {
   return (
      <div className='flex items-center gap-1 text-red-500'>
         <Store size={18} />
         <Link href={'/'} className='text-sm underline'>{storeName}</Link>
      </div>
   )
}

export default BadgeStore