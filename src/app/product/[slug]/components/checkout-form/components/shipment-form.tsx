import React, { ChangeEvent, useCallback, useEffect, useState } from 'react'
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
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from "@/components/ui/scroll-area"
import useDebounce from '@/app/lib/client/hooks/use-debounce'
import { getShippingCities, getShippingCost } from '@/services/shipping'
import { Check, Search } from 'lucide-react'

const ShipmentForm = ({ productID, storeID, onApply }: { productID: string, storeID: string, onApply: (_: any) => void }) => {

   const [keyword, setKeyword] = useState('')
   const [cities, setCities] = useState([])
   const [shippingCost, setShippingCost] = useState(null)
   const [selectedCity, setSelectedCity] = useState<any>(null)
   const [isLoadingCost, setIsLoadingCost] = useState(false)
   const debouncedKeyword = useDebounce(keyword, 400);

   const shipmentCity = selectedCity ? `${selectedCity?.type} ${selectedCity.city_name}` : '-'

   const handleSelectCity = (city: any) => {
      setSelectedCity(city)
   }

   const fetchCities = useCallback(() => {
      getShippingCities({
         payload: {
            q: debouncedKeyword,
            country: 'INDONESIA',
            store_id: storeID
         }
      }).then((resCities) => setCities(resCities))
   }, [debouncedKeyword, storeID])

   const handleApply = () => {
      onApply({
         ...selectedCity,
         cost: shippingCost
      })
   }

   const fetchCost = useCallback(() => {
      setIsLoadingCost(true)
      getShippingCost({
         productID: productID,
         payload: {
            city_id: selectedCity?.city_id
         }
      })
         .then((cost) => setShippingCost(cost?.[0]?.cost?.[0]?.value || 0))
         .finally(() => setIsLoadingCost(false))
   }, [selectedCity, productID])

   useEffect(() => {
      fetchCities()
   }, [debouncedKeyword, fetchCities])

   useEffect(() => {
      if (selectedCity?.id) {
         fetchCost()
      }
   }, [selectedCity, fetchCost])

   return (
      <Drawer>
         <DrawerTrigger className='h-12 flex items-center text-left bg-white border rounded-md px-3'>
            {!selectedCity && <p className='flex-grow text-gray-500'>Pilih alamat pengiriman</p>}
            {selectedCity && <p className='flex-grow'>{selectedCity?.city_name}</p>}
            <Search height={18} className='text-gray-400' />
         </DrawerTrigger>
         <DrawerContent className='w-full md:w-[576px] md:mx-auto'>
            <DrawerHeader>
               <DrawerTitle>Alamat Pengiriman</DrawerTitle>
               <DrawerDescription>Pilih alamat pengiriman</DrawerDescription>
            </DrawerHeader>
            <div className='p-4'>
               <Input className='h-9 text-sm' placeholder='Cari kota/kabupaten...' onChange={(e) => setKeyword(e.target.value)} />

               <ScrollArea className="my-3 h-48 w-full rounded-md border">
                  {cities.map((city: any) => {
                     const isSelected = selectedCity?.id === city?.id

                     return (
                        <button key={city?.id} className={`${isSelected && 'font-semibold'} w-full flex items-center text-left border-b px-4 py-2 text-sm hover:bg-muted cursor-pointer`} onClick={() => handleSelectCity(city)}>
                           <p className='flex-grow'>{city?.type} {city?.city_name}</p>

                           <Check height={16} className={`${isSelected ? 'visible' : 'invisible'}`} />
                        </button>
                     )
                  })}
               </ScrollArea>

               <div className='flex justify-between p-3 bg-gray-50 rounded-md'>
                  <div>
                     <p className='text-sm'>Kota Pengiriman</p>
                     <p className='font-semibold'>{shipmentCity}</p>
                  </div>
                  <div className='text-right'>
                     <p className='text-sm '>Ongkos Pengiriman</p>
                     {!isLoadingCost && <p className='font-semibold'>{shippingCost || '-'}</p>}
                     {isLoadingCost && <div className='h-5 w-32 mt-1 rounded-md bg-gray-200 animate-pulse' />}
                  </div>

               </div>
            </div>
            <DrawerFooter>
               <DrawerClose disabled={isLoadingCost || !selectedCity} onClick={handleApply} className='bg-blue-600 w-full p-2 text-sm rounded-md text-white'>
                  Terapkan
               </DrawerClose>
            </DrawerFooter>
         </DrawerContent>
      </Drawer>

   )
}

export default ShipmentForm