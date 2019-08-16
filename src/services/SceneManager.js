import { Vector2, Vector3 } from 'three';
import { PixelShader } from 'three/examples/jsm/shaders/PixelShader';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import SceneModel from './SceneModel';

class SceneManager {
  constructor() {
    this.sceneModel;
    this.backgroundColor;
    this.ambientLightColor;
    this.cameraPosition;
    this.cameraRotation;
    this.sceneObjects = [];
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

    // https://github.com/mrdoob/three.js/blob/master/examples/webgl_postprocessing_pixel.html
    const pixelPass = new ShaderPass(PixelShader);
    pixelPass.uniforms.resolution.value = new Vector2( window.innerWidth, window.innerHeight );
    pixelPass.uniforms.resolution.value.multiplyScalar( window.devicePixelRatio );
    pixelPass.uniforms.pixelSize.value = 14;
    this.addEffect(pixelPass);
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

  addEffect(shaderPass) {
    this.sceneModel.composer.addPass(shaderPass);
    console.log(shaderPass)
  }

  removeEffect(shaderPass) {
    this.sceneModel.composer.removePass(shaderPass);
  }
}

const sceneManager = new SceneManager();
export default sceneManager;