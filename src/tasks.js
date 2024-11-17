import { currentProject } from "./renderToDom";
export { updateTaskList, updateTaskStorage, createTaskEntryForm };
let taskInputPanel = false;

class newTask {
  constructor(title, description, dueDate, priority, project, check) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.project = project;
    this.checked = check;
  }
}

function createNewTask(
  taskName,
  taskDesc,
  dueDate,
  taskpriority,
  thisProject,
  ifChecked,
  indexOfTaskList = false
) {
  const task = new newTask(
    taskName,
    taskDesc,
    dueDate,
    taskpriority,
    thisProject,
    ifChecked
  );
  addToTaskList(task, indexOfTaskList);
  updateTaskList();
}

function updateTaskStorage(arr) {
  localStorage.setItem("tasks", JSON.stringify(arr));
  console.log(JSON.parse(localStorage.getItem("tasks")));
}

function addToTaskList(oneTask, index = false) {
  const newArr = JSON.parse(localStorage.getItem("tasks"));
  if (index) {
    newArr[index] = oneTask;
  } else {
    newArr.push(oneTask);
  }

  updateTaskStorage(newArr);
}

function removeFromTaskList(index, usingDelete = false) {
  const newArr = JSON.parse(localStorage.getItem("tasks"));
  if (usingDelete) {
    delete newArr[index];
    updateTaskStorage(newArr);
  } else {
    newArr.splice(index, 1);
    updateTaskStorage(newArr);
    updateTaskList();
  }
}

function updateTaskList(projectName = currentProject) {
  document.querySelectorAll(".task-list").forEach((e) => e.remove());
  const newArr = JSON.parse(localStorage.getItem("tasks"));

  for (let index = 0; index < newArr.length; index++) {
    let element = newArr[index];

    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const currentDate = `${year}-${month.toString().padStart(2, "0")}-${day
      .toString()
      .padStart(2, "0")}`;

    if (element.project === projectName) createTaskItem(element, index);

    if (projectName === "All Tasks") createTaskItem(element, index);
    if (projectName === "Today") {
      if (element.dueDate === currentDate) createTaskItem(element, index);
    }
    if (projectName === "Next Week") {
      const oneWeekFromNow = new Date();
      oneWeekFromNow.setDate(day + 7);
      const nextWeekDate = `${oneWeekFromNow.getFullYear()}-${(
        oneWeekFromNow.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}-${oneWeekFromNow
        .getDate()
        .toString()
        .padStart(2, "0")}`;

      if (element.dueDate >= currentDate && element.dueDate <= nextWeekDate) {
        createTaskItem(element, index);
      }
    }
    if (projectName === "Important") {
      if (element.priority === "High") createTaskItem(element, index);
    }
  }
}

function createTaskItemPopUp(element) {
  console.log(element);

  const main = document.createElement("main");
  main.classList.add("pop-up-element");
  document.body.appendChild(main);

  document.querySelector("main").classList.add("blur-main");

  const title = element.title !== "" ? element.title : "(not specified)";
  const desc =
    element.description !== "" ? element.description : "(not specified)";
  const date = element.dueDate !== "" ? element.dueDate : "(not specified)";
  const priority =
    element.priority !== "" ? element.priority : "(not specified)";
  const project = element.project !== "" ? element.project : "(not specified)";

  const cancelDiv = document.createElement("div");
  cancelDiv.style = "display: flex; flex-direction: row-reverse;";
  main.appendChild(cancelDiv);

  const cancelText = document.createElement("p");
  cancelText.textContent = "X";
  cancelText.style = "width: 20px; height: 20px; font-size: 30px";
  cancelDiv.appendChild(cancelText);

  const titleDiv = document.createElement("div");
  titleDiv.textContent = `Title: ${title}`;
  main.appendChild(titleDiv);

  const descDiv = document.createElement("div");
  descDiv.textContent = `Description: ${desc}`;
  main.appendChild(descDiv);

  const dateDiv = document.createElement("div");
  dateDiv.textContent = `Due Date: ${date}`;
  main.appendChild(dateDiv);

  const priorityDiv = document.createElement("div");
  priorityDiv.innerText = `Priority: ${priority}`;
  main.appendChild(priorityDiv);

  const projectDiv = document.createElement("div");
  projectDiv.innerText = `Project: ${project}`;
  main.appendChild(projectDiv);

  cancelText.addEventListener("click", () => {
    main.style.display = "none";
    document.querySelector("main").classList.remove("blur-main");
  });
}

function createTaskItem(element, index) {
  const taskItem = document.createElement("div");
  taskItem.classList.add("main-item", "task-item", "task-list");
  taskItem.id = `${index}`;

  const taskDiv1 = document.createElement("div");
  taskItem.appendChild(taskDiv1);

  const checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");
  checkbox.setAttribute("name", "task-check");
  checkbox.setAttribute("id", "task-check");
  checkbox.classList.add("task-check");
  taskDiv1.appendChild(checkbox);

  const label = document.createElement("label");
  label.setAttribute("for", "task-check");
  label.innerText = element.title;
  taskDiv1.appendChild(label);
  if (element.checked === true) {
    label.classList.add("check-line");
    checkbox.checked = true;
  }

  const taskDiv2 = document.createElement("div");
  taskItem.appendChild(taskDiv2);

  const editButton = document.createElement("button");
  editButton.classList.add("edit-btn");
  editButton.textContent = "View";
  taskDiv2.appendChild(editButton);

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete-btn");
  deleteButton.textContent = "Delete";
  taskDiv2.appendChild(deleteButton);

  const hr = document.createElement("hr");
  hr.classList.add("task-list");

  editButton.addEventListener("click", () => {
    createTaskItemPopUp(element);
  });

  document
    .querySelector(".main-container")
    .insertBefore(taskItem, document.querySelector(".add-task"));
  document
    .querySelector(".main-container")
    .insertBefore(hr, document.querySelector(".add-task"));

  checkbox.addEventListener("change", () => {
    const newTitle = element.title;
    const newDesc = element.description;
    const newDate = element.dueDate;
    const newPriority = element.priority;
    const newProject = element.project;
    const newChecked = !element.checked;
    const indexOfTaskList = taskItem.id;
    removeFromTaskList(indexOfTaskList, true);
    createNewTask(
      newTitle,
      newDesc,
      newDate,
      newPriority,
      newProject,
      newChecked,
      indexOfTaskList
    );
    label.classList.toggle("check-line");
  });

  deleteButton.addEventListener("click", () => {
    removeFromTaskList(taskItem.id);
  });
}

function createTaskEntryForm() {
  if (taskInputPanel === false) {
    taskInputPanel = true;

    const form = document.createElement("form");
    form.classList.add("form");

    const formTitleDiv = document.createElement("div");
    formTitleDiv.classList.add("form-div");
    form.appendChild(formTitleDiv);

    const formTitleLabel = document.createElement("label");
    formTitleLabel.setAttribute("for", "form-title");
    formTitleLabel.innerText = "Title:";
    formTitleDiv.appendChild(formTitleLabel);

    const formTitle = document.createElement("input");
    formTitle.setAttribute("name", "title");
    formTitle.setAttribute("id", "form-title");
    formTitleDiv.appendChild(formTitle);

    const formDescDiv = document.createElement("div");
    formDescDiv.classList.add("form-div");
    formDescDiv.setAttribute("id", "form-desc-div");
    form.appendChild(formDescDiv);

    const formDescLabel = document.createElement("label");
    formDescLabel.setAttribute("for", "form-desc");
    formDescLabel.innerText = "Description:";
    formDescDiv.appendChild(formDescLabel);

    const formDesc = document.createElement("textarea");
    formDesc.setAttribute("name", "desciption");
    formDesc.setAttribute("id", "form-desc");
    formDesc.cols = 50;
    formDescDiv.appendChild(formDesc);

    const formDateDiv = document.createElement("div");
    formDateDiv.classList.add("form-div");
    formDateDiv.setAttribute("id", "form-date-div");
    form.appendChild(formDateDiv);

    const formDateLabel = document.createElement("label");
    formDateLabel.setAttribute("for", "form-date");
    formDateLabel.innerText = "Due Date:";
    formDateDiv.appendChild(formDateLabel);

    const formDate = document.createElement("input");
    formDate.setAttribute("type", "date");
    formDate.setAttribute("name", "date");
    formDate.setAttribute("id", "form-date");
    formDateDiv.appendChild(formDate);

    const formPriorityDiv = document.createElement("div");
    formPriorityDiv.classList.add("form-div");
    formPriorityDiv.classList.add("form-priority-div");
    form.appendChild(formPriorityDiv);

    const selectPara = document.createElement("p");
    selectPara.innerText = "Select priority: ";
    formPriorityDiv.appendChild(selectPara);

    const formPriority = document.createElement("select");
    formPriority.setAttribute("id", "form-priority");
    const lowOption = document.createElement("option");
    lowOption.innerText = "Low";
    const highOption = document.createElement("option");
    highOption.innerText = "High";
    formPriority.appendChild(lowOption);
    formPriority.appendChild(highOption);
    formPriorityDiv.appendChild(formPriority);

    const projectListDiv = document.createElement("div");
    projectListDiv.classList.add("form-div");
    projectListDiv.classList.add("project-list-div");
    form.appendChild(projectListDiv);

    const projectPara = document.createElement("p");
    projectPara.innerText = "Select project: ";
    projectListDiv.appendChild(projectPara);

    const projectDropdown = document.createElement("select");
    projectDropdown.setAttribute("id", "form-project");

    const newArr = JSON.parse(localStorage.getItem("projects"));
    for (let i = 0; i < newArr.length; i++) {
      if (newArr[i] !== undefined) {
        const projectOption = document.createElement("option");
        projectOption.innerText = newArr[i];
        projectDropdown.appendChild(projectOption);
      }
    }
    projectListDiv.appendChild(projectDropdown);

    const formBtnDiv = document.createElement("div");
    formBtnDiv.setAttribute("id", "form-btn-div");
    form.appendChild(formBtnDiv);

    const formSubmitBtn = document.createElement("button");
    formSubmitBtn.classList.add("form-submit-btn");
    formSubmitBtn.innerText = "Submit";
    formBtnDiv.appendChild(formSubmitBtn);

    const formCancelBtn = document.createElement("button");
    formCancelBtn.classList.add("form-cancel-btn");
    formCancelBtn.innerText = "Cancel";
    formBtnDiv.appendChild(formCancelBtn);

    formSubmitBtn.addEventListener("click", () => {
      event.preventDefault();
      document.querySelectorAll(".task-list").forEach((e) => e.remove());

      const taskName = document.querySelector("#form-title").value;
      const taskDesc = document.querySelector("#form-desc").value;
      const taskDate = document.querySelector("#form-date").value;
      const taskPriority = document.querySelector("#form-priority").value;
      const taskProject = document.querySelector("#form-project").value;
      createNewTask(
        taskName,
        taskDesc,
        taskDate,
        taskPriority,
        taskProject,
        false
      );
      document.querySelector(".form").remove();
      taskInputPanel = false;

      updateTaskList(currentProject);
    });

    formCancelBtn.addEventListener("click", () => {
      document.querySelector(".form").remove();
      taskInputPanel = false;
    });

    document
      .querySelector(".main-container")
      .insertBefore(form, document.querySelector(".add-task"));
  }
}
