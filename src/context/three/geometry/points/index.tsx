// Triangulation imports
import { pointTriangulation } from 'context/three/geometry/triangulation/point';
import { sphereTriangulation } from 'context/three/geometry/triangulation/sphere';
import { meshTriangulation } from 'context/three/geometry/triangulation/mesh';

// Equation imports
import { sphereEquation } from 'context/three/geometry/equations/sphere';
import { gridEquations } from 'context/three/geometry/equations/grid';

export const getPoints = (geometry: any, equation: any, quantity: any) => {
    let points = [];
    if (equation === "Sphere") {
        points = sphereEquation(5, -2 * Math.PI, 2 * Math.PI, 0, Math.PI, quantity);
        if (geometry === "mesh" || geometry === "lines") {
            points = sphereTriangulation(points);
        }
    } else {
        const { xx, yy, zz } = gridEquations(equation, -10, 10, -10, 10, quantity);
        if (geometry === "mesh" || geometry === "lines") {
            points = meshTriangulation(xx, yy, zz);
        } else {
            points = pointTriangulation(xx, yy, zz);
        }
    }
    return points;
}