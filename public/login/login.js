const BASE_URL = 'http://localhost:3000';
const formEl = document.forms[0];
const emailInputEl = formEl.elements.email;
const passwordInputEl = formEl.elements.password;

formEl.addEventListener('submit', async (e) => {
  e.preventDefault();
  const options = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      email: emailInputEl.value,
      password: passwordInputEl.value,
    }),
  };
  const resp = await fetch(`${BASE_URL}/v1/login`, options);
  const data = await resp.json();
  if (data.success === true) {
    localStorage.setItem('userToken', data.token);
    window.location.replace('../articles/articles.html');
  } else {
    errorHandling(data);
  }
});

function errorHandling(arr) {
  standartInputs(emailInputEl, passwordInputEl);
  if (arr.success === false) {
    clearInputs(emailInputEl, passwordInputEl);
    errorInputStyle(emailInputEl, arr.msg, 'error', 'standart');
    errorInputStyle(passwordInputEl, arr.msg, 'error', 'standart');
    return;
  }
  arr.forEach((errObj) => {
    if (errObj.path[0] === 'email') {
      errorInputStyle(emailInputEl, errObj.message, 'error', 'standart');
    }
    if (errObj.path[0] === 'password') {
      errorInputStyle(passwordInputEl, errObj.message, 'error', 'standart');
    }
  });
}
function standartInputs(email, password) {
  email.placeholder = 'Type your Email';
  email.classList.remove('error');
  email.classList.add('standart');
  password.placeholder = 'Type your password';
  password.classList.remove('error');
  password.classList.add('standart');
}
function clearInputs(email, password) {
  email.value = '';
  password.value = '';
}
function errorInputStyle(input, msg, add, remove) {
  input.placeholder = msg;
  input.classList.remove(remove);
  input.classList.add(add);
}
