// TLE

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

  const X: number[][] = [...range(N)].map(() => []);
  [...range(N)].forEach((i) => {
    const [a, b] = lines.slice(1)[i].split(" ").map(Number);
    X[a - 1].push(b);
  });

  const count = [...range(101)].map(() => 0);

  let ans = 0;

  [...range(N)].forEach((d) => {
    X[d].forEach((b) => {
      count[b] += 1;
    });

    for (const b of range(100, 0)) {
      if (count[b] > 0) {
        ans += b;

        count[b] -= 1;

        break;
      }
    }

    console.log(ans);
  });
};

// const input = `3
// 1 3
// 2 2
// 2 4`;
// export const mainReturn = main(input.split("\n"));
main(require("fs").readFileSync("/dev/stdin", "utf8").split("\n"));
