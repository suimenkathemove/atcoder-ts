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
  const N = Number(inputRows[0]);

  let ans = 0;

  function func(num: number, set: Set<number>) {
    if (num > N) {
      return;
    }

    if (set.has(3) && set.has(5) && set.has(7)) {
      ans++;
    }

    for (const i of [3, 5, 7]) {
      func(num * 10 + i, new Set([...set, i]));
    }
  }

  func(0, new Set());

  console.log(ans);
};

// const input = `575`;
// export const mainReturn = main(input.split("\n"));
main(require("fs").readFileSync("/dev/stdin", "utf8").split("\n"));
