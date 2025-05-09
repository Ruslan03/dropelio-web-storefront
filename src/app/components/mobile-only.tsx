import { useTranslations } from "next-intl";

export default function MobileOnly({storeName}: {storeName: string}) {

    const t = useTranslations('MobileOnly')
    
    return (
        <main className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full text-center">
        {/* SVG smartphone icon */}
        <div className="w-24 h-24 mx-auto mb-6">
          <svg
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
          >
            <rect x="16" y="8" width="32" height="48" rx="4" fill="#1f2937" />
            <rect x="22" y="14" width="20" height="34" rx="2" fill="#e5e7eb" />
            <circle cx="32" cy="50" r="2" fill="#6b7280" />
          </svg>
        </div>

        <h1 className="text-2xl font-semibold text-gray-800 mb-3">
          {t('Title')}
        </h1>
        <p className="text-gray-600 text-base mb-6">
          {t('Description')}
        </p>
        <p className="text-sm text-gray-400">
          &copy; {new Date().getFullYear()} {storeName}
        </p>
      </div>
    </main>
    );
}
