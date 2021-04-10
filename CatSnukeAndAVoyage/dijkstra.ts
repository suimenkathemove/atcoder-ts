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

class Heap {
  constructor(public data: [number, number][]) {}

  push(item: [number, number]) {
    this.data.push(item);
  }

  pop() {
    return this.data.sort(([a], [b]) => a - b).shift();
  }
}

const main = (lines: string[]): void => {
  const [N, M] = lines[0].split(" ").map(Number);

  const graph: number[][] = range(N).map(() => []);
  lines.slice(1).forEach((str) => {
    const [a, b] = str.split(" ").map((s) => Number(s) - 1);

    graph[a].push(b);
    graph[b].push(a);
  });

  const dist: number[] = range(N).map(() => -1);

  const heap = new Heap([]);

  heap.push([0, 0]);

  dist[0] = 0;

  const done: boolean[] = range(N).map(() => false);

  while (heap.data.length > 0) {
    const [d, i] = heap.pop()!;

    if (done[i]) {
      continue;
    }

    done[i] = true;

    graph[i].forEach((j) => {
      const x = 1;

      if (dist[j] === -1 || dist[i] + x < dist[j]) {
        dist[j] = dist[i] + x;
        heap.push([dist[j], j]);
      }
    });
  }

  console.log(dist[N - 1] == 2 ? "POSSIBLE" : "IMPOSSIBLE");
};

// const input = `3 2
// 1 2
// 2 3`;
// export const mainReturn = main(input.split("\n"));
main(require("fs").readFileSync("/dev/stdin", "utf8").split("\n"));
