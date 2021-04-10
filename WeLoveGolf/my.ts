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
  const K = Number(lines.splice(0, 1));
  const [A, B] = lines.splice(0, 1)[0].split(" ").map(Number);

  for (const i of range(A, B + 1)) {
    if (i % K === 0) {
      return console.log("OK");
    }
  }

  console.log("NG");
};

// const input = `7
// 500 600`;
// export const mainReturn = main(input.split("\n"));
main(require("fs").readFileSync("/dev/stdin", "utf8").split("\n"));
