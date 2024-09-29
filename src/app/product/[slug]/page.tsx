import React from 'react'
import BaseContainer from '@/app/components/container'
import BaseFooter from '@/app/components/footer'
import { getProduct } from '@/app/lib/services'
import Badge from './components/badge'
import ImageSlider from './components/image-slider'
import Price from './components/price'
import BannerCOD from './components/banner-cod'
import Features from './components/features'
import FloatingButtonCheckout from './components/floating-button-checkout'
import dynamic from 'next/dynamic'
import { notFound } from 'next/navigation'
import { LoadingSkeleton } from './components/description'
import { baseUrl } from '@/app/lib/base-path'

const CheckoutForm = dynamic(() => import('./components/checkout-form'), {
   ssr: false,
})

const Review = dynamic(() => import('./components/review'), {
   ssr: false,
})

const Description = dynamic(() => import('./components/description'), {
   ssr: false,
   loading: () => <LoadingSkeleton />
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

   const images = (product?.product_images || []).map((img: any) => baseUrl(`storage/${img.image_path}`))

   return {
      title: product.title,
      description: product.title,
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
         'product:price.currency': product?.product_currency || ''
      }
   }
}


const Page = async ({ params }: Props) => {

   const { slug } = params

   const product = await getProduct({ slug })

   const {
      id,
      title,
      sold,
      product_currency,
      product_price_formatted,
      compare_at_price_formatted,
      product_images,
      product_features,
      product_reviews
   } = product

   return (
      <BaseContainer>
         <div className='flex flex-col gap-8 mb-8'>
            <div className='flex flex-col items-start gap-2'>
               <h1 className='text-2xl font-semibold'>{title}</h1>
               <Badge>{`${sold} Sold`}</Badge>

               <Price currency={product_currency} price={product_price_formatted} compare={compare_at_price_formatted} />

            </div>

            <ImageSlider images={product_images} />

            <CheckoutForm />

            <BannerCOD />

            {product_features?.length > 0 && <Features features={product_features} />}

            <Description productID={id} />

            {product_reviews?.length > 0 && (<Review reviews={product_reviews} />)}
         </div>

         <FloatingButtonCheckout />

         <BaseFooter />

      </BaseContainer>
   )
}

export default Page