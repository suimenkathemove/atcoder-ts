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
  const N = Number(lines.splice(0, 1));

  for (const i of range(1, N)) {
    const current = Number(lines[i]);
    const prev = Number(lines[i - 1]);

    if (current === prev) {
      console.log("stay");
    }

    if (current < prev) {
      console.log(`down ${prev - current}`);
    }

    if (current > prev) {
      console.log(`up ${current - prev}`);
    }
  }
};

// const input = `10
// 9
// 10
// 3
// 100
// 100
// 90
// 80
// 10
// 30
// 10`;
// export const mainReturn = main(input.split("\n"));
main(require("fs").readFileSync("/dev/stdin", "utf8").split("\n"));
