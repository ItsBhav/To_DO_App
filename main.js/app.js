//Problem: User interaction doesn't provide desired results
//Solution: Add interactivity so the user can manage daily tasks

var taskInput = document.getElementById('new-task'); //new-task
var addButton = document.getElementsByTagName('button')[0]; //first button
var incompleteTasksHolder = document.getElementById('incomplete-tasks'); //incomplete-tasks
var completeTasksHolder = document.getElementById('completed-tasks'); //completed-tasks

//New Task list item
var createNewTaskElement = function(taskString) {
  //Create List Item
  var listItem = document.createElement('li');
  
  //Create left div
  var divLeft = document.createElement('div');
  //input (checkbox)
  var checkBox = document.createElement('input'); //checkbox
  //label
  var label = document.createElement('label');
  //input(text)
  var editInput = document.createElement('input'); //text

  //Create right div
  var divRight = document.createElement('div');
  //button.edit
  var editButton = document.createElement('button'); 
  //button.delete
  var deleteButton = document.createElement('button');
  
  //Each elements needs modifying 
  checkBox.type = 'checkbox';
  editInput.type = 'text';
  editButton.textContent = 'Edit';
  editButton.className = 'edit';
  deleteButton.textContent = 'Delete';
  deleteButton.className = 'delete';

  label.textContent = taskString;

  //Each elements needs appending 
  listItem.appendChild(divLeft);
  divLeft.appendChild(checkBox);
  divLeft.appendChild(label);
  divLeft.appendChild(editInput);
  listItem.appendChild(divRight);
  divRight.appendChild(editButton);
  divRight.appendChild(deleteButton);
  return listItem;
}


//Add a new task
var addTask = function() {
  if (taskInput.value) {
    //Create a new list item with the text from #new-task:
    var listItem = createNewTaskElement(taskInput.value);

    //Append listItem to incompleteTasksHolder
    incompleteTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
    taskInput.value = '';
  }
}

//Edit an existing task
var editTask = function() {
  var divInner = this.parentNode;
  var listItem = divInner.parentNode;
  var editInput = listItem.querySelector('input[type=text]');
  var label = listItem.querySelector('label');
  var editButton = listItem.querySelector('button.edit');
  var containsClass = listItem.classList.contains('editMode');
  
  //If the class of the parent is .editMode
  if (containsClass) {
    //Switch from .editMode
      //label text become the input's value
    label.textContent = editInput.value;
    editButton.textContent = 'Edit';
    } else {
      //Switch to .editMode
      //input value becomes the label's text
      editInput.value = label.textContent;
      editButton.textContent = 'Save';
    }
    //Toggle .editMode on the list item
    listItem.classList.toggle('editMode');
}

//Delete an existing task
var deleteTask = function() {
  //Remove the parent list item from the ul
  var divInner = this.parentNode;
  var listItem = divInner.parentNode;
  var ul = listItem.parentNode;
  ul.removeChild(listItem);
}

//Mark a task as complete
var taskCompleted = function() {
  //Append the task list item to the #completed-tasks
  var divInner = this.parentNode;
  var listItem = divInner.parentNode;
  completeTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
}

var taskIncomplete = function() {
  //Append this to #incomplete-tasks
  var divInner = this.parentNode;
  var listItem = divInner.parentNode;
  incompleteTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
}

var bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
  //select taskListItems's childrens
  var checkBox = taskListItem.querySelector('input[type=checkbox');
  var editButton = taskListItem.querySelector('button.edit');
  var deleteButton = taskListItem.querySelector('button.delete');
    //bind editTask to edit button
    editButton.onclick = editTask;
    //bind deleteTask to delete button
    deleteButton.onclick = deleteTask;
    //bind checkBoxEventHandler to the checkbox
    checkBox.onclick = checkBoxEventHandler;
}

//Set click handler to the add task function
addButton.addEventListener('click', addTask);

//cycle over the incompleteTasksHolder ul list items
for (var i = 0; i < incompleteTasksHolder.children.length; i++) {
  //bind events to list item's children (taskCompleted)
  bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
}
    
//cycle over the completeTasksHolder ul list items
for (var i = 0; i < completeTasksHolder.children.length; i++) {
  //bind events to list it'ms children (taskIncomplete)
  bindTaskEvents(completeTasksHolder.children[i], taskIncomplete);
}
