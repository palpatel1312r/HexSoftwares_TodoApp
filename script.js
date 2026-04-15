let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
function displayTasks() {
  let taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    let li = document.createElement("li");

    let span = document.createElement("span");
    span.textContent = task.text;

    let status = document.createElement("small");
    if (task.completed) {
      status.textContent = "Completed";
      status.classList.add("status");
      span.classList.add("completed");
    }

    let doneBtn = document.createElement("button");
    doneBtn.textContent = task.completed ? "↩ Undo" : "✔ Done";
    doneBtn.classList.add("done-btn");
    doneBtn.onclick = () => {
      toggleTask(index);
    };

    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌ Delete";
    deleteBtn.onclick = () => deleteTask(index);
    deleteBtn.classList.add("cancel-btn");

    li.appendChild(span);
    li.appendChild(status);
    li.appendChild(doneBtn);
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

displayTasks();
