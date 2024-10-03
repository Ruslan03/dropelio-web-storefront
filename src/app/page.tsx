import React, { Suspense } from 'react'
import BaseContainer from './components/container'
import BaseFooter from './components/footer'
import { getStore } from './lib/services'
import ProductList from './components/product-list'

const Page = async () => {

   const store = await getStore()

   return (
      <BaseContainer>
         <h1 className="font-bold text-3xl md:text-4xl text-black mb-8 max-xl:text-center">{store?.name}</h1>
         
         <Suspense>
            <ProductList />
         </Suspense>

         <BaseFooter />
      </BaseContainer>
   )
}

export default Page