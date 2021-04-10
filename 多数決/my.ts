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
  const S = lines[0].split("") as ("a" | "b" | "c")[];

  const map = { a: 0, b: 0, c: 0 };

  for (const i of range(S.length)) {
    map[S[i]]++;
  }

  let ans: typeof S[number];

  (Object.keys(map) as (keyof typeof map)[]).forEach((p) => {
    if (ans == null) {
      ans = p;

      return;
    }

    if (map[p] > map[ans]) {
      ans = p;
    }
  });

  console.log(ans!);
};

// const input = `babababacaca`;
// export const mainReturn = main(input.split("\n"));
main(require("fs").readFileSync("/dev/stdin", "utf8").split("\n"));
