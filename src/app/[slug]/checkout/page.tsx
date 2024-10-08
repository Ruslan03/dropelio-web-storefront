import React from 'react'
import BaseContainer from '@/app/components/container'
import BaseFooter from '@/app/components/footer'
import { getProduct } from '@/app/lib/services'
import Price from '../components/price'
import Features from '../components/features'
import BannerCOD from '../components/banner-cod'
import dynamic from 'next/dynamic'
import { notFound } from 'next/navigation'
import { storage } from '@/app/lib/base-path'
import BadgeRating from '../components/badge-rating'
import BadgeStore from '../components/badge-store'

const CheckoutForm = dynamic(() => import('../components/checkout-form'), {
   ssr: false,
})

interface Props {
   params: {
      slug: string
   }
}

export async function generateMetadata({ params }: Props) {

   const { slug } = params

   const product = await getProduct({ slug })

   if (!product) {
      notFound()
   }

   const images = (product?.product_images || []).map((img: any) => storage(img.image_path))

   return {
      title: `Checkout ${product.title}`,
      description: `Checkout ${product.title}`,
      url: product.product_url,
      type: 'product',
      openGraph: {
         images,
      },
      other: {
         'og:logo': 'https://dropelio.shop/images/favicon.ico',
         'og:url': product.product_url,
         'og:type': 'product',
         'product:price.amount': product?.product_price || 0,
         'product:price.currency': product?.store?.currency || ''
      }
   }
}


const Page = async ({ params }: Props) => {

   const { slug } = params

   const product = await getProduct({ slug })

   const {
      id,
      title,
      store,
      sold,
      rating,
      product_price,
      product_price_formatted,
      compare_at_price_formatted,
      product_features,
      checkout_form: co_form,
      meta_pixel_id,
      product_qty_offers
   } = product


   const inputFields = co_form?.split(',')

   return (
      <BaseContainer>
         <div className='flex flex-col gap-5 mb-8'>
            <div className='flex flex-col items-start gap-2'>
               <h1 className='text-2xl md:text-3xl font-semibold'>{title}</h1>
               <Price currency={store?.currency} price={product_price_formatted} compare={compare_at_price_formatted} />

               <div className='mt-3 flex items-center gap-2'>
                  <BadgeRating sold={sold} rating={rating} />
                  <BadgeStore  storeName={store?.name}/>
               </div>
            </div>

            <BannerCOD />

            <Features features={product_features} />

            <CheckoutForm
               pixelID={meta_pixel_id}
               country={store?.country}
               productID={id}
               storeID={store?.id}
               inputFields={inputFields}
               productPrice={product_price}
               currency={store?.currency}
               qtyOffers={product_qty_offers || []}
            />
         </div>
         <BaseFooter />
      </BaseContainer>
   )
}

export default Page