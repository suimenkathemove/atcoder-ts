const bigIntTrunc = (n: bigint): bigint =>
  BigInt(String(n).replace(/\.\d+/, ""));
