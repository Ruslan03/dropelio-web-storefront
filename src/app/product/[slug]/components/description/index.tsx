'use client';

import React, { useEffect, useState } from 'react'
import parse from "html-react-parser";
import Image from 'next/image';
import { getDescription } from '@/app/lib/services';

import styles from './Description.module.css'
import { Skeleton } from '@/components/ui/skeleton';

const REPLACE_CLASS: any = {
   'ql-align-center': 'text-center',
   'ql-font-serif': 'font-serif',
   'ql-font-monospace': 'font-mono',
   'ql-indent-1': 'indent-1',

}

const Description = ({ productID }: { productID: string }) => {
   const [description, setDescription] = useState<any>([])
   const [isLoading, setIsLoading] = useState(true)

   useEffect(() => {
      if (productID) {
         getDescription({ productID }).then((res) => {
            function transformNode(node: any) {

               const className = node?.attribs?.class as string
               if (Object.keys(REPLACE_CLASS).indexOf(className) > -1) {
                  const newNode = Object.assign({}, node)
                  newNode!.attribs!.class = REPLACE_CLASS[className]
                  return newNode
               }

               if (node.type === "tag" && node.name === "p" && node.children?.[0].name === "img") {
                  const image = node.children?.[0]
                  return (
                     <div className='w-full'>
                        <Image
                           src={image.attribs.src}
                           alt='image-product'
                           priority
                           quality={25}
                           width={25}
                           height={25}
                           sizes="100vw"
                           style={{
                              width: '100%',
                              height: 'auto',
                           }}
                        />
                     </div>
                  )
               }

            }

            const options = {
               decodeEntities: true,
               replace: transformNode,
            };

            const parseDescription = parse(res, options);
            setDescription(parseDescription);
         }).finally(() => setIsLoading(false))
      }
   }, [productID])

   return (
      <div className={styles.description}>

         {isLoading && (
            <div className='flex flex-col gap-8'>
               {Array.from(new Array(3)).map((_, i) => <LoadingSkeleton key={i} />)}
            </div>
         )}

         {!isLoading && description.map((element: any, i: number) => {
            return <div key={i}>{element}</div>;
         })}
      </div>
   )
}

const LoadingSkeleton = () => {
   return (
      <div className="flex flex-col space-y-3">
         <Skeleton className="h-[125px] w-full rounded-xl" />
         <div className="space-y-2">
            <Skeleton className="h-4 w-[90%]" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-[90%]" />
         </div>
      </div>
   )
}


export default Description