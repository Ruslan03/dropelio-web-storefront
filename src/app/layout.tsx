import { Cairo } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';

import "./globals.css";
import { getStore } from "./lib/services";
import { Viewport } from 'next';
import { notFound } from 'next/navigation';
import { Toaster } from '@/components/ui/toaster';
import Script from 'next/script';


const cairo = Cairo({
   weight: ['400', '700'],
   style: ['normal'],
   subsets: ['latin'],
   display: 'swap',
})

export async function generateMetadata() {

   const store = await getStore()

   if (!store) {
      notFound()
   }


   return {
      title: store.name,
      description: `Dropelio | ${store.name}`,
   }
}

export const viewport: Viewport = {
   width: 'device-width',
   initialScale: 1,
   maximumScale: 2,
}

export default async function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {

   const store = await getStore()

   const dir = store?.direction || 'ltr'

   const locale = await getLocale();
   const messages = await getMessages();

   return (
      <html lang={locale} dir={dir} className='scroll-smooth'>

         {process.env.NODE_ENV === 'development' && (
            <Script src='/inspectlet.js' />
         )}
         
         <body className={locale === 'ar' ? cairo.className : ''}>
            <NextIntlClientProvider messages={messages}>
               {children}
               <Toaster />
            </NextIntlClientProvider>
         </body>
      </html>
   );
}
