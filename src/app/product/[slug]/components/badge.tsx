import React from 'react'

const Badge: React.FC<{ children: React.ReactNode }> = ({ children }) => {
   return (
      <div className='px-2 text-sm rounded-md bg-yellow-400 text-white'>{children}</div>
   )
}

export default Badge