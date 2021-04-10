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
  const N = Number(inputRows.splice(0, 1)[0]);
  const S = inputRows[0];

  const set: Set<string> = new Set();

  const func = (str: string, is: number[]) => {
    if (str.length >= N) {
      set.add(str);
      return;
    }

    for (const i of range(N)) {
      if (is.includes(i)) {
        continue;
      }

      func(str + S[i], [...is, i]);
    }
  };
  func("", []);

  set.delete(S);
  set.delete(S.split("").reverse().join(""));

  if (set.size === 0) {
    console.log("None");
  } else {
    console.log([...set][0]);
  }
};

// const input = `2
// aa`;
// export const mainReturn = main(input.split("\n"));
main(require("fs").readFileSync("/dev/stdin", "utf8").split("\n"));
