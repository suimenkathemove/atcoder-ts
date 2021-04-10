// WA

const bigIntTrunc = (n: bigint): bigint =>
  BigInt(String(n).replace(/\.\d+/, ""));

const main = (lines: string[]): void => {
  const [R, B] = lines[0].split(" ").map(BigInt);
  const [x, y] = lines[1].split(" ").map(BigInt);

  const check = (X: bigint) => {
    const r = R - X;
    const b = B - X;

    if (r < 0n || b < 0n) {
      return false;
    }

    const num = bigIntTrunc(r / (x - 1n)) + bigIntTrunc(b / (y - 1n));
    return num >= X;
  };

  let ok = 0n;
  let ng = 10n ** 18n + 1n;

  while (ng - ok > 1) {
    const mid = bigIntTrunc((ok + ng) / 2n);

    if (check(mid)) {
      ok = mid;
    } else {
      ng = mid;
    }
  }

  console.log(Number(ok));
};

// const input = `1 1
// 2 2`;
// export const mainReturn = main(input.split("\n"));
main(require("fs").readFileSync("/dev/stdin", "utf8").split("\n"));
