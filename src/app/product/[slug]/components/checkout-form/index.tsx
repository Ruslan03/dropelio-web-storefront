'use client';

import React, { ChangeEvent, ChangeEventHandler, FormEvent, useState } from 'react'
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { postCheckout } from '@/app/lib/services';
import { CircleCheckBig, LoaderCircle } from 'lucide-react';

type Payload = {
   name: string
   qty: number
   whatsapp: string
   city_id?: number
   address?: string
   email?: string
   note?: string
}

const CheckoutForm = ({ inputFields, productID }: { inputFields: string[], productID: string }) => {
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


   return (
      <div className='relative bg-gradient-to-tr from-gray-100  to-gray-50 border-[1px] border-gray-200 p-4 rounded-md'>

         {isShowSuccess && (
            <div className='absolute left-0 w-full top-0 h-full bg-opacity-80 gap-3 bg-white flex flex-col items-center justify-center'>
               <CircleCheckBig className='text-blue-600' size={64} />
               <p className='font-semibold text-xl'>Thank You! your order has been processed</p>
               <button onClick={() => setIsShowSuccess(false)} className='px-3 py-2 mt-4 bg-gradient-to-t from-blue-600  to-blue-500 text-white rounded-md'>Continue shopping</button>
            </div>
         )}


         <h2 className='font-bold text-xl'>Checkout form</h2>
         <div className='flex flex-col mt-3'>
            <form className='flex w-full flex-col gap-3' onSubmit={handleSubmit}>
               <InputField name='name' type='text' value={payload.name} required placeholder="Your name" onChange={handleInputChange} />

               <InputField name='whatsapp' type='text' value={payload.whatsapp} required placeholder="Your whatsapp number" onChange={handleInputChange} />
               <InputField name='city_id' type='text' value={payload?.city_id} placeholder="City" onChange={handleInputChange} />
               <Textarea
                  name='address'
                  className='bg-white'
                  placeholder="Address"
                  onChange={handleInputChange}
                  value={payload?.address || ''}
               />
               <InputField name='qty' type='number' value={payload.qty} required placeholder="Purchase amount" onChange={handleInputChange} />
               <InputField name='email' type='email' value={payload?.email || ''} placeholder="Email" onChange={handleInputChange} />
               <Textarea
                  name='note'
                  className='bg-white'
                  placeholder="Enter your Notes"
                  onChange={handleInputChange}
                  value={payload?.note || ''}
               />

               <button type='submit' disabled={isLoading} className='bg-gradient-to-t from-blue-600  to-blue-500 text-white text-center flex justify-center disabled:from-blue-500 disabled:to-blue-400 transition-all ease-linear duration-150 shadow-sm w-full mt-2 text-base font-bold p-3 rounded-md '>
                  {!isLoading ? 'Checkout' : <LoaderCircle className='animate-spin' strokeWidth={3} />}
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
}

const InputField = (props: IInputField) => {
   return <Input className='bg-white' {...props} />
}

export default CheckoutForm