// Load tasks from local storage when the page loads
document.addEventListener("DOMContentLoaded", function () {
  loadTasks();
});

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  tasks.forEach(function (task, index) {
    addTaskToList(task, index);
  });
}

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskText = taskInput.value.trim();

  if (taskText !== "") {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const newTask = {
      text: taskText,
      completed: false,
    };

    tasks.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    addTaskToList(newTask, tasks.length - 1);
    taskInput.value = "";
  }
}

function addTaskToList(task, index) {
  const taskList = document.getElementById("taskList");
  const taskItem = document.createElement("li");
  taskItem.className = "task-item";
  taskItem.innerHTML = `
      <span class="task-text">${task.text}</span>
      <div>
          <button onclick="toggleTask(${index})">${
    task.completed ? "Uncomplete" : "Complete"
  }</button>
          <button onclick="editTask(${index})">Edit</button>
          <button onclick="deleteTask(${index})">Delete</button>
      </div>
  `;
  if (task.completed) {
    taskItem.classList.add("completed");
  }
  taskList.appendChild(taskItem);
}

function toggleTask(index) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks[index].completed = !tasks[index].completed;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  loadTasks();
}

function editTask(index) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const newText = prompt("Enter new task text:", tasks[index].text);
  if (newText !== null) {
    tasks[index].text = newText.trim();
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
  }
}

function deleteTask(index) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  loadTasks();
}
