import PsVizBase from './ps-viz-base';
import Repeater from '../services/Geometry/InstancedMesh';

const vars = {
  repeatX: 30,
  strideX: 5,
  rotateX: 0.2,
  rotateVelocityX: 2,
  positionVelocityX: 1,
  repeatY: 30,
  strideY: 4,
  rotateY: 2,
  rotateVelocityY: 10,
  positionVelocityY: 20,
  repeatZ: 3,
  strideZ: 10,
  rotateZ: 1.3,
  rotateVelocityZ: 2,
  positionVelocityZ: 0.01,
  sizeX: 2,
  sizeY: 0.2,
  sizeZ: 0.5,
};

export default class PsVizRepeat extends PsVizBase {
  static get tag() {
    return 'ps-viz-repeat';
  }

  static get observedAttributes() {
    return [];
  }

  connectedCallback() {
    super.connectedCallback();
    console.log('ps-viz-repeat connected');

    this.graphicsModel = {
      connectTo: graphicsObject => {
        const { geometry, material } = graphicsObject.mesh;
        const geo = new Repeater(geometry, material, vars);
        if (this.parentNode.graphicsModel) {
          this.parentNode.graphicsModel.connectTo(geo);
        }
      }
    };
  }

  disconnectedCallback() {
    console.log('ps-viz-repeat disconnected');
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    if (!this.isMounted) { return; }
    this.paramMap[attrName].setValue(newVal);
  }
}
