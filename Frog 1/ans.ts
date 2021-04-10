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
  const h = inputRows[0].split(" ").map(Number);

  const cost = [...range(N)].map(() => 0);

  cost[0] = 0;

  cost[1] = cost[0] + Math.abs(h[1] - h[0]);

  for (const i of range(2, N)) {
    cost[i] = Math.min(
      cost[i - 1] + Math.abs(h[i] - h[i - 1]),
      cost[i - 2] + Math.abs(h[i] - h[i - 2])
    );
  }

  console.log(cost[N - 1]);
};

// const input = `6
// 30 10 60 10 60 50`;
// export const mainReturn = main(input.split("\n"));
main(require("fs").readFileSync("/dev/stdin", "utf8").split("\n"));
