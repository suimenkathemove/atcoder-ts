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

const main = (lines: string[]): void => {
  const N = Number(lines.splice(0, 1)[0]);
  const S = lines[0].split("");

  let x = 0;
  let y = 0;

  while (S.includes(".")) {
    const leftDotIndexes: number[] = [];
    const rightDotIndexes: number[] = [];

    for (const i of range(N)) {
      if (S[i] === "#") {
        const leftI = i - 1;
        const rightI = i + 1;

        if (0 <= leftI && S[leftI] === ".") {
          leftDotIndexes.push(leftI);
        }

        if (rightI < N && S[rightI] === ".") {
          rightDotIndexes.push(rightI);
        }
      }
    }

    if (leftDotIndexes.length >= rightDotIndexes.length) {
      leftDotIndexes.forEach((v) => {
        S[v] = "#";
      });

      x++;
    } else {
      rightDotIndexes.forEach((v) => {
        S[v] = "#";
      });

      y++;
    }
  }

  console.log(`${x} ${y}`);
};

// const input = `3
// ###`;
// export const mainReturn = main(input.split("\n"));
main(require("fs").readFileSync("/dev/stdin", "utf8").split("\n"));
