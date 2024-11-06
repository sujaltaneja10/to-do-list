import "./style.css";
import {
  currentProject,
  changeCurrentProject,
  addListenersToSidebar,
  addSideButton,
} from "./renderToDom";
import {
  updateTaskList,
  updateTaskStorage,
  createTaskEntryForm,
} from "./tasks";
import {
  updateProjectStorage,
  updateProjectList,
  createProjectEntryForm,
} from "./projects";

updateProjectStorage();
updateProjectList();
updateTaskStorage([]);
addListenersToSidebar();

document
  .querySelector(".add-task")
  .addEventListener("click", createTaskEntryForm);

document
  .querySelector(".add-project")
  .addEventListener("click", createProjectEntryForm);

document
  .querySelector(".sidebar-head-item-right")
  .addEventListener("click", addSideButton);
