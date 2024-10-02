import React, { createContext, Dispatch, SetStateAction, useEffect, useState } from 'react'
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
import { Search } from 'lucide-react'
import Indonesia from './countries/indonesia'
import Default from './countries/default'
import Algeria from './countries/algeria'
import { useTranslations } from 'next-intl'

export type ShipmentType = {
   storeID: number | string | null,
   productID: number | string | null,
   city: {
      id: number | string | null
      name: string | null
   },
   cost: number | null,
   isLoadingCost?: boolean
}

const initialValue: ShipmentType = {
   storeID: null,
   productID: null,
   city: {
      id: null,
      name: null
   },
   cost: null,
   isLoadingCost: false
}

export const ShipmentFormContext = createContext<[ShipmentType, Dispatch<SetStateAction<ShipmentType>>]>([initialValue, () => { }])

interface IShipmentForm {
   productID: string,
   storeID: string,
   onApply: (_: ShipmentType) => void,
   country: string
}

const ShipmentForm = ({ productID, storeID, onApply, country }: IShipmentForm) => {

   const t = useTranslations('ShipmentForm')
   const [shipment, setShipment] = useState<ShipmentType>({
      ...initialValue,
      storeID,
      productID
   })

   const [cityName, setCityName] = useState<string>('')
   const storeCountry = country.toUpperCase()
   const shipmentCostDisplay = shipment?.cost ? new Intl.NumberFormat().format(shipment.cost) : '-'

   const isDisabledApply = shipment.isLoadingCost || !shipment.city.id

   const handleApply = () => {
      setCityName(shipment.city.name || '')
      onApply(shipment)
   }


   return (
      <Drawer onClose={() => {
         setShipment({
            ...initialValue,
            storeID,
            productID
         })
      }}>
         <DrawerTrigger className='h-12 flex items-center rtl:text-right ltr:text-left bg-white border rounded-md px-3'>
            {!cityName && <p className='flex-grow text-gray-500'>{t('Placeholder')}</p>}
            {cityName && <p className='flex-grow'>{cityName}</p>}
            <Search height={18} className='text-gray-400' />
         </DrawerTrigger>
         <DrawerContent className='w-full md:w-[576px] md:mx-auto'>
            <DrawerHeader>
               <DrawerTitle>{t('Header.Title')}</DrawerTitle>
               <DrawerDescription>{t('Header.SubTitle')}</DrawerDescription>
            </DrawerHeader>
            <ShipmentFormContext.Provider value={[shipment, setShipment]}>
               <div className='p-4'>

                  <SelectShipment country={storeCountry} />

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
            </ShipmentFormContext.Provider>
            <DrawerFooter>
               <DrawerClose disabled={isDisabledApply} onClick={handleApply} className='bg-blue-600 w-full disabled:bg-opacity-65 p-2 text-sm rounded-md text-white'>
                  {t('Footer.CTASave')}
               </DrawerClose>
            </DrawerFooter>
         </DrawerContent>
      </Drawer>

   )
}

const SelectShipment = ({ country }: { country: string }) => {

   if (country === 'INDONESIA') {
      return <Indonesia />
   }

   if (country === 'ALGERIA') {
      return <Algeria />
   }

   return <Default country={country} />
}

export default ShipmentForm