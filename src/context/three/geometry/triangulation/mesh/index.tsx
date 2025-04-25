export const meshTriangulation = (xx: number[][], yy: number[][], zz: number[][]): number[][][] => {
  const points: number[][][] = [];

  for (let i = 0; i < xx.length - 1; i++) {
    const point: number[][] = [];
    for (let j = 0; j < yy[0].length - 1; j++) {
      point.push([xx[i][j], yy[i][j], zz[i][j]]);
      point.push([xx[i + 1][j], yy[i + 1][j], zz[i + 1][j]]);
      point.push([xx[i][j + 1], yy[i][j + 1], zz[i][j + 1]]);
      point.push([xx[i + 1][j + 1], yy[i + 1][j + 1], zz[i + 1][j + 1]]);
      point.push([xx[i + 1][j], yy[i + 1][j], zz[i + 1][j]]);
      point.push([xx[i][j + 1], yy[i][j + 1], zz[i][j + 1]]);
    }
    points.push(point);
  }
  return points;
}