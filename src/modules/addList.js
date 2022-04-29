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
                <p contenteditable="true" class="paragraph" id="${this.index}">${this.description}</p>
             </label>
            <div class="setting">
                <i class="fas fa-ellipsis-v" class="fa-ellipsis-v"></i>
                <ul class="task-menu">
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
  const renderTasks = toDoList
    .map((task) => new Tasks(task.description, task.completed, task.index).renderTasks());
  toDoListEl.innerHTML = renderTasks.join('');

  const removeButton = document.querySelectorAll('.fa-trash');
  removeButton.forEach((button) => {
    button.addEventListener('click', (e) => {
      const id = e.target.getAttribute('id');
      Tasks.removeTask(id);
      displayTask();
      window.location.reload();
    });
  });
}
if (listFromLocalStorage) {
  toDoList = listFromLocalStorage;
  displayTask();
}
export function getData() {
  const taskValue = newTaskEl.value.replace(/^[ ]+|[ ]+$/g, '');
  const completed = false;
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
  window.location.reload();
  newTaskEl.value = '';
}
const updateStat = document.querySelectorAll('.updateStat');
updateStat.forEach((el) => {
  el.addEventListener('click', (e) => {
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

export const paragraph = document.querySelectorAll('.paragraph');

paragraph.forEach((el) => {
  el.addEventListener('focusin', (e) => {
    const id = e.target.getAttribute('id');
    editId = id - 1;
    isEdited = true;
    const name = toDoList[id - 1].description;
    e.target.innerHTML = name;
  });
});
paragraph.forEach((el) => {
  el.addEventListener('focusout', (e) => {
    const taskValue = e.target.innerHTML;
    const completed = false;
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
    window.location.reload();
    newTaskEl.value = '';
  });
});
clearAll.addEventListener('click', () => {
  const allCompleted = toDoList.filter((task) => task.completed !== true);
  toDoList = allCompleted;
  localStorage.setItem('ourTasks', JSON.stringify(toDoList));
  displayTask();
  window.location.reload();
});