import SceneModel from './SceneModel';

class SceneManager {
  constructor() {
    this.sceneModel;
    this.backgroundColor;
  }

  buildScene(rendererContainer) {
    this.sceneModel = new SceneModel(rendererContainer);
    if (this.backgroundColor) {
      this.sceneModel.scene.background = this.backgroundColor;
      console.log('setBackground color', this.backgroundColor)
    }
  }

  render() {
    this.sceneModel.render();
  }

  setSize(width, height) {
    this.sceneModel.setSize(width, height);
  }

  setBackgroundColor(backgroundColor) {
    this.backgroundColor = backgroundColor;
    if (this.sceneModel) {
      this.sceneModel.scene.background = this.backgroundColor;
      console.log('setBackground color', backgroundColor)
    }
  }

  addToScene(obj) {
    this.sceneModel.scene.add(obj);
  }
}

const sceneManager = new SceneManager();
export default sceneManager;