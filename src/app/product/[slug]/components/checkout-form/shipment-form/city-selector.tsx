import React from 'react'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Check } from 'lucide-react'
import { useTranslations } from 'next-intl'

interface ICitySelector {
   cities: any[],
   value?: string | number | null
   onChange: (_: any) => void
   isLoading?: boolean
}

const CitySelector = ({ isLoading, cities, value, onChange }: ICitySelector) => {
   const t = useTranslations('ShipmentForm.Body')
   return (
      <ScrollArea className="mb-3 h-48 w-full rounded-md border">
         {isLoading && Array.from(new Array(4)).map((_, i) => (
            <div key={i} className='w-full border-b px-4 py-3 flex items-center justify-between'>
               <div className='h-4 bg-muted w-80 animate-pulse rounded-md' />
               <div className='h-4 w-5 bg-muted animate-pulse rounded-md' />
            </div>
         ))}
         {!isLoading && cities.map((city: any) => {
            const isSelected = value === city?.id

            return (
               <button key={city?.id} className={`${isSelected && 'font-semibold text-blue-600'} w-full flex items-center text-left border-b px-4 py-2 text-sm hover:bg-muted`} onClick={() => onChange(city)}>
                  <p className='flex-grow'>{city?.type} {city?.city_name}</p>

                  <Check height={16} className={`${isSelected ? 'visible' : 'invisible'}`} />
               </button>
            )
         })}

         {!isLoading && !Boolean(cities?.length) && (
            <div className='h-44 w-full flex items-center justify-center'>
               <p className='text-gray-600 text-sm'>{t('NoShippingAddress')}</p>
            </div>
         )}
      </ScrollArea>
   )
}

export default CitySelector