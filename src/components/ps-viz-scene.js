import PsVizBase from './ps-viz-base';
import sceneWrapper from '../services/Scene';

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

export default class PsDac extends PsVizBase {
  static get tag() {
    return 'ps-viz-scene';
  }

  connectedCallback() {
    super.connectedCallback();
    console.log('ps-viz-scene connected');
    this.graphicsObjects = new Set();
    // this.graphicsModel = new GraphicsModel(sceneWrapper.scene);
    this.graphicsModel = {
      connectTo: graphicsObject => {
        this.graphicsObjects.add(graphicsObject);
        sceneWrapper.scene.add(graphicsObject.getThreeMesh());
      }
    };
    this._animate = this.animate.bind(this);
    requestAnimationFrame(this._animate);
  }

  disconnectedCallback() {
    console.log('ps-viz-scene disconnected');
  }

  animate() {
    this.graphicsObjects.forEach(g => g.update());
    sceneWrapper.render();
    requestAnimationFrame(this._animate);
  }
}
