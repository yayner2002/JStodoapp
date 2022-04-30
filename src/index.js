import './style.css';
import {
  getData, btnTask, form, updateStat,
} from './modules/addList.js';
import isCompleted from './modules/updateTaskStatus.js';

updateStat.forEach((el) => {
  isCompleted(el);
});
btnTask.addEventListener('click', (e) => {
  e.preventDefault();
  getData();
});
form.addEventListener('submit', (e) => {
  e.preventDefault();
  getData();
  window.location.reload();
});
