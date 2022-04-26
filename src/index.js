/* eslint-disable no-plusplus */
import './style.css';

const toDoList = [
  {
    description: 'Standup in the Morning',
    completed: false,
    index: 0,
  },
  {
    description: 'Go to Church',
    completed: false,
    index: 1,
  },
  {
    description: 'Attend Morning Session Meeting',
    completed: false,
    index: 2,
  },
  {
    description: 'Do a Codding Challenge',
    completed: false,
    index: 3,
  },
  {
    description: 'Attend the Stand-Up Meeting',
    completed: false,
    index: 4,
  },
  {
    description: 'Join Live Javascript Bootcamp',
    completed: false,
    index: 5,
  },
];

const component = () => {
  let htmlEl = `
  <div class="todo-header">
    <h3 class="list-title">Today's To Do List</h3>
    <span class="list-sync-icon"><i class="fa fa-sync"></i></span>
  </div>
  <form>
    <input type="text" class="new-task" placeholder="Add to your list..." aria-label="new task name">
    <button class="btn-task" aria-label="create new task"><i class="fas fa-level-down-alt rotate"></i></button>
  </form>
  `;
  toDoList.forEach((list, index) => {
    htmlEl += `
      <div class="task">
         <input type="checkbox" id="task-${list[index]}">
         <label for="task-${list[index]}">${list.description}</label>
         <i class="fas fa-ellipsis-v"></i>
      </div>
    `;
  });
  htmlEl += `
        <div class="clear-all">
          <p>Clear All Completed</p>
        </div>
  `;
  return htmlEl;
};

document.querySelector('.toDoList').innerHTML = component();
