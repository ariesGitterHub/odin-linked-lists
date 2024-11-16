class Node {
  constructor(value) {
    this.value = value;
    this.next = null; // Reminder: null is the default behavior
  }
}

class LinkedList {
  constructor(head = null) {
    this.head = head;
  }

  // The following are helper methods for the linked list.

  // This method adds a new node containing value to the end of the list
  append(value) {
    let newNode = new Node(value);

    if (this.head === null) {
      this.head = newNode;
      return;
    }
    let currentNode = this.head;
    while (currentNode.next !== null) {
      currentNode = currentNode.next;
    }
    currentNode.next = newNode;
  }

  // This method adds a new node containing value to the start of the list
  prepend(value) {
    let newNode = new Node(value);
    newNode.next = this.head;
    this.head = newNode;
  }

  // This method returns the total number of nodes in the list.
  size() {
    let count = 0;
    let currentNode = this.head;
    while (currentNode) {
      count++;
      currentNode = currentNode.next;
    }
    return count;
  }

  // This method returns the first node in the list. I named it "first" to avoid a naming conflict.
  first() {
    return this.head;
  }

  // This method returns the last node in the list. I named it "last" because I liked it better.
  last() {
    if (!this.head) return null; // Return null if the list is empty
    let lastNode = this.head;
    while (lastNode.next) {
      lastNode = lastNode.next; // Traverse until the last node
    }
    return lastNode;
  }

  // This method returns the node at the given index
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

  // This method removes the last element from the list
  pop() {
    if (!this.head) return null; // Empty list, nothing to pop

    if (this.size() === 1) {
      this.head = null; // Only one element, just set head to null
      return;
    }
    // Use a variable only to traverse the linked list
    // In this case find the second to last node, i.e., the penultimate node
    let currentNode = this.head;

    // Vital for below: This ensures that the current node is not the last node (because the last node's next would be null).
    // And, this ensures that the next node is not the last node either. This is the condition that helps you stop at the second-to-last node.
    while (currentNode.next && currentNode.next !== this.last()) {
      currentNode = currentNode.next;
    }

    // Now, currentNode is the second-to-last node
    currentNode.next = null; // Remove the last node
  }

  // This method returns true if the passed in value is in the list and otherwise returns false.

  // OK code...

  // contains(value) {
  //   let currentNode = this.head;
  //   while (currentNode) {
  //     if (currentNode.value === value) {
  //       return true;
  //     }
  //     currentNode = currentNode.next;
  //   }
  //   return false;
  // }

  // Better code...
  contains(value) {
    return this.find(value) !== null;
  }

  // This method returns the index of the node containing value, or null if not found.
  // NOTE - The method is supposed to return null when the value isn't found, but null is not a valid index for a node. It would be more appropriate to return -1 in that case, as -1 is commonly used to indicate that a value wasn't found in many programming contexts (like array searches).

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

  // This method represents your LinkedList objects as strings, so you can print them out and preview them in the console. The format should be: ( value ) -> ( value ) -> ( value ) -> null
  toString() {
    if (!this.head) return "null"; // Empty list
    let storage = "";
    let currentNode = this.head;
    while (currentNode) {
      storage += `( ${currentNode.value} ) -> `;
      currentNode = currentNode.next;
    }
    storage += "null";
    return storage;
  }

  // Extra credit: This method inserts a new node with the provided value at the given index.
  insertAt(value, index) {
    // Edge case: Inserting at the head (index 0)
    if (index === 0) {
      this.prepend(value); // Reusing the prepend method
      return;
    }

    // If the list is empty and index is not 0, we can't insert
    if (!this.head && index > 0) {
      throw new Error("List is empty, cannot insert at non-zero index.");
    }

    // If the index is invalid (greater than or equal to the size of the list), throw an error
    if (index < 0 || index > this.size()) {
      throw new Error("Index out of bounds.");
    }

    let newNode = new Node(value);
    let currentNode = this.head;
    let count = 0;

    // Traverse the list to find the position
    while (currentNode) {
      if (count === index - 1) {
        newNode = new Node(value);
        newNode.next = currentNode.next; // Point to the node that was previously at the index
        currentNode.next = newNode; // Link the previous node to the new node
        return;
      }
      count++;
      currentNode = currentNode.next;
    }

    let lastNode = this.last();
    if (lastNode) {
      lastNode.next = newNode; // Append to the last node if index is equal to size
    }
  }

  // Extra credit: This method removes the node at a given index.
  removeAt(index) {
    // If the list is empty, we can't remove anything
    if (!this.head && index > 0) {
      throw new Error("List is already empty.");
    }

    // If the index is invalid (greater than or equal to the size of the list), throw an error
    if (index < 0 || index >= this.size()) {
      throw new Error("Index out of bounds.");
    }

    if (index === 0) {
      this.head = this.head.next; // Update head
      return this.head;
    }
    let currentNode = this.head;
    let previousNode = null;
    let count = 0;

    // Traverse the list to find the position
    while (currentNode) {
      if (count === index) {
        // Update the previous node's next pointer to skip the current node
        previousNode.next = currentNode.next;
        return; // Node removed, exit the function
      }
      previousNode = currentNode; // Move previousNode forward
      currentNode = currentNode.next; // Move currentNode forward
      count++;
    }
  }
  
  // My extra helper, not part of teh assignment: This method empties out the list.
  clear() {
    this.head = null;
  }
}

const list = new LinkedList();

list.append('dog');
list.append('cat');
list.append('parrot');
list.append('hamster');
list.append('snake');
list.append('turtle');
console.log(list.toString());

list.prepend('lion')
list.append('zebra')
console.log(list.size());
console.log(list.first());
console.log(list.last());
console.log(list.at(0));
list.pop('zebra');
console.log(list.contains('cat'));
console.log(list.contains("rat"));
console.log(list.find('snake'));
console.log(list.toString());

list.insertAt('tiger', 1);
console.log(list.toString());

list.removeAt(0)
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

console.log(list2.toString())