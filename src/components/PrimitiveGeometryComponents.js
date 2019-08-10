import PrimitiveGeometryBase from './PrimitiveGeometryBase';
import * as PrimitiveGeometry from '../services/Geometry/PrimitiveGeometry';

class PsVizBox extends PrimitiveGeometryBase {
  static get tag() {
    return 'ps-viz-box';
  }

  static get observedAttributes() {
    return PrimitiveGeometryBase.observedAttributes;
  }

  connectedCallback() {
    super.connectedCallback();
    this.geometry = new PrimitiveGeometry.Box();
    super.setValuesFromAttributes(PsVizCone.observedAttributes);
    super.connect();
    console.log('box', this);
  }
}

class PsVizCone extends PrimitiveGeometryBase {
  static get tag() {
    return 'ps-viz-cone';
  }

  static get observedAttributes() {
    return PrimitiveGeometryBase.observedAttributes;
  }

  connectedCallback() {
    super.connectedCallback();
    this.geometry = new PrimitiveGeometry.Cone();
    super.setValuesFromAttributes(PsVizCone.observedAttributes);
    super.connect();
  }
}

export default {
  PsVizBox,
  PsVizCone,
};