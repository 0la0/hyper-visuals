import GeometryBase from './GeometryBase';
import Cone from '../services/Geometry/Cone';

export default class PsVizCube extends GeometryBase {
  static get tag() {
    return 'ps-viz-cone';
  }

  static get observedAttributes() {
    return GeometryBase.observedAttributes;
  }

  connectedCallback() {
    super.connectedCallback();
    console.log('ps-viz-cone connected');

    this.geometry = new Cone();
    // this.paramMap = Object.assign({}, this.baseParams);
    super.setValuesFromAttributes(PsVizCube.observedAttributes);

    requestAnimationFrame(() => {
      if (this.parentNode.graphicsModel) {
        this.parentNode.graphicsModel.connectTo(this.geometry);
      }
    });
  }

  // TODO: move to super
  disconnectedCallback() {
    console.log('ps-viz-cone disconnected');
    this.geometry.dispose();
  }

  // TODO: move to super
  attributeChangedCallback(attrName, oldVal, newVal) {
    if (!this.isMounted) { return; }
    this.geometry.setParam(attrName, newVal);
    // this.paramMap[attrName].setValue(newVal);
    this.callbacks && this.callbacks.onChange();
  }
}
