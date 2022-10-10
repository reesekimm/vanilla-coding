/*
 * Complexity: 시간 복잡도에 대해서 생각해보세요.
 */

var NewNode = function(key) {
  this.value = key;
  this.left = null;
  this.right = null;
};

var BinarySearchTree = function(value) {
  var bst = new NewNode(value);

  bst.insert = function(value) {  // O(log n)
    var nNod = new NewNode(value);

    if (!bst.value) {
      return (bst.value = nNod);
    }

    var current = bst;
    var parent;
    while (true) {
      parent = current; // current를 parent로 지정
      if (value < current.value) {
        if (parent.left === null) {
          parent.left = nNod;
          break;
        }
        current = parent.left;
      } else {
        if (parent.right === null) {
          parent.right = nNod;
          break;
        }
        current = parent.right;
      }
    }
  };

  bst.contains = function(value) {  // O(log n)
    var curr = bst;
    while (curr.value !== value) {
      if (value < bst.value) {
        curr = curr.left;
      } else {
        curr = curr.right;
      }
      if (curr === null) {
        return false;
      }
    }
    return true;
  };

  bst.depthFirstLog = function(func) {  // O(n)
    function depthFirstSearch(node) {
      if (node) {
        func(node.value);
        depthFirstSearch(node.left);
        depthFirstSearch(node.right);
      }
    }
    return depthFirstSearch(bst);
  };

  return bst;
};
