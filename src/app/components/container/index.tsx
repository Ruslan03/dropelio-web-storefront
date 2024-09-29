import React, { ReactNode } from 'react'

interface BaseContainer {
   children: ReactNode
}
const BaseContainer: React.FC<BaseContainer> = ({ children }) => {
   return (
      <div className='mt-8 w-full md:w-[576px] mx-auto p-3 md:p-0 overflow-x-hidden'>
         {children}
      </div>
   )
}

export default BaseContainer