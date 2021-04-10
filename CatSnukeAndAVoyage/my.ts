// RE
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

class Queue<T> {
  constructor(private _data: T[]) {}

  // @ts-ignore
  get data(): Readonly<T[]> {
    return this._data;
  }

  push(item: T) {
    this._data.push(item);
  }

  pop() {
    return this._data.shift();
  }
}

const main = (lines: string[]): void => {
  const [N, M] = lines[0].split(" ").map(Number);

  const G: number[][] = range(N).map(() => []);
  lines.slice(1).forEach((str) => {
    const [i, j] = str.split(" ").map((s) => Number(s) - 1);

    G[i].push(j);
    G[j].push(i);
  });

  const dist: number[] = range(N).map(() => -1);

  const Q = new Queue<number>([]);

  Q.push(0);
  dist[0] = 0;

  while (Q.data.length > 0) {
    const i = Q.pop()!;

    G[i].forEach((j) => {
      if (dist[j] === -1) {
        dist[j] = dist[i] + 1;
        Q.push(j);
      }
    });
  }

  console.log(dist[N - 1] <= 2 ? "POSSIBLE" : "IMPOSSIBLE");
};

// const input = `5 5
// 1 3
// 4 5
// 2 3
// 2 4
// 1 4`;
// export const mainReturn = main(input.split("\n"));
main(require("fs").readFileSync("/dev/stdin", "utf8").split("\n"));
