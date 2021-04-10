const C = [
  [1, 0, 1],
  [2, 1, 2],
  [1, 0, 1],
];

const abArray: [number, number][] = (() => {
  const abArray: [number, number][] = [];
  for (let i = 0; i < 3; i++) {
    abArray.push([0, 0]);
  }
  return abArray;
})();

const aIndex = 0;
const bIndex = 1;

const checkAbArray = (): boolean => {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (abArray[i][aIndex] + abArray[j][bIndex] !== C[i][j]) {
        return false;
      }
    }
  }
  return true;
};

const checkIsTakahashiTruth = () => {
  for (let a1 = 0; a1 <= C[0][0]; a1++) {
    const isTakahashiTruth = abArray.some((_, i) => {
      abArray[i][bIndex] = C[0][i] - a1;
      abArray[i][aIndex] = C[i][0] - abArray[0][bIndex];

      return checkAbArray();
    });

    if (isTakahashiTruth) {
      return console.log("Yes");
    }
  }
  console.log("No");
};

checkIsTakahashiTruth();
