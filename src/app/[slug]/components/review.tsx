'use client'

import React from 'react'
import Image from 'next/image'
import Slider from "react-slick";

import { defaultConfig } from '@/app/lib/client/slider-config';
import { storage } from '@/app/lib/base-path';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


type Review = {
   user_image: string
   product_image: string
   user_name: string
   rating: number
   review: string
}

interface IReview {
   reviews: Review[]
}

const Review = ({ reviews }: IReview) => {
   return (
      <div className='my-4'>
         <Slider {...defaultConfig} slidesToShow={2} autoplay className='-mr-2 md:-mr-4'>
            {(reviews || []).map((review, i) => (
               <div key={i} className='text-center'>
                  <div className='flex flex-col gap-1 items-center mr-2 md:mr-4 py-5 px-3 md:px-4 bg-gradient-to-tr from-gray-100 to-gray-50 rounded-md'>
                     <div className='h-16 w-16 rounded-full relative'>
                        <Image
                           src={storage(review.user_image)}
                           alt='user-img'
                           fill
                           className='rounded-full'
                           sizes='64px'
                        />
                     </div>
                     <div>
                        <p className='font-semibold'>{review.user_name}</p>
                        <div className='text-yellow-400 text-xl'>
                           {Array.from(new Array(review.rating)).map((_, star) => <span key={star}>&#9733;</span>)}
                        </div>
                     </div>
                     <div className='w-full h-20 flex items-center justify-center'>
                        <p className='text-sm italic line-clamp-4 text-wrap' title={review.review}>{review.review}</p>
                        {/* <Image
                     src={storage(${review.product_image}`)}
                     alt='review-img'
                     width={15}
                     height={15}
                     style={{
                        width: '150px',
                        height: 'auto',
                     }}
                     sizes='150px'
                  /> */}
                     </div>
                  </div>
               </div>
            ))}
         </Slider>
      </div>
   )
}

export default Review