// import { invoke } from "@tauri-apps/api/core";

function isValidTask(chars: number): boolean {
  console.log("isValidTask() called");
  let input: string = (
    document.getElementById("task-input-text") as HTMLInputElement
  ).value;
  const inputElement = document.getElementById(
    "task-input-text"
  ) as HTMLInputElement;

  if (input.length === 0) {
    return false;
  }

  if (input.length > chars) {
    console.log("title is longer triggered");
    let errorMessage = `Task title can only be ${chars} characters long`;
    inputElement.value = errorMessage;
    inputElement.removeEventListener("focusout", handleFocusOut);
    inputElement.disabled = true;
    inputElement.classList.add("hidden-cursor");

    setTimeout(() => {
      inputElement.value = input;
      inputElement.disabled = false;
      inputElement.classList.remove("hidden-cursor");

      inputElement.addEventListener("focusout", handleFocusOut);
      inputElement.focus();
    }, 2000);
    console.log("Title is longer than 20 characters");
    return false;
  }
  console.log("checking all titles");
  const titles = document.querySelectorAll<HTMLElement>(".task-title-p");
  for (const title of titles) {
    console.log(title.textContent + " | " + input);
    if (input === title.textContent) {
      console.log("title already exists");
      let errorMessage = "Task title is already taken!";
      inputElement.value = errorMessage;
      inputElement.removeEventListener("focusout", handleFocusOut);
      inputElement.disabled = true;
      inputElement.classList.add("hidden-cursor");

      setTimeout(() => {
        inputElement.value = input;
        inputElement.disabled = false;
        inputElement.classList.remove("hidden-cursor");

        inputElement.addEventListener("focusout", handleFocusOut);
        inputElement.focus();
      }, 2000);
      return false;
    }
  }
  console.log("adding task");
  return true;
}

function handleFocusOut() {
  const inputForm = document.querySelector(".task-input");
  const textInput = document.getElementById(
    "task-input-text"
  ) as HTMLInputElement;
  const addButton = document.getElementById("add-task-input");

  inputForm?.remove();
  textInput?.remove();

  const addIcon = document.createElement("span");
  addIcon.className = "material-icons add";
  addIcon.textContent = "add";
  addButton?.appendChild(addIcon);

  if (addButton) {
    addButton.style.width = "65px";
    addButton.style.height = "65px";
    addButton.style.display = "none";
    addButton.className = "add-task";
    addButton.id = "add-task";
    addButton.style.display = "flex";
  }
}

function getTaskTitle() {
  const addButton = document.getElementById("add-task");
  if (addButton) {
    addButton.style.display = "none";
    addButton.className = "add-task-input";
    addButton.id = "add-task-input";
    addButton.style.display = "flex";
    addButton.style.width = "500px";
    addButton.style.height = "65px";
    let addIcon = document.querySelector(".add");
    addIcon?.remove();
    let inputForm = document.createElement("form");
    inputForm.className = "task-input";
    let textInput = document.createElement("input");
    textInput.type = "text";
    textInput.className = "task-input-text";
    textInput.id = "task-input-text";
    textInput.autocomplete = "off";
    textInput.disabled = false;

    inputForm.appendChild(textInput);
    addButton.appendChild(inputForm);
    textInput.focus();
    textInput.style.cursor = "none";

    textInput.addEventListener("focusout", handleFocusOut);

    inputForm.addEventListener("submit", (event) => {
      event.preventDefault();
      //Checks if the task name is 20 characters or shorter and if the name is already taken
      console.log("submitted!");
      let isValid = isValidTask(20);
      if (!isValid) {
        console.log("Task name not valid");
        return;
      }
      addTask(
        (document.getElementById("task-input-text") as HTMLInputElement).value
      );
      console.log("task name valid");
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
  title.className = "task-title-p";

  const taskButtonsDiv = document.createElement("div");
  taskButtonsDiv.className = "task-buttons";

  const updateButton = document.createElement("div");
  updateButton.className = "update-button";

  const closeButton = document.createElement("div");
  closeButton.className = "close-button";

  const closeIcon = document.createElement("span");
  closeIcon.className = "material-icons close";
  closeIcon.textContent = "close";

  const updateIcon = document.createElement("span");
  updateIcon.className = "material-icons laptopmac";
  updateIcon.textContent = "laptop_mac";

  taskTitleDiv.appendChild(title);

  closeButton.appendChild(closeIcon);
  updateButton.appendChild(updateIcon);

  taskButtonsDiv.appendChild(updateButton);
  taskButtonsDiv.appendChild(closeButton);

  taskDiv.appendChild(taskTitleDiv);
  taskDiv.appendChild(taskButtonsDiv);
  mainDiv?.appendChild(taskDiv);
  closeIcon.addEventListener("click", removeTask);
}

function updateStatus() {}

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
