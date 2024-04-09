// Context imports
import { CanvasProvider } from './canvas';
import { MaterialsProvider } from './materials';
import { ThreeGeometryProvider } from './geometry';

export const ThreeProvider = ({ children }: any) => {
	return (
		<CanvasProvider>
		<MaterialsProvider>
		<ThreeGeometryProvider>
			{ children }
		</ThreeGeometryProvider>
		</MaterialsProvider>
		</CanvasProvider>
	)
}

ThreeProvider.displayName="ThreeProvider";