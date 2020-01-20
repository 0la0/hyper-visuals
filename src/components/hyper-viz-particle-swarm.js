import HyperVizBase from './hyper-viz-base';
import ParticleFieldSwarm from '../services/Particle/ParticleFieldSwarm';

export default class PsVizParticleSwarm extends HyperVizBase {
  static get tag() {
    return 'h-viz-particle-swarm';
  }

  static get observedAttributes() {
    return [ 'goal' ];
  }

  connectedCallback() {
    super.connectedCallback();

    this.graphicsModel = {  
      connectTo: graphicsObject => {
        this.particleFieldSwarm = new ParticleFieldSwarm();
        graphicsObject.setParticleFieldForce(this.particleFieldSwarm);

        this.setValuesFromAttributes(PsVizParticleSwarm.observedAttributes);
        if (this.parentNode.graphicsModel) {
          this.parentNode.graphicsModel.connectTo(graphicsObject);
          graphicsObject.onDisconnect = this.parentNode.graphicsModel.remove.bind(this.parentNode, graphicsObject);
        }
        return {
          onRemove: (...args) => {
            console.log('TODO: onRemove callback', ...args);
          },
          onChange: () => console.log('todo: particle swarm on change'),
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
    if (!this.particleFieldSwarm) {
      return;
    }
    this.particleFieldSwarm.setParam(attrName, newVal);
  }
}
