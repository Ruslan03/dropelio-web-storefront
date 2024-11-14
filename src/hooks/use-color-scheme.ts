
type ColorVariant = {
   '100': string,
   '400': string,
   '500': string,
   '600': string,
}

type ColorScheme = {
   primary: ColorVariant
}

const DEFAULT: ColorScheme = {
   primary: {
      '100': '#DBEAFE',
      '400': '#60A5FA',
      '500': '#0EA5E9',
      '600': '#2563EB',
   },
}

const RELEASIT: ColorScheme = {
   primary: {
      '100': '#FDDDDD',
      '400': '#FF6265',
      '500': '#B11012',
      '600': '#E51111',
   },
}

const useColorScheme = (theme: string): ColorScheme => {

   if(theme == 'releasit') {
      return RELEASIT
   }

   return DEFAULT
}

export default useColorScheme