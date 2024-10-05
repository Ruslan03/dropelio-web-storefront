import { headers } from "next/headers";

export const baseUrl = (path?: string) => {
   let host = 'https://test.dropelio.xyz'
   // if (process.env.NODE_ENV === 'development') {
   //    host = 'https://test.dropelio.xyz'
   // } else {
   //    host = headers().get('host') as string
   // }

   if (!path) {
      return host
   }

   return `${host}/${path}`
};

export const storage = (path:string) => {
   return `https://dropelio.xyz/storage/${path}`
}