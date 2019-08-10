import PsVizBase from './ps-viz-base';
import Repeater from '../services/Geometry/InstancedMesh';
import { Vector3 } from 'three';

export default class PsVizRepeat extends PsVizBase {
  static get tag() {
    return 'ps-viz-repeat';
  }

  static get observedAttributes() {
    return [ 'repeat', 'stride' ];
  }

  constructor() {
    super();

    // TODO: move this to InstancedMesh
    this.vars = {
      repeat: new Vector3(30, 30, 10),
      stride: new Vector3(1, 1, 1),
      rotation: new Vector3(),
      position: new Vector3(),
      scale: new Vector3(1, 1, 1),
      rotationVelocity: new Vector3(),
      positionVelocity: new Vector3(),
      scaleVelocity: new Vector3(),
    };
  }

  childChangeCallback() {
    console.log('childChange callback');
    // this.vars.rotation = graphicsObject.mesh.rotation.toVector3();
    this.geo.setVars(this.vars);
  }

  setValuesFromAttributes(observedAttributes) {
    observedAttributes
      .filter(attrName => this.hasAttribute(attrName))
      .forEach(attrName => this.geo.setParam(attrName, this.getAttribute(attrName)));
  }

  connectedCallback() {
    super.connectedCallback();
    console.log('ps-viz-repeat connected');

    this.graphicsModel = {  
      connectTo: graphicsObject => {
        console.log('graphicsObject', graphicsObject)
        const { geometry, material } = graphicsObject.mesh;
        
        this.vars.position = graphicsObject.mesh.position;
        this.vars.rotation = graphicsObject.mesh.rotation;
        this.vars.scale = graphicsObject.mesh.scale;
        this.vars.positionVelocity = graphicsObject.positionVelocity;
        this.vars.rotationVelocity = graphicsObject.rotationVelocity;
        this.vars.scaleVelocity = graphicsObject.scaleVelocity;

        this.geo = new Repeater(geometry, material, this.vars);
        if (this.parentNode.graphicsModel) {
          this.parentNode.graphicsModel.connectTo(this.geo);
        }
        this.setValuesFromAttributes(PsVizRepeat.observedAttributes);
        return {
          onRemove: () => console.log('onRemove'),
          onChange: this.childChangeCallback.bind(this),
        };
      }
    };
  }

  disconnectedCallback() {
    console.log('ps-viz-repeat disconnected');
    this.geo.dispose();
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    if (!this.isMounted || !this.geo) { return; }
    this.geo.setParam(attrName, newVal);
    this.callbacks && this.callbacks.onChange();
  }

  reset() {
    this.geo.reset();
  }
}
