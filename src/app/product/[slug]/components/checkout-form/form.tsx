'use client';

import React from 'react'
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const RecipientForm = () => {
   return (
      <div className='mt-4'>
         <h3 className='font-semibold mb-2'>Recipient Form</h3>
         <div className='flex w-full flex-col gap-3 '>
            <Input className='bg-white' type='text' placeholder="Your name" />

            <Input className='bg-white' placeholder="Your whatsapp number" />
            <Input className='bg-white' placeholder="City" />
            <Textarea
               className='bg-white'
               placeholder="Address"
            />
            <Input className='bg-white' placeholder="Purchase amount" />
            <Input className='bg-white' placeholder="Email" />
            <Textarea
               className='bg-white'
               placeholder="Enter your Notes"
            />
         </div>
      </div>
   )
}

export default RecipientForm