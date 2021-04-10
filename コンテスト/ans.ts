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

const main = (input: string) => {
  const splitInput = input.split("\n");

  const N = Number(splitInput[0]);
  const P = [0, ...splitInput[1].split(" ").map(Number)];

  const pSum = P.reduce((acc, cur) => acc + cur);
  const exist = range(N + 1).map(() => range(pSum + 1).map(() => false));

  exist[0][0] = true;

  range(1, N + 1).forEach((i) => {
    range(pSum + 1).forEach((s) => {
      if (exist[i - 1][s]) {
        exist[i][s] = true;
      }

      if (s >= P[i] && exist[i - 1][s - P[i]]) {
        exist[i][s] = true;
      }
    });
  });

  const ans = exist[N].filter(Boolean).length;
  console.log(ans);
};

// const mainReturn = main(`3
// 2 3 5`);
main(require("fs").readFileSync("/dev/stdin", "utf8"));
