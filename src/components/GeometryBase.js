import PsVizBase from './ps-viz-base';

export default class GeometryBase extends PsVizBase {
  static get observedAttributes() {
    return [ 'position', 'rotation', 'scale', 'color', 'pos-vel', 'rot-vel', 'scale-vel' ];
  }

  setValuesFromAttributes(observedAttributes) {
    observedAttributes
      .filter(attrName => this.hasAttribute(attrName))
      .forEach(attrName => this.geometry.setParam(attrName, this.getAttribute(attrName)));
  }
}
