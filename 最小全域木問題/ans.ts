// TLE

const range = (
  func: (i: number, index: number) => void,
  ...args: [end: number] | [start: number, end: number, step?: number]
) => {
  // @ts-expect-error
  const [start = 0, end, step = start < end ? 1 : -1]: [
    number,
    number,
    number
  ] = args.length === 1 ? [void 0, ...args] : args;

  let index = 0;

  for (let i = start; step > 0 ? i < end : i > end; i += step) {
    func(i, index);

    index++;
  }
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
    return this._data.sort(([a], [b]) => a - b).shift();
  }
}

const main = (lines: string[]): void => {
  const [N, M] = lines[0].split(" ").map(Number);

  const graph: [v: number, c: number][][] = [];
  range((i) => {
    graph[i] = [];
  }, N);
  const uvcs = lines.slice(1);
  range((i) => {
    const [u, v, c] = uvcs[i].split(" ").map(Number);

    graph[u].push([v, c]);
    graph[v].push([u, c]);
  }, M);

  const marked: boolean[] = [];
  range((i) => {
    marked[i] = false;
  }, N);

  let markedCount = 0;

  const heap = new Heap<[number, number]>([]);

  graph[0].forEach(([j, c]) => {
    heap.push([c, j]);
  });
  marked[0] = true;
  markedCount++;

  let sum = 0;

  while (markedCount < N) {
    const [c, i] = heap.pop()!;

    if (marked[i]) {
      continue;
    }

    marked[i] = true;
    markedCount++;

    sum += c;

    graph[i].forEach(([j, c]) => {
      if (marked[j]) {
        return;
      }

      heap.push([c, j]);
    });
  }

  console.log(sum);
};

// const input = `5 7
// 0 1 10
// 0 4 30
// 1 2 10
// 1 4 20
// 2 3 30
// 4 2 20
// 4 3 10`;
// export const mainReturn = main(input.split("\n"));
main(require("fs").readFileSync("/dev/stdin", "utf8").split("\n"));
