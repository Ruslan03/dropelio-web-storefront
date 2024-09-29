'use client';

import React, { useEffect, useState } from 'react'

const FloatingButtonCheckout = () => {
   const [isVisible, setIsVisible] = useState(true);

   useEffect(() => {
      const toggleVisibility = () => {

         const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
         const body = document.body;
         const html = document.documentElement;
         const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
         const windowBottom = windowHeight + window.scrollY + 120;

         if (windowBottom >= docHeight) {
            setIsVisible(false);
         }else {
            setIsVisible(true);
         }
      };

      window.addEventListener("scroll", toggleVisibility);

      return () => window.removeEventListener("scroll", toggleVisibility);
   }, [isVisible]);

   return (
      <div className={`fixed ${isVisible ? 'translate-y-0' : 'translate-y-full'} transition-all ease-in-out duration-500 py-4 left-0 bottom-0 w-full flex items-center justify-center z-50`}>
         <button className='bg-gradient-to-t from-amber-500  to-amber-400 shadow-sm  w-[calc(100%-24px)] md:w-96 text-base font-bold p-3 rounded-md '>Buy it now (COD)</button>
      </div>
   )
}

export default FloatingButtonCheckout