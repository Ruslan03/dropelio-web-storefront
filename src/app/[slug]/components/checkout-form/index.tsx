'use client';

import React, { ChangeEvent, ChangeEventHandler, FormEvent, useEffect, useState } from 'react'
import dynamic from 'next/dynamic';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { postCheckout } from '@/app/lib/services';
import { CircleCheckBig, LoaderCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { ShipmentType } from './shipment-form';
import { TypeSummary } from './order-summary';
import { useToast } from '@/hooks/use-toast';
import { trackPageViewEvent, trackPurchaseEvent } from '@/app/lib/client/tracking';
import SelectVariant from './variant';

const QtyOffers = dynamic(() => import('./qty-offers'), {
   ssr: false,
})

const QtySelector = dynamic(() => import('./qty-selector'), {
   ssr: false,
})

const OrderSummary = dynamic(() => import('./order-summary'), {
   ssr: false,
})

const ShipmentForm = dynamic(() => import('./shipment-form'), {
   ssr: false,
})

type Payload = {
   name: string
   qty: number
   whatsapp: string
   discount: number,
   city_id?: number
   city_name?: string
   address?: string
   email?: string
   note?: string
   color?: string
   size?: string
}

interface ICheckoutForm {
   country: string
   inputFields: string[]
   productID: string
   productPrice: number
   storeID: string
   currency: string
   pixelID?: string
   qtyOffers?: any[]
   colors: string[]
   sizes: string[]
}

const CheckoutForm = (props: ICheckoutForm) => {
   const {
      pixelID,
      inputFields,
      productID,
      storeID,
      country,
      currency,
      productPrice,
      qtyOffers,
      colors,
      sizes
   } = props
   
   const t = useTranslations('CheckoutForm')
   const { toast } = useToast()
   const [isShowSuccess, setIsShowSuccess] = useState(false)
   const [isLoading, setIsLoading] = useState(false)
   const [refreshKey, setRefreshKey] = useState(1)

   const [shippingCost, setShippingCost] = useState<number | null>(0)
   const [payload, setPayload] = useState<Payload>({
      name: '',
      qty: 1,
      whatsapp: '',
      discount: 0
   })

   const summary: TypeSummary = {
      qty: payload.qty,
      price: productPrice,
      shippingCost,
      discount: payload.discount,
      grandTotal: (payload.qty * productPrice) + (shippingCost || 0) - (payload.discount || 0)
   }

   const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target

      setPayload((prevPayload) => ({
         ...prevPayload,
         [name]: value
      }))
   }

   const handleApplyShipment = (shipment: ShipmentType) => {

      setPayload((prevPayload) => ({
         ...prevPayload,
         city_id: shipment.city.id as number,
         city_name: shipment.city.name as string
      }))

      setShippingCost(shipment?.cost || 0)
   }

   const handleSubmit = async (e: FormEvent) => {
      e.preventDefault()

      setIsLoading(true)

      await postCheckout({
         payload,
         productID
      }).then(async () => {
         const pixelPayload = {
            name: payload?.name,
            phone: payload?.whatsapp,
            currency: currency,
            value: summary.grandTotal
         }
         await trackPurchaseEvent(pixelID, pixelPayload)

         setPayload({
            name: '',
            qty: 1,
            whatsapp: '',
            discount: 0
         })
         setRefreshKey((prevKey) => prevKey + 1)
         setShippingCost(null)
         setIsShowSuccess(true)
      }).catch((error) => {
         const code = error?.code

         if (code == '401') {
            toast({
               variant: 'destructive',
               title: t('ErrorMessage.InProgressOrder.Title'),
               description: t('ErrorMessage.InProgressOrder.Description')
            })
         } else {
            toast({
               variant: 'destructive',
               title: t('ErrorMessage.InvalidOrder.Title'),
               description: t('ErrorMessage.InvalidOrder.Description')
            })
         }
      }).finally(() => setIsLoading(false))
   }

   const af = (field: string) => inputFields.indexOf(field) > -1
   const isShowQtyOffers = Boolean(qtyOffers?.length)
   const isShowQtySelector = af('qty') && !isShowQtyOffers
   const isShowOffer = isShowQtyOffers

   const isShowVariant = Boolean(colors?.length) || Boolean(sizes?.length)

   useEffect(() => {
      setTimeout(() => {
         trackPageViewEvent(pixelID)
      }, 5000)
   }, [pixelID])

   return (
      <div id='checkout-form' className='relative bg-gradient-to-tr from-gray-100  to-gray-50 border-[1px] border-gray-200 p-4 rounded-md'>

         {isShowSuccess && (
            <div className='p-3 absolute z-50 left-0 w-full top-0 h-full bg-opacity-90 gap-3 bg-white flex flex-col items-center justify-center'>
               <CircleCheckBig className='text-[--primary-600] w-16 h-14 md:w-14 md:h-16' />
               <p className='font-semibold text-base md:text-xl text-center'>{t('SuccessMessage')}</p>
               <button onClick={() => setIsShowSuccess(false)} className='active:opacity-75 transition-all ease-in-out duration-75 px-3 py-2 mt-4 bg-gradient-to-t from-[--primary-500]  to-[--primary-600] text-white rounded-md text-sm md:text-base'>{t('ButtonContinueShopping')}</button>
            </div>
         )}

         <h2 className='font-bold text-xl'>{t('Title')}</h2>
         <div className='flex flex-col mt-3'>
            <form className='flex w-full flex-col gap-3' onSubmit={handleSubmit}>
               <InputField
                  required
                  name='name'
                  type='text'
                  value={payload.name}
                  placeholder={t('Name')}
                  onChange={handleInputChange}
               />

               <InputField
                  required
                  name='whatsapp'
                  type='number'
                  // @ts-ignore
                  pattern="[0-9]*"
                  // @ts-ignore
                  inputMode="numeric"
                  value={payload.whatsapp}
                  placeholder={t('PhoneNumber')}
                  onChange={(e) => {
                     const numberRegex = /^[0-9]*$/;
                     if (numberRegex.test(e.target.value)) {
                        handleInputChange(e)
                     }
                  }}
               />

               <InputField
                  avail={af('email')}
                  name='email'
                  type='email'
                  value={payload?.email || ''}
                  placeholder={t('Email')}
                  onChange={handleInputChange}
               />

               {isShowQtySelector && (
                  <QtySelector onValueChange={(qty) => setPayload((prevPayload) => ({ ...prevPayload, qty: Number(qty) || 1 }))} />
               )}

               {af('city') && (
                  <ShipmentForm
                     key={refreshKey}
                     country={country}
                     storeID={storeID}
                     productID={productID}
                     onApply={(shipment) => handleApplyShipment(shipment)}
                  />
               )}

               {af('address') && (
                  <Textarea
                     name='address'
                     className='bg-white min-h-24'
                     placeholder={t('Address')}
                     onChange={handleInputChange}
                     value={payload?.address || ''}
                  />
               )}

               {af('notes') && (
                  <Textarea
                     name='note'
                     className='bg-white min-h-24'
                     placeholder={t('Notes')}
                     onChange={handleInputChange}
                     value={payload?.note || ''}
                  />
               )}

               {isShowVariant && (
                  <>
                     <hr className='my-1 w-full mx-auto' />
                     <div className='flex gap-1'>
                        <h2 className='font-semibold text-[16px]'>{t('Variant.Title')}</h2>
                     </div>

                     <SelectVariant
                        key={refreshKey}
                        colors={colors}
                        sizes={sizes}
                        onChange={(valueVariant) => setPayload((prevPayload) => ({...prevPayload, ...valueVariant}))}
                     />
                  </>
               )}

               {isShowOffer && (
                  <>
                     <hr className='my-1 w-full mx-auto' />
                     <div className='flex gap-1'>
                        <h2 className='font-semibold text-[16px]'>{t('Offer.Title')}</h2>
                     </div>


                     {isShowQtyOffers && (
                        <QtyOffers
                           key={refreshKey}
                           offers={qtyOffers || []}
                           price={productPrice}
                           currency={currency}
                           onSelectDiscount={(offer) => {
                              setPayload((prevPayload) => ({
                                 ...prevPayload,
                                 qty: offer?.qty || 1,
                                 discount: offer?.discount || 0
                              }))
                           }}
                        />
                     )}
                  </>
               )}

               <hr className='my-1 w-full mx-auto' />

               <OrderSummary summary={summary} currency={currency} />

               <button type='submit' disabled={isLoading} className={`${isShowSuccess ? 'bg-gray-300' : 'bg-gradient-to-t to-[--primary-600]  from-[--primary-500]'} active:opacity-75 transition-all ease-in-out duration-75 text-white text-center flex justify-center disabled:from-[--primary-500] disabled:to-[--primary-600] shadow-sm w-full mt-2 text-base font-bold p-3 rounded-md`}>
                  {!isLoading ? t('ButtonSubmit') : <LoaderCircle className='animate-spin' strokeWidth={3} />}
               </button>
            </form>
         </div>
      </div>
   )
}

interface IInputField {
   type: string
   name: string
   value: string | number | undefined,
   placeholder: string
   onChange: ChangeEventHandler<HTMLInputElement> | undefined
   required?: boolean
   avail?: boolean | undefined
}

const InputField = (props: IInputField) => {
   const { avail, ...inputProps } = props
   if (avail === false) {
      return null
   }
   return <Input className='bg-white' {...inputProps} />
}

export default CheckoutForm