import PsVizBase from './ps-viz-base';
import sceneManager from '../services/SceneManager';

let instanceIsConnected = false;

export default class PsVizScene extends PsVizBase {
  static get tag() {
    return 'ps-viz-scene';
  }

  connectedCallback() {
    if (instanceIsConnected) {
      console.error('Error, cannot have multiple ps-viz-scene');
      return;
    } else {
      instanceIsConnected = true;
    }
    super.connectedCallback();
    console.log('ps-viz-scene connected');
    let canvasContainer;
    const isEmbedded = this.hasAttribute('embed');
    if (isEmbedded) {
      canvasContainer = document.createElement('div');
      canvasContainer.style.setProperty('width', '100%');
      canvasContainer.style.setProperty('height', '100%');
      canvasContainer.setAttribute('livedomignore', '');
      this.appendChild(canvasContainer);
    }
    this.graphicsObjects = new Set();
    sceneManager.buildScene(isEmbedded ? canvasContainer : undefined);
    
    this.graphicsModel = {
      connectTo: graphicsObject => {
        this.graphicsObjects.add(graphicsObject);
        sceneManager.addToScene(graphicsObject.getThreeMesh());
      }
    };
    this.lastAnimationTime = performance.now();
    this._animate = this.animate.bind(this);
    this.isOn = false;
  }

  disconnectedCallback() {
    console.log('ps-viz-scene disconnected');
    instanceIsConnected = false;
  }

  animate() {
    if (!this.isOn) { return; }
    const now = performance.now();
    const elapsedTime = now - this.lastAnimationTime;
    const scaledTime = elapsedTime * 0.001;
    this.lastAnimationTime = now;
    this.graphicsObjects.forEach(g => g.update(scaledTime, now));
    sceneManager.update(scaledTime, now);
    sceneManager.render();
    requestAnimationFrame(this._animate);
  }

  start() {
    this.isOn = true;
    requestAnimationFrame(this._animate);
  }

  stop() {
    this.isOn = false;
  }

  setSize(width, height) {
    sceneManager.setSize(width, height);
  }
}
