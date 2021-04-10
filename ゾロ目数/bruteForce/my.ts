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
  const N = Number(lines[0]);

  let count = 0;

  for (const i of range(1, 555555 + 1)) {
    if (
      String(i)
        .split("")
        .every((v, i, a) => v === a[0])
    ) {
      count++;
    }

    if (count === N) {
      return console.log(i);
    }
  }
};

// const input = `50`;
// export const mainReturn = main(input.split("\n"));
main(require("fs").readFileSync("/dev/stdin", "utf8").split("\n"));
