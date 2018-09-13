export class MenuItem extends HTMLElement {
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
