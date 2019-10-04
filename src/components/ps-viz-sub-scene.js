import PsVizBase from './ps-viz-base';
import sceneManager from '../services/SceneManager';

export default class PsVizSubScene extends PsVizBase {
  static get tag() {
    return 'ps-viz-sub-scene';
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
