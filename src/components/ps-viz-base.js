export default class PsVizBase extends HTMLElement {
  constructor() {
    super();
    this.isMounted = false;
  }

  connectedCallback() {
    this.isMounted = true;
  }
}
