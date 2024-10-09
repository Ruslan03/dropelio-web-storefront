import { ArrowLeft } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import React from 'react'

const BackToMainPage = () => {
   const t = useTranslations('General')
   return (
      <div className='my-4'>
         <Link href={'/'} className='flex items-center gap-2'><ArrowLeft size={18} />{t('BackToMainPage')}</Link>
      </div>
   )
}

export default BackToMainPage