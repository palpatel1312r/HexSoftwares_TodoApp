let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function displayTasks() {
  let taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    let li = document.createElement("li");

    li.textContent = task.text;

    if (task.completed) {
      li.classList.add("completed");
    }

    li.onclick = () => toggleTask(index);

    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "X";
    deleteBtn.onclick = (e) => {
      e.stopPropagation();
      deleteTask(index);
    };

    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });
}

function addTask() {
  let input = document.getElementById("taskInput");
  let text = input.value.trim();

  if (text === "") {
    alert("Please enter a task");
    return;
  }

  tasks.push({ text: text, completed: false });
  input.value = "";

  saveTasks();
  displayTasks();
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  displayTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  displayTasks();
}

// Load tasks on page load
displayTasks();
