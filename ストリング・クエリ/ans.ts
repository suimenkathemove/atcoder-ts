// TLE

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

const alphabets = (() => {
  const arr: string[] = [];
  for (const i of range(26)) {
    arr.push(String.fromCharCode("a".charCodeAt(0) + i));
  }
  return arr;
})();

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
  const Q = Number(lines[0]);

  const queue = new Queue<[string, number]>([]);

  const Querys = lines.slice(1);

  for (const q of range(Q)) {
    const values = Querys[q].split(" ");

    switch (values[0] as "1" | "2") {
      case "1":
        const c = values[1];
        const x = Number(values[2]);

        queue.push([c, x]);

        break;
      case "2":
        let d = Number(values[1]);

        const count: Record<string, number> = {};
        for (const c of alphabets) {
          count[c] = 0;
        }

        while (d > 0 && queue.data.length > 0) {
          const [c, x] = queue.data[0];

          if (d >= x) {
            d -= x;
            count[c] += x;
            queue.pop();
          } else {
            count[c] += d;
            queue.data[0][1] -= d;
            d = 0;
          }
        }

        const ans = alphabets.reduce((acc, cur) => acc + count[cur] ** 2, 0);

        console.log(ans);

        break;
    }
  }
};

// const input = `6
// 1 a 5
// 2 3
// 1 t 8
// 1 c 10
// 2 21
// 2 4`;
// export const mainReturn = main(input.split("\n"));
main(require("fs").readFileSync("/dev/stdin", "utf8").split("\n"));
