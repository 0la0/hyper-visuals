import HyperVizBase from './hyper-viz-base';
import OscillatorFilter from '../services/Filter/Oscillator';

export default class PsVizFilterOscillate extends HyperVizBase {
  static get tag() {
    return 'h-viz-filter-oscillate';
  }

  static get observedAttributes() {
    return [ 'amplitude', 'frequency', 'period', 'rotation', 'type' ];
  }

  connectedCallback() {
    super.connectedCallback();
    this.oscillatorFilter = new OscillatorFilter();
    this.setValuesFromAttributes(PsVizFilterOscillate.observedAttributes);
  }

  disconnectedCallback() {
    this.oscillatorFilter.dispose();
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
