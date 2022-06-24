"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BreadthFirstSearch = BreadthFirstSearch;
var Data;
var Queue = [];
var visited = []; //Implementing BFS Traversal

function BreadthFirstSearch(arrayData, startNode, endNode, SPEED) {
  Data = new Array(2);
  Data = arrayData;
  Queue = [];
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


  Queue.push(startNode);
  visited.push(startNode); 
  

  while (Queue.length != 0) {
    var x = Queue.shift(); 

    for (var _i = 0; _i < x.neighbors.length; _i++) {
      if (checkVisitedNode(x.neighbors[_i])) {
        Queue.push(x.neighbors[_i]);
        visited.push(x.neighbors[_i]);
      }
    }
  }

  bfsAnimate(visited, endNode, SPEED);
} 


function checkVisitedNode(node) {
  for (var i = 0; i < visited.length; i++) {
    if (node == visited[i]) {
      return false;
    }
  }

  return true;
} 


function bfsAnimate(data, stop, speed) {
  var notfound = true;

  var _loop = function _loop() {
    var x = data[i].id;

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