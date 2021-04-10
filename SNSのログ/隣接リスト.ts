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

  // @ts-ignore
  const following: Set<number>[] = range(N).map(() => new Set());

  S.forEach((str) => {
    const query = str.split(" ").map(Number);

    switch (Number(query[0])) {
      case 1:
        {
          let [_, a, b] = query;

          a--;
          b--;

          following[a].add(b);
        }
        break;
      case 2:
        {
          let [_, a] = query;

          a--;

          following.forEach((row, x) => {
            // @ts-ignore
            if ([...row].includes(a)) {
              following[a].add(x);
            }
          });
        }
        break;
      case 3:
        {
          let [_, a] = query;

          a--;

          const tmp: number[] = [];
          following[a].forEach((x) => {
            following[x].forEach((y) => {
              if (y === a) {
                return;
              }

              tmp.push(y);
            });
          });
          tmp.forEach((t) => {
            following[a].add(t);
          });
        }
        break;
    }
  });

  following.forEach((row) => {
    console.log(
      range(N)
        // @ts-ignore
        .map((i) => ([...row].includes(i) ? "Y" : "N"))
        .join("")
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
