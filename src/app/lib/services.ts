import { baseUrl } from "./base-path";

export const getBaseApiURL = () => {
   const host = baseUrl()
   if(process.env.NODE_ENV === 'development') {
      return 'https://test.dropelio.xyz/api/v1' 
   }

   return `${host}/api/v1`
};



export const getProduct = async ({ slug }: { slug: string }) => {
   
   try {
      const baseUrl = getBaseApiURL()
      const res = await fetch(`${baseUrl}/storefront/product/${slug}?time=${Date.now()}`, { next: { revalidate: 0 } });
      const json = await res.json();

      return json?.payload || null
   } catch (err) {
      
      return []
   }
}