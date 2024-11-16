// 2024.11.16 reworked how last() is handled in code to get to better O(1) time.
// Also see main copy.js for prior version.

class Node {
  constructor(value) {
    this.value = value;
    this.next = null; // The next node, initially null
  }
}

class LinkedList {
  constructor() {
    this.head = null; // Head node
    this.tail = null; // Tail node
  }

  // Adds a new node containing value to the end of the list
  append(value) {
    let newNode = new Node(value);

    if (!this.head) {
      // If the list is empty, both head and tail point to the new node
      this.head = newNode;
      this.tail = newNode;
    } else {
      // Otherwise, add the new node at the end and update the tail
      this.tail.next = newNode;
      this.tail = newNode;
    }
  }

  // Adds a new node containing value to the start of the list
  prepend(value) {
    let newNode = new Node(value);
    newNode.next = this.head;
    this.head = newNode;
    
    if (!this.tail) {
      // If the list was empty, tail should also point to the new node
      this.tail = newNode;
    }
  }

  // Returns the total number of nodes in the list
  size() {
    let count = 0;
    let currentNode = this.head;
    while (currentNode) {
      count++;
      currentNode = currentNode.next;
    }
    return count;
  }

  // Returns the first node in the list
  first() {
    return this.head;
  }

  // Returns the last node in the list (O(1) due to tail pointer)
  last() {
    return this.tail;
  }

  // Returns the node at the given index
  at(index) {
    let count = 0;
    let currentNode = this.head;
    while (currentNode) {
      if (count === index) {
        return currentNode.value;
      }
      count++;
      currentNode = currentNode.next;
    }
    return null;
  }

  // Removes the last element from the list
  pop() {
    if (!this.head) return null; // Empty list, nothing to pop

    if (this.head === this.tail) {
      // If there's only one node in the list
      this.head = null;
      this.tail = null;
      return;
    }

    // Traverse the list to find the second-to-last node
    let currentNode = this.head;
    while (currentNode.next !== this.tail) {
      currentNode = currentNode.next;
    }

    // Remove the last node
    currentNode.next = null;
    this.tail = currentNode; // Update the tail
  }

  // Checks if the list contains a value
  contains(value) {
    return this.find(value) !== null;
  }

  // Returns the index of the node containing the value, or null if not found
  find(value) {
    let count = 0;
    let currentNode = this.head;
    while (currentNode) {
      if (currentNode.value === value) {
        return count;
      }
      count++;
      currentNode = currentNode.next;
    }
    return null;
  }

  // Returns a string representation of the list
  toString() {
    if (!this.head) return "null"; // Empty list
    let result = "";
    let currentNode = this.head;
    while (currentNode) {
      result += `( ${currentNode.value} ) -> `;
      currentNode = currentNode.next;
    }
    result += "null"; // End of the list
    return result;
  }

  // Inserts a new node with the provided value at the given index
  insertAt(value, index) {
    if (index === 0) {
      this.prepend(value); // Insert at the beginning
      return;
    }

    if (index > 0 && index < this.size()) {
      let currentNode = this.head;
      let count = 0;
      let newNode = new Node(value);

      // Traverse the list to find the position
      while (count < index - 1) {
        currentNode = currentNode.next;
        count++;
      }

      newNode.next = currentNode.next;
      currentNode.next = newNode;

      // If inserting at the end, update the tail
      if (!newNode.next) {
        this.tail = newNode;
      }
    } else {
      throw new Error("Index out of bounds");
    }
  }

  // Removes the node at the given index
  removeAt(index) {
    if (index > 0 && index < this.size()) {
      let currentNode = this.head;
      let previousNode;
      let count = 0;

      // Remove the node at the given index
      while (count < index) {
        previousNode = currentNode;
        currentNode = currentNode.next;
        count++;
      }

      previousNode.next = currentNode.next;

      // If we removed the last node, update the tail
      if (!currentNode.next) {
        this.tail = previousNode;
      }

      return currentNode.value;
    } else if (index === 0) {
      this.head = this.head.next;
      if (!this.head) {
        this.tail = null; // If the list becomes empty, update tail to null
      }
    } else {
      throw new Error("Index out of bounds");
    }
  }

  // Clears the list
  clear() {
    this.head = null;
    this.tail = null;
  }
}


const list = new LinkedList();

list.append("dog");
list.append("cat");
list.append("parrot");
list.append("hamster");
list.append("snake");
list.append("turtle");
console.log(list.toString());

list.prepend("lion");
list.append("zebra");
console.log(list.size());
console.log(list.first());
console.log(list.last());
console.log(list.at(0));
list.pop("zebra");
console.log(list.contains("cat"));
console.log(list.contains("rat"));
console.log(list.find("snake"));
console.log(list.toString());

list.insertAt("tiger", 1);
console.log(list.toString());

list.removeAt(0);
list.removeAt(0);
console.log(list.toString());

list.clear();

// Manual method of populating a linked list
let node0 = new Node(0);
let node1 = new Node(1);
node0.next = node1;
let node2 = new Node(2);
node1.next = node2;
let node3 = new Node(3);
node2.next = node3;

const list2 = new LinkedList(node0);

console.log(list2.toString());