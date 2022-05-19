import { BASE_URL } from '../modules/common.js';

const token = localStorage.getItem('userToken');
const id = location.search.slice(2);

const titleEl = document.getElementById('title');
const contentEl = document.getElementById('content');
const dateEl = document.getElementById('date');
const editBtn = document.getElementById('editBtn');

const titleInpEl = document.getElementById('titleInp');
const contentInpEl = document.getElementById('contentInp');
const dateInpEl = document.getElementById('dateInp');
const submitBtnEl = document.getElementById('submitBtn');

let article;
if (!token) {
  window.location.replace('../login/login.html');
}

function renderContent(arr) {
  arr.forEach((obj) => {
    titleEl.textContent = obj.title;
    contentEl.textContent = obj.content;
    dateEl.textContent = obj.date.slice(0, 10);
  });
}

async function getArticles(token) {
  const resp = await fetch(`${BASE_URL}/v1/article/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (resp.ok === false) {
    window.location.replace('../login/login.html');
  }
  const data = await resp.json();
  console.log('data ===', data);
  renderContent(data.article);
  article = data.article[0].user_id;
}

getArticles(token);

editBtn.addEventListener('click', () => {
  if (article !== +localStorage.getItem('userId')) {
    alert('You can only edit your post');
    return;
  }

  editBtn.textContent === 'Edit'
    ? (editBtn.textContent = 'Cancel')
    : (editBtn.textContent = 'Edit');

  titleInpEl.classList.toggle('hidden');
  contentInpEl.classList.toggle('hidden');
  dateInpEl.classList.toggle('hidden');
  submitBtnEl.classList.toggle('hidden');
});
submitBtnEl.addEventListener('click', (e) => {
  e.preventDefault();

  const obj = {
    date: dateInpEl.value,
    title: titleInpEl.value,
    content: contentInpEl.value,
  };
});
