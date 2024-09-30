import type { Metadata } from "next";

import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';

import "./globals.css";
import { getStore } from "./lib/services";

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
               {children}
            </NextIntlClientProvider>
         </body>
      </html>
   );
}
