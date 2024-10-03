import type { MetadataRoute } from 'next'
import { baseUrl } from './lib/base-path'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/',
    },
    sitemap: `${baseUrl()}/sitemap.xml`,
  }
}