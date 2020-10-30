     // Selectors
const addToDo = document.querySelector('.addToDo'); // add button
const toDoInput = document.querySelector('.ToDoInput'); // input
const toDoList = document.querySelector('.toDoList') // ul list
const trashButton = document.querySelector('.trashButton'); // trash button for local Storage

     // variables
let LIST;
let id;
const CHECK = 'fas fa-check-circle';
const UNCHECK = 'far fa-circle';
const CHECK_LINE_THROUGH = 'checked';
let data;

     // Event Listeners

//Afer page finished loading
document.addEventListener('DOMContentLoaded', checkToDos);

// for button
addToDo.addEventListener('click', function() {
    let value = toDoInput.value;
    if(value) {
        addNewTask(value, id, false, false);
        LIST.push({
            name: value,
            id: id,
            done: false,
            trash: false
        })
        toDoInput.value = "";
        id++;
        localStorage.setItem("TODOS", JSON.stringify(LIST)); 
    }
}) 
// fot Enter key
toDoInput.addEventListener('keyup', function(event) { 
    let value = toDoInput.value; 
    if(event.keyCode === 13) {       
        if(value) {
            addNewTask(value, id, false, false);
            LIST.push({
                name: value,
                id: id,
                done: false,
                trash: false
            })
            toDoInput.value = "";
            id++;
            localStorage.setItem("TODOS", JSON.stringify(LIST)); 
        }
    }
})
//check or delete
toDoList.addEventListener('click', checkDelete); 

//Trash button
trashButton.addEventListener('click', clearLocalStorage);

     // Functions

// load items

function checkToDos() {
    data = localStorage.getItem("TODOS");
    if(data) {
        LIST = JSON.parse(data);
        LIST.forEach(function(item) {
            addNewTask(item.name, item.id, item.done, item.trash);
        });
        id = LIST.length;
    }
    else {
        LIST = [];
        id = 0;
    }


}
//Add new task
function addNewTask(name, id, done, trash) { 

    const DONE = done ? CHECK : UNCHECK;
    const LINE_THROUGH = done ? CHECK_LINE_THROUGH : " ";

    if(trash == false) {
        let item = `<div class="item ${LINE_THROUGH}" id="${id}">
        <button class="statusButton"><i class="${DONE}"></i></button>
        <li>${name}</li>
        <button class="deleteButton"><i class="fas fa-times"></i></button>
                   </div>`;
                   toDoList.insertAdjacentHTML('beforeend', item);    
    }
}

//delete or check task
function checkDelete(e) {
    let item = e.target;
    if(item.classList[1] === 'fa-circle') {
        item.classList.toggle('far');
        item.classList.toggle('fas');
        item.classList.toggle('fa-circle');
        item.classList.toggle('fa-check-circle');
        item.parentElement.parentElement.classList.toggle('checked');
        LIST[item.parentElement.parentElement.id].done = LIST[item.parentElement.parentElement.id].done ? false : true;
    }
    else if(item.classList[1] === 'fa-check-circle') {
        item.classList.toggle('fas');
        item.classList.toggle('far');
        item.classList.toggle('fa-check-circle');
        item.classList.toggle('fa-circle');
        item.parentElement.parentElement.classList.toggle('checked');
        LIST[item.parentElement.parentElement.id].done = LIST[item.parentElement.parentElement.id].done ? false : true;
    }
    else if(item.classList[1] === 'fa-times') {
        LIST[item.parentElement.parentElement.id].trash = true;
        item.parentElement.parentElement.classList.add('fall');
        item.addEventListener('transitionend', function() {
         item.parentElement.parentElement.remove();
        });

    }
    localStorage.setItem("TODOS", JSON.stringify(LIST));
}

//clears local storage (trash button)
function clearLocalStorage() {
    localStorage.clear();
    location.reload();
}

