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
  const [N, Q] = lines.splice(0, 1)[0].split(" ").map(Number);

  const graph: boolean[][] = [];
  for (const i of range(N)) {
    graph.push([]);

    for (const j of range(N)) {
      graph[i][j] = false;
    }
  }

  for (const i of range(Q)) {
    switch (Number(lines[i][0])) {
      case 1:
        {
          let [_, a, b] = lines[i].split(" ").map(Number);

          a--;
          b--;

          graph[a][b] = true;
        }
        break;
      case 2:
        {
          let [_, a] = lines[i].split(" ").map(Number);

          a--;

          for (const i of range(N)) {
            if (graph[i][a]) {
              graph[a][i] = true;
            }
          }
        }
        break;
      case 3:
        {
          let [_, a] = lines[i].split(" ").map(Number);

          a--;

          const xs: number[] = [];

          for (const i of range(N)) {
            if (graph[a][i]) {
              for (const j of range(N)) {
                if (graph[i][j] && j !== a) {
                  xs.push(j);
                }
              }
            }
          }

          xs.forEach((x) => {
            graph[a][x] = true;
          });
        }
        break;
    }
  }

  for (const i of range(N)) {
    console.log(
      graph[i].map((isFollowing) => (isFollowing ? "Y" : "N")).join("")
    );
  }
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
