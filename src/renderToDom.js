import sidebarImg from "../images/sidebar-expand.svg";
import { updateTaskList } from "./tasks";
let currentProject = "Inbox";
export {
  currentProject,
  changeCurrentProject,
  addListenersToSidebar,
  addSideButton,
};

function changeCurrentProject(projectName) {
  currentProject = projectName;
}

function addListenersToSidebar() {
  document.querySelectorAll(".add-item").forEach((element) => {
    element.addEventListener("mouseenter", () => {
      element.querySelector("img").classList.add(".hovered-img");
      element.querySelector("button").classList.add("hovered-button");
    });
    element.addEventListener("mouseleave", () => {
      element.querySelector("img").classList.remove(".hovered-img");
      element.querySelector("button").classList.remove("hovered-button");
    });
  });

  document.querySelector(".all-tasks").addEventListener("click", () => {
    currentProject = "All Tasks";
    document.querySelector(".main-container h2").innerText = "All Tasks";
    updateTaskList(currentProject);
  });

  document.querySelector(".today").addEventListener("click", () => {
    currentProject = "Today";
    document.querySelector(".main-container h2").innerText = "Today";
    updateTaskList(currentProject);
  });

  document.querySelector(".next-week").addEventListener("click", () => {
    currentProject = "Next Week";
    document.querySelector(".main-container h2").innerText = "Next Week";
    updateTaskList(currentProject);
  });

  document.querySelector(".important").addEventListener("click", () => {
    currentProject = "Important";
    document.querySelector(".main-container h2").innerText = "Important";
    updateTaskList(currentProject);
  });

  document.querySelectorAll(".projects-list").forEach((element, index) => {
    element.addEventListener("click", () => {
      document.querySelector(".main-container h2").innerText = JSON.parse(
        localStorage.getItem("projects")
      ).at(index);
    });
  });
}

function addSideButton() {
  document.querySelector(".sidebar").classList.toggle("hidden");

  const cont = document.createElement("div");
  cont.classList.add("sidebar-open-div");
  document.body.append(cont);

  const sidebarOpenImg = document.createElement("img");
  sidebarOpenImg.src = sidebarImg;
  cont.appendChild(sidebarOpenImg);

  document.querySelector(".sidebar-open-div").addEventListener("click", () => {
    document.querySelector(".sidebar-open-div").remove();
    document.querySelector(".sidebar").classList.toggle("hidden");
  });
}
