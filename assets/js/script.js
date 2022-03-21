// Calling the populate function onload 
retrieveTasks();

// Getting Input field and  button
let userInput = document.getElementById('userInput');
let btnAdd = document.getElementById('btnAdd');

let editId;
let isEditedTask = false;

// Function to push the user task into localStorage
function addTask() {
  let userTask = userInput.value;

  if (userTask == '') {
    alert('Enter your task to be added');
  } else {
    // Getting data from localStorage and parsing as JS object
    let myArr = JSON.parse(localStorage.getItem('Tasks'));

    // If it is not edited task this part will be executed
    if (!isEditedTask) {
      if (myArr == null) {
        // Passing empty array if there is nothing in the localStorage
        myArr = [];
      }

      // creating an object and assigining user's task and it's status
      let taskInfo = {
        name: userTask,
        status: "pending"
      };

      // Pushing our object into array
      myArr.push(taskInfo);
    } else {
      isEditedTask = false;
      myArr[editId].name = userTask;
    }

    // Setting the localStorage
    localStorage.setItem('Tasks', JSON.stringify(myArr));

    // Clearing the input field after adding a task
    userInput.value = '';

    // Populating our tasks after adding
    retrieveTasks();
  }
}

// Calling the addTask function onclick of add button
btnAdd.addEventListener('click', addTask);

// Function to populate user tasks after adding 
function retrieveTasks() {

  // Getting data from localStorage and parsing as JS object
  let myArr = JSON.parse(localStorage.getItem('Tasks'));

  if (myArr == null) {
    console.log('There is nothing')
  } else {
    let listHolder = document.getElementById('listHolder');
    let htmlToReturn = '';
    myArr.forEach((task, id) => {
      let isCompleted = task.status == "completed" ? "checked" : "";
      let isFinished = task.status == "completed" ? "finished" : "";
      htmlToReturn +=
        '<div class="myTask ' + isCompleted + '" id="myTask' + id + '">' +
        '<div class="checkBoxHolder">' +
        '<input type="checkbox" class="completedTask" id=' + id + ' onclick="updateStatus(this)" ' + isCompleted + '>' +
        '</div > ' +
        '<div class="taskName ' + isFinished + '" id="taskName' + id + '">' + task.name + '</div>' +
        '<div class="btnHolder">' +
        '<button onclick="editTask(' + id + ')" class="btnEdit"><i class="fas fa-edit"></i></button>' +
        '<button class="btnRemove" onclick="deleteTask(' + id + ')"><i class="fas fa-trash"></i></button>' +
        '</div>' +
        '</div >';
    });
    // Injecting the retrieved tasks into list holder
    listHolder.innerHTML = htmlToReturn;
  }
}

// Function to update the status of the selected task
function updateStatus(selectedTask) {

  let myArr = JSON.parse(localStorage.getItem('Tasks'));

  if (selectedTask.checked == true) {
    document.getElementById('myTask' + selectedTask.id).classList.add('checked');
    document.getElementById('taskName' + selectedTask.id).classList.add('finished');
    // Updating the status of the selected task when checkbox is checked 
    myArr[selectedTask.id].status = "completed";
  } else {
    document.getElementById('myTask' + selectedTask.id).classList.remove('checked');
    document.getElementById('taskName' + selectedTask.id).classList.remove('finished');
    // Updating the status of the selected task when checkbox is checked 
    myArr[selectedTask.id].status = "pending";
  }
  // Setting the localStorage after updating the status of the selected task
  localStorage.setItem('Tasks', JSON.stringify(myArr));
}

// Function to delete the selected task
function deleteTask(delId) {
  let myArr = JSON.parse(localStorage.getItem('Tasks'));

  myArr.splice(delId, 1);
  localStorage.setItem('Tasks', JSON.stringify(myArr));
  retrieveTasks();
}

// Function to edit the selected task
function editTask(taskId) {
  editId = taskId;
  isEditedTask = true;
  let myArr = JSON.parse(localStorage.getItem('Tasks'));
  userInput.value = myArr[taskId].name;
  userInput.focus();
}