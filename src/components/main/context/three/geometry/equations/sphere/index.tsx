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