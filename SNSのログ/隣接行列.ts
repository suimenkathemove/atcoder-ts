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
  const [N, Q] = splitInput[0].split(" ").map(Number);
  const S = splitInput.slice(1);

  const following: boolean[][] = range(N).map(() => range(N).map(() => false));

  S.forEach((str) => {
    const query = str.split(" ").map(Number);

    switch (Number(query[0])) {
      case 1:
        {
          let [_, a, b] = query;

          a--;
          b--;

          following[a][b] = true;
        }
        break;
      case 2:
        {
          let [_, a] = query;

          a--;

          range(N).forEach((x) => {
            if (following[x][a]) {
              following[a][x] = true;
            }
          });
        }
        break;
      case 3:
        {
          let [_, a] = query;

          a--;

          const tmp: number[] = [];
          range(N).forEach((x) => {
            if (following[a][x]) {
              range(N).forEach((y) => {
                if (following[x][y] && y !== a) {
                  tmp.push(y);
                }
              });
            }
          });
          tmp.forEach((t) => {
            following[a][t] = true;
          });
        }
        break;
    }
  });

  range(N).forEach((i) => {
    console.log(
      following[i].map((isFollowing) => (isFollowing ? "Y" : "N")).join("")
    );
  });
};

// const input = `6 7
// 1 1 2
// 1 2 3
// 1 3 4
// 1 1 5
// 1 5 6
// 3 1
// 2 6`;
// export const mainReturn = main(input.split("\n"));
main(require("fs").readFileSync("/dev/stdin", "utf8").split("\n"));
