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

const main = (inputRows: string[]): void => {
  let [N, K] = inputRows.splice(0, 1)[0].split(" ").map(Number);
  K--;
  const S = inputRows;

  const map: Record<string, number> = {};
  for (const i of range(N)) {
    if (map[S[i]] == null) {
      map[S[i]] = 1;
    } else {
      map[S[i]]++;
    }
  }

  const arr: { key: string; value: number }[] = [];
  for (const key in map) {
    arr.push({ key, value: map[key] });
  }

  arr.sort((a, b) => b.value - a.value);

  if (
    arr.some(({ key, value }) => value === arr[K].value && key !== arr[K].key)
  ) {
    console.log("AMBIGUOUS");
  } else {
    console.log(arr[K].key);
  }
};

// const input = `6 2
// abcde
// caac
// abcde
// caac
// abc
// caac`;
// export const mainReturn = main(input.split("\n"));
main(require("fs").readFileSync("/dev/stdin", "utf8").split("\n"));
