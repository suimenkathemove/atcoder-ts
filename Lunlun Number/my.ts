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

class Queue<T> {
  private _data: T[] = [];

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

const main = (inputRows: string[]): void => {
  const K = Number(inputRows[0]);

  const Q = new Queue<number>();
  for (const i of range(1, 9 + 1)) {
    Q.push(i);
  }

  let count = 0;

  while (Q.data.length > 0) {
    const n = Q.pop()!;

    count++;

    if (count === K) {
      console.log(n);

      break;
    }

    const firstPlaceNum = Number(String(n).slice(-1));

    if (firstPlaceNum > 0) {
      Q.push(n * 10 + firstPlaceNum - 1);
    }
    Q.push(n * 10 + firstPlaceNum);
    if (firstPlaceNum < 9) {
      Q.push(n * 10 + firstPlaceNum + 1);
    }
  }
};

// const input = `100000`;
// export const mainReturn = main(input.split("\n"));
main(require("fs").readFileSync("/dev/stdin", "utf8").split("\n"));
