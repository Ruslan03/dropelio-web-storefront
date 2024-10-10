import { BASE_API_URL, getBaseHeaders } from "@/app/lib/base-path";

export const getShippingCities = async ({ payload }: { payload: any }) => {

   try {
      const baseHeaders = await getBaseHeaders()
      const params = new URLSearchParams(payload).toString()
      const res = await fetch(`${BASE_API_URL}/storefront/select2/city?${params}`, {
         next: {
            revalidate: false
         },
         headers: baseHeaders
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
      const baseHeaders = await getBaseHeaders()
      const params = new URLSearchParams(payload).toString()
      const res = await fetch(`${BASE_API_URL}/storefront/product/${productID}/ongkir?${params}`, {
         next: {
            revalidate: false
         },
         headers: baseHeaders
      });

      if (res.status === 200) {
         const json = await res.json();
         return json?.payload || null
      }

      throw 'Internal server error'
   } catch (err) {
      throw err
   }
}

export const getAlgeriaStates = async ({ payload }: { payload: { store_id: string } }) => {

   try {
      const baseHeaders = await getBaseHeaders()
      const params = new URLSearchParams(payload).toString()
      const res = await fetch(`${BASE_API_URL}/storefront/select2/state/algeria?${params}`, {
         next: {
            revalidate: false
         },
         headers: baseHeaders
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
      const baseHeaders = await getBaseHeaders()
      const params = new URLSearchParams(payload).toString()
      const res = await fetch(`${BASE_API_URL}/storefront/select2/city/algeria?${params}`, {
         next: {
            revalidate: false
         },
         headers: baseHeaders
      });

      if (res.status === 200) {
         const json = await res.json();

         if (json) {
            return json.map((city: any) => ({
               ...city,
               city_name: city?.commune_name_ascii,
               city_state: city?.wilaya_name_asci
            }))
         }
         return []
      }

      return []

   } catch (err) {
      return []
   }
}