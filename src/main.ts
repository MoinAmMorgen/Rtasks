// import { invoke } from "@tauri-apps/api/core";

function getTaskTitle() {
  const addButton = document.querySelector(".add-task");
  if (addButton) {
    addButton.className = "add-task-input";
    let addIcon = document.querySelector(".add");
    addIcon?.remove();
    let inputForm = document.createElement("form");
    inputForm.className = "task-input";
    let textInput = document.createElement("input");
    textInput.type = "text";
    textInput.className = "task-input-text";
    textInput.id = "task-input-text";
    textInput.autocomplete = "off";

    inputForm.appendChild(textInput);
    addButton.appendChild(inputForm);
    textInput.focus();

    inputForm.addEventListener("submit", (event) => {
      event.preventDefault();
      let input: string = "";
      input = (document.getElementById("task-input-text") as HTMLInputElement)
        .value;
      if (input.length > 20) {
        let errorMessage = "Task title can only be 20 characters long";
        (document.getElementById("task-input-text") as HTMLInputElement).value =
          errorMessage;
        setTimeout(() => {
          (
            document.getElementById("task-input-text") as HTMLInputElement
          ).value = input;
        }, 2000);
        return;
      }
      addTask(input);
      inputForm.remove();
      textInput.remove();
      addIcon = document.createElement("span");
      addIcon.className = "material-icons add";
      addIcon.textContent = "add";
      addButton.appendChild(addIcon);
      addButton.className = "add-task";
    });

    return;
  }
}

function addTask(inputTitle: string) {
  const mainDiv = document.querySelector(".container");
  const taskDiv = document.createElement("div");
  taskDiv.className = "task";

  const taskTitleDiv = document.createElement("div");
  taskTitleDiv.className = "task-title";

  const title = document.createElement("p");
  title.textContent = inputTitle;

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

window.addEventListener("DOMContentLoaded", async () => {
  document.querySelector(".add-task")?.addEventListener("click", getTaskTitle);
});

document.querySelectorAll<HTMLElement>(".close").forEach((button) => {
  button.addEventListener("click", (event: MouseEvent) => removeTask(event));
});
