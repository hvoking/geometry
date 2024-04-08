export const gridEquations = (name: any, xmin: any, xmax: any, ymin: any, ymax: any, quantity: any) => {
    const x = linspace(xmin, xmax, quantity);
    const y = linspace(ymin, ymax, quantity);

    const xx: any = [];
    const yy: any = [];

    for (let i = 0; i < quantity; i++) {
        xx.push([]);
        yy.push([]);
        for (let j = 0; j < quantity; j++) {
            xx[i].push(x[j]);
            yy[i].push(y[i]);
        }
    }

    let zz;
    if (name === "Cube") {
        zz = xx.map((row: any, i: any) =>
            row.map((_: any, j: any) => Math.sin(Math.sqrt(xx[i][j] ** 2 + yy[i][j] ** 2)))
        );
    } else if (name === "Cylinder") {
        zz = xx.map((row: any, i: any) =>
            row.map((_: any, j: any) => Math.sin(Math.sqrt(Math.abs(xx[i][j] ** 2 - yy[i][j] ** 2))))
        );
    } else if (name === "Equation1") {
        zz = xx.map((row: any, i: any) =>
            row.map((_: any, j: any) => Math.cos(Math.sqrt(xx[i][j] ** 2 + yy[i][j] ** 2)))
        );
    }
    return { xx, yy, zz };
}

const linspace = (start: any, stop: any, num: any) => {
    const step = (stop - start) / (num - 1);
    return Array.from({ length: num }, (_, i) => start + step * i);
}


export const sphereEquation = (r: number, tstart: number, tend: number, vstart: number, vend: number, quantity: number): number[][][] => {
  const points: number[][][] = [];
  const t: number[] = [];
  const v: number[] = [];
  const divisions: number = parseInt(quantity.toString(), 10);

  for (let i = tstart; i <= tend; i += (tend - tstart) / divisions) {
    t.push(i);
  }

  for (let j = vstart; j <= vend; j += (vend - vstart) / divisions) {
    v.push(j);
  }

  for (const ti of t) {
    const point: number[][] = [];
    for (const vj of v) {
      const x: number = r * Math.sin(ti) * Math.cos(vj);
      const y: number = r * Math.sin(ti) * Math.sin(vj);
      const z: number = r * Math.cos(ti);
      point.push([x, y, z]);
    }
    points.push(point);
  }
  return points;
}