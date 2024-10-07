export const storage = (path: string) => {
   return `https://dropelio.xyz/storage/${path}`
}

export const BASE_API_URL = 'https://api.dropelio.xyz/api/v1';


export async function getBaseHeaders() {
   let store_domain = ''
   
   if (typeof window === 'undefined') {
      const nextHeaders = await import('next/headers')
      const host = nextHeaders.headers().get('host') as string
      store_domain = host.replace('www.', '')
   } else {
      store_domain = window.location.host.replace('www.', '')
   }

   if (process.env.NODE_ENV === 'development') {
      store_domain = 'test.dropelio.xyz'
   }

   return {
      'x-store-domain': store_domain
   }
};