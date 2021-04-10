// import * as fs from "fs";

// const input = fs.readFileSync("/dev/stdin", "utf8");
// const N = Number(input);
const N = 50;

let n = 0;

for (let i = 1; i <= 555555; i++) {
  const ゾロ目か = String(i)
    .split("")
    .reduce((acc, _, idx, src) => acc && src[idx] === src[0], true);

  if (ゾロ目か) {
    n++;

    if (n === N) {
      console.log(i);

      break;
    }
  }
}
