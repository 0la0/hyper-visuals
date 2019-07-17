import PsVizBase from './ps-viz-base';
import VectorAttribute from './VectorAttribute';

export default class GeometryBase extends PsVizBase {
  static get observedAttributes() {
    return [ 'position', 'rotation', 'scale', 'color', 'pos-vel', 'rot-vel', 'scale-vel' ];
  }

  get baseParams() {
    return {
      position: new VectorAttribute(this.geometry.setPosition.bind(this.geometry)),
      rotation: new VectorAttribute(this.geometry.setRotation.bind(this.geometry)),
      scale: new VectorAttribute(this.geometry.setScale.bind(this.geometry)),
      color: new VectorAttribute(this.geometry.setColor.bind(this.geometry)),
      'pos-vel': new VectorAttribute(this.geometry.setPositionVelocity.bind(this.geometry)),
      'rot-vel': new VectorAttribute(this.geometry.setRotationVelocity.bind(this.geometry)),
      'scale-vel': new VectorAttribute(this.geometry.setScaleVelocity.bind(this.geometry)),
    };
  }

  setValuesFromAttributes(observedAttributes) {
    // console.log('here', [this.constructor.name].observedAttributes)
    observedAttributes
      .filter(attrName => this.hasAttribute(attrName))
      .forEach(attrName => this.paramMap[attrName].setValue(this.getAttribute(attrName)));
  }
}
