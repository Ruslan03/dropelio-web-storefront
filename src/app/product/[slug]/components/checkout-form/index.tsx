'use client';

import React from 'react'
import { Input, Textarea } from "@nextui-org/input";

const CheckoutForm = () => {
   return (
      <div className='bg-gray-50 p-4 rounded-md'>
         <h2 className='font-semibold text-xl'>Checkout form</h2>
         <div className='flex flex-col gap-3'>
            <Input size='sm' variant='underlined' label="Your name" />
            <Input size='sm' variant='underlined' label="Your whatsapp number" />
            <Input size='sm' variant='underlined' label="City" />
            <Textarea
               size='sm'
               variant='underlined'
               label="Address"
               placeholder="Enter your Address"
            />
            <Input size='sm' variant='underlined' label="Purchase amount" />
            <Input size='sm' variant='underlined' label="Email" />
            <Textarea
               size='sm'
               variant='underlined'
               label="Notes"
               placeholder="Enter your Notes"
            />
         </div>
      </div>
   )
}

export default CheckoutForm