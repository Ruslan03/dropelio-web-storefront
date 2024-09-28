import React from 'react'

const Badge: React.FC<{ children: React.ReactNode }> = ({ children }) => {
   return (
      <div className='px-2 text-sm font-semibold rounded-md bg-yellow-400'>{children}</div>
   )
}

export default Badge