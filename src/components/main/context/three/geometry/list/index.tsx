// Third-party import
import { BufferGeometry, BufferAttribute } from "three";

export const createGrid = (vectors: any) => {
    const grid: any = []
    vectors.forEach((array: any) => {
        const buffer = new BufferGeometry();
        const position = new BufferAttribute(array, 3);
        buffer.setAttribute('position', position);
        grid.push(buffer)
    });
    return grid
}