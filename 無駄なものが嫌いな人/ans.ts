// RE

const range = (
  ...args: [end: number] | [start: number, end: number, step?: number]
): number[] => {
  const arr: number[] = [];

  // @ts-expect-error
  const [start = 0, end, step = start < end ? 1 : -1]: [
    number,
    number,
    number
  ] = args.length === 1 ? [void 0, ...args] : args;

  let i = start;
  while (step > 0 ? i < end : i > end) {
    arr.push(i);
    i += step;
  }

  return arr;
};

const main = (lines: string[]): void => {
  const [N, X] = lines[0].split(" ").map(Number);

  const A: number[] = [];
  const B: number[] = [];
  lines.slice(1).forEach((str, i) => {
    const w = Number(str);

    if (i % 2 === 0) {
      A.push(w);
    } else {
      B.push(w);
    }
  });

  const hasBit = (n: number, i: number) => (n & (1 << i)) > 0;

  const map: Record<number, number> = {};
  range(1 << B.length).forEach((n) => {
    let s = 0;
    range(N).forEach((i) => {
      if (hasBit(n, i)) {
        s += B[i];
      }
    });

    if (map[s] == null) {
      map[s] = 0;
    }

    map[s] += 1;
  });

  let ans = 0;
  range(1 << A.length).forEach((n) => {
    let s = 0;
    range(N).forEach((i) => {
      if (hasBit(n, i)) {
        s += A[i];
      }
    });

    ans += map[X - s] ?? 0;
  });

  console.log(ans);
};

const input = `16 8
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1
1`;
export const mainReturn = main(input.split("\n"));
// main(require("fs").readFileSync("/dev/stdin", "utf8").split("\n"));
