

let tasks = [ 
]
let taskCount = document.getElementById('taskCount')
function getstore()
{
  let ret = JSON.parse(localStorage.getItem('tasks'))
  tasks = ret ?? [] // if tasks not empty OK Else add the []
}
getstore()

function addNew(){
  document.getElementById('taskList').innerHTML = '';
  let index = 0
  for(task of tasks)
    {
    let content = 
    `
            <div class="task ${task.isDone ? 'done' :  ''} ">
            <div class="tasks">
                <p>${task.title}</p>
              </div>
              <div class="task-btn">
              <button onclick="deleteBtn(${index})" style="color:red;" class="deleteBtn"><i class="fa-solid fa-trash"></i></button>
              <button onclick="editBtn(${index})" class="deleteBtn"><i class="fa-solid fa-pen-to-square"></i></button>
              <button onclick="doneBtn(${index})" class="deleteBtn" ><i class="fa-solid ${task.isDone ? 'fa-xmark' :  'fa-check'}  "></i></button>
              </div>
              </div>
    `
    document.getElementById('taskList').innerHTML += content;
    taskCount.innerHTML = tasks.length
    index++
  }
}
addNew()

let addTask = document.getElementById('addTaskBtn')

addTask.addEventListener('click',function(){
  let taskTitle = prompt('ادخل المهمه هنا ... ')
  if(taskTitle){
    let time = new Date()
    let addAt = time.getDate() + '-' + (time.getMonth() + 1) + '-' + time.getFullYear() + ' | ' + time.getHours() + '-' + time.getMinutes()
    console.log(addAt);
    let taskObj = {
      'title' : taskTitle,
      'date' : addAt,
      'isDone' : false
    }
    tasks.push(taskObj)
    storeTask()
    addNew()
  }
})

function deleteBtn(index){
  let taskInfo = tasks[index]
  let checkDelete = confirm('هل انت متأكد من حذف : ' + taskInfo.title + ' !! ')
  if(checkDelete){
    tasks.splice(index, 1)
    storeTask()
    addNew()
    taskCount.innerHTML = tasks.length
  }
}

function editBtn(index){
  let taskInfo = tasks[index]
  let newTitle = prompt('ادخل اسم المهمه الجديد : ' , taskInfo.title)
  if(newTitle){
    taskInfo.title = newTitle; 
    storeTask()
    addNew()
  }


}


function doneBtn(index){
  let taskInfo = tasks[index]
  taskInfo.isDone = !taskInfo.isDone;
  storeTask()
  addNew()
}


function storeTask(){
  let changetostring = JSON.stringify(tasks)
 localStorage.setItem('tasks',changetostring) 
}