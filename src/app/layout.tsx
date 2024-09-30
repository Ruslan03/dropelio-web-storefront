import type { Metadata } from "next";

import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';

import "./globals.css";

export const metadata: Metadata = {
   title: "Dropelio",
};

export default async function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {

   const locale = await getLocale();

   // Providing all messages to the client
   // side is the easiest way to get started
   const messages = await getMessages();

   return (
      <html lang={locale}>
         <body>
            <NextIntlClientProvider messages={messages}>
               {children}
            </NextIntlClientProvider>
         </body>
      </html>
   );
}
