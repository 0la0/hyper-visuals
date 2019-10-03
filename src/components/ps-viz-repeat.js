import PsVizBase from './ps-viz-base';
import Repeater from '../services/Geometry/InstancedMesh';

export default class PsVizRepeat extends PsVizBase {
  static get tag() {
    return 'ps-viz-repeat';
  }

  static get observedAttributes() {
    return [ 'repeat', 'stride', 'position', 'rotation', 'scale', 'pos-mod', 'rot-mod', 'scale-mod', 'color-mod', ];
  }

  constructor() {
    super();
    this.repeaters = [];
  }

  childChangeCallback() {
    console.log('childChange callback');
    this.repeaters.forEach(repeater => repeater.setVars());
  }

  setValuesFromAttributes(observedAttributes) {
    observedAttributes
      .filter(attrName => this.hasAttribute(attrName))
      .forEach(attrName =>
        this.repeaters.forEach(repeater => repeater.setParam(attrName, this.getAttribute(attrName))));
  }

  connectedCallback() {
    super.connectedCallback();
    
    this.graphicsModel = {  
      connectTo: graphicsObject => {
        console.log('graphicsObject', graphicsObject.mesh.uuid)
        const { geometry, material } = graphicsObject.mesh;  
        const vars = {
          position: graphicsObject.mesh.position,
          rotation: graphicsObject.mesh.rotation,
          scale: graphicsObject.mesh.scale,
          color: graphicsObject.mesh.material.color,
        };  
        const repeater = new Repeater(vars, graphicsObject.mesh.uuid);
        this.repeaters.push(repeater);
        this.setValuesFromAttributes(PsVizRepeat.observedAttributes);
        repeater.init(geometry, material);
        this.setValuesFromAttributes(PsVizRepeat.observedAttributes);
        if (this.parentNode.graphicsModel) {
          this.parentNode.graphicsModel.connectTo(repeater);
        }
        return {
          onRemove: (...args) => {
            console.log('TODO: onRemove callback', ...args);
          },
          onChange: this.childChangeCallback.bind(this),
        };
      },
      remove: graphicsObject => {
        const repeaterToRemove = this.repeaters.find(repeater => repeater.uuid === graphicsObject.mesh.uuid);
        if (this.parentNode.graphicsModel) {
          this.parentNode.graphicsModel.remove(repeaterToRemove);
        }
        this.repeaters = this.repeaters.filter(repeater => repeater !== repeaterToRemove);
      },
    };
  }

  disconnectedCallback() {
    this.repeaters.forEach(repeater => repeater.dispose());
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    if (!this.isMounted || !this.repeaters.length) { return; }
    this.repeaters.forEach(repeater => repeater.setParam(attrName, newVal));
    this.callbacks && this.callbacks.onChange();
  }

  reset() {
    this.repeaters.forEach(repeater => repeater.reset());
  }
}
