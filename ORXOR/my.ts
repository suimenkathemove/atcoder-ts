function* range(
  ...args: [end: number] | [start: number, end: number, step?: number]
) {
  // @ts-expect-error
  const [start = 0, end, step = start < end ? 1 : -1]: [
    number,
    number,
    number
  ] = args.length === 1 ? [void 0, ...args] : args;

  for (let i = start; step > 0 ? i < end : i > end; i += step) {
    yield i;
  }
}

function runRecursive<T extends (...args: any[]) => any>(
  func: T,
  ...args: Parameters<T>
) {
  // 最終結果を受け取るオブジェクトを用意
  const rootCaller = {
    lastReturnValue: null,
  };
  // 自前のコールスタックを用意
  const callStack: any[] = [];
  // 最初の関数呼び出しを追加
  callStack.push({
    iterator: func(...args),
    lastReturnValue: null,
    caller: rootCaller,
  });
  while (callStack.length > 0) {
    const stackFrame = callStack[callStack.length - 1];
    const { iterator, lastReturnValue, caller } = stackFrame;
    // 関数の実行を再開
    const { value, done } = iterator.next(lastReturnValue);
    if (done) {
      // 関数がreturnしたので親に返り値を記録
      caller.lastReturnValue = value;
      callStack.pop();
    } else {
      // 関数がyieldした（valueは再帰呼び出しの引数リスト）
      callStack.push({
        iterator: func(...value),
        lastReturnValue: null,
        caller: stackFrame,
      });
    }
  }
  return rootCaller.lastReturnValue;
}

function getSeparatingIndexesList(n: number) {
  const arr: number[][] = [];

  function* func(nums: number[]) {
    arr.push(nums);

    if (nums.length > n) {
      return;
    }

    for (const i of range(nums[nums.length - 1] + 1, n)) {
      yield [[...nums, i]];
    }
  }

  for (const i of range(n)) {
    runRecursive(func, [i]);
  }

  return arr;
}

const separate = <T extends any>(
  arr: T[],
  separatingIndexes: number[]
): T[][] => {
  const separatedArr: T[][] = [];

  separatedArr.push(arr.slice(0, separatingIndexes[0] + 1));

  separatingIndexes.forEach((v, i, a) => {
    const endIndex = a[i + 1] != null ? a[i + 1] : arr.length - 1;
    separatedArr.push(arr.slice(v + 1, endIndex + 1));
  });

  return separatedArr;
};

const main = (lines: string[]): void => {
  const N = Number(lines.splice(0, 1));
  const A = lines[0].split(" ").map(Number);

  if (A.length === 1) {
    console.log(A[0]);

    return;
  }

  const separatingIndexesList = getSeparatingIndexesList(N - 1);

  let ans = 10 ** 100;

  separatingIndexesList.forEach((separatingIndexes) => {
    ans = Math.min(
      ans,
      separate(A, separatingIndexes)
        .map((a) => a.reduce((acc, cur) => acc | cur))
        .reduce((acc, cur) => acc ^ cur)
    );
  });

  console.log(ans);
};

// const input = `1
// 1073741823`;
// export const mainReturn = main(input.split("\n"));
main(require("fs").readFileSync("/dev/stdin", "utf8").split("\n"));
