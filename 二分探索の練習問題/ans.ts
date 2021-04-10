const main = (lines: string[]): void => {
  const [N, K] = lines[0].split(" ").map(Number);
  const A = lines[1].split(" ").map(Number);

  let ok = N;
  let ng = -1;

  while (Math.abs(ok - ng) > 1) {
    const middle = Math.floor((ok + ng) / 2);

    if (A[middle] >= K) {
      ok = middle;
    } else {
      ng = middle;
    }
  }

  if (ok === N) {
    console.log(-1);
  } else {
    console.log(ok);
  }
};

// const input = `8 4
// 1 3 5 7 9 11 13 15`;
// export const mainReturn = main(input.split("\n"));
main(require("fs").readFileSync("/dev/stdin", "utf8").split("\n"));
