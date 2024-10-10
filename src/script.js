import './style.css';

let taskInputPanel = false;

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

document.querySelectorAll('.projects-list').forEach((element) => {
    element.addEventListener('click', () => {
        document.querySelector('.main-container h2').innerText = element.querySelector('.sidebar-item p').innerText;
    })
})

document.querySelectorAll('input#task-check').forEach((element) => {
    element.addEventListener('change', () => {
        element.nextElementSibling.classList.toggle('check-line');
    })
})

document.querySelector('.add-task').addEventListener('click', () => {
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

        const formBtnDiv = document.createElement('div');
        formBtnDiv.setAttribute('id', 'form-btn-div')
        form.appendChild(formBtnDiv);

        const formSubmitBtn = document.createElement('button')
        formSubmitBtn.innerText = "Submit";
        formBtnDiv.appendChild(formSubmitBtn);

        const formCancelBtn = document.createElement('button');
        formCancelBtn.innerText = "Cancel";
        formBtnDiv.appendChild(formCancelBtn);

        formCancelBtn.addEventListener('click', () => {
            form.remove();
            taskInputPanel = false;
        })

        document.querySelector('.main-container').insertBefore(form, document.querySelector('.add-task'));
    }
})




// const tasks = [ { } ]

// const projects = [ { title: 'inbox' } ];

// class newTask {
//     constructor(title, description, dueDate, priority, project) {
//         this.title = title;
//         this.description = description;
//         this.dueDate = dueDate;
//         this.priority = priority;
//         this.project = project;
//     }
// }

// function addToTaskList(taskName) {
//     tasks.push(taskName);
// }

// function printTaskList () {
//     console.log(tasks);
// }

// function createNewTask () {
//     task2 = new newTask('Task 2', 'Desc. for task 2', '10-10-2024', 'low', 'Project 1');
//     addToTaskList(task2);
//     printTaskList();
//     // addToDom();
// }

// // createNewTask();

// class newProject {
//     constructor(title) {
//         this.title = title;
//     }
// }

// function addToProjectList(projectName) {
//     projects.push(projectName);
// }

// function printProjectList() {
//     console.log(projects);
// }

// function createNewProject() {
//     const project2 = new newProject('Project 1');
//     addToProjectList(project2);
//     printProjectList();
//     // addToDom();
// }

// // createNewProject();

// function printTasksOfParticularProject(projectName) {
//     const requiredTasks = [];
//     tasks.forEach((element) => {
//         if (element.project == projectName)
//             requiredTasks.push(element);
//     })
//     console.log(requiredTasks);
// }
// printTasksOfParticularProject('inbox');
// // addToDom();