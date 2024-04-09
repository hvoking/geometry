export const sphereTriangulation = (points: number[][][]): number[][][] => {
  const positions: number[][][] = [];
  const q: number = points.length;

  for (let i = 0; i < q - 1; i++) {
    const point: number[][] = [];
    for (let j = 0; j < q - 1; j++) {
      point.push(points[i][j]);
      point.push(points[i + 1][j]);
      point.push(points[i][j + 1]);
      point.push(points[i + 1][j + 1]);
      point.push(points[i + 1][j]);
      point.push(points[i][j + 1]);
    }
    positions.push(point);
  }
  return positions;
}