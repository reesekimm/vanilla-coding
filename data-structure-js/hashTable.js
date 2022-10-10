/*
 * Complexity: 시간 복잡도에 대해서 생각해보세요.
 */

var HashTable = function() {
  this._limit = 8;
  this._storage = LimitedArray(this._limit);
};

HashTable.prototype.insert = function(k, v) {  // O(1) (No collision)
  var index = getIndexBelowMaxForKey(k, this._limit);
  if (!this._storage.get(index)) {
    this._storage.set(index, [[k, v]]);
  } else {
    // same key?
    var arrInsideIndex = this._storage.get(index); // storage[index]
    var check = 0;
    for (var i = 0; i < arrInsideIndex.length; i++) {
      if (arrInsideIndex[i][0] === k) {
        arrInsideIndex[i][1] = v;
        check++;
        break;
      }
    }
    if (!check) {
      arrInsideIndex.push([k, v]);
    }
  }

  // check storage
  var occupied = 0;
  this._storage.each(function size(el) {
    if (el) {
      occupied++;
    }
  });

  // resize table
  if (occupied / this._limit > 0.6) {
    // store former data
    var formerData = [];

    this._storage.each(function c(e) {
      if (e) {
        for (var ii = 0; ii < e.length; ii++) {
          formerData.push(e[ii]);
        }
      }
    });

    // resize storage
    this._limit *= 2;
    this._storage = LimitedArray(this._limit);

    // reassign data
    var that = this;

    formerData.forEach(function(a) {
      var idx = getIndexBelowMaxForKey(a[0], that._limit);
      that._storage.set(idx, [[a[0], a[1]]]);
    });
  }
};

HashTable.prototype.retrieve = function(k) {  // O(1) (No collision)
  var index = getIndexBelowMaxForKey(k, this._limit);
  var arr = this._storage.get(index);
  if (arr) {
    for (var j = 0; j < arr.length; j++) {
      if (arr[j][0] === k) {
        return arr[j][1];
      }
    }
  }
  return undefined;
};

HashTable.prototype.remove = function(k) {  // O(1) (No collision)
  var index = getIndexBelowMaxForKey(k, this._limit);
  var array = this._storage.get(index);
  for (var z = 0; z < array.length; z++) {
    if (array[z][0] === k) {
      array.splice(z, 1);
      break;
    }
  }
  if (!array.length) {
    array = undefined;
  }

  // halve in size
  var filled = 0;
  this._storage.each(function size(el) {
    if (el) {
      filled++;
    }
  });

  if (filled / this._limit < 0.6) {
    // store former data
    var formerValues = [];

    this._storage.each(function c(e) {
      if (e) {
        for (var ii = 0; ii < e.length; ii++) {
          formerValues.push(e[ii]);
        }
      }
    });

    // resize storage
    this._limit *= 0.5;
    this._storage = LimitedArray(this._limit);

    var that = this;

    // reassign data
    formerValues.forEach(function(a) {
      var idx = getIndexBelowMaxForKey(a[0], that._limit);
      that._storage.set(idx, a[1]);
    });
  }
};
