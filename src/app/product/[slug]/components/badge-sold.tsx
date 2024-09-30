import { useTranslations } from 'next-intl'
import React from 'react'

const BadgeSold = ({ sold }: {sold: number}) => {
   const t = useTranslations('ProductReview')
   return (
      <div className='px-2 text-sm font-semibold rounded-md bg-amber-400'>{`${sold} ${t('BadgeSold')}`}</div>
   )
}

export default BadgeSold