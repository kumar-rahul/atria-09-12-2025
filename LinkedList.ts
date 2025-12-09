// Node class representing a single node in the linked list
class ListNode<T> {
  value: T;
  next: ListNode<T> | null;

  constructor(value: T) {
    this.value = value;
    this.next = null;
  }
}

// LinkedList class with various operations
class LinkedList<T> {
  head: ListNode<T> | null;
  size: number;

  constructor() {
    this.head = null;
    this.size = 0;
  }

  // Add a node at the end of the list
  append(value: T): void {
    const newNode = new ListNode(value);

    if (!this.head) {
      this.head = newNode;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = newNode;
    }
    this.size++;
  }

  // Add a node at the beginning of the list
  prepend(value: T): void {
    const newNode = new ListNode(value);
    newNode.next = this.head;
    this.head = newNode;
    this.size++;
  }

  // Insert a node at a specific position
  insertAt(value: T, index: number): boolean {
    if (index < 0 || index > this.size) {
      return false;
    }

    if (index === 0) {
      this.prepend(value);
      return true;
    }

    const newNode = new ListNode(value);
    let current = this.head;
    let previous: ListNode<T> | null = null;
    let currentIndex = 0;

    while (currentIndex < index) {
      previous = current;
      current = current!.next;
      currentIndex++;
    }

    newNode.next = current;
    previous!.next = newNode;
    this.size++;
    return true;
  }

  // Remove a node at a specific position
  removeAt(index: number): T | null {
    if (index < 0 || index >= this.size || !this.head) {
      return null;
    }

    let current = this.head;

    if (index === 0) {
      this.head = current.next;
      this.size--;
      return current.value;
    }

    let previous: ListNode<T> | null = null;
    let currentIndex = 0;

    while (currentIndex < index) {
      previous = current;
      current = current.next!;
      currentIndex++;
    }

    previous!.next = current.next;
    this.size--;
    return current.value;
  }

  // Get node value at a specific position
  getAt(index: number): T | null {
    if (index < 0 || index >= this.size || !this.head) {
      return null;
    }

    let current = this.head;
    let currentIndex = 0;

    while (currentIndex < index) {
      current = current.next!;
      currentIndex++;
    }

    return current.value;
  }

  // Traverse the linked list and execute a callback on each node
  traverse(callback: (value: T, index: number) => void): void {
    if (!this.head) {
      return;
    }

    let current: ListNode<T> | null = this.head;
    let index = 0;

    while (current) {
      callback(current.value, index);
      current = current.next;
      index++;
    }
  }

  // Print the linked list
  print(): void {
    if (!this.head) {
      console.log("List is empty");
      return;
    }

    let current: ListNode<T> | null = this.head;
    const values: T[] = [];

    while (current) {
      values.push(current.value);
      current = current.next;
    }

    console.log(values.join(" -> "));
  }

  // Get the size of the list
  getSize(): number {
    return this.size;
  }

  // Clear the list
  clear(): void {
    this.head = null;
    this.size = 0;
  }
}

// Example usage
const list = new LinkedList<number>();

console.log("Adding nodes...");
list.append(10);
list.append(20);
list.append(30);
list.print(); // 10 -> 20 -> 30

console.log("\nPrepending node...");
list.prepend(5);
list.print(); // 5 -> 10 -> 20 -> 30

console.log("\nInserting at index 2...");
list.insertAt(15, 2);
list.print(); // 5 -> 10 -> 15 -> 20 -> 30

console.log("\nRemoving at index 3...");
const removed = list.removeAt(3);
console.log(`Removed value: ${removed}`);
list.print(); // 5 -> 10 -> 15 -> 30

console.log("\nGetting value at index 2...");
console.log(`Value at index 2: ${list.getAt(2)}`);

console.log("\nList size:", list.getSize());

console.log("\nTraversing the list and printing all values:");
list.traverse((value, index) => {
  console.log(`Node ${index}: ${value}`);
});

export { ListNode, LinkedList };
