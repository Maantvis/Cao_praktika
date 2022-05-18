import { BASE_URL } from '../modules/common.js';
const token = localStorage.getItem('userToken');
if (!token) {
  window.location.replace('../login/login.html');
}
const formEl = document.forms[0];

const { date, title, content } = formEl.elements;
// const titleEl = formEl.elements.title;
// const contentEl = formEl.elements.content;

async function postArticles(token) {
  const newObj = {
    date: date.value,
    title: title.value,
    content: content.value,
    user_id: Number(localStorage.getItem('userId')),
  };
  const options = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(newObj),
  };
  const resp = await fetch(`${BASE_URL}/v1/articles`, options);
  console.log('resp ===', resp);
  const data = await resp.json();
  console.log('data ===', data);
}

formEl.addEventListener('submit', (e) => {
  e.preventDefault();
  postArticles(token);
});
