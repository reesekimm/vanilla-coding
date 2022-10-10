/*
 * Complexity: 시간 복잡도에 대해서 생각해보세요.
 */

// ------------------------
// Instantiate a new graph
var Graph = function() {
  this.storage = {};
};

// ------------------------
// Add a node to the graph, passing in the node's value.
Graph.prototype.addNode = function(node) {
  this.storage[node] = {};
};

// ------------------------
// Return a boolean value indicating if the value passed to contains is represented in the graph.
Graph.prototype.contains = function(node) {
  return this.storage.hasOwnProperty(node);
};

// ------------------------
// Removes a node from the graph.
Graph.prototype.removeNode = function(node) {
  for (var connectedNode in this.storage[node]) {
    delete this.storage[connectedNode][node];
  }
  delete this.storage[node];
};

// ------------------------
// Returns a boolean indicating whether two specified nodes are connected.  Pass in the values contained in each of the two nodes.
Graph.prototype.hasEdge = function(fromNode, toNode) {
  if (this.storage[fromNode].hasOwnProperty(toNode)) {
    return true;
  }
  return false;
};

// ------------------------
// Connects two nodes in a graph by adding an edge between them.
Graph.prototype.addEdge = function(fromNode, toNode) {
  if (
    this.storage.hasOwnProperty(fromNode) &&
    this.storage.hasOwnProperty(toNode)
  ) {
    this.storage[fromNode][toNode] = true;
    this.storage[toNode][fromNode] = true;
  }
};

// ------------------------
// Remove an edge between any two specified (by value) nodes.
Graph.prototype.removeEdge = function(fromNode, toNode) {
  delete this.storage[fromNode][toNode];
  delete this.storage[toNode][fromNode];
};

// ------------------------
// Pass in a callback which will be executed on each node of the graph.
Graph.prototype.forEachNode = function(callBack) {
  for (var nodes in this.storage) {
    callBack(nodes);
  }
};
