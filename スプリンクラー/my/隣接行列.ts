const range = (
  ...args: [end: number] | [start: number, end: number, step?: number]
): number[] => {
  const arr: number[] = [];

  // @ts-expect-error
  const [start = 0, end, step = start < end ? 1 : -1]: [
    number,
    number,
    number
  ] = args.length === 1 ? [void 0, ...args] : args;

  let i = start;
  while (step > 0 ? i < end : i > end) {
    arr.push(i);
    i += step;
  }

  return arr;
};

const main = (splitInput: string[]): void => {
  const [N, M, Q] = splitInput[0].split(" ").map(Number);

  const G: boolean[][] = range(N).map(() => range(N).map(() => false));
  const gStartIndex = 1;
  const gEndIndex = gStartIndex + (M - 1);
  splitInput.slice(gStartIndex, gEndIndex + 1).forEach((str) => {
    let [i, j] = str.split(" ").map(Number);

    i--;
    j--;

    G[i][j] = true;
    G[j][i] = true;
  });

  const cIndex = gEndIndex + 1;
  const C = splitInput[cIndex].split(" ").map(Number);

  const sStartIndex = cIndex + 1;
  const sEndIndex = sStartIndex + (Q - 1);
  splitInput.slice(sStartIndex, sEndIndex + 1).forEach((str) => {
    const n = Number(str[0]) as 1 | 2;

    switch (n) {
      case 1:
        {
          const [_, x] = str.split(" ").map(Number);

          console.log(C[x - 1]);

          G[x - 1].forEach((isAdjacent, i) => {
            if (isAdjacent) {
              C[i] = C[x - 1];
            }
          });
        }
        break;
      case 2:
        {
          const [_, x, y] = str.split(" ").map(Number);

          console.log(C[x - 1]);

          C[x - 1] = y;
        }
        break;
    }
  });
};

// const input = `30 10 20
// 11 13
// 30 14
// 6 4
// 7 23
// 30 8
// 17 4
// 6 23
// 24 18
// 26 25
// 9 3
// 18 4 36 46 28 16 34 19 37 23 25 7 24 16 17 41 24 38 6 29 10 33 38 25 47 8 13 8 42 40
// 2 1 9
// 1 8
// 1 9
// 2 20 24
// 2 26 18
// 1 20
// 1 26
// 2 24 31
// 1 4
// 2 21 27
// 1 25
// 1 29
// 2 10 14
// 2 2 19
// 2 15 36
// 2 28 6
// 2 13 5
// 1 12
// 1 11
// 2 14 43`;
// export const mainReturn = main(input.split("\n"));
main(require("fs").readFileSync("/dev/stdin", "utf8").split("\n"));
