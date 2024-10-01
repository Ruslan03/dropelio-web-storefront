import React, { useCallback, useContext, useEffect, useState } from 'react'
import {
   Select,
   SelectContent,
   SelectGroup,
   SelectItem,
   SelectLabel,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select"

import useDebounce from '@/app/lib/client/hooks/use-debounce'
import { getAlgeriaCities, getAlgeriaStates, getShippingCities, getShippingCost } from '@/services/shipping'
import { ShipmentFormContext } from '..'
import CitySelector from '../city-selector'
import { useTranslations } from 'next-intl'




const Algeria = () => {
   const t = useTranslations('ShipmentForm.Body.Algeria')
   const context = useContext(ShipmentFormContext)

   const { storeID } = context[0]

   const [states, setStates] = useState([])
   const [selectedState, setSelectedState] = useState<any>(null)
   const [selectedCity, setSelectedCity] = useState<any>(null)
   const [cities, setCities] = useState([])
   const [isLoading, setIsLoading] = useState(false)

   const handleSelectCity = async (city: any) => {
      setSelectedCity(city)
      context[1]((prevState) => ({
         ...prevState,
         city: {
            id: selectedState?.id || null,
            name: city?.city_name ? `${city?.city_state}-${city?.city_name}` : null
         },
         isLoadingCost: true
      }))

      const cost = Number(selectedState?.shipping_cost) || 0

      context[1]((prevState) => ({
         ...prevState,
         isLoadingCost: false,
         cost
      }))

   }

   const fetchStates = useCallback(async () => {
      const resStates = await getAlgeriaStates({
         payload: {
            store_id: storeID as string
         }
      })

      setStates(resStates || [])
   }, [storeID])

   const fetchCities = useCallback(async (state: string) => {
      setIsLoading(true)
      const resCities = await getAlgeriaCities({
         payload: {
            store_id: storeID as string,
            state
         }
      })

      setCities(resCities || [])
      setIsLoading(false)
   }, [storeID])

   useEffect(() => {
      fetchStates()
   }, [fetchStates])

   return (
      <div>
         <p className='font-semibold text-sm mb-1'>{t('SelectStateLabel')}</p>
         <Select onValueChange={(v) => {
            try {
               const state = JSON.parse(v)
               setSelectedState(state)
               fetchCities(state?.city_name)

               context[1]((prevState) => ({
                  ...prevState,
                  city: {
                     id: null,
                     name: null
                  },
                  cost: null
               }))
            } catch (error) {
               console.error(error)
            }
         }}>
            <SelectTrigger className="w-full">
               <SelectValue placeholder={t('SelectStatePlaceholder')} />
            </SelectTrigger>
            <SelectContent>
               {states.map((state: any) => (
                  <SelectItem
                     key={state?.id}
                     value={JSON.stringify(state)}
                  >
                     {state?.city_name}
                  </SelectItem>
               ))}
            </SelectContent>
         </Select>

         <p className='font-semibold text-sm my-1 mt-3'>{t('CityLabel')}</p>
         <CitySelector
            isLoading={isLoading}
            cities={cities}
            value={selectedCity?.id}
            onChange={(city) => handleSelectCity(city)}
         />
      </div>
   )
}

export default Algeria