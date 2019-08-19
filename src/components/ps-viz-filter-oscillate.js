import PsVizBase from './ps-viz-base';
import OscillatorFilter from '../services/Filter/Oscillator';

export default class PsVizFilterOscillate extends PsVizBase {
  static get tag() {
    return 'ps-viz-filter-oscillate';
  }

  static get observedAttributes() {
    return [ 'amplitude', 'frequency', 'period' ];
  }

  connectedCallback() {
    super.connectedCallback();
    this.oscillatorFilter = new OscillatorFilter();
    this.setValuesFromAttributes(PsVizFilterOscillate.observedAttributes);
  }

  disconnectedCallback() {
    this.model.dispose();
  }

  setValuesFromAttributes(observedAttributes) {
    observedAttributes
      .filter(attrName => this.hasAttribute(attrName))
      .forEach(attrName => this.oscillatorFilter.setParam(attrName, this.getAttribute(attrName)));
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    if (!this.isMounted) { return; }
    this.oscillatorFilter.setParam(attrName, newVal);
    this.callbacks && this.callbacks.onChange();
  }
}
