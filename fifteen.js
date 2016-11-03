// JavaScript Document


var moveCount = 0;
var offset;
var clock;
var interval;

window.onload = function(e){

  
  var heading = document.getElementsByTagName("h1");
  var puzzleArea = document.getElementById("puzzlearea");
  var puzzlePieces = puzzleArea.getElementsByTagName("div");
  var shuffleButton = document.getElementById("shufflebutton");

  var self = this;
  var setup = false;
  var timer = createTimer();
  var options = {};
  
  
  options.delay = 1;
  
   
  heading[0].appendChild(timer);

  
  if (!setup){
    var playingArea = self.setup();
  }

  
  for( var count = 0; count < puzzlePieces.length; count++){

    puzzlePieces[count].onclick = function(element){

      
      if ( element.target.className == "puzzlepiece movablepiece"){

        moveCount++;
        playingArea = self.moveElement(playingArea, element.target.innerHTML);
      }
    }
  }

  
  shuffleButton.onclick = function(){

    playingArea =  shufflePlayingArea(playingArea);
    //resetTimer();
    //startTimer();
  }

 
  function startTimer() {
    
    if (!interval) {
      offset = Date.now();
      interval = setInterval(update, options.delay);
    }
  }


  
  function update() {
    clock += delta();
    displayTimer();
  }

  function displayTimer() {
    timer.innerHTML = "<br>Moves: " + moveCount + "<br> Elapsed Time: " + parseInt(clock/1000) + " second(s)";
  }

 
  function resetTimer() {
  clock = 0;
  displayTimer();
  }

 
  function delta() {
    var now = Date.now(),
        d   = now - offset;

    offset = now;
    return d;
  }
}


function setup(){

  document.body.style.backgroundImage = "url('http://planestories.iata.org/wp-content/uploads/2015/10/curious-400x400.jpg')";
  var puzzleArea = document.getElementById("puzzlearea");
  var puzzlePieces = puzzleArea.getElementsByTagName("div");

  var backgroundCordinateY = 0;
  var backgroundCordinateX = 0;

  for( var count = 0; count < puzzlePieces.length; count++){

    puzzlePieces[count].setAttribute("class", "puzzlepiece");
    puzzlePieces[count].style.position = "relative";
    puzzlePieces[count].style.float = "left";
    puzzlePieces[count].style.backgroundPosition = backgroundCordinateX + "px " + backgroundCordinateY + "px";
    puzzlePieces[count].style.top = "0px";
    puzzlePieces[count].style.right = "0px";
    puzzlePieces[count].style.bottom = "0px";
    puzzlePieces[count].style.left = "0px";

    
    if (backgroundCordinateX != -300 ){

      backgroundCordinateX -= 100;

    }
    else{

      backgroundCordinateX = 0;
      backgroundCordinateY -= 100;

     }
  }

 
  puzzlePieces[11].setAttribute("class", "puzzlepiece movablepiece");
  puzzlePieces[14].setAttribute("class", "puzzlepiece movablepiece");

  
  
  return [  [null,2,5,null], [null,3,6,1], [null,4,7,2], [null,null,8,3], 
            [1,6,9,null], [2,7,10,5], [3,8,11,6], [4,null,12,7], 
            [5,10,13,null], [6,11,14,9], [7,12,15,10], [8,null,16,11], 
            [9,14,null,null], [10,15,null,13], [11,16,null,14], [12,null,null,15] 
          ];
}


function moveElement(playingArea, element) {

  
  var puzzleArea = document.getElementById("puzzlearea");
  var puzzlePieces = puzzleArea.getElementsByTagName("div");

  
  if(playingArea[element - 1][0] == 16){
      
   return movePieceUp(playingArea, element, puzzlePieces);
  }
  else if(playingArea[element - 1][1] == 16){
      
    return movePieceRight(playingArea, element, puzzlePieces);
  }
  else if(playingArea[element - 1][2] == 16){
      
    return movePieceDown(playingArea, element, puzzlePieces);
  }
  else if(playingArea[element - 1][3] == 16){

    return movePieceLeft(playingArea, element, puzzlePieces);
  }
}


function fixMovability(blankCell){

  document.body.style.backgroundImage = "url('http://planestories.iata.org/wp-content/uploads/2015/10/curious-400x400.jpg')";
  var puzzleArea = document.getElementById("puzzlearea");
  var puzzlePieces = puzzleArea.getElementsByTagName("div");

  
  for( var count = 0; count < puzzlePieces.length; count++){

    puzzlePieces[count].setAttribute("class", "puzzlepiece");
  }

  
  for (var count = 0; count < blankCell.length; count++){

    if(blankCell[count] != null){
      puzzlePieces[blankCell[count]-1].setAttribute("class", "puzzlepiece movablepiece");
    }
  }
}


function movePieceDown(playingArea, element, puzzlePieces){

  
  var topVal = parseInt(puzzlePieces[element - 1].style.top, 10);

  
  puzzlePieces[element - 1].style.top = (topVal + 100) + "px"; 

  
  
  if ( playingArea[element - 1][0] != null){ playingArea[playingArea[element - 1][0] -1][2] = 16 }
  if ( playingArea[element - 1][1] != null){ playingArea[playingArea[element - 1][1] -1][3] = 16 }
  if ( playingArea[element - 1][3] != null){ playingArea[playingArea[element - 1][3] -1][1] = 16 }

      
  if ( playingArea[16 - 1][1] != null){ playingArea[playingArea[16 - 1][1] -1][3] = playingArea[16 - 1][0] }
  if ( playingArea[16 - 1][2] != null){ playingArea[playingArea[16 - 1][2] -1][0] = playingArea[16 - 1][0] }
  if ( playingArea[16 - 1][3] != null){ playingArea[playingArea[16 - 1][3] -1][1] = playingArea[16 - 1][0] }      

  var swap = playingArea[element - 1];

  playingArea[element - 1] = playingArea[15];
  playingArea[element - 1][0] = 16;

  playingArea[15] = swap; 

  playingArea[15][2] = parseInt(element, 10);

  fixMovability(playingArea[15]);

  return playingArea;
}


function movePieceUp(playingArea, element, puzzlePieces){

  
  var topVal = parseInt(puzzlePieces[element - 1].style.top, 10);
  
  
  puzzlePieces[element - 1].style.top = (topVal - 100) + "px"; 

  
  if ( playingArea[element - 1][2] != null){ playingArea[playingArea[element - 1][2] -1][0] = 16 }
  if ( playingArea[element - 1][1] != null){ playingArea[playingArea[element - 1][1] -1][3] = 16 }
  if ( playingArea[element - 1][3] != null){ playingArea[playingArea[element - 1][3] -1][1] = 16 }

      
  if ( playingArea[16 - 1][1] != null){ playingArea[playingArea[16 - 1][1] -1][3] = playingArea[16 - 1][2] }
  if ( playingArea[16 - 1][0] != null){ playingArea[playingArea[16 - 1][0] -1][2] = playingArea[16 - 1][2] }
  if ( playingArea[16 - 1][3] != null){ playingArea[playingArea[16 - 1][3] -1][1] = playingArea[16 - 1][2] }  


  var swap = playingArea[element -1];

  playingArea[element - 1] = playingArea[15];
  playingArea[element - 1][2] = 16;
  playingArea[15] = swap; 
  playingArea[15][0] = parseInt(element, 10);
  fixMovability(playingArea[15]);

  return playingArea;
}


function movePieceRight(playingArea, element, puzzlePieces){

  
  var leftVal = parseInt(puzzlePieces[element - 1].style.left, 10);
  
  
  puzzlePieces[element - 1].style.left = (leftVal + 100) + "px"; 

  
  
  if ( playingArea[element - 1][0] != null){ playingArea[playingArea[element - 1][0] -1][2] = 16 }
  if ( playingArea[element - 1][2] != null){ playingArea[playingArea[element - 1][2] -1][0] = 16 }
  if ( playingArea[element - 1][3] != null){ playingArea[playingArea[element - 1][3] -1][1] = 16 }

      
  if ( playingArea[16 - 1][0] != null){ playingArea[playingArea[16 - 1][0] -1][2] = playingArea[16 - 1][3] }
  if ( playingArea[16 - 1][1] != null){ playingArea[playingArea[16 - 1][1] -1][3] = playingArea[16 - 1][3] }
  if ( playingArea[16 - 1][2] != null){ playingArea[playingArea[16 - 1][2] -1][0] = playingArea[16 - 1][3] } 
  

  var swap = playingArea[element - 1];
  playingArea[element - 1] = playingArea[15];
  playingArea[element - 1][3] = 16;
  playingArea[15] = swap; 
  playingArea[15][1] = parseInt(element, 10);
  self.fixMovability(playingArea[15]);

  return playingArea;
}


function movePieceLeft(playingArea, element, puzzlePieces){

  
  var leftVal = parseInt(puzzlePieces[element - 1].style.left, 10);
  
  
  puzzlePieces[element - 1].style.left = (leftVal - 100) + "px"; 


  
  if ( playingArea[element - 1][0] != null){ playingArea[playingArea[element - 1][0] -1][2] = 16 }
  if ( playingArea[element - 1][1] != null){ playingArea[playingArea[element - 1][1] -1][3] = 16 }
  if ( playingArea[element - 1][2] != null){ playingArea[playingArea[element - 1][2] -1][0] = 16 }

      
  if ( playingArea[16 - 1][0] != null){ playingArea[playingArea[16 - 1][0] -1][2] = playingArea[16 - 1][1] }
  if ( playingArea[16 - 1][2] != null){ playingArea[playingArea[16 - 1][2] -1][0] = playingArea[16 - 1][1] }
  if ( playingArea[16 - 1][3] != null){ playingArea[playingArea[16 - 1][3] -1][1] = playingArea[16 - 1][1] } 
  
  var swap = playingArea[element - 1];
  
  playingArea[element - 1] = playingArea[15];
  playingArea[element - 1][1] = 16;
  playingArea[15] = swap; 
  playingArea[15][3] = parseInt(element, 10);
  fixMovability(playingArea[15]);

  return playingArea;
}

 
function shufflePlayingArea(playingArea){

 
  var randomInt = Math.floor((Math.random() * 4));

  
  for ( var count = 0; count < 50; count++){

    
    while(playingArea[15][randomInt] == null){ randomInt = Math.floor((Math.random() * 4))}

    playingArea = moveElement(playingArea, playingArea[15][randomInt]);

    randomInt = Math.floor((Math.random() * 4));

  }

 
  moveCount = 0;

  return playingArea;
}


function createTimer() {
  return document.createElement("span");
}