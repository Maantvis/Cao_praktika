import { BASE_URL } from '../modules/common.js';
const cardsContainerEl = document.querySelector('.grid');
const token = localStorage.getItem('userToken');

if (!token) {
  window.location.replace('../login/login.html');
}
