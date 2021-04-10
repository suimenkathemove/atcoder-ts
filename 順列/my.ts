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
  const A = lines.splice(0, 1)[0].split(" ").map(Number);

  let ansArr: number[] = [];

  for (const i of range(1, N + 1)) {
    let x = i;
    let count = 1;

    while (A[x - 1] !== i) {
      x = A[x - 1];
      count++;
    }

    ansArr.push(count);
  }

  console.log(ansArr.join(" "));
};

// const input = `2
// 1 2`;
// export const mainReturn = main(input.split("\n"));
main(require("fs").readFileSync("/dev/stdin", "utf8").split("\n"));
