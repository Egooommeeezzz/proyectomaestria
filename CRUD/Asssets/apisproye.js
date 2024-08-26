const apiBaseUrl = 'http://localhost:3000'; 

const fetchTasks = async () => {
    try {
        const response = await fetch(`${apiBaseUrl}/tasks`);
        const tasks = await response.json();
        const taskList = document.getElementById('taskList');
        taskList.innerHTML = '';
        tasks.forEach(task => addTaskToDOM(task));
    } catch (error) {
        console.error('Error fetching tasks:', error);
    }
};


const addTaskToDOM = (task) => {
    const taskList = document.getElementById('taskList');

    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center';

    const span = document.createElement('span');
    span.innerText = `${task.title}: ${task.description}`;

    const editButton = document.createElement('button');
    editButton.className = 'btn btn-warning btn-sm me-2';
    editButton.innerText = 'Editar';
    editButton.onclick = () => editTask(task.id);

    const deleteButton = document.createElement('button');
    deleteButton.className = 'btn btn-danger btn-sm';
    deleteButton.innerText = 'Eliminar';
    deleteButton.onclick = () => deleteTask(task.id);

    li.appendChild(span);
    li.appendChild(editButton);
    li.appendChild(deleteButton);

    taskList.appendChild(li);
};


document.getElementById('taskForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const title = document.getElementById('taskTitle').value;
    const description = document.getElementById('taskDescription').value;

    try {
        const response = await fetch(`${apiBaseUrl}/tasks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, description })
        });

        const newTask = await response.json();
        addTaskToDOM(newTask); 
        document.getElementById('taskForm').reset(); 
    } catch (error) {
        console.error('Error adding task:', error);
    }
});

const editTask = async (taskId) => {
    const newTitle = prompt('Editar título de la tarea:');
    const newDescription = prompt('Editar descripción de la tarea:');
    const completed = confirm('¿Marcar como completada?');

    try {
        await fetch(`${apiBaseUrl}/tasks/${taskId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title: newTitle, description: newDescription, completed })
        });

        await fetchTasks(); 
    } catch (error) {
        console.error('Error updating task:', error);
    }
};


const deleteTask = async (taskId) => {
    try {
        await fetch(`${apiBaseUrl}/tasks/${taskId}`, {
            method: 'DELETE'
        });

        await fetchTasks(); 
    } catch (error) {
        console.error('Error deleting task:', error);
    }
};


fetchTasks();

