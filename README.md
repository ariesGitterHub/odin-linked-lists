# odin-linked-lists

## Assignment
If you wish to use multiple ES6 modules, remember that Node uses CommonJS modules by default and so you must tell Node to use ES6 modules instead.

You will need two classes or factories:

1. _LinkedList_ class / factory, which will represent the full list.
2. _Node_ class / factory, containing a _value_ property and a _nextNode_ property, set both as _null_ by default.

Build the following functions in your linked list class / factory:
1. _append(value)_ adds a new node containing _value_ to the end of the list
2. _prepend(value)_ adds a new node containing _value_ to the start of the list
3. _size_ returns the total number of nodes in the list
4. _head_ returns the first node in the list
5. _tail_ returns the last node in the list
6. _at(index)_ returns the node at the given _index_
7. _pop_ removes the last element from the list
8. _contains(value)_ returns true if the passed in value is in the list and otherwise returns false.
9. _find(value)_ returns the index of the node containing value, or null if not found.
10. _toString_ represents your LinkedList objects as strings, so you can print them out and preview them in the console. The format should be: _( value ) -> ( value ) -> ( value ) -> null_

Extra credit
1. _insertAt(value, index)_ that inserts a new node with the provided _value_ at the given _index_.
2. _removeAt(index)_ that removes the node at the given _index_.

**Extra Credit Tip**: When you insert or remove a node, consider how it will affect the existing nodes. Some of the nodes will need their _nextNode_ link updated.

