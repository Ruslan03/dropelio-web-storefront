import React from 'react'
import Description from './components/description'
import BaseContainer from '@/app/components/container'
import BaseFooter from '@/app/components/footer'
import { getProduct } from '@/app/lib/services'
import Badge from './components/badge'
import ImageSlider from './components/image-slider'
import Price from './components/price'
import BannerCOD from './components/banner-cod'
import Features from './components/features'
import Review from './components/review'
// import CheckoutForm from './components/checkout-form'
import ButtonCheckout from './components/button-checkout'
import dynamic from 'next/dynamic'
import { notFound } from 'next/navigation'

const CheckoutForm = dynamic(() => import('./components/checkout-form'), {
   ssr: false,
   loading: () => <p>Loading checkout form...</p>
})

interface Props {
   params: {
      slug: string
   }
}

export async function generateMetadata({ params }: Props) {

   const { slug } = params

   const product = await getProduct({ slug })

   
   if(!product) {
      notFound()
   }

   return {
      title: product.title,
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

            <BannerCOD />

            <Features features={product_features} />

            <CheckoutForm />

            <div>
               <Description productID={id} />
            </div>

            {product_reviews?.length > 0 && (<Review reviews={product_reviews} />)}
         </div>

         <ButtonCheckout />

         <BaseFooter />

      </BaseContainer>
   )
}

export default Page