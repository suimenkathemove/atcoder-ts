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
  const S = lines.map((str) => str.split(""));

  for (const i of range(N - 1 - 1, 0 - 1)) {
    for (const j of range(N - i - 1, 2 * N - 1 - (N - i - 1))) {
      if ([S[i + 1][j - 1], S[i + 1][j], S[i + 1][j + 1]].includes("X")) {
        S[i][j] = "X";
      }
    }
  }

  for (const i of range(N)) {
    console.log(S[i].join(""));
  }
};

// const input = `10
// .........#.........
// ........###........
// .......#####.......
// ......#######......
// .....#########.....
// ....###########....
// ...#############...
// ..###############..
// .#################.
// X#X########X#X####X`;
// export const mainReturn = main(input.split("\n"));
main(require("fs").readFileSync("/dev/stdin", "utf8").split("\n"));
