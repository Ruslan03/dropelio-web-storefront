export const trackPurchaseEvent = async (pixelID?: string, params?: any) => {
   
   if(!pixelID) return false

   return new Promise((resolve) => {
      import('react-facebook-pixel')
         .then((x) => x.default)
         .then((ReactPixel) => {
            ReactPixel.init(pixelID);
            ReactPixel.track('Purchase', params)

            resolve(params)
         })
   })
}

export const trackPageViewEvent = async (pixelID?: string) => {

   if(!pixelID) return false

   return new Promise((resolve) => {
      import('react-facebook-pixel')
         .then((x) => x.default)
         .then((ReactPixel) => {
            ReactPixel.init(pixelID);
            ReactPixel.track('PageView')

            resolve(1)
         })
   })
}