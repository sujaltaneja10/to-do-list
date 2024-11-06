import directoryImg from "../images/directory2.jpg";
import { currentProject, changeCurrentProject } from "./renderToDom";
import { updateTaskList } from "./tasks";
export { updateProjectStorage, updateProjectList, createProjectEntryForm };

let projectInputPanel = false;
const projects = ["Inbox"];

function updateProjectStorage() {
  localStorage.setItem("projects", JSON.stringify(projects));
}

function addToProjectList(projectName) {
  projects.push(projectName);
  updateProjectStorage();
}

function printProjectList() {
  console.log(localStorage.getItem("projects"));
}

function createNewProject(projectName) {
  addToProjectList(projectName);
  printProjectList();
}

function updateProjectList() {
  document.querySelectorAll(".projects-list").forEach((e) => e.remove());

  const newArr = JSON.parse(localStorage.getItem("projects"));
  for (let i = 0; i < newArr.length; i++) {
    if (newArr[i] !== undefined) {
      const projectsList = document.createElement("div");
      projectsList.classList.add("sidebar-item");
      projectsList.classList.add("home-item");
      projectsList.classList.add("projects-list");

      const sidebarItemDiv = document.createElement("div");
      sidebarItemDiv.classList.add("sidebar-item-div");
      projectsList.appendChild(sidebarItemDiv);

      const projectImg = document.createElement("img");
      projectImg.src = directoryImg;
      sidebarItemDiv.appendChild(projectImg);

      const projectPara = document.createElement("p");
      projectPara.innerText = newArr[i];
      sidebarItemDiv.appendChild(projectPara);

      document
        .querySelector(".sidebar")
        .insertBefore(projectsList, document.querySelector(".add-project"));

      projectsList.addEventListener("click", () => {
        changeCurrentProject(newArr[i]);
        document.querySelector(".main-container h2").innerText = newArr[i];
        updateTaskList(currentProject);
      });
    }
  }
}

const createProjectEntryForm = () => {
  if (projectInputPanel === false) {
    projectInputPanel = true;

    const projectInputDiv = document.createElement("div");
    projectInputDiv.classList.add("project-input-div");

    const projectInputTop = document.createElement("div");
    projectInputTop.classList.add("project-input-top");
    projectInputDiv.appendChild(projectInputTop);

    const projectNameInput = document.createElement("input");
    projectNameInput.setAttribute("placeholder", "Enter project name");
    projectInputTop.appendChild(projectNameInput);

    const projectInputBottom = document.createElement("div");
    projectInputBottom.classList.add("project-input-bottom");
    projectInputDiv.appendChild(projectInputBottom);

    const projectSubmitBtn = document.createElement("button");
    projectSubmitBtn.classList.add("project-submit-btn");
    projectSubmitBtn.innerText = "Submit";
    projectInputBottom.appendChild(projectSubmitBtn);

    const projectCancelBtn = document.createElement("button");
    projectCancelBtn.classList.add("project-cancel-btn");
    projectCancelBtn.innerText = "Cancel";
    projectInputBottom.appendChild(projectCancelBtn);

    projectSubmitBtn.addEventListener("click", () => {
      event.preventDefault();
      projectInputPanel = false;

      const projectName = document.querySelector(
        ".project-input-top input"
      ).value;
      createNewProject(projectName);

      updateProjectList();

      projectInputDiv.remove();
    });

    projectCancelBtn.addEventListener("click", () => {
      projectInputDiv.remove();
      projectInputPanel = false;
    });

    document
      .querySelector(".sidebar")
      .insertBefore(projectInputDiv, document.querySelector(".add-project"));
  }
};
