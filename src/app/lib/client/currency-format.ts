export const currencyFormat = (n: number, curr?: string) => {
   const formatedNumber = new Intl.NumberFormat().format(n)

   if(curr) {
      return `${curr} ${formatedNumber}`
   }

   return formatedNumber
}