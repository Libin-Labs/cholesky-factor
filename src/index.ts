function finite(value: number, min = -Number.MAX_VALUE, max = Number.MAX_VALUE): number {
  if (typeof value !== 'number' || !Number.isFinite(value))
    throw new TypeError('Expected finite number');
  if (value < min || value > max) throw new RangeError('Number outside supported bounds');
  return value;
}
function matrix(a: readonly (readonly number[])[], square = true): number[][] {
  if (
    !Array.isArray(a) ||
    !a.length ||
    a.length > 64 ||
    !Array.isArray(a[0]) ||
    !a[0].length ||
    a[0].length > 64
  )
    throw new RangeError('Matrix size1..64');
  const n = a[0].length;
  if (square && a.length !== n) throw new RangeError('Square matrix required');
  for (const row of a) {
    if (!Array.isArray(row) || row.length !== n)
      throw new RangeError('Rectangular dense matrix required');
    for (const v of row) finite(v);
  }
  return a.map((row) => [...row]);
}
function tolerance(t: number): number {
  return finite(t, Number.MIN_VALUE, 1);
}
export function cholesky(input: readonly (readonly number[])[], epsilon = 1e-12): number[][] {
  const a = matrix(input),
    n = a.length;
  tolerance(epsilon);
  for (let i = 0; i < n; i++)
    for (let j = 0; j < i; j++)
      if (Math.abs(a[i]![j]! - a[j]![i]!) > epsilon) throw new RangeError('Symmetry required');
  const l = Array.from({ length: n }, () => Array<number>(n).fill(0));
  for (let i = 0; i < n; i++)
    for (let j = 0; j <= i; j++) {
      let v = a[i]![j]!;
      for (let k = 0; k < j; k++) v = finite(v - l[i]![k]! * l[j]![k]!);
      if (i === j) {
        if (v <= epsilon) throw new RangeError('Positive definite matrix required');
        l[i]![j] = Math.sqrt(v);
      } else l[i]![j] = finite(v / l[j]![j]!);
    }
  return l;
}
