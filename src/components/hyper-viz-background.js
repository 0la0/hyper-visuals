import HyperVizBase from './hyper-viz-base';
import BackgroundModel from '../services/BackgroundModel';

let instanceIsConnected = false;

export default class PsVizBackground extends HyperVizBase {
  static get tag() {
    return 'h-viz-background';
  }

  static get observedAttributes() {
    return [ 'color', 'light-color', 'light-intensity' ];
  }

  connectedCallback() {
    if (instanceIsConnected) {
      console.error('Error, cannot have multiple h-viz-background');
      return;
    } else {
      instanceIsConnected = true;
    }
    super.connectedCallback();
    this.model = new BackgroundModel();
    this.setValuesFromAttributes(PsVizBackground.observedAttributes);
  }

  disconnectedCallback() {
    instanceIsConnected = false;
    this.model.dispose();
  }

  setValuesFromAttributes(observedAttributes) {
    observedAttributes
      .filter(attrName => this.hasAttribute(attrName))
      .forEach(attrName => this.model.setParam(attrName, this.getAttribute(attrName)));
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    if (!this.isMounted) { return; }
    this.model.setParam(attrName, newVal);
  }
}
