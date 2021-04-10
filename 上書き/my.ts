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

  let T = "";

  for (const i of range(N)) {
    T = T.replace(new RegExp(S[i], "g"), "");
    T += S[i];
  }

  console.log(T);
};

// const input = `30
// ryfoxchyvfmsewlwpoyvhdjkbvdjsa`;
// export const mainReturn = main(input.split("\n"));
main(require("fs").readFileSync("/dev/stdin", "utf8").split("\n"));
