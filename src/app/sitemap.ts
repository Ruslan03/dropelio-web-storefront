import type { MetadataRoute } from 'next'
import { baseUrl } from './lib/base-path'

export default function sitemap(): MetadataRoute.Sitemap {

   const URL = baseUrl()
   return [
      {
         url: URL,
         lastModified: new Date(),
         changeFrequency: 'yearly',
         priority: 1,
      },
   ]
}