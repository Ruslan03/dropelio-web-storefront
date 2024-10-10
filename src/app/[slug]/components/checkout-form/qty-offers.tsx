import React, { useState } from 'react'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { currencyFormat } from '@/app/lib/client/currency-format'
import { useTranslations } from 'next-intl'


const QtyOffers = ({ offers, price, currency, onSelectDiscount }: { offers: any[], price: number, currency: string, onSelectDiscount: (_: any) => void }) => {

   const t = useTranslations('CheckoutForm.Offer')

   const [selected, setSelected] = useState<any>('')
   const handleOnChange = (value: string) => {
      setSelected(value)

      const offer = JSON.parse(value)
      const calculated = calculateDiscount(offer, price)

      onSelectDiscount({
         qty: offer?.qty,
         discount: calculated.totalDiscount
      })
   }


   return (
      <div className='relative'>
         <label className='absolute left-0 top-0 opacity-0'>
            Qty offer:
            <input name='qty'
               value={selected}
               type='text'
               required
               onChange={() => { }}
            />
         </label>
         <RadioGroup value={selected} onValueChange={handleOnChange} className='flex flex-col gap-4'>
            {offers.map((offer, i) => {

               const offerStringify = JSON.stringify(offer)

               const isSelected = offerStringify === selected

               const {
                  totalDiscount,
                  totalBfDiscount,
                  totalAfDiscount,
                  isShowCompare
               } = calculateDiscount(offer, price)

               return (
                  <div key={i} className={`ltr:flex rtl:flex-row-reverse gap-3 items-center relative p-3 border rounded-md ${isSelected ? 'bg-blue-100 border-blue-400' : 'bg-white'}`}>
                     <RadioGroupItem id={`offer-${i}`} aria-label={`offer-${i}`} value={offerStringify} />
                     <label
                        htmlFor={`offer-${i}`}
                        className="text-sm flex-grow cursor-pointer ltr:text-left rtl:text-right "
                     >
                        <div className='flex flex-col '>
                           <p className='mb-1'>{offer?.title}</p>
                           <div>
                              <div className='flex gap-1 items-center ltr:justify-start rtl:justify-end'>

                                 <p className='font-semibold'>{currencyFormat(totalAfDiscount, currency)}</p>
                                 {isShowCompare && (
                                    <p className='line-through'>{currencyFormat(totalBfDiscount, currency)}</p>
                                 )}
                              </div>
                           </div>
                        </div>
                     </label>
                     {isShowCompare && (
                        <div className='px-2 absolute top-0 left-0 right-0 flex ltr:justify-end rtl:justify-start'>
                           <div className={`flex items-center gap-2 text-xs shadow-md ${i === 0 ? 'bg-gray-400' : 'bg-blue-600'} text-white font-semibold py-1 px-3 rounded-md -translate-y-1/2`}>
                              <p>{t('Discount')}: {currencyFormat(totalDiscount, currency)}</p>
                           </div>
                        </div>
                     )}
                  </div>
               )
            })}
         </RadioGroup >
      </div>
   )
}

const calculateDiscount = (offer: any, price: number) => {
   const isDiscPercent = offer?.disc_type === 'percent'
   const qty = Number(offer?.qty) || 0
   const discValue = Number(offer?.disc_amt) || 0;

   const totalDiscount = isDiscPercent ? (discValue / 100) * price * qty : discValue
   const totalBfDiscount = price * qty
   const totalAfDiscount = totalBfDiscount - totalDiscount
   const isShowCompare = totalBfDiscount != totalAfDiscount

   return {
      totalDiscount,
      totalBfDiscount,
      totalAfDiscount,
      isShowCompare
   }
}


export default QtyOffers