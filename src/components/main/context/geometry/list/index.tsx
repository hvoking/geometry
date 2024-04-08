// Third-party import
import { BufferGeometry, BufferAttribute } from "three";

export const createListOfPoints = (vectors: any) => {
    const listOfPoints: any = []
    vectors.forEach((array: any) => {
        const gridPoints = new BufferGeometry();
        gridPoints.setAttribute('position', new BufferAttribute(array, 3));
        listOfPoints.push(gridPoints)
    });
    return listOfPoints
}