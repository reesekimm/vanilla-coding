// Load application styles
import "styles/index.less";


const MIN = 5;
const MAX = 10;
const selectAlgo = document.querySelector(".menu_selection")
const numsInput = document.getElementById("myNums");
const startBtn = document.querySelector(".menu_start-btn");
const canvas = document.querySelector(".canvas");
const blocks = canvas.children;
const bubbleSteps = [];
const quickSteps = [];
let timerIds = [];


function start(e) {
  const input = submitNums(e);
  if (selectAlgo.value === "bubble") {
    bubbleSort(input);
    triggerBubble();
  }
  if (selectAlgo.value === "quick") {
    quickSort(input);
    triggerQuick();
  }
}


startBtn.addEventListener("click", start);


function submitNums(event) {
  event.preventDefault();
  const numsStr = numsInput.value;
  const numsArr = numsStr.split(",").map(parseFloat); // [1, 2, 5, 3, 7] array of nums
  var length = numsArr.length;

  if (numsArr.some(isNaN)) {
    return alert("Only NUMBERS can be entered.");
  }
  if (length < MIN) {
    return alert("Please enter at least 5 numbers.");
  }
  if (length > MAX) {
    return alert("You can enter up to 10 numbers.");
  }

  clearCanvas();
  clearTimerIds();
  bubbleSteps.length = 0;
  quickSteps.length = 0;

  makeNumBlocks(numsArr);
  numsInput.value = "";

  return numsArr;
}


function clearCanvas() {
  while (canvas.firstChild) {
    canvas.removeChild(canvas.firstChild);
  }
}


function clearTimerIds() {
  for (var i = 0; i < timerIds.length; i++) {
    clearTimeout(timerIds[i]);
  }
  timerIds.length = 0;
}


function makeNumBlocks(data) {
  var i, max, min, height, html = "";

  max = min = data[0];

  for (i = 0; i < data.length; i++) {
    if (max < data[i]) max = data[i];
    if (min > data[i]) min = data[i];
  }

  for (i = 0; i < data.length; i++) {
    height = 10 + Math.round(100 * ((data[i] - min) / max));
    html += '<div class="bar" style="height:' + height + '%; left:' + (20 * i) + 'px">' + `<span> ${data[i]} </span>` + '</div>';
  }

  canvas.innerHTML = html;
}



/*

Bubble Sort

*/



function bubbleSort(arr) {
  var i, j, temp;
  var length = arr.length;
  for (i = 0; i < length; i++) {
    for (j = 0; j < length - 1 - i; j++) {
      bubbleSteps.push({type: "bubble compare", indice: [j, j + 1]});
      if (arr[j] > arr[j + 1]) {
        bubbleSteps.push({type: "bubble swap", indice: [j, j + 1]});
        temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
    bubbleSteps.push({type: "bubble complete", index: arr.length - i - 1});
  }
}


function triggerBubble() {
  bubbleSteps.forEach(function (el, index) {
    timerIds.push(setTimeout(function () {
      visualizeBubble(el);
    }, 1000 * (index + 1)));
  });
}


function visualizeBubble(el) {
  switch(el.type) {
    case "bubble compare":
      compare(el.indice);
      break;
    case "bubble swap":
      swapBubble(el.indice);
      break;
    case "bubble complete":
      complete(el.index);
      break;
  }
}


function compare(indice) {
  const [i, j] = indice;

  blocks[i].classList.add("gray");
  blocks[j].classList.add("gray");

  timerIds.push(setTimeout(function () {
    blocks[i].classList.remove("gray");
    blocks[j].classList.remove("gray");
  }, 500));
}


function swapBubble(indice) {
  const [i, j] = indice;

  blocks[i].classList.add("moveRight");
  blocks[j].classList.add("moveLeft");

  timerIds.push(setTimeout(function () {
    blocks[i].classList.remove("moveRight");
    blocks[j].classList.remove("moveLeft");
    canvas.insertBefore(blocks[j], blocks[i]);
  }, 500));
}


function complete(index) {
  blocks[index].classList.add("green");
}



/*

Quick Sort

*/



// sorting part
function partition(arr, left, right, pivotIdx) {
  var l = left;
  var r = right;
  var tmp;

  var pivotVal = arr[pivotIdx];
  quickSteps.push({type: "show pivot", index: pivotIdx});

  while (l <= r) {
    while (arr[l] < pivotVal) {
      quickSteps.push({type: "check left", index: l});
      l++;
    }
    while (arr[r] > pivotVal) {
      quickSteps.push({type: "check right", index: r});
      r--;
    }
    if (l <= r) {
      quickSteps.push({type: "check left", index: l});
      quickSteps.push({type: "check right", index: r});
      quickSteps.push({type: "quick swap", indice: [l, r]});
      tmp = arr[l];
      arr[l] = arr[r];
      arr[r] = tmp;
      l++;
      r--;
    }
  }
  quickSteps.push({type: "clear"});
  quickSteps.push({type: "quick swap", indice: [l, pivotIdx]});
  quickSteps.push({type: "remove pivot", index: l});
  tmp = arr[l];
  arr[l] = arr[pivotIdx];
  arr[pivotIdx] = tmp;

  return l;
}


// start & recursion part
function quickSort(arr, left = 0, right = arr.length - 1) {

  var pivotIdx = right;
  quickSteps.push({type: "remove pivot", index: pivotIdx});

  pivotIdx = partition(arr, left, right - 1, pivotIdx);
  quickSteps.push({type: "quick complete", index: pivotIdx});

  if (left < pivotIdx - 1) {
    quickSort(arr, left, pivotIdx - 1);
  }
  if (pivotIdx + 1 < right) {
    quickSort(arr, pivotIdx + 1, right);
  }
  quickSteps.push({type: "quick complete", index: left});
  quickSteps.push({type: "quick complete", index: right});
}


function triggerQuick() {
  quickSteps.forEach(function (el, index) {
    timerIds.push(setTimeout(function () {
      visualizeQuick(el);
    }, 1000 * (index + 1)));
  });
}


function visualizeQuick(el) {
  switch (el.type) {
    case "show pivot":
      markPivot(el.index);
      break;
    case "check left":
    case "check right":
      check(el.index);
      break;
    case "clear":
      clearBlocks();
      break;
    case "quick swap":
      swapQuick(el.indice);
      break;
    case "remove pivot":
      removePivot(el.index);
      break;
    case "quick complete":
      quickComplete(el.index);
      break;
  }
}


function markPivot(index) {
  blocks[index].classList.add("cherry");
}


function removePivot(index) {
  blocks[index].classList.remove("cherry");
}


function check(index) {
  blocks[index].classList.add("gray");
}


function clearBlocks() {
  for (let block of blocks) {
    block.classList.remove("gray");
  }
}


function swapQuick(indice) {
  const [i, j] = indice;

  let posI = blocks[i].offsetLeft;
  let posJ = blocks[j].offsetLeft;
  let gap = Math.abs(posI - posJ);

  let clonedBlock1 = blocks[i].cloneNode(true);
  let clonedBlock2 = blocks[j].cloneNode(true);

  blocks[i].style.transform = `translateX(${gap}px)`;
  blocks[j].style.transform = `translateX(-${gap}px)`;

  timerIds.push(setTimeout(function () {
    blocks[i].style.transform = `translateX(0)`;
    blocks[j].style.transform = `translateX(0)`;
    canvas.replaceChild(clonedBlock1, blocks[j]);
    canvas.replaceChild(clonedBlock2, blocks[i]);
  }, 500));
}


function quickComplete(index) {
  blocks[index].classList.add("green");
}
