export const form = document.querySelector('form');
export const newTaskEl = document.getElementById('new-task');
export const toDoListEl = document.querySelector('.toDoList');
export const btnTask = document.querySelector('.btn-task');
export const clearAll = document.querySelector('.clear-all');
export const inputEl = document.querySelectorAll('.inputEl');
let editId;
let isEdited = false;
let toDoList = [];
export default class Tasks {
  constructor(description, completed, index) {
    this.description = description;
    this.completed = completed;
    this.index = index;
  }

  renderTasks() {
    return `
         <li class="task">
            <label for="task-${this.index}">
                <input class="updateStat" type="checkbox" id="${this.index}">
                <p>${this.description}</p>
             </label>
            <div class="setting">
                <i class="fas fa-ellipsis-v" class="fa-ellipsis-v"></i>
                <ul class="task-menu">
                    <li><i class="fas fa-pen" id="${this.index}"></i></li>
                    <li><i class="fa fa-trash" id='${this.index}' aria-hidden="true"></i></li>
                </ul>
            </div> 
         </li>
          `;
  }

  static appendTask(task) {
    let index = 1;
    if (toDoList.length >= 1) {
      index = toDoList[toDoList.length - 1].index + 1;
    }
    task.index = index;
    toDoList.push(task);
    localStorage.setItem('ourTasks', JSON.stringify(toDoList));
  }

  static removeTask(index) {
    toDoList = toDoList.filter((task) => task.index !== Number(index));
    localStorage.setItem('ourTasks', JSON.stringify(toDoList));
  }
}
export const listFromLocalStorage = JSON.parse(
  localStorage.getItem('ourTasks'),
);
export function displayTask() {
  // eslint-disable-next-line max-len
  const renderTasks = toDoList.map((task) => new Tasks(task.description, task.completed, task.index).renderTasks());
  toDoListEl.innerHTML = renderTasks.join('');

  const removeButton = document.querySelectorAll('.fa-trash');
  removeButton.forEach((button) => {
    button.addEventListener('click', (e) => {
      const id = e.target.getAttribute('id');
      Tasks.removeTask(id);
      displayTask();
    });
  });
}
if (listFromLocalStorage) {
  toDoList = listFromLocalStorage;
  displayTask();
}
export function getData() {
  const taskValue = newTaskEl.value.replace(/^[ ]+|[ ]+$/g, '');
  // eslint-disable-next-line prefer-const
  let completed = false;
  window.console.log(taskValue);
  if (!taskValue) {
    return;
  }
  if (!isEdited) {
    const newTask = new Tasks(taskValue, completed);
    Tasks.appendTask(newTask);
  } else {
    isEdited = false;
    toDoList[editId].description = taskValue;
    localStorage.setItem('ourTasks', JSON.stringify(toDoList));
  }
  displayTask();
  newTaskEl.value = '';
}
const updateStat = document.querySelectorAll('.updateStat');
updateStat.forEach((el) => {
  el.addEventListener('click', (e) => {
    window.console.log(e.target.id);
    const taskName = e.target.parentElement.lastElementChild;
    if (el.checked) {
      taskName.classList.add('checked');
      toDoList[e.target.id - 1].completed = true;
    } else {
      taskName.classList.remove('checked');
      toDoList[e.target.id - 1].completed = false;
    }
    localStorage.setItem('ourTasks', JSON.stringify(toDoList));
  });
});
const ellipsis = document.querySelectorAll('.fa-ellipsis-v');
window.console.log(ellipsis);
ellipsis.forEach((el) => {
  el.addEventListener('click', (e) => {
    const menu = e.target;
    const taskMenu = menu.parentElement.lastElementChild;
    taskMenu.classList.add('show');
    document.addEventListener('click', (e) => {
      if (e.target.tagName !== 'I' || e.target !== menu) {
        taskMenu.classList.remove('show');
      }
    });
  });
});
const editBtn = document.querySelectorAll('.fa-pen');
window.console.log(editBtn);
editBtn.forEach((el) => {
  el.addEventListener('click', (e) => {
    const id = e.target.getAttribute('id');
    editId = id - 1;
    isEdited = true;
    const name = toDoList[id - 1].description;
    newTaskEl.value = name;
  });
});
clearAll.addEventListener('click', () => {
  toDoList.splice(0, toDoList.length);
  localStorage.setItem('ourTasks', JSON.stringify(toDoList));
  displayTask();
});