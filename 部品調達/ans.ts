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

const main = (lines: string[]): void => {
  const [N, M] = lines[0].split(" ").map(Number);

  const S: number[] = [0];
  const C: number[] = [0];
  range(M).forEach((i) => {
    const [s, cStr] = lines.slice(1)[i].split(" ");
    const c = Number(cStr);

    let sVal = 0;
    range(N).forEach((j) => {
      if (s[j] == "Y") {
        sVal |= 1 << j;
      }
    });

    S.push(sVal);
    C.push(c);
  });

  const ALL = 1 << N;

  const INF = 10 ** 100;
  const cost: number[][] = range(M + 1).map(() => range(ALL).map(() => INF));

  cost[0][0] = 0;

  range(1, M + 1).forEach((i) => {
    range(ALL).forEach((n) => {
      cost[i][n] = Math.min(cost[i][n], cost[i - 1][n]);

      cost[i][n | S[i]] = Math.min(cost[i][n | S[i]], cost[i - 1][n] + C[i]);
    });
  });

  const ans = cost[M][ALL - 1];

  console.log(ans !== INF ? ans : -1);
};

// const input = `10 14
// YNNYNNNYYN 774472905
// YYNNNNNYYY 75967554
// NNNNNNNNNN 829389188
// NNNNYYNNNN 157257407
// YNNYNNYNNN 233604939
// NYYNNNNNYY 40099278
// NNNNYNNNNN 599672237
// NNNYNNNNYY 511018842
// NNNYNNYNYN 883299962
// NNNNNNNNYN 883093359
// NNNNNYNYNY 54742561
// NYNNYYYNNY 386272705
// NNNNYYNNNN 565075143
// NNYNYNNNYN 123300589`;
// export const mainReturn = main(input.split("\n"));
main(require("fs").readFileSync("/dev/stdin", "utf8").split("\n"));
