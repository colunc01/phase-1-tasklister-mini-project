document.addEventListener("DOMContentLoaded", myFunction);
var taskList = [];

 const newTaskForm = document.getElementById("create-task-form");
   var newTaskDescription = null;//document.getElementById("new-task-description");
   var newTaskPriority = null;
   var arrayPriority; 


   // sample code said this is where new tasks will live on DOM
   const taskUl = document.getElementById("tasks");
   
   // Turned renderApp to a rather intense function.
   let newRank = false;
   // Render app defaults to null if a task is not passed through it.
  function renderApp(x = null, priorityNumber)
  {
    // if x is not null then the sorting function is called to add the new task to the list.
    if (x != null){
      sortingList(x, priorityNumber);
    }
    
    taskUl.innerHTML = ""; // Clears the old list essentially; prints it.
    // Renders the elements of the taskList array into the webpage
     for (i=0;i<taskList.length;i++){
        taskUl.innerHTML += taskList[i].render(); 
    }  
  }
  
  // gets name of the task description and its priority
function myFunction() {
   newTaskDescription = document.getElementById("new-task-description");
   newTaskPriority = document.getElementById("new-task-priority");
   
}

// Created a Sorting function in order to add new elements.
// Since tasks are added one task at a time, the list will be sorted and its a matter of finding where the new task should be inserted.
function sortingList(x, priorityNum){
  // If this is the first task then the following code is executed
  if(taskList.length==0){
    taskList.push(x);
  }
  // else there are other tasks.
  else{ 
    let temp1 = [];
    let tick = 1000; // tick will find where the new task should be inputted by finding the lowest number (highest priority) in the array
    let newPriority = priorityNum;
    let found = false;

    // fill out temp1 array
    for(i=0;i<taskList.length;i++){
      // Finds where the new task needs to be included. If the new task has a lower priority than the priority being checked.
      // It will be added to the temporary array (temp1).
      if(newPriority<taskList[i].priority){
        temp1.push(x);
        tick=i;
        found =true; // This was necessary to allow other items be added if the priority was found in the middle
        break;
      }
      // If the priority isn't higher than the current element then the element in task list is added to the temp array
      else{
        temp1.push(taskList[i]);
      }
    }
    if(found ==false){
      temp1.push(x);
    }
    // Adds the elements to the temp array after the new task is added.
    for(i=tick;i<taskList.length;i++){
      temp1.push(taskList[i]);
    }

    taskList = []; // clears the taskList
    // Adds the temp array's elements into the old TaskList
    for(i=0;i<temp1.length;i++){
      taskList.push(temp1[i]);
    }
    // console.table(taskList); // Printed the taskList to console to debug
  }
}

// Create New Task (Submit) Button
newTaskForm.addEventListener("submit", (e) => {
  console.log("submit");
  e.preventDefault();

 //************************************************ */ 
 //  Removed "taskList.createNewTask(newTaskDescription.value);"  because deleting a task doesn't account for duplicates/doubles
 /************************************************** */
 var description = newTaskDescription.value;
 var priority = newTaskPriority.value; //added that priority has to be inputted

 // Checks to see if priority is a number and that box is not empty
 if (isNaN(priority) || priority==''){
  window.alert("Priority is not a number");
  description = null;
 }

 // If priority is a number than the original code is executed
 else{
  // reset form
  e.target.reset();
  let tasks1 = new Task(description, priority); // added the new task to require priority be included
  renderApp(tasks1, priority); 
 } 
});

// Delete button
taskUl.addEventListener("click", (e) => {
  if (e.target.nodeName == 'BUTTON') {
    var deleteNode = e.target.dataset.description;
    var temp = [];
    var j = 0;

    for (i=0;i<taskList.length;i++){
      //Here's where the deleted task is found. It gets the description and matches it to the array
      // if it doesn't equal it adds the item into the temporary array
      if (taskList[i].description != deleteNode){
        temp.push(taskList[i]);     
      }
      // if the deleteNode equals the deleted task it adds the value after that number
      else {
        for (k=i+1;k<taskList.length;k++){
          temp.push(taskList[k]);  
        }

        //This makes the new task list equal the temp array
        taskList=[];
        for (i=0;i<temp.length;i++){
          taskList.push(temp[i]); 
        }
        renderApp();
        break;
    }
  }
  }
});

// I saw in the sample code that a class called task.js was its own file so I copied that code here and utilized it.
// The biggest difference I added was that my class also requires priority be inputted.
class Task {
  constructor(description, priority) {
    this.description = description;
    // Added that the priority needs to be included to the Task.
    this.priority = priority;
  }

  render() {
    return `
      <li>
        ${this.description}
        <button data-description="${this.description}">Delete</button>
      </li>
      `;
  }
}