import './style.css';

tasks = [
    {
        title: "task 1",
        description: "this is the description for task 1",
        dueDate: '08-10-2024',
        priority: 'high',
        project: 'inbox'
    }
]

projects = [ { title: 'inbox' } ];

class newTask {
    constructor(title, description, dueDate, priority, project) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.project = project;
    }
}

function addToTaskList(taskName) {
    tasks.push(taskName);
}

function printTaskList () {
    console.log(tasks);
}

function createNewTask () {
    task2 = new newTask('Task 2', 'Desc. for task 2', '10-10-2024', 'low', 'Project 1');
    addToTaskList(task2);
    printTaskList();
}

createNewTask();

class newProject {
    constructor(title) {
        this.title = title;
    }
}

function addToProjectList(projectName) {
    projects.push(projectName);
}

function printProjectList() {
    console.log(projects);
}

function createNewProject() {
    const project2 = new newProject('Project 1');
    addToProjectList(project2);
    printProjectList();
}

createNewProject();

function printTasksOfParticularProject(projectName) {
    const requiredTasks = [];
    tasks.forEach((element) => {
        if (element.project == projectName)
            requiredTasks.push(element);
    })
    console.log(requiredTasks);
}
printTasksOfParticularProject('inbox');