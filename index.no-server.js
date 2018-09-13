class MenuItem extends HTMLElement {
  static get observedAttributes() {
    return ['selected'];
  }

  constructor() {
    super();

    const template = document.getElementById('menu-item');
    const templateContent = template.content;

    const shadowRoot = this.attachShadow({
      mode: 'open'
    });

    shadowRoot.appendChild(templateContent.cloneNode(true));

    const title = this.getAttribute('title');
    const subtitle = this.getAttribute('subtitle');
    const price = this.getAttribute('price');

    let currency = '$';
    if (this.hasAttribute('currency')) {
      currency = this.getAttribute('currency');
    }

    const titleElem = shadowRoot.querySelector('.title');
    const subtitleElem = shadowRoot.querySelector('.subtitle');
    const priceElem = shadowRoot.querySelector('.price');

    titleElem.textContent = title;
    subtitleElem.textContent = subtitle;
    priceElem.textContent = `${currency}${price}`;

    if (this.hasAttribute('subprice')) {
      const subprice = this.getAttribute('subprice');
      const subpriceElem = shadowRoot.querySelector('.subprice');
      subpriceElem.textContent = subprice;
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'selected') {
      const newValueBool = newValue == 'true';
      if (newValueBool) {
        const spans = this.shadowRoot.querySelectorAll('span');
        spans.forEach((span) => {
          span.classList.add('selected');
        });
      } else {
        const spans = this.shadowRoot.querySelectorAll('span');
        spans.forEach((span) => {
          span.classList.remove('selected');
        });
      }
    }
  }
}

class MenuTitle extends HTMLElement {
  constructor() {
    super();

    const template = document.getElementById('menu-title');
    const templateContent = template.content;

    const shadowRoot = this.attachShadow({
      mode: 'open'
    });

    shadowRoot.appendChild(templateContent.cloneNode(true));

    const title = this.getAttribute('title');

    const titleElem = shadowRoot.querySelector('.title');

    titleElem.textContent = title;
  }
}

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
