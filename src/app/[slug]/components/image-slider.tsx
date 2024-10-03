'use client';

import React, { useState } from 'react'
import Slider from "react-slick";

import Image from 'next/image';
import { baseUrl } from '@/app/lib/client/base-path';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { defaultConfig } from '@/app/lib/client/slider-config';

type Image = {
   image_path: string
}

interface IImageSlider {
   images: Image[]
}

const ImageSlider: React.FC<IImageSlider> = ({ images }) => {

   return (
      <Slider {...defaultConfig}>
         {(images || []).map((img, i) => <SlideImage key={i} src={baseUrl(`storage/${img.image_path}`)} />)}
      </Slider>
   )
}

const SlideImage = ({ src }: { src: string }) => {
   const [isLoading, setIsLoading] = useState(true)
   return (
      <div className={`w-full aspect-square relative`}>
         {isLoading && (
            <div className='w-full h-full bg-gray-200 animate-pulse' />
         )}
         <Image
            src={src}
            alt='image-product'
            fill
            priority
            onLoad={() => setIsLoading(false)}
            style={{
               objectFit: 'cover',
            }}
         />
      </div>
   )
}

export default ImageSlider