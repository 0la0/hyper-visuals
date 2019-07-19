import GeometryBase from './GeometryBase';
import Box from '../services/Geometry/Box';

export default class PsVizCube extends GeometryBase {
  static get tag() {
    return 'ps-viz-cube';
  }

  static get observedAttributes() {
    return GeometryBase.observedAttributes;
  }

  connectedCallback() {
    super.connectedCallback();
    console.log('ps-viz-cube connected');

    this.geometry = new Box();
    this.paramMap = Object.assign({}, this.baseParams);
    super.setValuesFromAttributes(PsVizCube.observedAttributes);

    requestAnimationFrame(() => {
      if (this.parentNode.graphicsModel) {
        this.callbacks = this.parentNode.graphicsModel.connectTo(this.geometry);
      }
    });
  }

  disconnectedCallback() {
    console.log('ps-viz-cube disconnected');
    this.geometry.dispose();
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    if (!this.isMounted) { return; }
    this.paramMap[attrName].setValue(newVal);
    if (this.callbacks.onChange) {
      this.callbacks.onChange();
    }
  }
}
