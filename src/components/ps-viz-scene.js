import PsVizBase from './ps-viz-base';
import SceneModel from '../services/SceneModel';

// class GraphicsModel {
//   constructor(threeEntity) {
//     this.threeEntity = threeEntity;
//   }

//   connectTo(child) {
//     console.log('connect ...', child);
//     this.threeEntity.add(child);
//     console.log(this);
//   }
// }

// TODO: embedded attribute
export default class PsVizScene extends PsVizBase {
  static get tag() {
    return 'ps-viz-scene';
  }

  connectedCallback() {
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
    this.sceneModel = new SceneModel(isEmbedded ? canvasContainer : undefined);
    
    this.graphicsModel = {
      connectTo: graphicsObject => {
        this.graphicsObjects.add(graphicsObject);
        this.sceneModel.scene.add(graphicsObject.getThreeMesh());
      }
    };
    this.lastAnimationTime = performance.now();
    this._animate = this.animate.bind(this);
    this.isOn = false;
  }

  disconnectedCallback() {
    console.log('ps-viz-scene disconnected');
  }

  animate() {
    if (!this.isOn) { return; }
    const now = performance.now();
    const elapsedTime = now - this.lastAnimationTime;
    const scaledTime = elapsedTime * 0.001;
    this.lastAnimationTime = now;
    this.graphicsObjects.forEach(g => g.update(scaledTime, now));
    this.sceneModel.render();
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
    this.sceneModel.setSize(width, height);
  }
}
