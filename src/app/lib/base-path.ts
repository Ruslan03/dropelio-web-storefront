export const storage = (path: string) => {
   return `https://dropelio.xyz/storage/${path}`
}


export async function getBaseApiURL() {
   let host = 'https://test.dropelio.xyz'
   
   if (typeof window === 'undefined') {
      const nextHeaders = await import('next/headers')
      host = nextHeaders.headers().get('host') as string
   } else {
      host = window.location.origin
   }

   if (process.env.NODE_ENV === 'development') {
      host = 'https://test.dropelio.xyz'
   }

   return `${host}/api/v1`
};