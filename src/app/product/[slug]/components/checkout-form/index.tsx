'use client';

import React from 'react'
import RecipientForm from './form';
import OrderDetail from './order-detail';

const CheckoutForm = () => {
   return (
      <div className='bg-yellow-50 p-4 rounded-md'>
         <h2 className='font-bold text-xl'>Checkout form</h2>
         <div className='flex flex-col'>
            <RecipientForm />
            <OrderDetail />
         </div>
      </div>
   )
}

export default CheckoutForm