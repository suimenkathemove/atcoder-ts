// import * as fs from "fs";

// const input = fs.readFileSync("/dev/stdin", "utf8");
// const N = Number(input);

function* range(start: number, end: number) {
  for (let i = start; i < end; i++) {
    yield i;
  }
}

const main = (N: number): void => {
  const x = N % 9 || 9;
  const n = Math.ceil(N / 9);

  const ans = Number(
    [...range(0, n)].reduce<string>((acc) => `${acc}${x}`, "")
  );
  console.log(ans);
};

for (let N = 1; N <= 50; N++) {
  main(N);
}
