import { baseUrl } from "./base-path";

export const getBaseApiURL = () => {
   const host = baseUrl()
   if (process.env.NODE_ENV === 'development') {
      return 'https://test.dropelio.xyz/api/v1'
   }

   return `${host}/api/v1`
};



export const getProduct = async ({ slug }: { slug: string }) => {

   try {
      const baseUrl = getBaseApiURL()
      const res = await fetch(`${baseUrl}/storefront/product/${slug}`, { next: { revalidate: 0 } });

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
      const baseUrl = getBaseApiURL()
      const res = await fetch(`${baseUrl}/storefront/product/${productID}/description`, { next: { revalidate: 0 } });
      const content = await res.text();

      return content
   } catch (err) {

      return ''
   }
}

export const postCheckout = async (params: {payload: any, productID: string}) => {

   try {
      const baseUrl = getBaseApiURL()
      const post = await fetch(`${baseUrl}/storefront/product/${params.productID}/checkout`, {
         next: { revalidate: 0 },
         method: 'POST',
         headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
         },
         body: JSON.stringify(params.payload)
      });
      const response = await post.json();

      if(post.status === 200) {
         return response
      }
      
      throw response
   } catch (err) {
      throw err
   }
}