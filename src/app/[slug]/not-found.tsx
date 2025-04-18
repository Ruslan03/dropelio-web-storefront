import Link from 'next/link'

export default function NotFound() {
   return (
      <div className="bg-gray-100">
         <div className="h-screen flex flex-col justify-center items-center">
            <h1 className="text-8xl font-bold text-gray-800">404</h1>
            <p className="text-4xl font-medium text-gray-800">Page Not Found</p>
            <Link href="/" className='my-8 text-blue-500'>Go back to Home</Link>
         </div>
      </div>
   )
}