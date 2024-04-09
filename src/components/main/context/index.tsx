// Context imports
import { ThreeProvider } from './three';
import { FiltersProvider } from './filters';
import { SizesProvider } from './sizes';

export const MainProvider = ({children}: any) => {
	return (
		<FiltersProvider>
		<SizesProvider>
		<ThreeProvider>
			{children}
		</ThreeProvider>
		</SizesProvider>
		</FiltersProvider>
	)
}

MainProvider.displayName="MainProvider";