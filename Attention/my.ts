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

  let ans = 10 ** 100;

  range(N).forEach((i) => {
    let sum = 0;

    range(N).forEach((j) => {
      if (i === j) {
        return;
      }

      switch (S[j]) {
        case "E":
          if (i < j) {
            sum++;
          }
          break;
        case "W":
          if (j < i) {
            sum++;
          }
          break;
      }
    });

    ans = Math.min(ans, sum);
  });

  console.log(ans);
};

const input = `5
WEEWW`;
export const mainReturn = main(input.split("\n"));
// main(require("fs").readFileSync("/dev/stdin", "utf8").split("\n"));
