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
  const N = Number(inputRows.splice(0, 1)[0]);
  const ps = inputRows[0].split(" ").map(Number);

  const pSum = ps.reduce((acc, cur) => acc + cur);

  const dp: boolean[][] = [...range(N)].map(() =>
    [...range(pSum + 1)].map(() => false)
  );

  dp[0][0] = true;
  dp[0][ps[0]] = true;

  for (const i of range(1, N)) {
    for (const p of range(pSum + 1)) {
      if (dp[i - 1][p]) {
        dp[i][p] = true;
      }

      if (p - ps[i] >= 0 && dp[i - 1][p - ps[i]]) {
        dp[i][p] = true;
      }
    }
  }

  console.log(dp[N - 1].filter(Boolean).length);
};

// const input = `3
// 2 3 5`;
// export const mainReturn = main(input.split("\n"));
main(require("fs").readFileSync("/dev/stdin", "utf8").split("\n"));
