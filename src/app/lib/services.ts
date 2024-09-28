import { notFound } from "next/navigation";
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
      const res = await fetch(`${baseUrl}/storefront/product/${slug}`, { next: { revalidate: 0 } });
      
      if(res.status === 200) {
         const json = await res.json();
         return json?.payload || null
      }

      notFound()

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