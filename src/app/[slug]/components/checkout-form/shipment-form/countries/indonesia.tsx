import React, { useCallback, useContext, useEffect, useState } from 'react'
import {
   Drawer,
   DrawerClose,
   DrawerContent,
   DrawerDescription,
   DrawerFooter,
   DrawerHeader,
   DrawerTitle,
   DrawerTrigger,
} from "@/components/ui/drawer"
import useDebounce from '@/app/lib/client/hooks/use-debounce'
import { getShippingCities, getShippingCost } from '@/services/shipping'
import { IShipmentForm, ShipmentFormContext } from '..'
import CitySelector from '../city-selector'
import { useTranslations } from 'next-intl'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'

const Indonesia = ({ onApply }: { onApply: IShipmentForm['onApply'] }) => {
   const t = useTranslations('ShipmentForm')
   const { toast } = useToast()
   const context = useContext(ShipmentFormContext)
   const shipment = context[0]
   const cityID = context[0].city.id

   const { storeID, productID } = context[0]

   const [cityName, setCityName] = useState<string>('')

   const shipmentCostDisplay = shipment?.cost ? new Intl.NumberFormat().format(shipment.cost) : '-'

   const isDisabledApply = shipment.isLoadingCost || !shipment.city.id

   const handleApply = () => {
      setCityName(shipment.city.name || '')
      onApply(shipment)
   }

   const [keyword, setKeyword] = useState('')
   const [cities, setCities] = useState([])
   const [isLoading, setIsLoading] = useState(false)
   const debouncedKeyword = useDebounce(keyword, 400);

   const handleSelectCity = async (city: any) => {
      context[1]((prevState) => ({
         ...prevState,
         city: {
            id: city?.id || null,
            name: city?.city_name ? `${city?.type} ${city?.city_name}` : null
         },
         isLoadingCost: true
      }))

      const cost = await getShippingCost({
         productID: productID as string,
         payload: { city_id: city?.id }
      })
         .then((resCost) => resCost?.[0]?.cost?.[0]?.value || 0)
         .catch(() => {
            toast({
               variant: 'destructive',
               title: t('GetCostErrorMessage'),
            })

            return null
         })

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
            country: 'INDONESIA',
            store_id: storeID
         }
      })
         .then((resCities) => setCities(resCities))
         .finally(() => setIsLoading(false))
   }, [debouncedKeyword, storeID])

   useEffect(() => {
      fetchCities()
   }, [debouncedKeyword, fetchCities])

   return (
      <Drawer onClose={() => {
         context[1]((prevState) => ({
            ...prevState,
            storeID,
            productID
         }))
      }}>
         <DrawerTrigger className='h-12 w-full flex items-center rtl:text-right ltr:text-left bg-white border rounded-md px-3'>
            {!cityName && <p className='flex-grow text-gray-500'>{t('Placeholder')}</p>}
            {cityName && <p className='flex-grow'>{cityName}</p>}
            <Search height={18} className='text-gray-400' />
         </DrawerTrigger>
         <DrawerContent className='w-full md:w-[576px] md:mx-auto'>
            <DrawerHeader>
               <DrawerTitle>{t('Header.Title')}</DrawerTitle>
               <DrawerDescription>{t('Header.SubTitle')}</DrawerDescription>
            </DrawerHeader>
            <div className='p-4'>

               <Input className='h-9 mb-3 text-sm' placeholder={t('Body.SearchCityPlaceholder')} onChange={(e) => setKeyword(e.target.value)} />

               <CitySelector
                  isLoading={isLoading}
                  cities={cities}
                  value={cityID}
                  onChange={(city) => handleSelectCity(city)}
               />

               <div className='flex justify-between p-3 bg-gray-50 rounded-md'>
                  <div>
                     <p className='text-sm'>{t('Footer.DeliveryCityLabel')}</p>
                     <p className='font-semibold'>{shipment.city.name || '-'}</p>
                  </div>
                  <div className='text-right'>
                     <p className='text-sm '>{t('Footer.ShippingCostLabel')}</p>
                     {!shipment.isLoadingCost && <p className='font-semibold'>{shipmentCostDisplay}</p>}
                     {shipment.isLoadingCost && <div className='h-5 w-32 mt-1 rounded-md bg-gray-200 animate-pulse' />}
                  </div>

               </div>
            </div>
            <DrawerFooter>
               <DrawerClose disabled={isDisabledApply} onClick={handleApply} className='bg-blue-600 w-full disabled:bg-opacity-65 p-2 text-sm rounded-md text-white'>
                  {t('Footer.CTASave')}
               </DrawerClose>
            </DrawerFooter>
         </DrawerContent>
      </Drawer>

   )
}

export default Indonesia