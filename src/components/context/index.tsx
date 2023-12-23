// Context imports
import { ColorProvider } from './colors';
import { FiltersProvider } from './filters';
import { ThreeProvider } from './three';
import { GeometryProvider } from './geometry';

export const MainProvider = ({children}: any) => {
	return (
		<FiltersProvider>
		<ColorProvider>
		<ThreeProvider>
		<GeometryProvider>
			{children}
		</GeometryProvider>
		</ThreeProvider>
		</ColorProvider>
		</FiltersProvider>
	)
}

MainProvider.displayName="MainProvider";