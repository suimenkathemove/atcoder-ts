// RE
const range = (
  ...args: [end: number] | [start: number, end: number, step?: number]
): number[] => {
  const arr: number[] = [];

  const [start = 0, end, step = 1] =
    args.length === 1 ? [void 0, ...args] : args;

  let i = start;
  while (step > 0 ? i < end : i > end) {
    arr.push(i);
    i += step;
  }

  return arr;
};

import * as fs from "fs";

const input = fs.readFileSync("/dev/stdin", "utf8");
// const input = `4
// 10 30 40 20`;

const main = () => {
  const splitInput = input.split("\n");
  const N = Number(splitInput[0]);
  const h = splitInput[1].split(" ").map(Number);

  const cost = range(N).map(() => 0);
  const done = range(N).map(() => false);

  const rec = (i: number) => {
    if (done[i]) {
      return cost[i];
    }

    switch (i) {
      case 0:
        cost[i] = 0;
        break;
      case 1:
        cost[i] = rec(i - 1) + cost[i - 1] + Math.abs(h[i - 1] - h[i]);
        break;
      default:
        cost[i] = Math.min(
          rec(i - 1) + Math.abs(h[i - 1] - h[i]),
          rec(i - 2) + Math.abs(h[i - 2] - h[i])
        );
    }

    done[i] = true;

    return cost[i];
  };

  console.log(rec(N - 1));
};

export const ans = main();
