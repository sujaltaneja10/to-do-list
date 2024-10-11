import './style.css';
import directoryImg from '../images/directory2.jpg';
import sidebarImg from '../images/sidebar-expand.svg';

let taskInputPanel = false;
let projectInputPanel = false;
let currentProject = 'Inbox';

const tasks = [ ];
const projects = [ 'Inbox' ];

updateProjectStorage();
updateProjectList();
updateTaskStorage();

class newTask {
    constructor(title, description, dueDate, priority, project) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.project = project;
    }
}

function updateTaskStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addToTaskList(taskName) {
    tasks.push(taskName);
    updateTaskStorage();
}

function printTaskList() {
    console.log(localStorage.getItem('tasks'));
}

function createNewTask(taskName, taskDesc, dueDate, taskpriority, thisProject) {
    const task = new newTask(taskName, taskDesc, dueDate, taskpriority, thisProject);
    addToTaskList(task);
    printTaskList();
    updateTaskList(currentProject);
}

function updateProjectStorage() {
    localStorage.setItem('projects', JSON.stringify(projects));
}

function addToProjectList(projectName) {
    projects.push(projectName);
    updateProjectStorage();
}

function printProjectList() {
    console.log(localStorage.getItem('projects'));
}

function createNewProject(projectName) {
    addToProjectList(projectName);
    printProjectList();
}

document.querySelectorAll('.add-item').forEach((element) => {
    element.addEventListener('mouseenter', () => {
        element.querySelector('img').classList.add('.hovered-img');
        element.querySelector('button').classList.add('hovered-button');
    })
    element.addEventListener('mouseleave', () => {
        element.querySelector('img').classList.remove('.hovered-img');
        element.querySelector('button').classList.remove('hovered-button');
    })
})

document.querySelector('.all-tasks').addEventListener('click', () => {
    currentProject = 'All Tasks';
    document.querySelector('.main-container h2').innerText = 'All Tasks';
    updateTaskList(currentProject);
})

document.querySelector('.today').addEventListener('click', () => {
    currentProject = 'Today';
    document.querySelector('.main-container h2').innerText = 'Today';;
    updateTaskList(currentProject);
})

document.querySelector('.next-week').addEventListener('click', () => {
    currentProject = 'Next Week';
    document.querySelector('.main-container h2').innerText = 'Next Week';
    updateTaskList(currentProject);
})

document.querySelector('.important').addEventListener('click', () => {
    currentProject = 'Important';
    document.querySelector('.main-container h2').innerText = 'Important';
    updateTaskList(currentProject);
})

document.querySelectorAll('.projects-list').forEach((element, index) => {
    element.addEventListener('click', () => {
        document.querySelector('.main-container h2').innerText = JSON.parse(localStorage.getItem('projects')).at(index);
    })
})

function createTaskEntryForm() {
    if (taskInputPanel === false) {

        taskInputPanel = true;

        const form = document.createElement('form');
        form.classList.add('form');

        const formTitleDiv = document.createElement('div');
        formTitleDiv.classList.add('form-div');
        form.appendChild(formTitleDiv);

        const formTitleLabel = document.createElement('label')
        formTitleLabel.setAttribute('for', 'form-title');
        formTitleLabel.innerText = "Title:";
        formTitleDiv.appendChild(formTitleLabel);

        const formTitle = document.createElement('input');
        formTitle.setAttribute('name', 'title');
        formTitle.setAttribute('id', 'form-title');
        formTitleDiv.appendChild(formTitle);

        const formDescDiv = document.createElement('div');
        formDescDiv.classList.add('form-div');
        formDescDiv.setAttribute('id', 'form-desc-div')
        form.appendChild(formDescDiv);

        const formDescLabel = document.createElement('label')
        formDescLabel.setAttribute('for', 'form-desc');
        formDescLabel.innerText = "Description:";
        formDescDiv.appendChild(formDescLabel);

        const formDesc = document.createElement('textarea');
        formDesc.setAttribute('name', 'desciption');
        formDesc.setAttribute('id', 'form-desc');
        formDesc.cols = 50;
        formDescDiv.appendChild(formDesc);

        const formDateDiv = document.createElement('div');
        formDateDiv.classList.add('form-div');
        formDateDiv.setAttribute('id', 'form-date-div')
        form.appendChild(formDateDiv);

        const formDateLabel = document.createElement('label')
        formDateLabel.setAttribute('for', 'form-date');
        formDateLabel.innerText = "Due Date:";
        formDateDiv.appendChild(formDateLabel);

        const formDate = document.createElement('input');
        formDate.setAttribute('type', 'date');
        formDate.setAttribute('name', 'date');
        formDate.setAttribute('id', 'form-date');
        formDateDiv.appendChild(formDate);

        const formPriorityDiv = document.createElement('div');
        formPriorityDiv.classList.add('form-div');
        formPriorityDiv.classList.add('form-priority-div');
        form.appendChild(formPriorityDiv);

        const selectPara = document.createElement('p');
        selectPara.innerText = "Select priority: ";
        formPriorityDiv.appendChild(selectPara);

        const formPriority = document.createElement('select');
        formPriority.setAttribute('id', 'form-priority');
        const lowOption = document.createElement('option');
        lowOption.innerText = 'Low';
        const highOption = document.createElement('option');
        highOption.innerText = 'High';
        formPriority.appendChild(lowOption);
        formPriority.appendChild(highOption);
        formPriorityDiv.appendChild(formPriority);

        const projectListDiv = document.createElement('div');
        projectListDiv.classList.add('form-div');
        projectListDiv.classList.add('project-list-div');
        form.appendChild(projectListDiv);

        const projectPara = document.createElement('p');
        projectPara.innerText = "Select project: ";
        projectListDiv.appendChild(projectPara);

        const projectDropdown = document.createElement('select');
        projectDropdown.setAttribute('id', 'form-project');

        const newArr = JSON.parse(localStorage.getItem('projects'));
        for (let i=0; i<newArr.length; i++) {
            if (newArr[i] !== undefined) {
                const projectOption = document.createElement('option');
                projectOption.innerText = newArr[i];
                projectDropdown.appendChild(projectOption);
            }
        }
        projectListDiv.appendChild(projectDropdown);

        const formBtnDiv = document.createElement('div');
        formBtnDiv.setAttribute('id', 'form-btn-div')
        form.appendChild(formBtnDiv);

        const formSubmitBtn = document.createElement('button')
        formSubmitBtn.classList.add('form-submit-btn');
        formSubmitBtn.innerText = "Submit";
        formBtnDiv.appendChild(formSubmitBtn);

        const formCancelBtn = document.createElement('button');
        formCancelBtn.classList.add('form-cancel-btn');
        formCancelBtn.innerText = "Cancel";
        formBtnDiv.appendChild(formCancelBtn);

        formSubmitBtn.addEventListener('click', () => {
            event.preventDefault();
            document.querySelectorAll('.task-list').forEach((e) => e.remove());

            const taskName = document.querySelector('#form-title').value;
            const taskDesc = document.querySelector('#form-desc').value;
            const taskDate = document.querySelector('#form-date').value;
            const taskPriority = document.querySelector('#form-priority').value;
            const taskProject = document.querySelector('#form-project').value;
            createNewTask(taskName, taskDesc, taskDate, taskPriority, taskProject);
            document.querySelector('.form').remove();
            taskInputPanel = false;

            updateTaskList(currentProject);
        })

        formCancelBtn.addEventListener('click', () => {
            document.querySelector('.form').remove();
            taskInputPanel = false;
        })

        document.querySelector('.main-container').insertBefore(form, document.querySelector('.add-task'));
    }
}

document.querySelector('.add-task').addEventListener('click', createTaskEntryForm);

function updateProjectList() {
    document.querySelectorAll('.projects-list').forEach((e) => e.remove());

    const newArr = JSON.parse(localStorage.getItem('projects'));
    for (let i = 0; i < newArr.length; i++) {

        if (newArr[i] !== undefined) {
            const projectsList = document.createElement('div');
            projectsList.classList.add('sidebar-item');
            projectsList.classList.add('home-item');
            projectsList.classList.add('projects-list');

            const sidebarItemDiv = document.createElement('div');
            sidebarItemDiv.classList.add('sidebar-item-div');
            projectsList.appendChild(sidebarItemDiv);

            const projectImg = document.createElement('img');
            projectImg.src = directoryImg;
            sidebarItemDiv.appendChild(projectImg);

            const projectPara = document.createElement('p');
            projectPara.innerText = newArr[i];
            sidebarItemDiv.appendChild(projectPara);

            document.querySelector('.sidebar').insertBefore(projectsList, document.querySelector('.add-project'));

            projectsList.addEventListener('click', () => {
                currentProject = newArr[i];
                document.querySelector('.main-container h2').innerText = newArr[i];
                updateTaskList(currentProject);
            });
        }
    }
}


document.querySelector('.add-project').addEventListener('click', () => {
    if (projectInputPanel === false) {
        projectInputPanel = true;

        const projectInputDiv = document.createElement('div');
        projectInputDiv.classList.add('project-input-div');
        
        const projectInputTop = document.createElement('div');
        projectInputTop.classList.add('project-input-top');
        projectInputDiv.appendChild(projectInputTop);
    
        const projectNameInput = document.createElement('input');
        projectNameInput.setAttribute('placeholder', 'Enter project name');
        projectInputTop.appendChild(projectNameInput);

        const projectInputBottom = document.createElement('div');
        projectInputBottom.classList.add('project-input-bottom');
        projectInputDiv.appendChild(projectInputBottom);

        const projectSubmitBtn = document.createElement('button');
        projectSubmitBtn.classList.add('project-submit-btn');
        projectSubmitBtn.innerText = "Submit";
        projectInputBottom.appendChild(projectSubmitBtn);

        const projectCancelBtn = document.createElement('button');
        projectCancelBtn.classList.add('project-cancel-btn');
        projectCancelBtn.innerText = "Cancel";
        projectInputBottom.appendChild(projectCancelBtn);
    
        projectSubmitBtn.addEventListener('click', () => {
            event.preventDefault();
            projectInputPanel = false;

            const projectName = document.querySelector('.project-input-top input').value;
            createNewProject(projectName);

            updateProjectList();

            projectInputDiv.remove();
        })

        projectCancelBtn.addEventListener('click', () => {
            projectInputDiv.remove();
            projectInputPanel = false;
        })

        document.querySelector('.sidebar').insertBefore(projectInputDiv, document.querySelector('.add-project'));    
    }
})

function updateTaskList(projectName) {
    const newArr = JSON.parse(localStorage.getItem('tasks'));

    document.querySelectorAll('.task-list').forEach((e) => e.remove());

    newArr.forEach((element) => {
        const date = new Date();
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const currentDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

        if (element.project === projectName) createTaskItem(element);

        if (projectName === 'All Tasks') createTaskItem(element);
        if (projectName === 'Today') {
            if (element.dueDate === currentDate) createTaskItem(element); 
        }
        if (projectName === 'Next Week') {
            const oneWeekFromNow = new Date();
            oneWeekFromNow.setDate(day + 7);
            const nextWeekDate = `${oneWeekFromNow.getFullYear()}-${(oneWeekFromNow.getMonth() + 1).toString().padStart(2, '0')}-${oneWeekFromNow.getDate().toString().padStart(2, '0')}`;

            if (element.dueDate >= currentDate && element.dueDate <= nextWeekDate) {
                createTaskItem(element);
            }
        }
        if (projectName === 'Important') {
            if (element.priority === 'High') createTaskItem(element);
        }
    });
}

function createTaskItem(element) {
    const taskItem = document.createElement('div');
    taskItem.classList.add('main-item', 'task-item', 'task-list');

    const taskDiv1 = document.createElement('div');
    taskItem.appendChild(taskDiv1);

    const checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    checkbox.setAttribute('name', 'task-check');
    checkbox.setAttribute('id', 'task-check');
    checkbox.classList.add('task-check');          
    taskDiv1.appendChild(checkbox);

    const label = document.createElement('label');
    label.setAttribute('for', 'task-check');
    label.innerText = element.title;
    taskDiv1.appendChild(label);

    const taskDiv2 = document.createElement('div');
    taskItem.appendChild(taskDiv2);

    const editButton = document.createElement('button');
    editButton.classList.add('edit-btn');
    editButton.textContent = 'View';
    taskDiv2.appendChild(editButton);

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-btn');
    deleteButton.textContent = 'Delete';
    taskDiv2.appendChild(deleteButton);

    const hr = document.createElement('hr');
    hr.classList.add('task-list');

    document.querySelector('.main-container').insertBefore(taskItem, document.querySelector('.add-task'));
    document.querySelector('.main-container').insertBefore(hr, document.querySelector('.add-task'));

    document.querySelectorAll('input.task-check').forEach((element) => {
        element.addEventListener('change', () => {
            element.parentElement.querySelector('label').classList.toggle('check-line');
        })
    })

}

function addSideButton() {
    const cont = document.createElement('div');
    cont.classList.add('sidebar-open-div');
    document.body.append(cont);

    const sidebarOpenImg = document.createElement('img');
    sidebarOpenImg.src = sidebarImg;
    cont.appendChild(sidebarOpenImg);

    document.querySelector('.sidebar-open-div').addEventListener('click', () => {
        document.querySelector('.sidebar-open-div').remove();
        document.querySelector('.sidebar').classList.toggle('hidden');
    })
}

document.querySelector('.sidebar-head-item-right').addEventListener('click', () => {
    document.querySelector('.sidebar').classList.toggle('hidden');
    addSideButton();
})