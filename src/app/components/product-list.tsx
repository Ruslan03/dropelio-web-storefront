'use client'

import React, { useEffect, useState } from 'react'
import { getProducts } from '../lib/services'
import Link from 'next/link'
import Image from 'next/image'
import { baseUrl } from '../lib/client/base-path'
import BadgeRating from './badge-rating'
import Price from './price'

const ProductList = () => {
   const [page, setPage] = useState(1)
   const [products, setProducts] = useState<any[]>([])

   useEffect(() => {
      getProducts({ page }).then((resProducts: any) => {
         setProducts((prevProducts) => ([...prevProducts, ...(resProducts?.data || [])]))
      })
   }, [page])

   return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 min-h-96">
         {products.map((product) => (
            <Link key={product?.id} href={`${product?.slug}`}
               className="relative w-full aspect-square bg-cover group rounded-2xl md:rounded-3xl bg-center overflow-hidden mx-auto sm:mr-0 xl:mx-auto active:opacity-75 transition-all ease-in-out">
               {/* <img className="md:rounded-2xl object-cover" src="https://pagedone.io/asset/uploads/1700731972.png" alt="Jacket image" /> */}

               <div className='w-full h-full relative'>
                  <Image
                     src={baseUrl(`storage/${product?.product_images?.[0].image_path}`)}
                     alt={product?.title}
                     fill
                     priority
                     // onLoad={() => setIsLoading(false)}
                     style={{
                        objectFit: 'cover',
                     }}
                  />
               </div>
               <div
                  className="absolute z-10 bottom-3 left-0 mx-3 p-3 bg-white w-[calc(100%-24px)] rounded-xl md:rounded-2xl shadow-md">
                  <h1 className="font-semibold text-base md:text-sm text-black line-clamp-1">{product?.title}</h1>
                  <div className="flex items-center justify-between mt-3 md:mt-2">
                     <Price currency={product?.product_currency} price={product?.product_price_formatted} compare={product?.compare_at_price_formatted} />
                     <BadgeRating rating={product?.rating} />
                     {/* <h6 className="font-semibold text-base leading-7 text-indigo-600 text-right">$100</h6> */}
                  </div>
               </div>
            </Link>
         ))}

      </div>
   )
}

export default ProductList