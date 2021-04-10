function* range(
  ...args: [end: number] | [start: number, end: number, step?: number]
) {
  // @ts-expect-error
  const [start = 0, end, step = start < end ? 1 : -1]: [
    number,
    number,
    number
  ] = args.length === 1 ? [void 0, ...args] : args;

  for (let i = start; step > 0 ? i < end : i > end; i += step) {
    yield i;
  }
}

const main = (inputRows: string[]): void => {
  const [N, M] = inputRows.splice(0, 1)[0].split(" ").map(Number);
  const A = inputRows.map((v) => v.split(""));

  const numCoordinate: [number, number][][] = [...range(10 + 1)].map(() => []);
  for (const i of range(N)) {
    for (const j of range(M)) {
      const num = (() => {
        switch (A[i][j]) {
          case "S":
            return 0;
          case "G":
            return 10;
          default:
            return Number(A[i][j]);
        }
      })();

      numCoordinate[num].push([i, j]);
    }
  }

  const cost: number[][] = [...range(N)].map(() =>
    [...range(M)].map(() => Number.MAX_VALUE)
  );

  const [si, sj] = numCoordinate[0][0];
  cost[si][sj] = 0;

  for (const n of range(1, 10 + 1)) {
    for (const [i, j] of numCoordinate[n]) {
      for (const [i2, j2] of numCoordinate[n - 1]) {
        cost[i][j] = Math.min(
          cost[i][j],
          cost[i2][j2] + Math.abs(i - i2) + Math.abs(j - j2)
        );
      }
    }
  }

  const [gi, gj] = numCoordinate[10][0];
  const ans = cost[gi][gj];

  if (ans === Number.MAX_VALUE) {
    console.log(-1);
  } else {
    console.log(ans);
  }
};

// const input = `3 4
// 1S23
// 4567
// 89G1`;
// export const mainReturn = main(input.split("\n"));
main(require("fs").readFileSync("/dev/stdin", "utf8").split("\n"));
