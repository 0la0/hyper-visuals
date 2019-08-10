import PsVizBase from './ps-viz-base';
import Light from '../services/Light';

export default class PsVizLight extends PsVizBase {
  static get tag() {
    return 'ps-viz-light';
  }

  static get observedAttributes() {
    return [ 'position', 'color', 'intensity', ];
  }

  connectedCallback() {
    super.connectedCallback();
    this.light = new Light();
    this.setValuesFromAttributes(PsVizLight.observedAttributes);
    requestAnimationFrame(() => {
      if (this.parentNode.graphicsModel) {
        this.parentNode.graphicsModel.connectTo(this.light);
      }
    });
  }

  disconnectedCallback() {
    console.log('ps-viz-light disconnected');
    this.light.dispose();
  }

  setValuesFromAttributes(observedAttributes) {
    observedAttributes
      .filter(attrName => this.hasAttribute(attrName))
      .forEach(attrName => this.light.setParam(attrName, this.getAttribute(attrName)));
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    if (!this.isMounted) { return; }
    this.light.setParam(attrName, newVal);
    this.callbacks && this.callbacks.onChange();
  }
}
