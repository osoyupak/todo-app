//dom elements
const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const addBtn = document.getElementById("btn-add");




addAllEventlisteners();
/***** Event Listeners *****/
function addAllEventlisteners() {
    todoForm.addEventListener("submit", addItem);

}

/***** Functions *****/
function addItem(e) {
    const val = todoInput.value;
    console.log(val);
    e.preventDefault();
}
