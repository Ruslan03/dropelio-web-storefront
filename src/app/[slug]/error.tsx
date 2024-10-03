'use client' // Error boundaries must be Client Components

import { Metadata } from 'next'
import Head from 'next/head'
import { useEffect } from 'react'


export const metadata: Metadata = {
   title: 'Something went wrong',
}

export default function Error({
   error,
   reset,
}: {
   error: Error & { digest?: string }
   reset: () => void
}) {
   useEffect(() => {
      // Log the error to an error reporting service
      console.log('error', error.message)
   }, [error])

   return (
      <div>
         <Head>
            <title>Something went wrong</title>
         </Head>
         <h1>Something went wrong!</h1>
         <h2>{error.message}</h2>
         <button
            onClick={
               // Attempt to recover by trying to re-render the segment
               () => reset()
            }
         >
            Try again
         </button>
      </div>
   )
}