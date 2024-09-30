import { Cairo, Inter } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';

import "./globals.css";
import { getStore } from "./lib/services";


const cairo = Cairo({
   weight: ['400', '700'],
   style: ['normal'],
   subsets: ['latin'],
   display: 'swap',
})

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
         <body>
            <NextIntlClientProvider messages={messages}>
               <main className={locale === 'ar' ? cairo.className: ''}>
                  {children}
               </main>
            </NextIntlClientProvider>
         </body>
      </html>
   );
}
