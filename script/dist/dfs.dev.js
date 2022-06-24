"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DepthFirstSearch = DepthFirstSearch;
var Data;
var visited = [];
var spotted = false; //Implementing BFS Traversal

function DepthFirstSearch(arrayData, startNode, endNode, SPEED) {
  Data = new Array(2);
  Data = arrayData;
  visited = []; 

  var found = false;

  for (var i = 0; i < Data.length; i++) {
    for (var j = 0; j < Data.length; j++) {
      if (Data[i][j].id == startNode) {
        startNode = Data[i][j];
        found = true;
        break;
      }

      if (found) {
        break;
      }
    }
  } 


  graphTraversal(startNode, endNode);
  dfsanimate(visited, endNode, SPEED);
} 


function graphTraversal(node, stop) {
  
  if (spotted) {
  } else {
    node.visited = true;
    visited.push(node.id);

    for (var i = 0; i < node.neighbors.length; i++) {
      if (!node.neighbors[i].visited) {
        graphTraversal(node.neighbors[i]);
      }
    }

    if (node == stop) {
      spotted = true;
    }
  }
} 


function dfsanimate(data, stop, speed) {
  var notfound = true;

  var _loop = function _loop() {
    var x = data[i];

    if (x != stop) {
      setTimeout(function () {
        $("#" + x).addClass("animate");
      }, (i + 1) * 20 * speed);
    } else {
      notfound = false;
      setTimeout(function () {
        alert("Element Found! \nNode visited after searching " + (i - 1) + " nodes.");
        $("#wall").removeAttr('disabled');
        $("#clear").removeAttr('disabled');
        $("#size").removeAttr('disabled');
        $("#speed").removeAttr('disabled');
        $("#start").removeAttr('disabled');
      }, (i + 3) * 20 * speed);
      return "break";
    }
  };

  for (var i = 1; i < data.length; i++) {
    var _ret = _loop();

    if (_ret === "break") break;
  }

  if (notfound) {
    setTimeout(function () {
      alert("Element cannot be found!");
      $("#wall").removeAttr('disabled');
      $("#clear").removeAttr('disabled');
      $("#size").removeAttr('disabled');
      $("#speed").removeAttr('disabled');
      $("#start").removeAttr('disabled');
    }, (i + 3) * 20 * speed);
  }
}