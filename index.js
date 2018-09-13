import { MenuItem, MenuTitle } from './menu.js';

window.customElements.define('menu-item', MenuItem);
window.customElements.define('menu-title', MenuTitle);

// handle preview
const preview = document.querySelector('.preview');
const menuItemsLeft = document.querySelectorAll('#menu > .left > menu-item');
const menuItemsRight = document.querySelectorAll('#menu > .right > menu-item');

const previewTop = preview.querySelector('.top');
const previewBottom = preview.querySelector('.bottom');

let leftIndex = 0;
let rightIndex = 0;

let lastLeft;
let lastRight;

const setSelected = () => {
  const leftElem = menuItemsLeft[leftIndex];
  const rightElem = menuItemsRight[rightIndex];

  leftElem.setAttribute('selected', true);
  rightElem.setAttribute('selected', true);

  leftIndex = (leftIndex + 1) % menuItemsLeft.length;
  rightIndex = (rightIndex + 1) % menuItemsRight.length;

  if (lastLeft instanceof HTMLElement) {
    lastLeft.setAttribute('selected', false);
  }

  if (lastRight instanceof HTMLElement) {
    lastRight.setAttribute('selected', false);
  }

  lastLeft = leftElem;
  lastRight = rightElem;

  previewTop.innerHTML = '';
  previewBottom.innerHTML = '';

  const meme1 = document.createElement('span');
  meme1.innerText = leftElem.getAttribute('title');

  const meme2 = document.createElement('span');
  meme2.innerText = rightElem.getAttribute('title');

  previewTop.appendChild(meme1);
  previewBottom.appendChild(meme2);
};

setSelected();

setInterval(setSelected, 10000 / 2); // 5 seconds
