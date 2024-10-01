import { getBaseApiURL } from "@/app/lib/services";


export const getShippingCities = async ({ payload }: { payload: any }) => {

   try {
      const baseUrl = getBaseApiURL()
      const params = new URLSearchParams(payload).toString()
      const res = await fetch(`${baseUrl}/storefront/select2/city?${params}`, {
         next: {
            revalidate: false
         }
      });

      if (res.status === 200) {
         const json = await res.json();
         return json || []
      }

      return []

   } catch (err) {
      return []
   }
}

export const getShippingCost = async ({ productID, payload }: { productID: string, payload: any }) => {

   try {
      const baseUrl = getBaseApiURL()
      const params = new URLSearchParams(payload).toString()
      const res = await fetch(`${baseUrl}/storefront/product/${productID}/ongkir?${params}`, {
         next: {
            revalidate: false
         }
      });

      if (res.status === 200) {
         const json = await res.json();
         return json?.payload || null
      }

      return []
   } catch (err) {
      return null
   }
}

export const getAlgeriaStates = async ({ payload }: { payload: { store_id: string } }) => {

   try {
      const baseUrl = getBaseApiURL()
      const params = new URLSearchParams(payload).toString()
      const res = await fetch(`${baseUrl}/storefront/select2/state/algeria?${params}`, {
         next: {
            revalidate: false
         }
      });

      if (res.status === 200) {
         const json = await res.json();
         return json || []
      }

      return []

   } catch (err) {
      return []
   }
}

export const getAlgeriaCities = async ({ payload }: { payload: { store_id: string, state: string } }) => {

   try {
      const baseUrl = getBaseApiURL()
      const params = new URLSearchParams(payload).toString()
      const res = await fetch(`${baseUrl}/storefront/select2/city/algeria?${params}`, {
         next: {
            revalidate: false
         }
      });

      if (res.status === 200) {
         const json = await res.json();

         if (json) {
            return json.map((city: any) => ({ ...city, city_name: city?.commune_name_ascii, city_state: city?.wilaya_name_ascii }))
         }
         return []
      }

      return []

   } catch (err) {
      return []
   }
}