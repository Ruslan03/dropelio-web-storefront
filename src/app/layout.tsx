import { Cairo } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';

import "./globals.css";
import { getStore } from "./lib/services";
import { Viewport } from 'next';


const cairo = Cairo({
   weight: ['400', '700'],
   style: ['normal'],
   subsets: ['latin'],
   display: 'swap',
})

export const viewport: Viewport = {
   width: 'device-width',
   initialScale: 1,
   maximumScale: 1,
   userScalable: true,
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
      <html lang={locale} dir={dir}>
         <body className={locale === 'ar' ? cairo.className : ''}>
            <NextIntlClientProvider messages={messages}>
               {children}
            </NextIntlClientProvider>
         </body>
      </html>
   );
}
