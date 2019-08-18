import PsVizBase from './ps-viz-base';
import OscillatorFilter from '../services/Filter/Oscillator';

export default class PsVizFilterOscillate extends PsVizBase {
  static get tag() {
    return 'ps-viz-filter-oscillate';
  }

  static get observedAttributes() {
    return [];
  }

  connectedCallback() {
    super.connectedCallback();
    // this.light = new Light();
    this.oscillatorFilter = new OscillatorFilter();
    this.setValuesFromAttributes(PsVizFilterOscillate.observedAttributes);
    // requestAnimationFrame(() => {
    //   if (this.parentNode.graphicsModel) {
    //     this.parentNode.graphicsModel.connectTo(this.light);
    //   }
    // });
  }

  disconnectedCallback() {
    console.log('ps-viz-filter-oscillator disconnected');
    this.model.dispose();
  }

  setValuesFromAttributes(observedAttributes) {
    observedAttributes
      .filter(attrName => this.hasAttribute(attrName))
      .forEach(attrName => this.oscillatorFilter.setParam(attrName, this.getAttribute(attrName)));
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    if (!this.isMounted) { return; }
    this.pixelateFilter.setParam(attrName, newVal);
    this.callbacks && this.callbacks.onChange();
  }
}
