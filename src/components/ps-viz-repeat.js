import PsVizBase from './ps-viz-base';
import Repeater from '../services/Geometry/InstancedMesh';
import sceneManager from '../services/SceneManager';

export default class PsVizRepeat extends PsVizBase {
  static get tag() {
    return 'ps-viz-repeat';
  }

  static get observedAttributes() {
    return [ 'repeat', 'stride', 'position', 'rotation', 'scale', 'pos-mod', 'rot-mod', 'scale-mod' ];
  }

  constructor() {
    super();
    this.vars = {};
  }

  childChangeCallback() {
    console.log('childChange callback');
    this.geo.setVars(this.vars);
  }

  setValuesFromAttributes(observedAttributes) {
    observedAttributes
      .filter(attrName => this.hasAttribute(attrName))
      .forEach(attrName => this.geo.setParam(attrName, this.getAttribute(attrName)));
  }

  connectedCallback() {
    super.connectedCallback();
    
    this.graphicsModel = {  
      connectTo: graphicsObject => {
        console.log('graphicsObject', graphicsObject)
        sceneManager.addSceneObject(graphicsObject);
        const { geometry, material } = graphicsObject.mesh;    
        this.vars.position = graphicsObject.mesh.position;
        this.vars.rotation = graphicsObject.mesh.rotation;
        this.vars.scale = graphicsObject.mesh.scale;
        this.geo = new Repeater(this.vars);
        this.setValuesFromAttributes(PsVizRepeat.observedAttributes);
        this.geo.init(geometry, material);
        this.setValuesFromAttributes(PsVizRepeat.observedAttributes);
        if (this.parentNode.graphicsModel) {
          this.parentNode.graphicsModel.connectTo(this.geo);
        }
        return {
          onRemove: () => {
            console.log('onRemove');
            sceneManager.addSceneObject(graphicsObject);
          },
          onChange: this.childChangeCallback.bind(this),
        };
      }
    };
  }

  disconnectedCallback() {
    console.log('ps-viz-repeat disconnected');
    this.geo.dispose();
    // TODO: sceneManager.addSceneObject(graphicsObject);
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
