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
  let N = Number(inputRows[0]);

  const BASE_NUMBER = 36;
  const CHARS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  const arr: number[] = [0, 0, 0, 0];

  for (const i of range(3, 0 - 1)) {
    const division = Math.floor(N / BASE_NUMBER ** i);
    if (division >= 1) {
      arr[i] = division;
      N -= division * BASE_NUMBER ** i;
    }
  }

  console.log(
    arr.reduceRight(
      (acc, cur) => (acc === "" && cur === 0 ? acc : acc + CHARS[cur]),
      ""
    ) || "0"
  );
};

// const input = `0`;
// export const mainReturn = main(input.split("\n"));
main(require("fs").readFileSync("/dev/stdin", "utf8").split("\n"));
