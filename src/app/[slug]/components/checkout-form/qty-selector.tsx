import React from 'react'
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select"
import { useTranslations } from 'next-intl'


const QtySelector = ({ onValueChange }: { onValueChange: (_: string) => void }) => {
   const t = useTranslations('CheckoutForm')

   return (
      <Select onValueChange={onValueChange}>
         <SelectTrigger className="w-full text-gray-500 rtl:flex-row-reverse bg-white h-12 text-base">
            <SelectValue placeholder={t('Quantity')} />
         </SelectTrigger>
         <SelectContent>
            {Array.from(new Array(4)).map((_, i) => (
               <SelectItem
                  key={i}
                  value={(i + 1).toString()}
                  className='text-base'
               >
                  {i + 1}
               </SelectItem>
            ))}
         </SelectContent>
      </Select>
   )
}

export default QtySelector