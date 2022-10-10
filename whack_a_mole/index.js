const holes = document.querySelectorAll(".hole");
// holes : NodeList [div.hole.1, div.hole.2, ... , div.hole.9]
const scoreBoard = document.querySelector(".score__score");
const btnStart = document.querySelector(".start");
const btnRetry = document.querySelector(".retry");
const popUp = document.querySelector(".hole__popup");

let score = 0;
let count = 0;
let chances = 10;
let stay = 3000;
let delay = 1000;
let timerIds = [];


function randomHole(holes) {
  const randomSelection = Math.floor(Math.random() * holes.length);
  const selectedHole = holes[randomSelection];
  let lastHole;
  if (selectedHole === lastHole) {
    console.log("same mole again!");
    return randomHole(holes);
  }
  lastHole = selectedHole;
  return selectedHole;
}


function pop() {
  let theMole = randomHole(holes);
  theMole.classList.add("mole");
  
  count++;
  
  if (count <= chances) {
    // start 3sec timer
    timerIds.push(setTimeout(() => {
      theMole.classList.remove("mole");
      timerIds.push(setTimeout(pop, delay));
    }, stay));
  } else {
    endGame();
  }    
}


document.addEventListener("click", (event) => {
  const validMole = document.querySelector(".mole");
  let targetMole = event.target;
  if (targetMole === validMole) {
    score += 10;
    scoreBoard.textContent = score;
    targetMole.classList.remove("mole");
    for (var i = timerIds.length - 1; i >= 0; i--) {
      clearTimeout(timerIds[i]);
    }
    timerIds.length = 0;
    timerIds.push(setTimeout(pop, delay));
  } 
});


function endGame() {
  if (score) {
    popUp.innerText = "Well done!\nYou got me..";
    popUp.classList.add("showing");
  } else {
    popUp.textContent = "GAME OVER!!";
    popUp.classList.add("showing");
  }
}


function startGame() {
  scoreBoard.textContent = 0;
  btnRetry.classList.remove("hide");
  setTimeout(pop, delay);
}


function restartGame() {
  popUp.textContent = "Start again!"
  popUp.classList.add("showing");
  
  const oldMole = document.querySelector(".mole");
  oldMole.classList.remove("mole");
  
  count = 0;
  
  for (var j = timerIds.length - 1; j >= 0; j--) {
    clearTimeout(timerIds[j]);
  }
  timerIds.length = 0;
  
  score = 0;
  scoreBoard.textContent = 0;
  
  setTimeout(function () {
    popUp.classList.remove("showing");
    popUp.textContent = "";
    pop();
  }, stay);
}


btnStart.addEventListener("click", startGame);
btnRetry.addEventListener("click", restartGame);
