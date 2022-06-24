//Importing Algorithm
import {Dijkstra} from './dijkstra.js'
import {BreadthFirstSearch} from './bfs.js'
import {DepthFirstSearch} from './dfs.js'
import {Astar} from './astar.js'

$(document).ready(function () {
  var SIZE = 22;
  var SPEED = 3;
  var ALGORITHM = 1;
  var startid, endid;
  var isDown = false;
  var wall = [];
  var uniqueId;
  var data = new Array(2);

  displayGrid(SIZE);

  $("[type=range]").change(function () {
    var newval = $(this).val();
    if (this.id == "speed") {
      $("#speed_dis").text(newval);
      SPEED = newval;
    } else {
      $("#size_dis").text(newval);
      SIZE = newval;
      startid = undefined;
      endid = undefined;
      displayGrid(SIZE);
    }
  });


  function displayGrid(x) {
    $(".screen").html(" ");
    let screenWidth = $(".screen").innerWidth() / SIZE;

    for (let i = 0; i < x * x; i++) {
      $(".screen").append('<div class="unit" id="' + i + '"></div>');
    }

    $(".unit").css("width", screenWidth + "px");
    $(".unit").css("height", screenWidth + "px");
  }


  $(window).on("resize", function () {
    displayGrid(SIZE);
    startid = undefined;
    endid = undefined;
  });

  
  $('select').on('change', function() {
      let choice = this.value;
      if (choice == 1) {
        $(".title h1").text("Breadth First Search");
      } else if (choice == 2) {
        $(".title h1").text("Depth First Search");
      } else if (choice == 3) {
        $(".title h1").text("Dijkstra Algorithm");
      } else {
        $(".title h1").text("A* Algorithm");
      }
      ALGORITHM = choice;
  });

  
  $("#start").on("click", function () {
    if (startid == undefined || endid == undefined) {
      alert("Select the starting and ending point.");
    } else {
      wallGenerate();
      connectArray(SIZE);
      $("#wall").prop("disabled", true);
      $("#clear").prop("disabled", true);
      $("#size").prop("disabled", true);
      $("#speed").prop("disabled", true);
      $("#start").prop("disabled", true);
      decoder(ALGORITHM);
    }
  });


  function decoder(algo) {
    SPEED = 6 - SPEED;
    if (algo == 1) {
      BreadthFirstSearch(data,startid,endid,SPEED);
    } else if (algo == 2) {
      DepthFirstSearch(data,startid,endid,SPEED);
    } else if (algo == 3) {
      Dijkstra(data,startid,endid,SPEED);
    } else {
     Astar(data,startid,endid,SPEED);
    }
  }

  
  $("body").on("dblclick", ".unit", function () {
    if (startid == undefined) {
      $(this).addClass("target");
      startid = $(this).attr("id");
    } else if (endid == undefined) {
      $(this).addClass("target");
      endid = $(this).attr("id");
    } else {
      //pass;
    }
  });

  
  $("#clear").on("click", function () {
    startid = undefined;
    endid = undefined;
    wall = [];
    $(".unit").addClass("restore");
    data = new Array(2);
    $(".unit").removeClass("animate");
    $(".unit").removeClass("target");
    $(".unit").removeClass("wall");
    $(".unit").removeClass("path");
  });


  $("body").on("mousedown", ".unit", function () {
    isDown = true;
  });

  $("body").on("mouseup", ".unit", function () {
    isDown = false;
  });

  $("body").on("mouseover", ".unit", function () {
    if (isDown && $(this).css("background-color") != "rgb(38, 38, 38)") {
      if ($(this).css("background-color") === "rgb(1, 110, 253)") {
        $(this).addClass("restore");
        $(this).removeClass("wall");
      } else {
        $(this).addClass("wall");
        $(this).removeClass("restore");
      }
      
    }
  });

  $("#wall").on("click", function () {
    wall = 0;
    for (let i = 0; i < SIZE * SIZE; i++) {
      if (i == startid || i == endid) {
        //pass
      } else {
        let x = Math.round(Math.random() * 10);
        if (x == 0 || x == 1 || x == 2) {
          $("#" + i).addClass("wall");
        }
      }
    }
  
  });


  function wallGenerate() {
    wall = [];
    for (let i = 0; i < SIZE * SIZE; i++) {
      let x = $("#" + i).css("background-color");
      if (x == "rgb(1, 110, 253)") {
        wall.push(i);
      }
    }
    
  }

  function connectArray(size) {
    uniqueId = 0;

  
    for (let i = 0; i < size; i++) {
      data[i] = new Array(2);
    }

    
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {

        if(wall.indexOf(uniqueId)==-1){
          data[i][j] = new Spot(i, j, false, uniqueId++);
        }else{
          data[i][j] = new Spot(i, j, true, uniqueId++);
        }
      }
    }

    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        data[i][j].connectFrom(data);
      }
    }

  }

    function Spot(i,j,isWall,id){
      this.i = i;
      this.j = j;
      this.id = id;
      this.isWall = isWall;
      this.neighbors = [];
      this.path = [];
      this.visited = false;
      this.distance = Infinity;
      this.heuristic = 0;
      this.function = this.distance + this.heuristic;
      this.source = "";

      this.connectFrom = function(data){
          var i = this.i;
          var j = this.j;
          if(i>0 && !(data[i-1][j].isWall)){
              this.neighbors.push(data[i-1][j])
          }
          if(i<SIZE-1 && !(data[i+1][j].isWall)){
              this.neighbors.push(data[i+1][j])
          }
          if(j>0 && !(data[i][j-1].isWall)){
              this.neighbors.push(data[i][j-1])
          }
          if(j<SIZE-1 && !(data[i][j+1].isWall)){
              this.neighbors.push(data[i][j+1])
          }
      }

  }


  
  
});
