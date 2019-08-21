import PsVizBase from './ps-viz-base';
import CloudFilter from '../services/Filter/Clouds';

export default class PsVizFilterCloud extends PsVizBase {
  static get tag() {
    return 'ps-viz-filter-cloud';
  }

  static get observedAttributes() {
    return [ 'amplitude', 'frequency', ];
  }

  connectedCallback() {
    super.connectedCallback();
    this.cloudFilter = new CloudFilter();
    this.setValuesFromAttributes(PsVizFilterCloud.observedAttributes);
  }

  disconnectedCallback() {
    this.model.dispose();
  }

  setValuesFromAttributes(observedAttributes) {
    observedAttributes
      .filter(attrName => this.hasAttribute(attrName))
      .forEach(attrName => this.cloudFilter.setParam(attrName, this.getAttribute(attrName)));
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    if (!this.isMounted) { return; }
    this.cloudFilter.setParam(attrName, newVal);
    this.callbacks && this.callbacks.onChange();
  }
}
