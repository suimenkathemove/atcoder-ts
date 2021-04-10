const main = (lines: string[]): void => {
  const C = lines.map((str) => str.split(" ").map(Number));

  let ans = true;

  const func = (arr: number[]) => {
    if (arr.some((e, i, a) => e !== a[0])) {
      ans = false;
    }
  };

  for (const arr of [
    [C[0][0] - C[0][1], C[1][0] - C[1][1], C[2][0] - C[2][1]],
    [C[0][1] - C[0][2], C[1][1] - C[1][2], C[2][1] - C[2][2]],
    [C[0][0] - C[1][0], C[0][1] - C[1][1], C[0][2] - C[1][2]],
    [C[1][0] - C[2][0], C[1][1] - C[2][1], C[1][2] - C[2][2]],
  ]) {
    func(arr);
  }

  console.log(ans ? "Yes" : "No");
};

// const input = `1 8 6
// 2 9 7
// 0 7 7`;
// export const mainReturn = main(input.split("\n"));
main(require("fs").readFileSync("/dev/stdin", "utf8").split("\n"));
