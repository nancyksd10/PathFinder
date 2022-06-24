var Data;
var Queue = [];
var visited = [];
var gotit;

//Implementing Dijkstra Visualization
export function Dijkstra(arrayData,startNode,endNode,SPEED){

    Data = new Array(2);
    Data = arrayData;
    Queue = [];
    visited = [];
    let f1,f2 = false;
    gotit = false;

    for (let i = 0; i < Data.length; i++) {
        for (let j = 0; j < Data.length; j++) {
            if(Data[i][j].id==startNode){
                startNode = Data[i][j];
                f1=true;
            }
            if(Data[i][j].id==endNode){
                endNode = Data[i][j];
                f2 = true;
            }
        }
        if(f1 && f2){
            break;
        }
    }
    startNode.distance = 0;

    for (let i = 0; i < Data.length; i++) {
        for (let j = 0; j < Data.length; j++) {
            Queue.push(Data[i][j]);
        }
    }

    while(Queue.length!=0){
        var min = getMinDistance(Queue); 
        if(min == undefined){
            break;
        }

        Queue = Queue.filter(item => item !== min); 
        for (let i = 0; i < min.neighbors.length ; i++) {
            if(Queue.indexOf(min.neighbors[i])>=0){         
                let fun = min.distance + 1                  
                if(fun<min.neighbors[i].distance){
                    min.neighbors[i].distance = fun;
                    min.neighbors[i].path = min.id;
                    if(min.neighbors[i].id == endNode.id){
                        gotit = true
                        break;
                    }
                    if(!gotit){
                        visited.push(min.neighbors[i].id);
                    }
                }
            }
        }
    }

    djanimate(visited,startNode,endNode,gotit,SPEED);

}

function getMinDistance(queue){
    var min = Infinity;
    var id;
    for (let i = 0; i < Queue.length; i++) {
        if(Queue[i].distance<min){
            min = Queue[i].distance;
            id = Queue[i];
        }
    }
    return id;
}


function djanimate(data,start,stop,get,speed){

    for (var i = 0; i < data.length; i++) {
        let x = data[i];
            setTimeout(function(){
                $("#"+x).addClass("animate");
            },(i+1)*20*speed);
    }
    if(!get){
        setTimeout(function(){
            alert("Element cannot be found!");
            $("#wall").removeAttr('disabled');
            $("#clear").removeAttr('disabled');
            $("#size").removeAttr('disabled');
            $("#speed").removeAttr('disabled');
            $("#start").removeAttr('disabled');
        },(i+3)*20*speed);
    }

    if(gotit){
        pathAnimate(start,stop,i,speed)
    }
}

function pathAnimate(start,stop,frames,speed){
    let nodes = frames;
    var x = stop;
    var trace = [];

    while (x != start) {
      let path = x.path;
      trace.push(path);
      for (let i = 0; i < Data.length; i++) {
        for (let j = 0; j < Data.length; j++) {
          if (Data[i][j].id == path) {
            x = Data[i][j];
          }
        }
      }
    }

    for (let i = trace.length - 2; i >= 0; i--) {
        setTimeout(function () {
          $("#" + trace[i]).addClass("path");
        }, ++frames * 20*speed);
    }

    setTimeout(function(){
        alert("Element Found! \nPath Distance : "+ (trace.length - 1) +"\nNode visited after searching "+(nodes)+" nodes.");
        $("#wall").removeAttr('disabled');
        $("#clear").removeAttr('disabled');
        $("#size").removeAttr('disabled');
        $("#speed").removeAttr('disabled');
        $("#start").removeAttr('disabled');
    },(++frames+2)*20*speed);


}
