import React from 'react'
import BaseContainer from '../components/container'
import { getPageData, getStore } from '../lib/services'
import { notFound } from 'next/navigation'
import BaseFooter from '../components/footer'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata() {

   const store = await getStore()
   const t = await getTranslations('General')

   if (!store) {
      notFound()
   }

   return {
      title: `${store.name} | ${t('PrivacyPolicy')}`,
      description: `${t('PrivacyPolicy')} ${store.name}`,
   }
}

const Page = async () => {
   const content = await getPageData({ type: 'privacy' })
   const t = await getTranslations('General')

   return (
      <BaseContainer>
         <h1 className="font-bold text-2xl md:text-3xl text-black mb-8 max-xl:text-center">{t('PrivacyPolicy')}</h1>

         <div className='min-h-96' dangerouslySetInnerHTML={{ __html: content }}></div>

         <BaseFooter />
      </BaseContainer>
   )
}

export default Page