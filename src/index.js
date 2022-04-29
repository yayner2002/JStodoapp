import './style.css';
import {
  getData, btnTask, form,
} from './modules/addList.js';

btnTask.addEventListener('click', (e) => {
  e.preventDefault();
  getData();
});
form.addEventListener('submit', (e) => {
  e.preventDefault();
  getData();
});
