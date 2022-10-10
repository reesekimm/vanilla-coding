/*

Calendar Part

*/


const today = new Date();
let currentYear = today.getFullYear();
let currentMonth = today.getMonth(); // return 0 ~ 11
let currentDate = today.getDate();

let selectedDay = document.querySelector(".sel-day");
let selectedDate = document.querySelector(".sel-date");

const preBtn = document.querySelector(".fa-chevron-left");
const nextBtn = document.querySelector(".fa-chevron-right");

let BEGINNING_YEAR = 2000;
let THE_LAST_YEAR = 2030;

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

let monthAndYear = document.querySelector(".header-text");
let cells = document.getElementsByTagName("td"); // HTMLCollection 유사배열객체
let cellsArr = Array.prototype.slice.apply(cells);


function showCalendar(year, month) {
    // clear previous month, year, date
    function clearCalendar() {
        monthAndYear.textContent = "";
        cellsArr.forEach(function (el) {
            el.textContent = "";
        });
    }
    clearCalendar();

    // show current month and year
    monthAndYear.textContent = `${MONTHS[month]} ${year}`;

    // fill out calendar
    let firstDay = new Date(year, month).getDay();
    let numOfDays = 32 - new Date(year, month, 32).getDate();
    for (var i = firstDay, j = 1; j <= numOfDays; i++, j++) {
        let cell = cellsArr[i];
        cell.textContent = j.toString();
    }
}


function previous() {
    if (currentMonth === 0) {
        if (currentYear > BEGINNING_YEAR) {
            currentMonth = 11;
            currentYear = currentYear - 1;
        } else {
            alert("Sorry, this is the first month of this calendar!");
        }
    } else {
        currentMonth = currentMonth - 1;
    }

    // remove mark
    for (var ix = 0; ix < cellsArr.length; ix++) {
        if (cellsArr[ix].classList.contains("clicked")) {
            cellsArr[ix].classList.remove("clicked");
            break;
        }
    }

    showCalendar(currentYear, currentMonth);
}


function next() {
    if (currentMonth === 11) {
        if (currentYear < THE_LAST_YEAR) {
            currentMonth = 0;
            currentYear = currentYear + 1;
        } else {
            alert("Sorry, this is the last month of this calendar!");
        }
    } else {
        currentMonth = currentMonth + 1;
    }

    // remove mark
    for (var ix = 0; ix < cellsArr.length; ix++) {
        if (cellsArr[ix].classList.contains("clicked")) {
            cellsArr[ix].classList.remove("clicked");
            break;
        }
    }

    showCalendar(currentYear, currentMonth);
}


preBtn.addEventListener("click", previous);
nextBtn.addEventListener("click", next);


function showSelectedDate() {
    let cellIdx = cellsArr.indexOf(event.target);
    let date = cellsArr[cellIdx];

    if (date.textContent) {
        // renew mark
        function showMark() {
            cellsArr.forEach(function (k) {
                k.classList.remove("clicked");
            });
            date.classList.add("clicked");
        }
        showMark();

        // clear previously selected date
        selectedDay.textContent = "";
        selectedDate.textContent = "";

        // show currently selected date
        selectedDay.textContent = DAYS[cellIdx % 7];
        selectedDate.textContent = date.textContent;
    }
}

// click date
cellsArr.forEach(function (c) {
    c.addEventListener("click", showSelectedDate);
    c.addEventListener("click", showTodos);
});



/*

To-do Part

*/



const todoForm = document.querySelector(".todo-form");
const todoInput = document.getElementById("myInput");
const todoList = document.querySelector(".todo-list");

function Todo(date, id, task) {
    this.date = date;
    this.id = id;
    this.task = task;
}

const todoKeyName = "myTodoList";
let todos = [];


function showTodos() {
    let todoDate = `${currentYear}-${currentMonth + 1}-${selectedDate.textContent}`;
    let LIs = document.getElementsByTagName("li");
    let LIsArr = Array.prototype.slice.apply(LIs);
    for (var indx = 0; indx < LIsArr.length; indx++) {
        if (LIsArr[indx].classList.contains(todoDate)) {
            LIsArr[indx].classList.remove("hide");
        } else {
            if (!LIsArr[indx].classList.contains("hide")) {
                LIsArr[indx].classList.add("hide");
            }
        }
    }
}


function parseTodos() {
    const todoJson = localStorage.getItem(todoKeyName);
    if (todoJson) {
        var todoObj = JSON.parse(todoJson);
        todoObj.forEach(function (el) {
            makeTodoLI(el.date, el.task);
        });
    }
}


function makeTodoLI(date, task) {
    const li = document.createElement("li");

    const taskValue = document.createTextNode(task);
    const btnSpan = document.createElement("span");
    btnSpan.textContent = "\u00D7";
    btnSpan.setAttribute("class", "delete");
    btnSpan.onclick = deleteTodo;

    li.appendChild(taskValue);
    li.appendChild(btnSpan);

    todoList.appendChild(li);

    li.classList.add(date);
    li.classList.add("hide");
}


function makeTodoObj(text) {
    let date = `${currentYear}-${currentMonth + 1}-${selectedDate.textContent}`;
    let id = todos.length;
    let task = text;

    var todoItem = new Todo(date, id, task);
    todos.push(todoItem);
    saveTodos();
}


function saveTodos() {
    localStorage.setItem(todoKeyName, JSON.stringify(todos));
}


function submitTodo(event) {
    let dateInfo = `${currentYear}-${currentMonth + 1}-${selectedDate.textContent}`;
    event.preventDefault();
    const currentValue = todoInput.value;
    makeTodoLI(dateInfo, currentValue);
    makeTodoObj(currentValue);
    showTodos();
    todoInput.value = "";
}


todoForm.addEventListener("submit", submitTodo);


// check todo task
todoList.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
    }
});


// give alert to select date
function selectDate() {
    let marked = document.querySelector(".clicked");
    if (!marked) {
        alert("Please select a date.");
    }
}

todoInput.addEventListener("click", selectDate);


function deleteTodo() {
    let check = confirm("Do you want to delete it?");
    if (check) {
        // remove from the page
        const btn = event.target;
        const btnLI = btn.parentNode;
        todoList.removeChild(btnLI);

        // remove from the todos array
        for (var findTask = 0; findTask < todos.length; findTask++) {
            let btnIncludedText = btnLI.textContent;
            let pureText = btnIncludedText.slice(0, btnIncludedText.length - 1);
            if (todos[findTask].task === pureText) {
                todos.splice(findTask, 1);
                break;
            }
        }
        saveTodos();
    }
}


function init() {
    showCalendar(currentYear, currentMonth);

    // show today's day and date
    selectedDay.textContent = DAYS[today.getDay()];
    selectedDate.textContent = today.getDate().toString();

    // mark today
    for (var idx = 0; idx < cellsArr.length; idx++) {
        if (cellsArr[idx].textContent == currentDate) {
            cellsArr[idx].classList.add("clicked");
            break;
        }
    }

    // load todolist
    parseTodos();
    showTodos();
}

init();
