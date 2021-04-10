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
  const S: ("E" | "W")[] = lines[1].split("") as ("E" | "W")[];

  const sumW = [0];
  range(N).forEach((i) => {
    if (S[i] === "W") {
      sumW.push(sumW[i] + 1);
    } else {
      sumW.push(sumW[i]);
    }
  });

  let ans = 10 ** 100;

  range(N).forEach((i) => {
    const w = sumW[i];
    const e = N - 1 - i - (sumW[N] - sumW[i + 1]);

    ans = Math.min(ans, w + e);
  });

  console.log(ans);
};

// const input = `5
// WEEWW`;
// export const mainReturn = main(input.split("\n"));
main(require("fs").readFileSync("/dev/stdin", "utf8").split("\n"));
