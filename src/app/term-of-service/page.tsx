import React from 'react'
import BaseContainer from '../components/container'
import { getPageData, getStore } from '../lib/services'
import { notFound } from 'next/navigation'
import BaseFooter from '../components/footer'
import { getTranslations } from 'next-intl/server'
import BackToMainPage from '../components/back-to-main'

export async function generateMetadata() {

   const store = await getStore()
   const t = await getTranslations('General')

   if (!store) {
      notFound()
   }

   return {
      title: `${store.name} | ${t('TermOfService')}`,
      description: `${t('TermOfService')} ${store.name}`,
   }
}

const Page = async () => {
   const content = await getPageData({ type: 'term' })
   const t = await getTranslations('General')

   return (
      <BaseContainer>
         <h1 className="font-bold text-2xl md:text-3xl text-black mb-8 max-xl:text-center">{t('TermOfService')}</h1>

         <div className='min-h-96' dangerouslySetInnerHTML={{ __html: content }}></div>

         <BackToMainPage />

         <BaseFooter />
      </BaseContainer>
   )
}

export default Page