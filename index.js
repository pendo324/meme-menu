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

  const meme1 = document.createElement('img');
  meme1.src = leftElem.getAttribute('image');
  meme1.classList.add('fade-in');

  const meme2 = document.createElement('img');
  meme2.src = rightElem.getAttribute('image');
  meme2.classList.add('fade-in');

  if (previewTop.childNodes.length > 0) {
    // fade out
    const existingImg = previewTop.querySelector('img');
    existingImg.classList.add('fade-out');
    existingImg.addEventListener(
      'webkitTransitionEnd',
      () => {
        previewTop.innerHTML = '';
        previewTop.appendChild(meme1);
        setTimeout(() => {
          previewTop.querySelector('img').classList.remove('fade-in');
        });
      },
      false
    );
  } else {
    previewTop.appendChild(meme1);
    previewTop.querySelector('img').classList.remove('fade-in');
  }

  if (previewBottom.childNodes.length > 0) {
    // fade out
    const existingImg = previewBottom.querySelector('img');
    existingImg.classList.add('fade-out');
    existingImg.addEventListener(
      'webkitTransitionEnd',
      () => {
        previewBottom.innerHTML = '';
        previewBottom.appendChild(meme2);
        setTimeout(() => {
          previewBottom.querySelector('img').classList.remove('fade-in');
        });
      },
      false
    );
  } else {
    previewBottom.appendChild(meme2);
    previewBottom.querySelector('img').classList.remove('fade-in');
  }
};

setSelected();

setInterval(setSelected, 10000 / 2); // 5 seconds
