import Stats from 'stats.js';
import HyperVizBase from './hyper-viz-base';
import sceneManager from '../services/SceneManager';

let instanceIsConnected = false;

export default class PsVizScene extends HyperVizBase {
  static get tag() {
    return 'h-viz-scene';
  }

  connectedCallback() {
    if (instanceIsConnected) {
      console.error('Error, cannot have multiple h-viz-scene');
      return;
    } else {
      instanceIsConnected = true;
    }
    super.connectedCallback();
    console.log('h-viz-scene connected');
    let canvasContainer;
    const isEmbedded = this.hasAttribute('embed');
    if (isEmbedded) {
      canvasContainer = document.createElement('div');
      canvasContainer.style.setProperty('width', '100%');
      canvasContainer.style.setProperty('height', '100%');
      canvasContainer.setAttribute('livedomignore', '');
      this.appendChild(canvasContainer);
    }
    sceneManager.buildScene(isEmbedded ? canvasContainer : undefined);
    
    this.graphicsModel = {
      connectTo: graphicsObject => {
        sceneManager.addToScene(graphicsObject);
      },
      remove: graphicsObject => {
        sceneManager.removeFromScene(graphicsObject);
        graphicsObject.dispose && graphicsObject.dispose();
      },
    };
    this.showStats = this.hasAttribute('stats');
    this.lastAnimationTime = performance.now();
    this._animate = this.animate.bind(this);
    this.isOn = false;

    if (this.showStats) {
      this.stats = new Stats();
      document.body.appendChild(this.stats.dom);
    }
  }

  disconnectedCallback() {
    instanceIsConnected = false;
  }

  // TODO: add buffer to "now"
  animate() {
    if (!this.isOn) { return; }
    this.stats && this.stats.begin();
    const now = performance.now();
    const elapsedTime = now - this.lastAnimationTime;
    const scaledTime = elapsedTime * 0.001;
    this.lastAnimationTime = now;
    sceneManager.update(scaledTime, now);
    sceneManager.render();
    this.stats && this.stats.end();
    requestAnimationFrame(this._animate);
  }

  start() {
    if (this.isOn) { return; }
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
