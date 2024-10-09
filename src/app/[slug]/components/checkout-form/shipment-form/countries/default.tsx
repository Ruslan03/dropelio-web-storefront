import React, { useCallback, useContext, useEffect, useState } from 'react'
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select"

import { getShippingCities } from '@/services/shipping'
import { IShipmentForm, ShipmentFormContext } from '..'
import { useTranslations } from 'next-intl'


const Default = ({ country, onApply }: { country: string, onApply: IShipmentForm['onApply'] }) => {
   const t = useTranslations('ShipmentForm')
   const context = useContext(ShipmentFormContext)

   const { storeID } = context[0]

   const [selectedCity, setSelectedCity] = useState<any>(null)
   const [cities, setCities] = useState([])
   const [isLoading, setIsLoading] = useState(false)

   const handleSelectCity = async (city: any) => {
      setSelectedCity(city)
      const cost = Number(city?.shipping_cost) || 0
      let shipment = JSON.parse(JSON.stringify(context[0]))
      shipment = {
         ...shipment,
         city: {
            id: city?.id || null,
            name: city?.city_name || null
         },
         cost,
         isLoadingCost: false
      }
      context[1](shipment)
      onApply(shipment)
   }

   const fetchCities = useCallback(() => {
      setIsLoading(true)
      getShippingCities({
         payload: {
            country: country.toUpperCase(),
            store_id: storeID
         }
      })
         .then((resCities) => setCities(resCities))
         .finally(() => setIsLoading(false))
   }, [storeID, country])

   useEffect(() => {
      fetchCities()
   }, [fetchCities])

   return (
      <Select disabled={isLoading} onValueChange={(v) => {
         try {
            const city = JSON.parse(v)
            handleSelectCity(city)
         } catch (error) {
            console.error(error)
         }
      }}>
         <SelectTrigger className={`w-full h-12 bg-white text-base ${!selectedCity && 'text-gray-500'}`}>
            <SelectValue placeholder={t('Placeholder')} />
         </SelectTrigger>
         <SelectContent className='max-h-72'>
            {cities.map((state: any) => (
               <SelectItem
                  className='text-base'
                  key={state?.id}
                  value={JSON.stringify(state)}
               >
                  {state?.city_name}
               </SelectItem>
            ))}
         </SelectContent>
      </Select>
   )
}

export default Default