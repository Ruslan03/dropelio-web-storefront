import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select"

import { getAlgeriaCities, getAlgeriaStates } from '@/services/shipping'
import { IShipmentForm, ShipmentFormContext } from '..'

const Algeria = ({ onApply }: { onApply: IShipmentForm['onApply'] }) => {
   const t = useTranslations('ShipmentForm.Body.Algeria')
   const context = useContext(ShipmentFormContext)

   const { storeID } = context[0]

   const [states, setStates] = useState([])
   const [selectedState, setSelectedState] = useState<any>(null)
   const [selectedCity, setSelectedCity] = useState<any>(null)
   const [cities, setCities] = useState([])
   const [isLoadingState, setIsLoadingState] = useState(false)
   const [isLoading, setIsLoading] = useState(false)

   const isDisabledCity = isLoading || !Boolean(cities?.length)

   const handleSelectState = (state: any) => {
      setSelectedState(state)
      fetchCities(state?.city_name)

      let shipment = JSON.parse(JSON.stringify(context[0]))
      shipment = {
         ...shipment,
         city: {
            id: null,
            name: null
         },
         cost: null
      }
      onApply(shipment)
   }

   const handleSelectCity = async (city: any) => {
      setSelectedCity(city)
      const cost = Number(selectedState?.shipping_cost) || 0
      let shipment = JSON.parse(JSON.stringify(context[0]))
      shipment = {
         ...shipment,
         city: {
            id: selectedState?.id || null,
            name: city?.city_name ? `${city?.city_state}-${city?.city_name}` : null
         },
         cost,
         isLoadingCost: false,
      }
      context[1](shipment)
      onApply(shipment)
   }

   const fetchStates = useCallback(async () => {
      setIsLoadingState(true)
      const resStates = await getAlgeriaStates({
         payload: {
            store_id: storeID as string
         }
      })

      setStates(resStates || [])
      setIsLoadingState(false)
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
      <div className='flex flex-col gap-3'>
         <Select disabled={isLoadingState} onValueChange={(v) => {
            try {
               const state = JSON.parse(v)
               handleSelectState(state)
            } catch (error) {
               console.error(error)
            }
         }}>
            <SelectTrigger className={`w-full h-12 bg-white text-base ${!selectedState && 'text-gray-500'}`}>
               <SelectValue placeholder={t('SelectStatePlaceholder')} />
            </SelectTrigger>
            <SelectContent className='max-h-72'>
               {states.map((state: any) => (
                  <SelectItem
                     className='text-base'
                     key={state?.id}
                     value={JSON.stringify(state)}
                  >
                     {`${state?.postal_code} - ${state?.city_name}`}
                  </SelectItem>
               ))}
            </SelectContent>
         </Select>

         <Select disabled={isDisabledCity} onValueChange={(v) => {
            try {
               const city = JSON.parse(v)
               handleSelectCity(city)
            } catch (error) {
               console.error(error)
            }
         }}>
            <SelectTrigger className={`w-full h-12 bg-white text-base ${!selectedCity && 'text-gray-500'}`}>
               <SelectValue placeholder={t('SelectCityPlaceholder')} />
            </SelectTrigger>
            <SelectContent className='max-h-72'>
               {cities.map((state: any) => (
                  <SelectItem
                     className='text-base'
                     key={state?.id}
                     value={JSON.stringify(state)}
                  >
                     {`${state?.city_name} - ${state?.commune_name}`}
                  </SelectItem>
               ))}
            </SelectContent>
         </Select>
      </div>
   )
}

export default Algeria