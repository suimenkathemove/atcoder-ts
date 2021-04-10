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

const input = `4
0 1
0 2
1 2
2 3`;

const splitInput = input.split("\n");

const N = Number(splitInput[0]);

const G: number[][] = range(N).map(() => []);

splitInput.slice(1).forEach((str) => {
  const [i, j] = str.split(" ").map(Number);

  G[i].push(j);
  G[j].push(i);
});
