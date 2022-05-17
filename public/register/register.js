import { clearInputs, errorInputStyle, standartInputs } from '../modules/controler.js';

const BASE_URL = 'http://localhost:3000';
const formEl = document.forms[0];
const emailInputEl = formEl.elements.email;
const passwordInputEl = formEl.elements.password;
const repPasswordInputEl = formEl.elements.repPassword;

formEl.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (passwordInputEl.value.length < 5) {
    clearInputs([passwordInputEl, repPasswordInputEl]);
    errorInputStyle(
      passwordInputEl,
      'Password must be atleast 5 characters long',
      'error',
      'standart'
    );
    errorInputStyle(
      repPasswordInputEl,
      'Password must be atleast 5 characters long',
      'error',
      'standart'
    );
  }
  if (repPasswordInputEl.value !== passwordInputEl.value) {
    clearInputs([emailInputEl, passwordInputEl, repPasswordInputEl]);
    errorInputStyle(passwordInputEl, 'Password dont match', 'error', 'standart');
    errorInputStyle(repPasswordInputEl, 'Password dont match', 'error', 'standart');
  }
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
  const resp = await fetch(`${BASE_URL}/v1/register`, options);
  const data = await resp.json();
  if (data.success === true) {
    alert('Registration was successful');
    window.location.replace('../login/login.html');
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
