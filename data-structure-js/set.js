/*
 * Complexity: 시간 복잡도에 대해서 생각해보세요.
 */

var Set = function() {
  var set = Object.create(setPrototype);
  set._storage = [];
  return set;
};


var setPrototype = {};

setPrototype.add = function(item) {  // O(1)
  if (this.contains(item)) {
    return;
  } else {
    this._storage.push(item);
  }
};

setPrototype.contains = function(item) {  // O(n)
  for (var j = 0; j < this._storage.length; j++) {
    if (this._storage[j] === item) {
      return true;
    }
  }
  return false;
};

setPrototype.remove = function(item) {  // O(n)
  var idx = this._storage.indexOf(item);
  if (idx === -1) {
    return;
  }
  this._storage.splice(idx, 1);
};
