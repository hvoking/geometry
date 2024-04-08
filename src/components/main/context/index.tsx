// Context imports
import { ThreeProvider } from './three';
import { GeometryProvider } from './geometry';
import { FiltersProvider } from './filters';
import { SizesProvider } from './sizes';

export const MainProvider = ({children}: any) => {
	return (
		<FiltersProvider>
		<SizesProvider>
		<ThreeProvider>
		<GeometryProvider>
			{children}
		</GeometryProvider>
		</ThreeProvider>
		</SizesProvider>
		</FiltersProvider>
	)
}

MainProvider.displayName="MainProvider";