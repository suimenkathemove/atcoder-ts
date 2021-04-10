const main = (input: string): void => {
  const splitInput = input.split("\n");

  const A = splitInput[1].split(" ").map(Number);

  const arr: number[] = [];

  let leftIndex = A.length - 1;
  let rightIndex = A.length - 2;

  while (leftIndex >= 1) {
    for (let i = rightIndex; i >= 0; i--) {
      arr.push((A[leftIndex] - A[i]) ** 2);
    }
    leftIndex--;
    rightIndex--;
  }

  const ans = arr.reduce((acc, cur) => acc + cur);
  console.log(ans);
};

// const mainReturn = main(`5
// -5 8 9 -4 -3`);
main(require("fs").readFileSync("/dev/stdin", "utf8"));
