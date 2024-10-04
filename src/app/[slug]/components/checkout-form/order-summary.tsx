import { currencyFormat } from '@/app/lib/client/currency-format'
import { useTranslations } from 'next-intl'
import React from 'react'

export type TypeSummary = {
   qty: number
   price: number
   shippingCost: number | null,
   discount: number | null,
   grandTotal: number
}

const OrderSumamry = ({ summary, currency }: { summary: TypeSummary, currency: string }) => {

   const t = useTranslations('OrderSummary')

   const {qty, price, shippingCost, discount, grandTotal} = summary

   const subTotalLabel = `${t('Subtotal')} (${currencyFormat(price)} x ${qty})`
   const subTotalValue = qty * price

   return (
      <div className='bg-white border rounded-md p-3'>
         <h3 className='font-semibold text-[16px] mb-2'>{t('Title')}</h3>

         <div className='flex flex-col gap-3 mt-3'>
            <TotalItem label={subTotalLabel} value={currencyFormat(subTotalValue, currency)} />
            <TotalItem label={t('ShippingCost')} value={shippingCost ? currencyFormat(shippingCost, currency) : '-'} />
            <TotalItem label={t('Discount')} value={discount ? currencyFormat(discount, currency) : '-'} />
            <TotalItem label={t('Total')} value={currencyFormat(grandTotal, currency)} isHighlight={true} />
         </div>
      </div>
   )
}

const TotalItem = ({ label, value, isHighlight }: { label: string, value: string | number, isHighlight?: boolean }) => {
   return (
      <div className='flex'>
         <p className={`${isHighlight ? 'font-bold text-[16px]' : 'font-semibold text-[14px]'} flex-grow`}>{label}</p>
         <p className={`${isHighlight ? 'font-bold text-[16px]' : 'font-semibold text-[14px]'}`}>{value}</p>
      </div>
   )
}

export default OrderSumamry