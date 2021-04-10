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

  let ans = 0;

  range(1, N).forEach((A) => {
    const bCount = Math.floor((N - 1) / A);

    ans += bCount;
  });

  console.log(ans);
};

// const input = `1000000`;
// export const mainReturn = main(input.split("\n"));
main(require("fs").readFileSync("/dev/stdin", "utf8").split("\n"));
