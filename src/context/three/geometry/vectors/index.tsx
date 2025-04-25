export const createVectors = (positions: any) => {
    const listVectors32: Float32Array[] = [];
    positions.forEach((vector: any) => {
        const vectors32: any = [];
        vector.forEach((array: any) => {
            array && vectors32.push(array[0], array[2], array[1]);
        });
        listVectors32.push(Float32Array.from(vectors32));
    });
    return listVectors32
}