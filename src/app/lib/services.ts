import { BASE_API_URL, getBaseHeaders } from "./base-path";

export const getProduct = async ({ slug }: { slug: string }) => {

   try {
      const baseHeaders = await getBaseHeaders()
      const res = await fetch(`${BASE_API_URL}/storefront/product/${slug}`, {
         next: { revalidate: 0 },
         headers: baseHeaders
      });

      if (res.status === 200) {
         const json = await res.json();
         return json?.payload || null
      }

      return null

   } catch (err) {
      throw err
   }
}

export const getDescription = async ({ productID }: { productID: string }) => {

   try {
      const baseHeaders = await getBaseHeaders()
      const res = await fetch(`${BASE_API_URL}/storefront/product/${productID}/description`, {
         next: { revalidate: 0 },
         headers: baseHeaders
      });
      const content = await res.text();

      return content
   } catch (err) {

      return ''
   }
}

export const postCheckout = async (params: { payload: any, productID: string }) => {

   try {
      const baseHeaders = await getBaseHeaders()
      const post = await fetch(`${BASE_API_URL}/storefront/product/${params.productID}/checkout`, {
         next: { revalidate: 0 },
         method: 'POST',
         headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            ...baseHeaders
         },
         body: JSON.stringify(params.payload)
      });
      const response = await post.json();

      if (post.status === 200) {
         return response
      }

      throw response
   } catch (err) {
      throw err
   }
}

export const getStore = async () => {

   try {
      const baseHeaders = await getBaseHeaders()
      const res = await fetch(`${BASE_API_URL}/storefront/my-store`, {
         next: { revalidate: 0 },
         headers: baseHeaders
      });

      if (res.status === 200) {
         const json = await res.json();
         const payload = json?.payload

         const store = {
            language_code: payload?.language_code || null,
            direction: payload?.direction || null,
            name: payload?.name || null,
            api_base_url: payload?.api_base_url || null,
            theme: payload?.theme || 'default'
         }

         return store
      }

      return null
   } catch (err) {

      return null
   }
}

export const getProducts = async ({ params }: { params: { page: string } }) => {

   try {
      const baseHeaders = await getBaseHeaders()
      const createParams = new URLSearchParams(params).toString()
      const res = await fetch(`${BASE_API_URL}/storefront/product?${createParams}`, {
         next: { revalidate: 0 },
         headers: baseHeaders
      });

      if (res.status === 200) {
         const json = await res.json();
         return json?.payload || []
      }

      return []

   } catch (err) {
      return []
   }
}

export const getPageData = async ({ type }: { type: 'term' | 'privacy' | 'return' }) => {

   try {
      const baseHeaders = await getBaseHeaders()
      const res = await fetch(`${BASE_API_URL}/storefront/page/${type}`, {
         next: { revalidate: 60 },
         headers: baseHeaders
      });

      if (res.status === 200) {
         const json = await res.json();

         return json?.payload?.content || ''
      }

      return ''

   } catch (err) {
      return ''
   }
}