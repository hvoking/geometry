// React imports
import { useEffect, useContext, createContext } from 'react';

// App imports
import { getPoints } from './points';
import { createVectors } from './vectors';
import { createListOfPoints } from './list';

// Context imports
import { useFilters } from '../filters';
import { useThreeGeometry } from '../three/geometry';

const GeometryContext: React.Context<any> = createContext(null)

export const useGeometry = () => {
    return (
        useContext(GeometryContext)
    )
}

export const GeometryProvider = ({children}: any) => {
    const { type, equation, quantity } = useFilters();
    const { createGeometry } = useThreeGeometry();

    useEffect(() => {
        const points = getPoints(type, equation, quantity);
        const vectors = createVectors(points);
        const listOfPoints = createListOfPoints(vectors);
        createGeometry(listOfPoints);
    }, [ type, equation, quantity ]);

    return (
        <GeometryContext.Provider value= {{ }}>
            {children}
        </GeometryContext.Provider>
    )
}

GeometryContext.displayName = "GeometryContext";