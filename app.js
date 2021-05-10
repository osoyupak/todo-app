//dom elements
const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const filterInput = document.getElementById("filter-input");
const addBtn = document.getElementById("btn-add");
const listGroup = document.querySelector(".list-group");
const firstCardEnd = document.getElementById("firstCardEnd");
const secondCardBody = document.querySelectorAll(".card-body")[1];


addAllEventlisteners();
/***** Event Listeners *****/
function addAllEventlisteners() {
    todoForm.addEventListener("submit", addItem);
    secondCardBody.addEventListener("click", removeItem);
    filterInput.addEventListener("keyup", filterTodos);
    window.addEventListener("DOMContentLoaded", getItemStorage);
}

/***** Functions *****/
function addItem(e) {
    let todos = checkTodos();
    const val = todoInput.value.trim().toLowerCase();

    if(!todos.includes(val)) {
        addItemUI(val);
        addItemStorage(val);
        showAlert("primary", "You added successfully");
    } else {
        showAlert("warning", "Warning. You added it before.");
    }


    todoInput.value ="";

    e.preventDefault();
}

function showAlert(type, content) {
    let alert = document.createElement("div");
    alert.className =`alert alert-${type}`;
    alert.innerText = content;
    firstCardEnd.appendChild(alert);
    setTimeout(() => {
        alert.remove();
    }, 1000);
}



//create todo and add it to the UI 
function addItemUI(val) {
    //creating list item
    let newTodo;
    newTodo = document.createElement("li");
    newTodo.innerText = val;
    newTodo.setAttribute("class", "list-group-item d-flex justify-content-between");
    //creating close icon for list item
    let closeIcon;
    closeIcon = document.createElement("a");
    closeIcon.innerHTML = "<i class='fas fa-times'></i>"
    closeIcon.href="#";
    // appending close icon to list item and all of them to list group
    newTodo.appendChild(closeIcon);
    listGroup.appendChild(newTodo);
}

function removeItem(e) {
    if(e.target.className=='fas fa-times') {
        let removeElement = e.target.parentElement.parentElement;
        removeElement.remove();

        removeItemStorage(removeElement.innerText);
        showAlert("danger", "You deleted an item.")
    }
}

function removeItemStorage(removeElement) {
    let todos = checkTodos();
    if(todos.indexOf(removeElement)>-1) {
        let index = todos.indexOf(removeElement);
        todos.splice(index,1);
    }
    localStorage.setItem("localStr", JSON.stringify(todos));
}

function addItemStorage(val) {
    let todos=checkTodos();
    
    todos.push(val);
    localStorage.setItem("localStr", JSON.stringify(todos));
}

function checkTodos() {
    let todos;
    if(localStorage.getItem("localStr")==null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("localStr"));
    }
    return todos;
}

function getItemStorage() {
    let todos = checkTodos();
    todos.forEach((element)=>{
        addItemUI(element);
    })
}

function filterTodos(e) {
    let txt = e.target.value;
    let lisItems= document.getElementsByTagName("li");
    var arr = Array.prototype.slice.call(lisItems)

    arr.forEach((el)=>{
        if(!el.innerText.includes(txt)){
            el.setAttribute("style", "display:none !important")
        } else {
            el.style.display="block";
        }
    })

}