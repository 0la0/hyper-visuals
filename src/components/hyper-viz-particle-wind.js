import HyperVizBase from './hyper-viz-base';
import ParticleFieldWind from '../services/Particle/ParticleFieldWind';

export default class PsVizParticleWind extends HyperVizBase {
  static get tag() {
    return 'h-viz-particle-wind';
  }

  static get observedAttributes() {
    return [ 'direction' ];
  }

  connectedCallback() {
    super.connectedCallback();

    this.graphicsModel = {  
      connectTo: graphicsObject => {
        console.log('wind, connect to child', graphicsObject);
        this.particleFieldWind = new ParticleFieldWind();
        graphicsObject.setParticleFieldForce(this.particleFieldWind);

        this.setValuesFromAttributes(PsVizParticleWind.observedAttributes);
        if (this.parentNode.graphicsModel) {
          console.log('connectToParent', this.parentNode.graphicsModel);
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
    if (!this.particleFieldWind) {
      return;
    }
    this.particleFieldWind.setParam(attrName, newVal);
  }
}
