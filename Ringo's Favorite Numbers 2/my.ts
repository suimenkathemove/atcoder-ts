// TLE
const main = (inputRows: string[]): void => {
  const N = Number(inputRows.splice(0, 1)[0]);
  const A = inputRows.splice(0, 1)[0].split(" ").map(Number);

  let count = 0;

  for (let i = 0; i < N; i++) {
    for (let j = i + 1; j < N; j++) {
      if (Math.abs(A[i] - A[j]) % 200 === 0) {
        count++;
      }
    }
  }

  console.log(count);
};

main(require("fs").readFileSync("/dev/stdin", "utf8").split("\n"));
