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
  const [N, M, Q] = lines.splice(0, 1)[0].split(" ").map(Number);
  const s = lines;

  const graph: number[][] = [];
  for (const _ of range(N)) {
    graph.push([]);
  }

  const scores: number[] = [];
  for (const _ of range(M)) {
    scores.push(N);
  }

  for (const q of range(Q)) {
    switch (Number(s[q][0]) as 1 | 2) {
      case 1:
        {
          let [_, n] = s[q].split(" ").map(Number);

          n--;

          let score = 0;

          graph[n].forEach((m) => {
            score += scores[m];
          });

          console.log(score);
        }
        break;
      case 2:
        {
          let [_, n, m] = s[q].split(" ").map(Number);

          n--;
          m--;

          graph[n].push(m);

          scores[m]--;
        }
        break;
    }
  }
};

// const input = `5 5 30
// 1 3
// 2 3 5
// 1 3
// 2 2 1
// 2 4 5
// 2 5 2
// 2 2 3
// 1 4
// 2 4 1
// 2 2 2
// 1 1
// 1 5
// 2 5 3
// 2 4 4
// 1 4
// 1 2
// 2 3 3
// 2 4 3
// 1 3
// 1 5
// 1 3
// 2 1 3
// 1 1
// 2 2 4
// 1 1
// 1 4
// 1 5
// 1 4
// 1 1
// 1 5`;
// export const mainReturn = main(input.split("\n"));
main(require("fs").readFileSync("/dev/stdin", "utf8").split("\n"));
