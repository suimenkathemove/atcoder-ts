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
  const [A, R, N] = lines[0].split(" ").map(Number);

  if (R === 1) {
    console.log(A);

    return;
  }

  let ans = A;

  for (const _ of range(N - 1)) {
    ans *= R;

    if (ans > 10 ** 9) {
      console.log("large");

      return;
    }
  }

  console.log(ans);
};

// const input = `12 34 5`;
// export const mainReturn = main(input.split("\n"));
main(require("fs").readFileSync("/dev/stdin", "utf8").split("\n"));
