import React, { createContext, Dispatch, SetStateAction, useEffect, useState } from 'react'
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

export interface IShipmentForm {
   productID: string,
   storeID: string,
   onApply: (_: ShipmentType) => void,
   country: string
}

const ShipmentForm = ({ productID, storeID, onApply, country }: IShipmentForm) => {
   const [shipment, setShipment] = useState<ShipmentType>({
      ...initialValue,
      storeID,
      productID
   })

   const storeCountry = country.toUpperCase()

   return (
      <ShipmentFormContext.Provider value={[shipment, setShipment]}>
         <SelectShipment country={storeCountry} onApply={onApply} />
      </ShipmentFormContext.Provider>
   )
}

const SelectShipment = (props: { country: string, onApply: IShipmentForm['onApply'] }) => {

   const { country, ...countryProps } = props

   if (country === 'INDONESIA') {
      return <Indonesia {...countryProps} />
   }

   if (country === 'ALGERIA') {
      return <Algeria {...countryProps} />
   }

   return <Default country={country} {...countryProps} />
}

export default ShipmentForm