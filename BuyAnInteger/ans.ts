const bigIntTrunc = (n: bigint): bigint =>
  BigInt(String(n).replace(/\.\d+/, ""));

const main = (lines: string[]): void => {
  const [A, B, X] = lines[0].split(" ").map(BigInt);

  let ok = 0n;
  let ng = 10n ** 9n + 1n;

  while (ng - ok > 1n) {
    const mid = bigIntTrunc((ok + ng) / 2n);
    const d = BigInt(String(mid).length);
    const price = A * mid + B * d;

    if (price <= X) {
      ok = mid;
    } else {
      ng = mid;
    }
  }

  console.log(Number(ok));
};

// const input = `10 7 100`;
// export const mainReturn = main(input.split("\n"));
main(require("fs").readFileSync("/dev/stdin", "utf8").split("\n"));
