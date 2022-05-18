import { BASE_URL } from '../modules/common.js';
import { articlesFronEndValidation } from '../modules/controler.js';
const token = localStorage.getItem('userToken');
if (!token) {
  window.location.replace('../login/login.html');
}
const formEl = document.forms[0];

const { date, title, content } = formEl.elements;
const dateErr = document.getElementById('dateErr');
const titleErr = document.getElementById('titleErr');
const contentErr = document.getElementById('contentErr');

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
  const data = await resp.json();
  if (data.success === true) {
    alert(data.msg);
    window.location.replace('../articles/articles.html');
  } else {
    alert('something went wrong');
  }
}

formEl.addEventListener('submit', (e) => {
  e.preventDefault();

  const validation = articlesFronEndValidation(date, title, content, dateErr, titleErr, contentErr);
  if (validation === 'blogai') {
    return;
  }

  postArticles(token);
});
