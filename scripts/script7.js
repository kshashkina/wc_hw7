const taskList = document.querySelector('.task-list');
const newTaskInput = document.getElementById('newTask');
const addButton = document.getElementById('addButton');
const removeCompletedButton = document.getElementById('removeCompleted');
const removeAllButton = document.getElementById('removeAll');

function createTaskElement(taskText) {
    const taskElement = document.createElement('div');
    taskElement.classList.add('task');

    const checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    checkBox.classList.add('checkbox');

    const taskTextElement = document.createElement('span');
    taskTextElement.textContent = taskText;

    const createdDate = new Date();
    const createdDateTimeString = createdDate.toLocaleString();

    const createDateElement = document.createElement('span');
    createDateElement.textContent = `Created: ${createdDateTimeString}`;
    createDateElement.classList.add('date-time');

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';

    taskElement.appendChild(checkBox);
    taskElement.appendChild(taskTextElement);
    taskElement.appendChild(createDateElement);
    taskElement.appendChild(removeButton);

    taskElement.addEventListener('click', toggleTaskStatus);
    removeButton.addEventListener('click', removeTask);
    taskElement.addEventListener('dblclick', () => updateTask(taskElement, taskTextElement, createDateElement));

    return taskElement;
}

function addTask() {
    const taskText = newTaskInput.value.trim();
    if (taskText === '') return;

    const taskElement = createTaskElement(taskText);
    taskList.prepend(taskElement);

    newTaskInput.value = '';
}

function toggleTaskStatus(event) {
    const taskElement = event.currentTarget;
    const checkBox = taskElement.querySelector('.checkbox');
    const taskTextElement = taskElement.querySelector('span');

    if (checkBox.checked) {
        checkBox.checked = false;
        taskTextElement.style.textDecoration = 'none';
    } else {
        checkBox.checked = true;
        taskTextElement.style.textDecoration = 'line-through';
    }
}

function removeTask(event) {
    const taskElement = event.target.parentElement;
    taskElement.remove();
}

function removeCompletedTasks() {
    const completedTasks = document.querySelectorAll('.task .checkbox:checked');
    completedTasks.forEach(task => task.parentElement.remove());
}

function removeAllTasks() {
    const uncompletedTasks = document.querySelectorAll('.task .checkbox:not(:checked)');
    if (uncompletedTasks.length > 0) {
        const confirmRemove = confirm('Remove all tasks including uncompleted ones?');
        if (!confirmRemove) return;
    }
    taskList.innerHTML = '';
}

function updateTask(taskElement, taskTextElement, createDateElement) {
    const newText = prompt('Update the task:', taskTextElement.textContent);

    if (newText !== null) {
        taskTextElement.textContent = newText;
        const editedDate = new Date();
        const editedDateTimeString = editedDate.toLocaleString();
        createDateElement.textContent = `Edited: ${editedDateTimeString}`;
    }
}

addButton.addEventListener('click', addTask);
removeCompletedButton.addEventListener('click', removeCompletedTasks);
removeAllButton.addEventListener('click', removeAllTasks);

newTaskInput.addEventListener('keydown', event => {
    if (event.key === 'Enter') {
        addTask();
    }
});
