/*
* Complexity: 시간 복잡도에 대해서 생각해보세요.
*/

var LinkedList = function() {
  var list = {};
  list.head = null;
  list.tail = null;

  list.addToTail = function(value) {  // O(1)
    let node = Node(value);
    if (!list.head) {
      list.head = node;
      list.tail = list.head;
    } else {
      list.tail.next = node;
      list.tail = list.tail.next;
    }
  };

  list.removeHead = function() {  // O(1)
    if (!list.head) {
      return;
    }
    let formerHead = list.head.value;
    list.head = list.head.next;
    return formerHead;
  };

  list.contains = function(target) {  // O(n)
    if (!list.head) {
      return false;
    }
    let current = list.head;
    while (current) {
      if (current.value === target) {
        return true;
      }
      current = current.next;
    }
    return false;
  };

  return list;
};

var Node = function(value) {
  var node = {};

  node.value = value;
  node.next = null;

  return node;
};
