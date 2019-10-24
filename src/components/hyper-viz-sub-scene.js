import HyperVizBase from './hyper-viz-base';
import sceneManager from '../services/SceneManager';

export default class PsVizSubScene extends HyperVizBase {
  static get tag() {
    return 'h-viz-sub-scene';
  }

  connectedCallback() {
    this.graphicsModel = {
      connectTo: graphicsObject => {
        sceneManager.addToScene(graphicsObject);
      },
      remove: graphicsObject => {
        sceneManager.removeFromScene(graphicsObject);
        graphicsObject.dispose && graphicsObject.dispose();
      },
    };
  }
}
