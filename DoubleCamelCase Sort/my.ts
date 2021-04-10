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

  const arr = S.match(/[A-Z].*?[A-Z]/g)!;

  arr.sort((a, b) => {
    const A = a.toUpperCase();
    const B = b.toUpperCase();

    if (A < B) {
      return -1;
    }

    if (A > B) {
      return 1;
    }

    return 0;
  });

  console.log(arr.join(""));
};

// const input = `FisHDoGCaTAAAaAAbCAC`;
// export const mainReturn = main(input.split("\n"));
main(require("fs").readFileSync("/dev/stdin", "utf8").split("\n"));
