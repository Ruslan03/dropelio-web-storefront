import React from 'react'

const Price = ({ price, compare, currency }: { currency: string, price: string, compare: string }) => {
   return (
      <div className='flex gap-1 items-center'>
         <h2 className='text-xl md:text-[18px] text-blue-600 font-bold'>{`${currency}${price}`}</h2>
         <p className='text-xs font-semibold text-zinc-800 line-through'>{`${currency}${compare}`}</p>
      </div>
   )
}

export default Price