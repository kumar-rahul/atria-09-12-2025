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
  // Adds a new node at the end of the list. If the list is empty, the new node becomes the head.
  // Otherwise, it traverses to the last node (where next is null) and attaches the new node there.
  // Increments the size counter. Time complexity: O(n) where n is the number of nodes.
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
  // Adds a new node at the beginning of the list. Creates a new node, sets its next pointer
  // to the current head, then updates the head to be the new node.
  // This operation is O(1) as it doesn't require traversal.
  prepend(value: T): void {
    const newNode = new ListNode(value);
    newNode.next = this.head;
    this.head = newNode;
    this.size++;
  }

  // Insert a node at a specific position
  // Inserts a node at a specific position. Returns false if the index is invalid.
  // If inserting at position 0, it calls prepend(). Otherwise, it traverses to the position
  // before the insertion point, creates a new node, and updates the pointers to insert it
  // between two existing nodes. Time complexity: O(n).
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
  // Removes and returns the value of the node at the specified index. Returns null if the
  // index is invalid. For index 0, it updates the head to the next node. For other positions,
  // it traverses to the node before the target, updates pointers to skip the target node,
  // and returns its value. Time complexity: O(n).
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
  // Retrieves the value at a specific position without removing it. Returns null if the
  // index is invalid or list is empty. Traverses from the head to the specified index
  // and returns the value. Time complexity: O(n).
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
  // Iterates through every node in the list and executes a callback function on each one.
  // The callback receives the node's value and its index. This is useful for performing
  // operations on all nodes, like printing, processing, or transforming values.
  // Time complexity: O(n).
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
  // Displays the entire linked list in a readable format. Traverses through all nodes,
  // collects their values into an array, then prints them joined by " -> ".
  // Shows "List is empty" if there are no nodes. Time complexity: O(n).
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
  // Returns the current number of nodes in the list. This is O(1) since the size is
  // tracked with each insertion/deletion rather than counting nodes each time.
  getSize(): number {
    return this.size;
  }

  // Clear the list
  // Removes all nodes from the list by setting the head to null and resetting the size to 0.
  // This effectively deallocates the entire list. Time complexity: O(1).
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
