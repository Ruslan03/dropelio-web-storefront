'use client';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import React from 'react'

const CheckoutForm = () => {
   return (
      <div className='bg-gray-50 p-4 rounded-md'>
         <h2 className='font-semibold text-xl'>Checkout form</h2>
         <div className='flex flex-col gap-3'>
            <Input type='text' placeholder="Email" />

            <Input placeholder="Your whatsapp number" />
            <Input placeholder="City" />
            <Textarea
               placeholder="Address"
            />
            <Input placeholder="Purchase amount" />
            <Input placeholder="Email" />
            <Textarea
               placeholder="Enter your Notes"
            />
         </div>
      </div>
   )
}

export default CheckoutForm