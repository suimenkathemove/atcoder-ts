const func = (i: number): string[] => {
  const arr: string[] = [];

  const func = (str: string) => {
    if (str.length === i) {
      arr.push(str);

      return;
    }

    func(str + "⭕");
    func(str + "❌");
  };

  func("");

  return arr;
};

// ["⭕", "❌"]
console.log(func(1));

// ["⭕⭕", "⭕❌", "❌⭕", "❌❌"]
console.log(func(2));

// ["⭕⭕⭕", "⭕⭕❌", "⭕❌⭕", "⭕❌❌", "❌⭕⭕", "❌⭕❌", "❌❌⭕", "❌❌❌"]
console.log(func(3));
