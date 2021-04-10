// WA

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
  const [N, W] = inputRows.splice(0, 1)[0].split(" ").map(Number);
  const items: { w: number; v: number }[] = [
    { w: 0, v: 0 },
    ...inputRows.map((val) => {
      const [w, v] = val.split(" ").map(Number);

      return { w, v };
    }),
  ];

  const vSum = items.reduce((acc, cur) => acc + cur.v, 0);

  const weight: number[][] = [...range(N + 1)].map(() =>
    [...range(vSum + 1)].map(() => 10 ** 100)
  );

  weight[0][0] = 0;

  for (const i of range(1, N + 1)) {
    for (const v of range(vSum + 1)) {
      if (v - items[i].v >= 0) {
        weight[i][v] = Math.min(
          weight[i - 1][v],
          weight[i - 1][v - items[i].v] + items[i].w
        );
      } else {
        weight[i][v] = weight[i - 1][v];
      }
    }
  }

  for (const v of range(vSum, 0 - 1)) {
    if (weight[N][v] <= W) {
      console.log(v);

      break;
    }
  }
};

// const input = `6 15
// 6 5
// 5 6
// 6 4
// 6 6
// 3 5
// 7 2`;
// export const mainReturn = main(input.split("\n"));
main(require("fs").readFileSync("/dev/stdin", "utf8").split("\n"));
