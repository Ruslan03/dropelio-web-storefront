'use client';

import React, { useEffect, useState } from 'react'
import parse from "html-react-parser";
import Image from 'next/image';

async function getDescription() {
   const description = await fetch(`https://test.dropelio.xyz/api/v1/storefront/product/32/description`).then((res) => res.text());
   return description
}


const Description = () => {
   const [description, setDescription] = useState<any>([])

   useEffect(() => {
      getDescription().then((res) => {

         function transformNode(node: any) {

            if (node.type === "tag" && node.name === "p" && node.children?.[0].name === "img") {
               const image = node.children?.[0]
               return (
                  <div className='min-h-screen w-full h-auto bg-gray-100'>
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
      });
   }, [])

   return (
      <div className='min-h-screen'>
         {description.map((element: any, i: number) => {
            return <div key={i}>{element}</div>;
         })}
      </div>
   )
}

export default Description