import Box from '../services/Geometry/Box';
import PsVizBase from './ps-viz-base';

class VectorAttribute {
  constructor(setter) {
    this._setter = setter;
  }

  setValue(stringValue) {
    const [ xStr, yStr, zStr ] = stringValue.trim().split(/\s+/);
    const x = parseFloat(xStr, 10);
    const y = parseFloat(yStr, 10);
    const z = parseFloat(zStr, 10);
    this._setter(x, y, z);
  }
}

export default class PsVizCube extends PsVizBase {
  static get tag() {
    return 'ps-viz-cube';
  }

  static get observedAttributes() {
    return [ 'position', 'rotation', 'scale', 'color', 'pos-vel', 'rot-vel', 'scale-vel' ];
  }

  connectedCallback() {
    super.connectedCallback();
    console.log('ps-viz-cube connected');

    this.box = new Box();

    requestAnimationFrame(() => {
      if (this.parentNode.graphicsModel) {
        this.parentNode.graphicsModel.connectTo(this.box);
        // this.graphicsModel.connectTo(this.parentNode.graphicsModel);
      }
    });
    
    this.paramMap = {
      position: new VectorAttribute(this.box.setPosition.bind(this.box)),
      rotation: new VectorAttribute(this.box.setRotation.bind(this.box)),
      scale: new VectorAttribute(this.box.setScale.bind(this.box)),
      color: new VectorAttribute(this.box.setColor.bind(this.box)),
      'pos-vel': new VectorAttribute(this.box.setPositionVelocity.bind(this.box)),
      'rot-vel': new VectorAttribute(this.box.setRotationVelocity.bind(this.box)),
      'scale-vel': new VectorAttribute(this.box.setScaleVelocity.bind(this.box)),
    };
  }

  disconnectedCallback() {
    console.log('ps-viz-cube disconnected');
    this.box.dispose();
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    if (!this.isMounted) { return; }
    this.paramMap[attrName].setValue(newVal);
  }
}
