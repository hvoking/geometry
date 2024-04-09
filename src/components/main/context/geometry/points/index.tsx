// Triangulation imports
import { pointTriangulation } from '../triangulation/point';
import { sphereTriangulation } from '../triangulation/sphere';
import { meshTriangulation } from '../triangulation/mesh';

// Equation imports
import { sphereEquation } from '../equations/sphere';
import { gridEquations } from '../equations/grid';

export const getPoints = (geometry: any, equation: any, quantity: any) => {
    let points = [];
    if (equation === "Sphere") {
        points = sphereEquation(5, -2 * Math.PI, 2 * Math.PI, 0, Math.PI, quantity);
        if (geometry === "mesh" || geometry === "lines") {
            points = sphereTriangulation(points);
        }
    } else {
        const { xx, yy, zz } = gridEquations(equation, -10, 10, -10, 10, parseInt(quantity));
        if (geometry === "mesh" || geometry === "lines") {
            points = meshTriangulation(xx, yy, zz);
        } else {
            points = pointTriangulation(xx, yy, zz);
        }
    }
    return points;
}