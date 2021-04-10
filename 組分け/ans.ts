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
  const N = Number(lines[0]);

  const A: number[][] = [];
  range(N - 1).forEach((i) => {
    A.push([
      ...range(i + 1).map(() => 0),
      ...lines.slice(1)[i].split(" ").map(Number),
    ]);
  });

  const ALL = 1 << N;

  const happy: number[] = range(ALL).map(() => 0);

  const hasBit = (n: number, i: number) => (n & (1 << i)) > 0;

  range(ALL).forEach((n) => {
    range(N).forEach((i) => {
      range(i + 1, N).forEach((j) => {
        if (hasBit(n, i) && hasBit(n, j)) {
          happy[n] += A[i][j];
        }
      });
    });
  });

  let ans = -(10 ** 100);

  range(ALL).forEach((n1) => {
    range(ALL).forEach((n2) => {
      if ((n1 & n2) > 0) {
        return;
      }

      const n3 = ALL - 1 - (n1 | n2);

      ans = Math.max(ans, happy[n1] + happy[n2] + happy[n3]);
    });
  });

  console.log(ans);
};

// const input = `3
// 1 1
// 1`;
// export const mainReturn = main(input.split("\n"));
main(require("fs").readFileSync("/dev/stdin", "utf8").split("\n"));
