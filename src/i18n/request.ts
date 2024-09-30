import { getStore } from '@/app/lib/services';
import {getRequestConfig} from 'next-intl/server';
 
export default getRequestConfig(async () => {
  const store = await getStore()
  
  const locale = store?.language_code;

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default
  };
});