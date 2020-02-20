import HyperVizBase from './hyper-viz-base';
import ParticleFlowField from '../services/Particle/ParticleFlowField';

export default class PsVizParticleFlow extends HyperVizBase {
  static get tag() {
    return 'h-viz-particle-flow';
  }

  static get observedAttributes() {
    return [];
  }

  connectedCallback() {
    super.connectedCallback();

    this.graphicsModel = {  
      connectTo: graphicsObject => {
        this.particleFlowField = new ParticleFlowField();
        graphicsObject.setParticleFieldForce(this.particleFlowField);

        this.setValuesFromAttributes(PsVizParticleFlow.observedAttributes);
        if (this.parentNode.graphicsModel) {
          this.parentNode.graphicsModel.connectTo(graphicsObject);
          graphicsObject.onDisconnect = this.parentNode.graphicsModel.remove.bind(this.parentNode, graphicsObject);
        }
        return {
          onRemove: (...args) => {
            console.log('TODO: onRemove callback', ...args);
          },
          onChange: () => console.log('todo: particle wind on change'),
        };
      },
      remove: graphicsObject => {
        // const instanceToRemove = this.particleInstances.find(instance => instance.uuid === graphicsObject.mesh.uuid);
        // if (!instanceToRemove) {
        //   return;
        // }
        // instanceToRemove.onDisconnect();
        // this.particleInstances = this.particleInstances.filter(instance => instance !== instanceToRemove);
      },
    };

  }

  setValuesFromAttributes(observedAttributes) {
    observedAttributes
      .filter(attrName => this.hasAttribute(attrName))
      .forEach(attrName => this.attributeChangedCallback(attrName, null, this.getAttribute(attrName)));
  }

  disconnectedCallback() {}

  attributeChangedCallback(attrName, oldVal, newVal) {
    if (!this.particleFlowField) {
      return;
    }
    this.particleFlowField.setParam(attrName, newVal);
  }
}
