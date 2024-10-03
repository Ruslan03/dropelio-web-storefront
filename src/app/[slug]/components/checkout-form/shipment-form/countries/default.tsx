import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import useDebounce from '@/app/lib/client/hooks/use-debounce'
import { getShippingCities } from '@/services/shipping'
import { ShipmentFormContext } from '..'
import CitySelector from '../city-selector'
import { useTranslations } from 'next-intl'


const Default = ({ country }: { country: string }) => {
   const t = useTranslations('ShipmentForm.Body')
   const context = useContext(ShipmentFormContext)
   const cityID = context[0].city.id

   const { storeID } = context[0]

   const [keyword, setKeyword] = useState('')
   const [cities, setCities] = useState([])
   const [isLoading, setIsLoading] = useState(false)
   const debouncedKeyword = useDebounce(keyword, 400);

   const handleSelectCity = async (city: any) => {
      context[1]((prevState) => ({
         ...prevState,
         city: {
            id: city?.id || null,
            name: city?.city_name || null
         },
         isLoadingCost: true
      }))

      const cost = Number(city?.shipping_cost) || 0

      context[1]((prevState) => ({
         ...prevState,
         isLoadingCost: false,
         cost
      }))

   }

   const fetchCities = useCallback(() => {
      setIsLoading(true)
      getShippingCities({
         payload: {
            q: debouncedKeyword,
            country: country.toUpperCase(),
            store_id: storeID
         }
      })
      .then((resCities) => setCities(resCities))
      .finally(() => setIsLoading(false))
   }, [debouncedKeyword, storeID, country])

   useEffect(() => {
      fetchCities()
   }, [debouncedKeyword, fetchCities])

   return (
      <div>
         <Input className='h-9 mb-3 text-sm' placeholder={t('SearchCityPlaceholder')} onChange={(e) => setKeyword(e.target.value)} />

         <CitySelector
            isLoading={isLoading}
            cities={cities}
            value={cityID}
            onChange={(city) => handleSelectCity(city)}
         />
      </div>
   )
}

export default Default