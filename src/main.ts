// import { invoke } from "@tauri-apps/api/core";

function addTask() {
  const mainDiv = document.querySelector(".container");
  const taskDiv = document.createElement("div");
  taskDiv.className = "task";

  const taskTitleDiv = document.createElement("div");
  taskTitleDiv.className = "task-title";

  const title = document.createElement("p");
  title.textContent = "Placeholder"; // TODO: Add functionality, so user can set their own title

  const taskButtonsDiv = document.createElement("div");
  taskButtonsDiv.className = "task-buttons";

  const updateButton = document.createElement("div");
  updateButton.className = "update-button";

  const closeButton = document.createElement("div");
  closeButton.className = "close-button";

  const closeIcon = document.createElement("span");
  closeIcon.className = "material-icons close";
  closeIcon.textContent = "close";

  taskTitleDiv.appendChild(title);

  closeButton.appendChild(closeIcon);

  taskButtonsDiv.appendChild(updateButton);
  taskButtonsDiv.appendChild(closeButton);

  taskDiv.appendChild(taskTitleDiv);
  taskDiv.appendChild(taskButtonsDiv);
  mainDiv?.appendChild(taskDiv);
  closeIcon.addEventListener("click", removeTask);
}

function removeTask(event: MouseEvent) {
  const task = (event.target as HTMLElement).closest(".task") as HTMLElement;
  task.remove();
}

window.addEventListener("DOMContentLoaded", () => {
  document.querySelector(".add-task")?.addEventListener("click", addTask);
});

document.querySelectorAll<HTMLElement>(".close").forEach((button) => {
  button.addEventListener("click", (event: MouseEvent) => removeTask(event));
});
