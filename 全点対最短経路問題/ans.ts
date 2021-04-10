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

  const INF = 10 ** 100;
  const dist: number[][] = range(N).map(() => range(N).map(() => INF));
  lines.slice(1).forEach((str) => {
    const [u, v, c] = str.split(" ").map(Number);

    dist[u][v] = c;
  });

  range(N).forEach((i) => {
    dist[i][i] = 0;
  });

  range(N).forEach((k) => {
    range(N).forEach((i) => {
      range(N).forEach((j) => {
        dist[i][j] = Math.min(dist[i][j], dist[i][k] + dist[k][j]);
      });
    });
  });

  let ans = 0;
  range(N).forEach((i) => {
    range(N).forEach((j) => {
      ans += dist[i][j];
    });
  });

  console.log(ans);
};

// const input = `3 4
// 0 1 1
// 1 0 2
// 1 2 3
// 2 0 4`;
// export const mainReturn = main(input.split("\n"));
main(require("fs").readFileSync("/dev/stdin", "utf8").split("\n"));
