import PsVizBase from './ps-viz-base';
import PixelateFilter from '../services/Filter/Pixelate';

export default class PsVizFilterPixelate extends PsVizBase {
  static get tag() {
    return 'ps-viz-filter-pixelate';
  }

  static get observedAttributes() {
    return [ 'amount' ];
  }

  connectedCallback() {
    super.connectedCallback();
    this.pixelateFilter = new PixelateFilter();;
    this.setValuesFromAttributes(PsVizFilterPixelate.observedAttributes);
  }

  disconnectedCallback() {
    this.model.dispose();
  }

  setValuesFromAttributes(observedAttributes) {
    observedAttributes
      .filter(attrName => this.hasAttribute(attrName))
      .forEach(attrName => this.pixelateFilter.setParam(attrName, this.getAttribute(attrName)));
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    if (!this.isMounted) { return; }
    this.pixelateFilter.setParam(attrName, newVal);
    this.callbacks && this.callbacks.onChange();
  }
}
