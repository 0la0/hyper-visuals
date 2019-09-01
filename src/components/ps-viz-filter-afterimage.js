import PsVizBase from './ps-viz-base';
import AfterImageFilter from '../services/Filter/AfterImage';

export default class PsVizFilterAfterImage extends PsVizBase {
  static get tag() {
    return 'ps-viz-filter-afterimage';
  }

  static get observedAttributes() {
    return [];
  }

  connectedCallback() {
    super.connectedCallback();
    this.filter = new AfterImageFilter();
    this.setValuesFromAttributes(PsVizFilterAfterImage.observedAttributes);
  }

  disconnectedCallback() {
    this.model.dispose();
  }

  setValuesFromAttributes(observedAttributes) {
    observedAttributes
      .filter(attrName => this.hasAttribute(attrName))
      .forEach(attrName => this.filter.setParam(attrName, this.getAttribute(attrName)));
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    if (!this.isMounted) { return; }
    this.filter.setParam(attrName, newVal);
    this.callbacks && this.callbacks.onChange();
  }
}
