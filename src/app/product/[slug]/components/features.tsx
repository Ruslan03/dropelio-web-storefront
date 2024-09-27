import React from 'react'

const Features = ({features}: {features: string[]}) => {
  return (
    <div className='bg-gray-50 rounded-md p-3 px-4'>
      <ul className='flex flex-col gap-1'>
         {(features || []).map((feature, i) => <li key={i}>&#10004; {feature}</li>)}
      </ul>
    </div>
  )
}

export default Features