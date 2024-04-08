// App imports
import { SliderSizesProvider } from './slider';

export const SizesProvider = ({children}: any) => {
  return (
    
    <SliderSizesProvider>
      {children}
    </SliderSizesProvider>
  )
}

SizesProvider.displayName="SizesProvider";