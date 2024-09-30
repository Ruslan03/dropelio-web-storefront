'use client';

import React, { ChangeEvent, ChangeEventHandler, FormEvent, useState } from 'react'
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { postCheckout } from '@/app/lib/services';
import { CircleCheckBig, LoaderCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import ShipmentForm from './components/shipment-form';

type Payload = {
   name: string
   qty: number
   whatsapp: string
   city_id?: number
   address?: string
   email?: string
   note?: string
}

const CheckoutForm = ({ inputFields, productID, storeID }: { inputFields: string[], productID: string, storeID: string }) => {
   const [isShowSuccess, setIsShowSuccess] = useState(false)
   const [isLoading, setIsLoading] = useState(false)

   const [payload, setPayload] = useState<Payload>({
      name: '',
      qty: 1,
      whatsapp: ''
   })

   const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target

      setPayload((prevPayload) => ({
         ...prevPayload,
         [name]: value
      }))
   }

   const handleApplyShipment = (shipment: any) => {

      setPayload((prevPayload) => ({
         ...prevPayload,
         city_id: shipment?.city_id
      }))

   }

   const handleSubmit = async (e: FormEvent) => {
      e.preventDefault()

      setIsLoading(true)

      await postCheckout({
         payload,
         productID
      }).then(() => {
         setPayload({
            name: '',
            qty: 1,
            whatsapp: ''
         })

         setIsShowSuccess(true)
      }).catch((error) => {
         alert(error?.message || 'Something went wrong')
      }).finally(() => setIsLoading(false))
   }

   const af = (field: string) => inputFields.indexOf(field) > -1
   const t = useTranslations('CheckoutForm')

   return (
      <div className='relative bg-gradient-to-tr from-gray-100  to-gray-50 border-[1px] border-gray-200 p-4 rounded-md'>

         {isShowSuccess && (
            <div className='p-3 absolute left-0 w-full top-0 h-full bg-opacity-90 gap-3 bg-white flex flex-col items-center justify-center'>
               <CircleCheckBig className='text-blue-600 w-16 h-14 md:w-14 md:h-16' />
               <p className='font-semibold text-base md:text-xl text-center'>{t('SuccessMessage')}</p>
               <button onClick={() => setIsShowSuccess(false)} className='active:opacity-75 transition-all ease-in-out duration-75 px-3 py-2 mt-4 bg-gradient-to-t from-blue-600  to-blue-500 text-white rounded-md text-sm md:text-base'>{t('ButtonContinueShopping')}</button>
            </div>
         )}


         <h2 className='font-bold text-xl'>{t('Title')}</h2>
         <div className='flex flex-col mt-3'>
            <form className='flex w-full flex-col gap-3' onSubmit={handleSubmit}>
               <InputField name='name' type='text' value={payload.name} required placeholder={t('Name')} onChange={handleInputChange} />
               <InputField name='whatsapp' type='text' value={payload.whatsapp} required placeholder={t('PhoneNumber')} onChange={handleInputChange} />

               <ShipmentForm
                  storeID={storeID}
                  productID={productID}
                  onApply={(shipment) => handleApplyShipment(shipment)}
               />

               {af('address') && (
                  <Textarea
                     name='address'
                     className='bg-white'
                     placeholder={t('Address')}
                     onChange={handleInputChange}
                     value={payload?.address || ''}
                  />
               )}
               <InputField avail={af('qty')} name='qty' type='number' value={payload.qty} required placeholder={t('Quantity')} onChange={handleInputChange} />
               <InputField avail={af('email')} name='email' type='email' value={payload?.email || ''} placeholder={t('Email')} onChange={handleInputChange} />

               {af('notes') && (
                  <Textarea
                     name='note'
                     className='bg-white'
                     placeholder={t('Notes')}
                     onChange={handleInputChange}
                     value={payload?.note || ''}
                  />
               )}

               <button type='submit' disabled={isLoading} className={`${isShowSuccess ? 'bg-gray-300' : 'bg-gradient-to-t from-blue-600  to-blue-500'} active:opacity-75 transition-all ease-in-out duration-75 text-white text-center flex justify-center disabled:from-blue-500 disabled:to-blue-400 shadow-sm w-full mt-2 text-base font-bold p-3 rounded-md`}>
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
   const {avail, ...inputProps} = props
   if(avail === false) {
      return null
   }
   return <Input className='bg-white' {...inputProps} />
}

export default CheckoutForm