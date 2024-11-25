import React, { Suspense } from 'react'
import BaseContainer from '@/app/components/container'
import BaseFooter from '@/app/components/footer'
import { getProduct } from '@/app/lib/services'
import ImageSlider from './components/image-slider'
import Price from './components/price'
import BannerCOD from './components/banner-cod'
import Features from './components/features'
import dynamic from 'next/dynamic'
import { notFound } from 'next/navigation'
import { LoadingSkeleton } from './components/description'
import { storage } from '@/app/lib/base-path'
import BadgeStore from './components/badge-store'

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

const FloatingButtonCheckout = dynamic(() => import('./components/floating-button-checkout'), {
   ssr: false,
})

const BadgeRating = dynamic(() => import('./components/badge-rating'), {
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
         'product:price.currency': product?.store?.currency || ''
      }
   }
}

const Page = async ({ params }: Props) => {

   const { slug } = params

   const product = await getProduct({ slug })

   const {
      id,
      store,
      title,
      sold,
      product_price,
      product_price_formatted,
      compare_at_price_formatted,
      product_images,
      product_features,
      product_reviews,
      checkout_mode: co_mode,
      checkout_link: co_link,
      checkout_form: co_form,
      rating,
      meta_pixel_id,
      product_qty_offers,
      colors,
      sizes
   } = product

   const isShowCoForm = co_mode === 'internal' && store?.co_on_preview == 1
   const inputFields = co_form?.split(',')

   const isShowImageSlider = store?.theme !== 'releasit'

   return (
      <BaseContainer>
         <div className='flex flex-col gap-8 mb-8'>
            <div className='flex flex-col items-start gap-2'>
               <h1 className='text-2xl md:text-3xl font-semibold'>{title}</h1>

               <Price currency={store?.currency} price={product_price_formatted} compare={compare_at_price_formatted} />

               <div className='mt-3 flex items-center gap-2'>
                  <BadgeRating sold={sold} rating={rating} />
                  <BadgeStore storeName={store?.name} />
               </div>
            </div>
            
            {isShowImageSlider && <ImageSlider images={product_images} />}

            {isShowCoForm && (
               <Suspense fallback={null}>
                  <CheckoutForm
                     pixelID={meta_pixel_id}
                     country={store?.country}
                     storeID={store?.id}
                     productID={id}
                     productPrice={product_price}
                     inputFields={inputFields}
                     currency={store?.currency}
                     qtyOffers={product_qty_offers || []}
                     colors={colors || []}
                     sizes={sizes || []}
                  />
               </Suspense>
            )}

            <BannerCOD />

            {product_features?.length > 0 && <Features features={product_features} />}

            <Description productID={id} />

            {product_reviews?.length > 0 && (<Review reviews={product_reviews} />)}

            {/* {isShowCoForm && <StaticButtonCheckout />} */}
         </div>

         <FloatingButtonCheckout slug={slug} coMode={co_mode} coLink={isShowCoForm ? '#checkout-form': co_link} />

         <BaseFooter />

      </BaseContainer>
   )
}

export default Page