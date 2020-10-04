//Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const todofilter = document.querySelector(".filter-todo");

//Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
todofilter.addEventListener('click', filtertodo);

//Functions

function addTodo() {
    //prevent form from submitting
    event.preventDefault();
    //Todo section
    const todoSection = document.createElement("section");
    todoSection.classList.add("todo");

    //create li 
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;    
    newTodo.classList.add("todo-item");
    // add todo to local storage
    saveLocalTodos(todoInput.value);

    //add li inside section
    todoSection.appendChild(newTodo);

    //check mark button
    const completedButton = document.createElement("button")
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoSection.appendChild(completedButton);

    //trash button
    const trashButton = document.createElement("button")
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoSection.appendChild(trashButton);
    
    todoList.appendChild(todoSection);

    //clear todo input value
    todoInput.value = '';
}

function deleteCheck(e) {
    let item = e.target;
    //delete todo
    if(item.classList[0] === 'trash-btn') {
        let todo = item.parentElement;
        todo.classList.add('fall');
        removelocalTodos(todo);       
        todo.addEventListener('transitionend', function() {
            todo.remove();
        } )
    }

    //check mark
    if(item.classList[0] === 'complete-btn') {
        let todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}

function filtertodo(e) {
    let todos = todoList.childNodes;
    todos.forEach(todo => {        
        switch (e.target.value) {
            case 'all':
                todo.style.display = 'flex';
                break;
            case 'completed':
                if(todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                }
                else {
                    todo.style.display = 'none';
                }
                break;
            case 'uncompleted':
                if(!todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                }
                else {
                    todo.style.display = 'none';
                }
                break;
        } 
    });      
}

function saveLocalTodos(todo) {
    let todos;
    todos = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [];
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
    let todos;
    todos = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [];
    todos.forEach(todo => {

        const todoSection = document.createElement("section");
        todoSection.classList.add("todo");

        //create li 
        const newTodo = document.createElement("li");
        newTodo.innerText = todo;    
        newTodo.classList.add("todo-item");

        //add li inside section
        todoSection.appendChild(newTodo);

        //check mark button
        const completedButton = document.createElement("button")
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add("complete-btn");
        todoSection.appendChild(completedButton);

        //trash button
        const trashButton = document.createElement("button")
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add("trash-btn");
        todoSection.appendChild(trashButton);
        
        todoList.appendChild(todoSection);
    });
}


function removelocalTodos(todo) {
    let todos;
    todos = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [];
    let todoIndex = todo.children[0].innerText;
    todos.splice( todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}