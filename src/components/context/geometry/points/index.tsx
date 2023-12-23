// App imports
import { sphereTriangulation, meshTriangulation, pointTriangulation } from '../triangulation';
import { sphereEquation, gridEquations } from '../equations';

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