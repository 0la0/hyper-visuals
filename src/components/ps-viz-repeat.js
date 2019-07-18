import PsVizBase from './ps-viz-base';
import VectorAttribute from './VectorAttribute';
import Repeater from '../services/Geometry/InstancedMesh';
import { Vector3 } from 'three';

const vars = {
  repeat: new Vector3(30, 30, 10),
  stride: new Vector3(1, 1, 1),
  rotation: new Vector3(),
  position: new Vector3(),
  scale: new Vector3(1, 1, 1),
  rotateVelocity: new Vector3(),
  positionVelocity: new Vector3(),
  scaleVelocity: new Vector3(),
};

export default class PsVizRepeat extends PsVizBase {
  static get tag() {
    return 'ps-viz-repeat';
  }

  static get observedAttributes() {
    return [ 'repeat', 'stride' ];
  }

  connectedCallback() {
    super.connectedCallback();
    console.log('ps-viz-repeat connected');

    this.paramMap = {
      repeat: new VectorAttribute((x, y, z) => {
        vars.repeat.set(x, y, z);
        this.geo.setVars(vars);
      }),
      stride: new VectorAttribute((x, y, z) => {
        vars.stride.set(x, y, z);
        this.geo.setVars(vars);
      }),
    };

    this.graphicsModel = {  
      connectTo: graphicsObject => {
        const { geometry, material } = graphicsObject.mesh;
        const updatedVars = {
          ...vars,
          position: graphicsObject.mesh.position.clone(),
          rotation: graphicsObject.mesh.rotation.toVector3(),
          scale: graphicsObject.mesh.scale.clone(),
        };
        this.geo = new Repeater(geometry, material, updatedVars);
        if (this.parentNode.graphicsModel) {
          this.parentNode.graphicsModel.connectTo(this.geo);
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
