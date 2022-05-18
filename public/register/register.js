import { clearInputs, errorInputStyle, standartInputs, frontErrorValidation } from '../modules/controler.js';
import { BASE_URL } from '../modules/common.js';

const formEl = document.forms[0];
const emailInputEl = formEl.elements.email;
const passwordInputEl = formEl.elements.password;
const repPasswordInputEl = formEl.elements.repPassword;

const emailErr = document.getElementById('emailErr');
const passwordErr = document.getElementById('passwordErr');
const repPasswordErr = document.getElementById('repPasswordErr');

formEl.addEventListener('submit', async (e) => {
  e.preventDefault();
  const front = frontErrorValidation(
    emailInputEl,
    passwordInputEl,
    emailErr,
    passwordErr,
    repPasswordInputEl,
    repPasswordErr
  );
  console.log(front);
  if (front === 'blogai') {
    return;
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
  console.log(resp);
  if (resp.ok === false) {
    console.log('klaida');
  }
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
