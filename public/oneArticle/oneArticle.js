import { BASE_URL } from '../modules/common.js';

const token = localStorage.getItem('userToken');
const id = location.search.slice(2);

const titleEl = document.getElementById('title');
const contentEl = document.getElementById('content');
const dateEl = document.getElementById('date');
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
}

getArticles(token);
