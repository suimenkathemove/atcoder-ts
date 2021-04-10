const main = (lines: string[]): void => {
  const [A, B, C] = lines[0].split(" ").map(BigInt);

  const func = (i: bigint) => (i * (i + 1n)) / 2n;

  const ans = [A, B, C].reduce((acc, cur) => acc * func(cur), 1n) % 998244353n;

  console.log(ans.toString());
};

// const input = `1000000000 987654321 123456789`;
// export const mainReturn = main(input.split("\n"));
main(require("fs").readFileSync("/dev/stdin", "utf8").split("\n"));
