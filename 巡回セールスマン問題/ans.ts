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
  const A = range(N).map((i) => lines.slice(1)[i].split(" ").map(Number));

  const ALL = 1 << N;

  const cost = range(ALL).map(() => range(N).map(() => 10 ** 100));

  cost[0][0] = 0;

  const hasBit = (n: number, i: number) => (n & (1 << i)) > 0;

  range(ALL).forEach((n) => {
    range(N).forEach((i) => {
      range(N).forEach((j) => {
        if (hasBit(n, j) || i == j) {
          return;
        }

        cost[n | (1 << j)][j] = Math.min(
          cost[n | (1 << j)][j],
          cost[n][i] + A[i][j]
        );
      });
    });
  });

  console.log(cost[ALL - 1][0]);
};

// const input = `4
// 0 3 1 4
// 1 0 5 9
// 2 6 0 5
// 3 5 8 0`;
// export const mainReturn = main(input.split("\n"));
main(require("fs").readFileSync("/dev/stdin", "utf8").split("\n"));
