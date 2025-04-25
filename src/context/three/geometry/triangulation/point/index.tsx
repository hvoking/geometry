export const pointTriangulation = (xx: number[][], yy: number[][], zz: number[][]): number[][][] => {
  const points: number[][][] = [];

  for (let i = 0; i < xx.length; i++) {
    const point: number[][] = [];
    for (let j = 0; j < yy[0].length; j++) {
      point.push([xx[i][j], yy[i][j], zz[i][j]]);
    }
    points.push(point);
  }
  return points;
}