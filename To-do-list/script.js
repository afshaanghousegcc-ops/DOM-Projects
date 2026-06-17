let button = document.querySelector(".btn");
let input = document.querySelector(".text");
let list = document.querySelector("#taskList");
let filterBtns = document.querySelectorAll(".filterBtn");
let itemsLeft = document.querySelector("#itemsLeft");
let clearCompleted = document.querySelector("#clearCompleted");

let tasks = [];
let currentFilter = "all";

button.addEventListener("click", addTask);

input.addEventListener("keydown", function(e) {
  if (e.key === "Enter") {
    addTask();
  }
});

function addTask() {
  let value = input.value.trim();

  if (value === "") return;

  tasks.push({
    text: value,
    completed: false
  });

  input.value = "";
  show();
}

filterBtns.forEach(btn => {
  btn.addEventListener("click", function () {
    currentFilter = btn.dataset.filter;
    show();
  });
});

clearCompleted.addEventListener("click", function () {
  tasks = tasks.filter(task => !task.completed);
  show();
});

function show() {
  list.innerHTML = "";

  let filteredTasks = tasks;

  if (currentFilter === "active") {
    filteredTasks = tasks.filter(task => !task.completed);
  }

  if (currentFilter === "completed") {
    filteredTasks = tasks.filter(task => task.completed);
  }

  if (filteredTasks.length === 0) {
    let empty = document.createElement("li");
    empty.classList.add("empty");
    empty.innerText = "Your to-do list is empty!";
    list.appendChild(empty);
  }

  filteredTasks.forEach(function(task) {
    let li = document.createElement("li");

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;

    checkbox.addEventListener("change", function() {
      task.completed = checkbox.checked;
      show();
    });

    let span = document.createElement("span");
    span.innerText = task.text;

    if (task.completed) {
      span.classList.add("completed");
    }

    let delBtn = document.createElement("button");
   delBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
    delBtn.classList.add("delBtn");

    delBtn.addEventListener("click", function() {
      tasks = tasks.filter(t => t !== task);
      show();
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(delBtn);

    list.appendChild(li);
  });

  let activeTasks = tasks.filter(task => !task.completed).length;
  itemsLeft.innerText = `${activeTasks} item${activeTasks !== 1 ? "s" : ""} left`;

  filterBtns.forEach(btn => {
    btn.classList.remove("active");
    if (btn.dataset.filter === currentFilter) {
      btn.classList.add("active");
    }
  });
}

show();
