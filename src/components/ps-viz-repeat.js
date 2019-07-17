import PsVizBase from './ps-viz-base';
import Repeater from '../services/Geometry/InstancedMesh';
import { Vector3 } from 'three';

const vars = {
  repeatX: 30,
  strideX: 1,
  repeatY: 30,
  strideY: 1,
  repeatZ: 3,
  strideZ: 1,
  rotation: new Vector3(),
  position: new Vector3(),
  scale: new Vector3(1, 1, 1),
  rotateVelocity: new Vector3(3, 3, 3),
  positionVelocity: new Vector3(),
  scaleVelocity: new Vector3(),
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
        const updatedVars = {
          ...vars,
          position: graphicsObject.mesh.position.clone(),
          rotation: graphicsObject.mesh.rotation.toVector3(),
          scale: graphicsObject.mesh.scale.clone(),
        };
        const geo = new Repeater(geometry, material, updatedVars);
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
