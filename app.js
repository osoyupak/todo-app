//dom elements
const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const addBtn = document.getElementById("btn-add");
const listGroup = document.querySelector(".list-group");
const secondCardBody = document.querySelectorAll(".card-body")[1];


addAllEventlisteners();
/***** Event Listeners *****/
function addAllEventlisteners() {
    todoForm.addEventListener("submit", addItem);
    secondCardBody.addEventListener("click", removeItem);

    window.addEventListener("DOMContentLoaded", getItemStorage);
}

/***** Functions *****/
function addItem(e) {
    const val = todoInput.value.trim();
    addItemUI(val);
    addItemStorage(val);

    e.preventDefault();
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

    }
}

function addItemStorage(val) {
    let localArray;
    if(localStorage.getItem("localStr")==null) {
        localArray = [];
    } else {
        localArray = JSON.parse(localStorage.getItem("localStr"));
    }
    localArray.push(val);
    localStorage.setItem("localStr", JSON.stringify(localArray));
}




function getItemStorage() {
    let todos = JSON.parse(localStorage.getItem("localStr"));
    console.log(todos);
    todos.forEach((element)=>{
        addItemUI(element);
    })
}