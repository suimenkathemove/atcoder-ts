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
  const [N, M] = lines[0].split(" ").map(Number);
  const A = lines.slice(1).map((str) => str.split(""));

  const group: [number, number][][] = range(11).map(() => []);
  range(N).forEach((i) => {
    range(M).forEach((j) => {
      const c = A[i][j];

      switch (c) {
        case "S":
          group[0].push([i, j]);
          break;
        case "G":
          group[10].push([i, j]);
          break;
        default:
          group[Number(c)].push([i, j]);
      }
    });
  });

  const INF = 10 ** 100;
  const cost: number[][] = range(N).map(() => range(M).map(() => INF));

  const [si, sj] = group[0][0];
  cost[si][sj] = 0;

  range(1, 11).forEach((n) => {
    group[n].forEach(([i, j]) => {
      group[n - 1].forEach(([i2, j2]) => {
        cost[i][j] = Math.min(
          cost[i][j],
          cost[i2][j2] + Math.abs(i - i2) + Math.abs(j - j2)
        );
      });
    });
  });

  const [gi, gj] = group[10][0];
  const ans = cost[gi][gj] !== INF ? cost[gi][gj] : -1;

  console.log(ans);
};

// const input = `3 4
// 1S23
// 4567
// 89G1`;
// export const mainReturn = main(input.split("\n"));
main(require("fs").readFileSync("/dev/stdin", "utf8").split("\n"));
