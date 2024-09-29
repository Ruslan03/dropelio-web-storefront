import React from 'react'

const Features = ({ features }: { features: string[] }) => {
   return (
      <ul className='flex flex-col gap-1'>
         {(features || []).map((feature, i) => <li key={i}>&#10004; {feature}</li>)}
      </ul>
   )
}

export default Features