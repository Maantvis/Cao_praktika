export function standartInputs(arr) {
  console.log('arr ===', arr);
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
export function errorInputStyle(input, msg, add, remove) {
  input.placeholder = msg;
  input.classList.remove(remove);
  input.classList.add(add);
}
