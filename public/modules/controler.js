export function standartInputs(arr) {
  arr.forEach((input) => {
    if (input.id === 'password') input.placeholder = 'Type your Password';
    if (input.id === 'repPassword') input.placeholder = 'Repeat your Password';
    if (input.id === 'email') input.placeholder = 'Type your Email';
    input.classList.remove('error');
    input.classList.add('standart');
  });
}
export function clearInputs(arr) {
  arr.forEach((input) => {
    input.value = '';
  });
}
export function errorInputStyle(input, dest, msg, add, remove) {
  dest.textContent = msg;
  input.classList.remove(remove);
  input.classList.add(add);
}

export function clearSpan(dest) {
  dest.textContent = '';
}

export function frontErrorValidation(email, pass, spanEmail, spanPass, repPass, spanRepPass) {
  standartInputs([email, pass, repPass]);
  clearSpan(spanEmail);
  clearSpan(spanPass);
  clearSpan(spanRepPass);
  if (email.value === '') {
    errorInputStyle(email, spanEmail, 'Email area cannot be empty', 'error', 'standart');
  }
  if (pass.value === '') {
    errorInputStyle(pass, spanPass, 'Password area cannot be empty', 'error', 'standart');
  }
  if (repPass.value === '') {
    errorInputStyle(repPass, spanRepPass, 'Password area cannot be empty', 'error', 'standart');
    return 'blogai';
  }
  const passLength = checkPasswordLength(pass, repPass, spanPass, spanRepPass);
  if (passLength === 'blogai') {
    return 'blogai';
  }
}

function checkPasswordLength(pass, repPass, spanPass, spanRepPass) {
  if (pass.value.length < 5 || pass.value.length > 10) {
    errorInputStyle(
      pass,
      spanPass,
      'Your password should be 5 to 10 characters long',
      'error',
      'standart'
    );
    return 'blogai';
  }

  if (repPass.value !== pass.value) {
    errorInputStyle(pass, spanPass, 'Password dont match', 'error', 'standart');
    errorInputStyle(repPass, spanRepPass, 'Password dont match', 'error', 'standart');
    return 'blogai';
  }
}
