import { toDoList } from './addList.js';

export default function isCompleted(el) {
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
}
