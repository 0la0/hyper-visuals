export default class HyperVizBase extends HTMLElement {
  constructor() {
    super();
    this.isMounted = false;
  }

  connectedCallback() {
    this.isMounted = true;
  }
}
