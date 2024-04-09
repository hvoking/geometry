// App imports
import { SliderSizesProvider } from './slider';
import { CanvasSizesProvider } from './canvas';

export const SizesProvider = ({children}: any) => {
  return (
    <CanvasSizesProvider>
    <SliderSizesProvider>
      {children}
    </SliderSizesProvider>
    </CanvasSizesProvider>
  )
}

SizesProvider.displayName="SizesProvider";