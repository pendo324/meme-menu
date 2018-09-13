export class MenuTitle extends HTMLElement {
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
};
