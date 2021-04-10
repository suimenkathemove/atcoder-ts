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
  const [N, L] = inputRows.splice(0, 1)[0].split(" ").map(Number);
  const x = inputRows.splice(0, 1)[0].split(" ").map(Number);
  const [T1, T2, T3] = inputRows[0].split(" ").map(Number);

  const H = [...range(L + 1)].map(() => false);
  x.forEach((i) => {
    H[i] = true;
  });

  const cost = [...range(L + 1)].map(() => 10 ** 100);

  cost[0] = 0;

  for (const i of range(1, L + 1)) {
    cost[i] = Math.min(cost[i], cost[i - 1] + T1);

    if (i >= 2) {
      cost[i] = Math.min(cost[i], cost[i - 2] + T1 + T2);
    }

    if (i >= 4) {
      cost[i] = Math.min(cost[i], cost[i - 4] + T1 + T2 * 3);
    }

    if (H[i]) {
      cost[i] += T3;
    }
  }

  let ans = cost[L];
  [L - 3, L - 2, L - 1].forEach((i) => {
    if (i >= 0) {
      ans = Math.min(
        ans,
        cost[i] + Math.floor(T1 * 0.5) + Math.floor(T2 * (L - i - 0.5))
      );
    }
  });

  console.log(ans);
};

// const input = `4 5
// 1 2 3 4
// 2 20 100`;
// export const mainReturn = main(input.split("\n"));
main(require("fs").readFileSync("/dev/stdin", "utf8").split("\n"));
