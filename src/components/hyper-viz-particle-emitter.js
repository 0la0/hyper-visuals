import HyperVizBase from './hyper-viz-base';
import ParticleField from '../services/Particle/ParticleField';

export default class PsVizParticleEmitter extends HyperVizBase {
  static get tag() {
    return 'h-viz-particle-emitter';
  }

  static get observedAttributes() {
    return [ 'position', 'position-jitter', 'ttl', 'num' ];
  }

  connectedCallback() {
    super.connectedCallback();
    this.particleFields = [];

    this.graphicsModel = {  
      connectTo: graphicsObject => {  
        const { geometry, material } = graphicsObject.mesh;  
        const vars = {
          position: graphicsObject.mesh.position,
          rotation: graphicsObject.mesh.rotation,
          scale: graphicsObject.mesh.scale,
          color: graphicsObject.mesh.material.color,
        };  
        const particleField = new ParticleField(vars, graphicsObject.mesh.uuid);
        this.particleFields.push(particleField);
        this.setValuesFromAttributes(PsVizParticleEmitter.observedAttributes);
        particleField.init(geometry, material);
        this.setValuesFromAttributes(PsVizParticleEmitter.observedAttributes);
        if (this.parentNode.graphicsModel) {
          console.log('connectToParent', this.parentNode.graphicsModel);
          this.parentNode.graphicsModel.connectTo(particleField);
          particleField.onDisconnect = this.parentNode.graphicsModel.remove.bind(this.parentNode, particleField);
        }
        return {
          onRemove: (...args) => {
            console.log('TODO: onRemove callback', ...args);
          },
          onChange: () => this.repeaters.forEach(repeater => repeater.setVars()),
        };
      },
      remove: graphicsObject => {
        const instanceToRemove = this.particleFields.find(instance => instance.uuid === graphicsObject.mesh.uuid);
        if (!instanceToRemove) {
          return;
        }
        instanceToRemove.onDisconnect();
        this.particleFields = this.particleFields.filter(instance => instance !== instanceToRemove);
      },
    };

  }

  setValuesFromAttributes(observedAttributes) {
    observedAttributes
      .filter(attrName => this.hasAttribute(attrName))
      .forEach(attrName =>
        this.particleFields.forEach(instance => instance.setParam(attrName, this.getAttribute(attrName))));
  }

  disconnectedCallback() {}

  attributeChangedCallback(attrName, oldVal, newVal) {
    if (!this.particleFields) {
      return;
    }
    this.particleFields.forEach(instance => instance.setParam(attrName, newVal));
  }
}
