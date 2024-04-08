// React imports
import { useState, useEffect, useContext, createContext } from 'react';

// App imports
import { getPoints } from './points';
import { createVectors } from './vectors';
import { createListOfPoints } from './list';

// Context imports
import { useThreeGeometry } from '../three/geometry';
import { useFilters } from '../filters';

const GeometryContext: React.Context<any> = createContext(null)

export const useGeometry = () => {
    return (
        useContext(GeometryContext)
    )
}

export const GeometryProvider = ({children}: any) => {
    const { createGeometry } = useThreeGeometry();
    const { type, equation, quantity } = useFilters();

    useEffect(() => {
        const points = getPoints(type, equation, quantity);
        const vectors = createVectors(points);
        const listOfPoints = createListOfPoints(vectors);
        createGeometry(listOfPoints);
    }, [ type, equation, quantity ]);

    return (
        <GeometryContext.Provider value= {{}}>
            {children}
        </GeometryContext.Provider>
    )
}

GeometryContext.displayName = "GeometryContext";