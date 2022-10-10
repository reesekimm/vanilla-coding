/*
 * Complexity: 시간 복잡도에 대해서 생각해보세요.
 */

var Tree = function(value) {
  // addChild, contains 연결
  var newTree = Object.create(treeMethods);

  newTree.value = value;
  newTree.children = [];

  return newTree;
};

var treeMethods = {};

treeMethods.addChild = function(value) {  // O(1)
  this.children.push(Tree(value));
};

treeMethods.contains = function(target) {  // O(n)
  if (this.value === target) {
    return true;
  }
  if (this.children.length) {
    for (var i = 0; i < this.children.length; i++) {
      if (this.children[i].value === target) {
        return true;
      } else if (this.children[i].contains(target)) {
        return true;
      }
    }
  }
  return false;
};
