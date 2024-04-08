// Context imports
import { CanvasProvider } from './canvas';
import { MaterialsProvider } from './materials';
import { ThreeGeometryProvider } from './geometry';
import { CameraProvider } from './camera';

export const ThreeProvider = ({ children }: any) => {
	return (
		<CanvasProvider>
		<MaterialsProvider>
		<ThreeGeometryProvider>
		<CameraProvider>
			{ children }
		</CameraProvider>
		</ThreeGeometryProvider>
		</MaterialsProvider>
		</CanvasProvider>
	)
}

ThreeProvider.displayName="ThreeProvider";