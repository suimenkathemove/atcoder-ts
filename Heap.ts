class Heap<T> {
  constructor(private _data: T[]) {}

  // @ts-ignore
  get data(): Readonly<T[]> {
    return this._data;
  }

  push(item: T) {
    this._data.push(item);
  }

  pop() {
    return this._data.sort().shift();
  }
}

// demo

const heap = new Heap([4]);

for (let i = 3; i > 0; i--) {
  heap.push(i);
}

console.log(heap.data);

console.log(heap.pop());
