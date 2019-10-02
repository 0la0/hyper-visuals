import { Vector3 } from 'three';
import SceneModel from './SceneModel';

class SceneManager {
  constructor() {
    this.sceneModel;
    this.backgroundColor;
    this.ambientLightColor;
    this.cameraPosition;
    this.cameraRotation;
    this.effects = [];
    this.sceneObjects = [];
    this.renderEffects = false;
  }

  buildScene(rendererContainer) {
    this.sceneModel = new SceneModel(rendererContainer);
    if (this.backgroundColor) {
      this.sceneModel.scene.background = this.backgroundColor;
    }
    if (this.ambientLightColor) {
      this.sceneModel.ambientLight.color = this.ambientLightColor;
    }
    if (this.ambientLightIntensity !== undefined) {
      this.sceneModel.ambientLight.intensity = this.ambientLightIntensity;
    }
    if (this.cameraPosition) {
      this.sceneModel.camera.position.set(this.cameraPosition.x, this.cameraPosition.y, this.cameraPosition.z);
    }
    if (this.cameraRotation) {
      this.sceneModel.camera.rotation.set(this.cameraRotation.x, this.cameraRotation.y, this.cameraRotation.z);
    }
    this.effects.forEach(effect => this.sceneModel.composer.addPass(effect));
  }

  render() {
    this.sceneModel.render(this.renderEffects);
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

  setAmbientLightColor(ambientLightColor) {
    this.ambientLightColor = ambientLightColor;
    if (this.sceneModel) {
      this.sceneModel.ambientLight.color = this.ambientLightColor;
    }
  }

  setAmbientLightIntensity(ambientLightIntensity) {
    this.ambientLightIntensity = ambientLightIntensity;
    if (this.sceneModel) {
      this.sceneModel.ambientLight.intensity = this.ambientLightIntensity;
    }
  }

  addToScene(obj) {
    this.sceneModel.scene.add(obj);
  }

  removeFromScene(obj) {
    this.sceneModel.scene.remove(obj);
    console.log('removedFromScene', obj);
  }

  update(elapsedTime, performanceTime) {
    this.sceneObjects.forEach(sceneObject => sceneObject.update(elapsedTime, performanceTime));
  }

  addSceneObject(sceneObject) {
    this.sceneObjects.push(sceneObject);
  }

  removeSceneObject(sceneObject) {
    this.sceneObjects = this.sceneObjects.filter(_sceneObject => _sceneObject !== sceneObject);
  }

  setCameraPosition(x, y, z) {
    this.cameraPosition = new Vector3(x, y, z);
    if (this.sceneModel) {
      this.sceneModel.camera.position.set(this.cameraPosition.x, this.cameraPosition.y, this.cameraPosition.z);
    }
  }

  setCameraRotation(x, y, z) {
    this.cameraRotation = new Vector3(x, y, z);
    if (this.sceneModel) {
      this.sceneModel.camera.rotation.set(this.cameraRotation.x, this.cameraRotation.y, this.cameraRotation.z);
    }
  }

  addEffect({ shaderPass }) {
    this.effects.push(shaderPass);
    this.renderEffects = this.effects.length > 0;
    if (this.sceneModel) {
      this.sceneModel.composer.addPass(shaderPass);
    }
  }

  removeEffect({ shaderPass }) {
    this.effects = this.effects.filter(effect => effect !== shaderPass);
    this.renderEffects = this.effects.length > 0;
    shaderPass.enabled = false;
  }
}

const sceneManager = new SceneManager();
export default sceneManager;