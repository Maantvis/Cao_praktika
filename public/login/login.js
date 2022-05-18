import { clearInputs, errorInputStyle, standartInputs, clearSpan } from '../modules/controler.js';
import { BASE_URL } from '../modules/common.js';

const formEl = document.forms[0];
const emailInputEl = formEl.elements.email;
const passwordInputEl = formEl.elements.password;
const emailErr = document.getElementById('emailErr');
const passwordErr = document.getElementById('passwordErr');

formEl.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (
    emailInputEl.value === '' ||
    passwordInputEl.value === '' ||
    passwordInputEl.value.length < 5 ||
    passwordInputEl.value.length > 10
  ) {
    clearSpan(emailErr);
    clearSpan(passwordErr);
    standartInputs([emailInputEl, passwordInputEl]);
    if (emailInputEl.value === '') {
      errorInputStyle(emailInputEl, emailErr, 'Email area cannot be empty', 'error', 'standart');
    }
    if (passwordInputEl.value === '') {
      errorInputStyle(
        passwordInputEl,
        passwordErr,
        'Password area cannot be empty',
        'error',
        'standart'
      );
      return;
    }
    if (passwordInputEl.value.length < 5 || passwordInputEl.value.length > 10) {
      errorInputStyle(
        passwordInputEl,
        passwordErr,
        'Your password should be 5 to 10 characters long',
        'error',
        'standart'
      );
    }
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
  const resp = await fetch(`${BASE_URL}/v1/login`, options);
  const data = await resp.json();
  if (data.success === true) {
    localStorage.setItem('userToken', data.token);
    localStorage.setItem('userId', data.paylod.userId);
    window.location.replace('../articles/articles.html');
  } else {
    errorHandling(data);
  }
});

function errorHandling(arr) {
  clearSpan(emailErr);
  clearSpan(passwordErr);
  standartInputs([emailInputEl, passwordInputEl], emailErr, passwordErr);
  if (arr.success === false) {
    // clearInputs([emailInputEl, passwordInputEl]);
    errorInputStyle(emailInputEl, emailErr, arr.msg, 'error', 'standart');
    errorInputStyle(passwordInputEl, passwordErr, arr.msg, 'error', 'standart');
    return;
  }
  arr.forEach((errObj) => {
    if (errObj.path[0] === 'email') {
      errorInputStyle(emailInputEl, emailErr, errObj.message, 'error', 'standart');
    }
    if (errObj.path[0] === 'password') {
      clearInputs([passwordInputEl]);
      errorInputStyle(passwordInputEl, passwordErr, errObj.message, 'error', 'standart');
    }
  });
}
