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
  const S = lines[0];

  const set = new Set<string>();

  for (const length of range(1, 3 + 1)) {
    for (const start of range(S.length - length + 1)) {
      const str = S.substr(start, length);

      const func = (current: string) => {
        if (current.length >= str.length) {
          return set.add(current);
        }

        func(current + str[current.length - 1 + 1]);
        func(current + ".");
      };

      func("");
    }
  }

  console.log(set.size);
};

// const input = `aabbaabb`;
// export const mainReturn = main(input.split("\n"));
main(require("fs").readFileSync("/dev/stdin", "utf8").split("\n"));
