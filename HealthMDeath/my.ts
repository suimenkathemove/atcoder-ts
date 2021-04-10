import * as fs from "fs";

const input = fs.readFileSync("/dev/stdin", "utf8");

const [M, H] = input.split(" ").map(Number);
if (H % M === 0) {
  console.log("Yes");
} else {
  console.log("No");
}
