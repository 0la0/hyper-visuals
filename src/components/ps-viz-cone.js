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
    this.paramMap = Object.assign({}, this.baseParams);
    super.setValuesFromAttributes(PsVizCube.observedAttributes);

    requestAnimationFrame(() => {
      if (this.parentNode.graphicsModel) {
        this.parentNode.graphicsModel.connectTo(this.geometry);
      }
    });
  }

  disconnectedCallback() {
    console.log('ps-viz-cone disconnected');
    this.geometry.dispose();
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    if (!this.isMounted) { return; }
    this.paramMap[attrName].setValue(newVal);
  }
}
