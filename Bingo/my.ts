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
  const A = lines.splice(0, 3).map((str) => str.split(" ").map(Number));
  const N = Number(lines.splice(0, 1));
  const bLines = lines.splice(0, N);

  const ijMap: Record<number, [number, number]> = {};
  for (const i of range(3)) {
    for (const j of range(3)) {
      ijMap[A[i][j]] = [i, j];
    }
  }

  const bingo: boolean[][] = [...range(3)].map(() =>
    [...range(3)].map(() => false)
  );

  for (const n of range(N)) {
    const b = Number(bLines[n]);

    if (ijMap[b] == null) {
      continue;
    }

    const [i, j] = ijMap[b];

    bingo[i][j] = true;
  }

  const isBingo =
    [...range(3)].some(
      (n) =>
        [...range(3)].every((m) => bingo[n][m]) ||
        [...range(3)].every((m) => bingo[m][n])
    ) ||
    (bingo[0][0] && bingo[1][1] && bingo[2][2]) ||
    (bingo[0][2] && bingo[1][1] && bingo[2][0]);

  console.log(isBingo ? "Yes" : "No");
};

// const input = `84 97 66
// 79 89 11
// 61 59 7
// 7
// 89
// 7
// 87
// 79
// 24
// 84
// 30`;
// export const mainReturn = main(input.split("\n"));
main(require("fs").readFileSync("/dev/stdin", "utf8").split("\n"));
