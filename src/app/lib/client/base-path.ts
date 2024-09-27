export const baseUrl = (path?: string) => {
   let host = 'https://test.dropelio.xyz'
   // if (process.env.NODE_ENV === 'development') {
   //    host = 'https://test.dropelio.xyz'
   // } else {
   //    host = window.location.origin
   // }

   if (!path) {
      return host
   }

   return `${host}/${path}`
};