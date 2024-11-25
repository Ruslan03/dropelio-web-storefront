'use client'

import React, { useEffect, useState } from 'react'
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select"
import { useTranslations } from 'next-intl'

interface ISelectVariant {
   colors: string[]
   sizes: string[]
   onChange: (_: any) => void
}

const SelectVariant = ({ colors, sizes, onChange }: ISelectVariant) => {
   const t = useTranslations('CheckoutForm.Variant')
   const isShowColor = Boolean(colors?.length)
   const isShowSize = Boolean(sizes?.length)

   const [color, setColor] = useState('')
   const [size, setSize] = useState('')

   useEffect(() => {
      onChange({
         'color': color,
         'size': size
      })
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [color, size])

   return (
      <div className='flex flex-col gap-3'>
         {isShowColor && (
            <SelectVariantItem
               name={'color'}
               items={colors}
               placeholder={t('SelectColorPlaceholder')}
               onChange={(v) => setColor(v)}
            />
         )}

         {isShowSize && (
            <SelectVariantItem
               name={'size'}
               items={sizes}
               placeholder={t('SelectSizePlaceholder')}
               onChange={(v) => setSize(v)}
            />
         )}
      </div>
   )
}

interface ISelectVariantItem {
   items: string[]
   name: string
   placeholder: string
   onChange: (_: any) => void
}
const SelectVariantItem = ({ items, name, onChange, placeholder }: ISelectVariantItem) => {
   return (
      <Select onValueChange={onChange} name={name}>
         <SelectTrigger className="w-full text-gray-500 rtl:flex-row-reverse bg-white h-12 text-base">
            <SelectValue placeholder={placeholder} />
         </SelectTrigger>
         <SelectContent>
            {(items || []).map((item, i) => (
               <SelectItem
                  key={i}
                  value={item}
                  className='text-base'
               >
                  {item}
               </SelectItem>
            ))}
         </SelectContent>
      </Select>
   )
}

export default SelectVariant