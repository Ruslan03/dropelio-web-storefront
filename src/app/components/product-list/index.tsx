'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { getProducts } from '../../lib/services'
import Link from 'next/link'
import Image from 'next/image'
import { baseUrl } from '../../lib/client/base-path'
import BadgeRating from './badge-rating'
import Price from './price'
import ProductPagination from './pagination'
import { useRouter, useSearchParams } from 'next/navigation'

const ProductList = () => {
   const router = useRouter()
   const params = useSearchParams()

   const [isLoading, setIsLoading] = useState(true)
   const [total, setTotal] = useState(6)
   const [page, setPage] = useState(Number(params.get('page')) || 1)
   const [products, setProducts] = useState<any[]>([])

   const fetchProduct = useCallback(() => {
      setIsLoading(true)
      getProducts({
         params: {
            page: page.toString()
         }
      })
         .then((resProducts: any) => {
            setTotal(resProducts?.total || 6)
            setProducts(resProducts?.data || [])
         })
         .finally(() => setIsLoading(false))
   }, [page])

   useEffect(() => {
      router.push(`?page=${page.toString()}`)
      fetchProduct()
   }, [page, fetchProduct, router])

   return (
      <div>
         {!isLoading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 min-h-96">
               {products.map((product) => (
                  <ProductItem key={product?.id} product={product} />
               ))}

            </div>
         )}

         {isLoading && (
            <LoadingPlaceholder />
         )}

         <div className='my-8'>
            <ProductPagination currentPage={page} totalPage={Math.ceil(total / 6)} onPageChange={(newPage) => setPage(newPage)} />
         </div>
      </div>
   )
}

const ProductItem = ({ product }: { product: any }) => {
   const [isLoadingImage, setIsLoadingImage] = useState(true)
   return (
      <Link href={`${product?.slug}`}
         className="relative w-full aspect-square bg-cover group rounded-2xl sm:rounded-3xl bg-center overflow-hidden mx-auto sm:mr-0 xl:mx-auto active:opacity-75 transition-all ease-in-out">
         {isLoadingImage && (
            <div className='w-full h-full bg-gray-200 animate-pulse' />
         )}
         <div className='w-full h-full relative'>
            <Image
               src={baseUrl(`storage/${product?.product_images?.[0].image_path}`)}
               alt={product?.title}
               fill
               priority
               onLoad={() => setIsLoadingImage(false)}
               style={{
                  objectFit: 'cover',
               }}
            />
         </div>
         <div
            className="absolute z-10 bottom-3 left-0 mx-3 p-3 bg-white w-[calc(100%-24px)] rounded-xl sm:rounded-2xl shadow-md">
            <h1 className="font-semibold text-base sm:text-sm text-black line-clamp-1">{product?.title}</h1>
            <div className="flex items-center justify-between mt-3 sm:mt-2">
               <Price currency={product?.product_currency} price={product?.product_price_formatted} compare={product?.compare_at_price_formatted} />
               <BadgeRating rating={product?.rating} />
            </div>
         </div>
      </Link>
   )
}

const LoadingPlaceholder = () => {
   return (

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
         {Array.from(new Array(6)).map((_, i) => (
            <div key={i} className="relative w-full aspect-square bg-gray-100 rounded-2xl sm:rounded-3xl sm:mr-0 xl:mx-auto active:opacity-75 animate-pulse transition-all ease-in-out">
            </div>
         ))}

      </div>

   )
}

export default ProductList