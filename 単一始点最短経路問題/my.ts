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

class Heap<T extends [number, number]> {
  constructor(private _data: T[]) {}

  // @ts-ignore
  get data(): Readonly<T[]> {
    return this._data;
  }

  push(item: T) {
    this._data.push(item);
  }

  pop() {
    return this._data.sort(([a, b]) => a - b).shift();
  }
}

const main = (lines: string[]): void => {
  const [N, M] = lines[0].split(" ").map(Number);

  const graph: [d: number, i: number][][] = range(N).map(() => []);
  lines.slice(1).forEach((str) => {
    const [u, v, c] = str.split(" ").map(Number);

    graph[u].push([c, v]);
  });

  const dist: number[] = range(N).map(() => -1);

  const heap = new Heap<[number, number]>([]);

  const done: boolean[] = range(N).map(() => false);

  dist[0] = 0;
  heap.push([0, 0]);

  while (heap.data.length > 0) {
    const [di, i] = heap.pop()!;

    if (done[i]) {
      continue;
    }

    done[i] = true;

    graph[i].forEach(([dj, j]) => {
      if (dist[j] === -1 || dist[i] + dj < dist[j]) {
        dist[j] = dist[i] + dj;
        heap.push([dist[j], j]);
      }
    });
  }

  console.log(dist[N - 1]);
};

// const input = `3 4
// 0 1 1
// 1 0 2
// 1 2 3
// 2 0 4`;
// export const mainReturn = main(input.split("\n"));
main(require("fs").readFileSync("/dev/stdin", "utf8").split("\n"));
